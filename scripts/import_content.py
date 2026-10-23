"""Deterministic, offline transcription. Never modifies receipt originals."""
from pathlib import Path
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DOSSIER = ROOT / 'input-materials/2026-10-16_group10_dossiers-matrices/originals/[Group 10] PBL The Credit Desk (13).md'
WAREHOUSE = ROOT / 'input-materials/2026-10-16_group10_warehouse-dossiers/originals/[Group 10] PBL The Credit Desk (17).md'
# Only public requested terms / neutral precomputed EMI; no answer-key fields here.
TERMS = [
    ('Unsecured', 500_000_000, 60, 12_696_714),
    ('Secured', 700_000_000, 180, 7_956_179),
    ('Unsecured', 500_000_000, 60, 12_696_714),
    ('Secured', 450_000_000, 120, 11_630_485),
    ('Secured', 680_000_000, 240, 7_018_881),
    ('Secured', 1_540_000_000, 240, 15_895_701),
    ('Secured', 1_000_000_000, 240, 10_321_884),
    ('Unsecured', 450_000_000, 60, 11_427_042),
]

def plain(text):
    text = re.sub(r'\\([\\`*_{}\[\]()#+.!<>|=\-])', r'\1', text)
    text = re.sub(r'^>\s?', '', text, flags=re.M)
    return text.replace('**', '').replace('*', '').strip()

def paragraphs(text):
    return [plain(p) for p in re.split(r'\n\s*\n', text.strip()) if plain(p)]

# Recheck every immutable input before transcription/checking, not only the two imports.
count = 0
for manifest_path in sorted((ROOT / 'input-materials').glob('*/manifest.json')):
    manifest = json.loads(manifest_path.read_text())
    for item in manifest['files']:
        raw = (manifest_path.parent / item['relative_path']).read_bytes()
        assert hashlib.sha256(raw).hexdigest() == item['sha256'], item['filename']
        count += 1
assert count == 19, count

source = DOSSIER.read_text()
parts = re.split(r'^## \*\*(KHCN-\d+ .+)\*\*\s*$', source, flags=re.M)
assert len(parts) == 17
cases = []
author = []
for i, (title, body) in enumerate(zip(parts[1::2], parts[2::2])):
    match = re.fullmatch(r'(KHCN-\d+) — (.+), (\d+)', title)
    assert match
    case_id, name, age = match.groups()
    public = body.split('**A. Player-visible dossier**', 1)[1].split('**B. Author-side key**', 1)[0]
    narrative, rest = public.split('**A2. Revealed via "Check CIC"**', 1)
    cic, rest = re.split(r'\*\*A[34]\. ', rest, maxsplit=1)
    warehouse_identity = re.search(r'Warehouse entry:\*\* (.+)', public).group(1).strip()
    identity = plain(warehouse_identity).split(' · ')
    collateral = []
    if '**A3. Collateral sheet**' in public:
        table = public.split('**A3. Collateral sheet**')[1].split('**A4.')[0]
        for line in table.splitlines():
            if line.startswith('|'):
                cells = [plain(c.strip()) for c in line.strip('|').split('|')]
                if cells[0] not in ('Field', '-----'):
                    collateral.append(cells)
    product, principal, requested_months, emi = TERMS[i]
    age = int(age)
    cases.append({
        'id': case_id, 'name': name, 'age': age, 'province': identity[-1],
        'product': product, 'principal': principal, 'requestedMonths': requested_months,
        'appliedMonths': min(requested_months, 60 if product == 'Unsecured' else 360, (70-age)*12),
        'annualRate': .18 if product == 'Unsecured' else .11, 'emi': emi,
        'narrative': paragraphs(narrative), 'cic': paragraphs(cic),
        'collateral': collateral, 'source': 'DOSSIER-8 (13), ' + case_id + ', A/A2/A3/A4',
    })
    key = body.split('**B. Author-side key**')[1].split('**C. Correct decision:**')[0]
    card_parts = re.split(r'^\*\*Card \d+\.\d+ — Player chooses (.+?)\*\*[^\n]*\n', body, flags=re.M)
    cards = {plain(choice): paragraphs(content) for choice, content in zip(card_parts[1::2], card_parts[2::2])}
    assert set(cards) == {'Approve', 'Reject', 'Reduce limit', 'Require more collateral', 'Add conditions'}
    author.append({'id': case_id, 'key': paragraphs(key.split('*Trap values:*')[0]), 'cards': cards})

records = []
for line in WAREHOUSE.read_text().splitlines():
    if not line.startswith('| WH-'):
        continue
    cells = [plain(c.strip()) for c in re.split(r'(?<!\\)\|', line.strip('|'))]
    assert len(cells) == 6
    record_id, profile, headline, document, _, _ = cells
    name, age, province = profile.split(' · ')
    records.append({'id': record_id, 'name': name, 'age': int(age), 'province': province,
                    'headline': headline, 'documents': paragraphs(document)})
assert len(records) == 168
assert len({r['id'] for r in records}) == 168
assert len({(r['name'], r['age'], r['province']) for r in records}) == 168
assert sum(len(a['cards']) for a in author) == 40

outputs = {
    'src/content/dossiers.json': cases,
    'src/content/warehouse.json': records,
    'src/content/author-cards.json': author,
    'src/content/provenance.json': {
        'dataset': 'extended-8-g1-v1', 'warehouse': 'shared-168-v1',
        'dossierSHA256': hashlib.sha256(DOSSIER.read_bytes()).hexdigest(),
        'warehouseSHA256': hashlib.sha256(WAREHOUSE.read_bytes()).hexdigest(),
        'transform': 'scripts/import_content.py: public A sources + public Warehouse columns only; internal B/D separate',
        'reviewRequired': ['Case 04 rental-tax/income basis', 'General Capital-after-Reduce policy', 'Case 07 trap-label inconsistency', 'Noise-record structured eligible-income totals not supplied'],
    },
}
for relative, value in outputs.items():
    path = ROOT / relative
    expected = json.dumps(value, ensure_ascii=False, indent=2) + '\n'
    if '--check' in sys.argv:
        assert path.read_text() == expected, f'Stale import: {relative}'
    else:
        path.write_text(expected)
print('Verified 19 unchanged originals; 8 public dossiers; one 168-record pool; 40 separately stored consequence branches.')
