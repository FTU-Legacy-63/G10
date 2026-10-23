import test from 'node:test';
import assert from 'node:assert/strict';
import { CASES, WAREHOUSE } from '../src/content/index';
import { assessReference, capacityDecision, money, parseNumber, plannedAllocation, pmt, presentValue, validateDecision, withinTolerance } from '../src/domain/finance';
import { normalize, oneEdit, searchError, searchRecords } from '../src/domain/search';
import { buildSnapshot, emptyDraft, newRound, reduceRound, roundReady } from '../src/application/round';
import { persist, restore } from '../src/infrastructure/persistence';
import type { Decision, RoundState } from '../src/domain/types';

const complete = () => {
  let state = reduceRound(newRound(), { type: 'start' });
  for (let i = 0; i < 8; i++) {
    state = reduceRound(state, { type: 'decision', value: 'Approve' });
    state = reduceRound(state, { type: 'continue' });
  }
  return state;
};

test('all eight imported EMIs independently match annuity calculation, including age-capped 04', () => {
  for (const file of CASES) assert.equal(Math.round(pmt(file.principal, file.annualRate, file.appliedMonths)), file.emi, file.id);
  assert.equal(CASES[3].appliedMonths, 48);
  assert.equal(Math.round(presentValue(6_300_000, .11, 240)), 610_353_696);
  assert.equal(Math.round(presentValue(9_900_000, .11, 48)), 383_045_069);
});

test('exact 70/80 boundaries and inclusive numeric tolerances', () => {
  assert.equal(capacityDecision(.7), null);
  assert.equal(capacityDecision(.7000000001), 'Reduce limit');
  assert.equal(capacityDecision(.8), 'Reduce limit');
  assert.equal(capacityDecision(.8000000001), 'Reject');
  for (const value of [160_550_000, 177_450_000]) assert.ok(withinTolerance(value, 169_000_000));
  assert.ok(!withinTolerance(177_450_001, 169_000_000));
  assert.throws(() => capacityDecision(Infinity));
});

test('reference pipeline respects authored headlines, early stops and collateral edge', () => {
  const expected = ['Approve', 'Reject', 'Add conditions', null, 'Reduce limit', 'Approve', 'Require more collateral', 'Reject'];
  const references = CASES.map(assessReference);
  assert.deepEqual(references.map(r => r.decision), expected);
  assert.equal(references[1].collateral, 'Not assessed');
  assert.equal(references[1].capital, 'Not assessed');
  assert.equal(references[7].dti, null);
  assert.equal(references[7].purpose, 'Not feasible');
  assert.equal(references[5].ltv, .7);
  assert.equal(references[6].additional, 169e6);
  assert.equal(references[6].net, 1260e6);
  assert.equal(references[6].secondary.length, 2);
  assert.equal(references[4].maxInstallment, 6.3e6);
  assert.equal(references[4].reserve, null);
  assert.match(references[3].reviewIssue!, /rental-tax/);
});

test('strict numeric grammar preserves blanks and rejects ambiguous/nonfinite forms', () => {
  for (const raw of ['', ' ', 'NaN', 'Infinity', '1e6', '0x10', '-1', '1,23', '1.000.000', '12 000', '9007199254740992']) assert.equal(parseNumber(raw), null, raw);
  assert.equal(parseNumber('1,234,567.50'), 1234567.5);
  assert.equal(parseNumber('0'), 0);
});

test('all five choices validate structure rather than hidden correctness', () => {
  const file = CASES[0];
  assert.match(validateDecision(emptyDraft(), file)!, /Choose a decision/);
  const draft = { ...emptyDraft(), decision: 'Reduce limit' as Decision, amount: '0' };
  assert.match(validateDecision(draft, file)!, /greater than 0/);
  draft.amount = String(file.emi + 1); assert.match(validateDecision(draft, file)!, /cannot exceed/);
  draft.amount = String(file.emi); assert.equal(validateDecision(draft, file), null);
  draft.decision = 'Require more collateral'; draft.amount = '1000000'; assert.equal(validateDecision(draft, file), null, 'Wrong-but-valid choice stays available on Unsecured during G1');
  draft.amount = String(Math.ceil(file.principal / .7)); assert.match(validateDecision(draft, file)!, /whole loan/);
  draft.decision = 'Add conditions'; assert.match(validateDecision(draft, file)!, /at least one/);
  draft.covenants = ['income-update']; assert.equal(validateDecision(draft, file), null);
  draft.covenants = ['reappraisal']; assert.match(validateDecision(draft, file)!, /at least one/);
});

test('category switch clears old payloads, but navigation and reload preserve same-category raw text and working', () => {
  let state = reduceRound(newRound(), { type: 'start' });
  state = reduceRound(state, { type: 'worksheet', field: 'dti', value: '63.05' });
  state = reduceRound(state, { type: 'draft', patch: { notes: 'Evidence note', pin: 'WH-0005' } });
  state = reduceRound(state, { type: 'decision', value: 'Reduce limit' });
  state = reduceRound(state, { type: 'draft', patch: { amount: '9,000,000' } });
  state = reduceRound(state, { type: 'view', view: 'warehouse' });
  state = restore(JSON.stringify(state));
  assert.equal(state.drafts['KHCN-01'].amount, '9,000,000');
  state = reduceRound(state, { type: 'decision', value: 'Approve' });
  state = reduceRound(state, { type: 'decision', value: 'Reduce limit' });
  assert.equal(state.drafts['KHCN-01'].amount, '');
  assert.equal(state.drafts['KHCN-01'].worksheet.dti, '63.05');
  assert.equal(state.drafts['KHCN-01'].notes, 'Evidence note');
  assert.equal(state.drafts['KHCN-01'].pin, 'WH-0005');
});

test('sequential queue forbids future access and preserves wrong-but-valid work', () => {
  const state = reduceRound(newRound(), { type: 'start' });
  assert.equal(reduceRound(state, { type: 'case', index: 7 }), state);
  assert.equal(reduceRound(state, { type: 'continue' }), state);
  assert.equal(complete().reached, 8);
  assert.ok(roundReady(complete()));
});

test('search pool is unique and public projection contains no answer/queue metadata', () => {
  assert.equal(WAREHOUSE.length, 168);
  assert.equal(new Set(WAREHOUSE.map(r => r.id)).size, 168);
  assert.equal(CASES.length, 8);
  for (const record of WAREHOUSE) assert.deepEqual(Object.keys(record).sort(), ['age', 'documents', 'headline', 'id', 'name', 'province']);
  for (const file of CASES) assert.ok(!('decision' in file) && !('verifiedIncome' in file) && !file.narrative.join(' ').includes('Author-side'));
  const q = { name: 'Tran Phuong Anh', age: '35', province: 'Bắc Ninh', strict: false, fuzzy: false };
  assert.ok(searchRecords(WAREHOUSE, q, 4).some(r => r.id === 'WH-0005'));
  assert.equal(searchRecords(WAREHOUSE, q, 4).length, 2, 'Accent-insensitive search includes Anh and Ánh');
  assert.equal(searchRecords(WAREHOUSE, { ...q, strict: true }, 4).length, 0);
  assert.equal(normalize('ĐỖ Văn Kiên'), 'do van kien');
  assert.ok(oneEdit('kien', 'kian') && oneEdit('kien', 'kin') && !oneEdit('kien', 'kxxn'));
  assert.ok(searchRecords(WAREHOUSE, { ...q, name: 'Tran Phuong Ann', fuzzy: true }, 4).some(r => r.id === 'WH-0005'));
  assert.match(searchError({ ...q, age: '40-30' })!, /range/);
  const later = { ...q, name: 'Pham Gia Hung', age: '36', province: 'Hà Nội' };
  assert.ok(searchRecords(WAREHOUSE, later, 4).some(r => r.id === 'WH-0122'), 'Shared pool is not filtered by reached queue');
  const broad = { ...q, age: '', province: '' };
  assert.deepEqual(searchRecords(WAREHOUSE, broad, 9), searchRecords(WAREHOUSE, broad, 9));
});

test('unfinished and future-injected saves fail; raw optional working survives', () => {
  const invalid = newRound(); invalid.reached = 8;
  assert.throws(() => restore(JSON.stringify(invalid)));
  const future = newRound(); future.drafts['KHCN-08'].notes = 'Injected';
  assert.throws(() => restore(JSON.stringify(future)));
  const valid = complete(); valid.drafts['KHCN-01'].worksheet.dti = 'not a number';
  assert.ok(roundReady(restore(JSON.stringify(valid))), 'Unscored optional text is preserved without a new mandatory gate in G1');
  const incompatible = { ...valid, dataset: 'old-v4' }; assert.throws(() => restore(JSON.stringify(incompatible)));
});

test('untimed attempt survives a later-day restore and cannot auto-finalize', async () => {
  const state = complete();
  const originalNow = Date.now;
  const later = originalNow() + 10 * 365 * 24 * 60 * 60 * 1000;
  Date.now = () => later;
  try {
    const resumed = restore(JSON.stringify(state));
    assert.equal(resumed.attemptId, state.attemptId);
    assert.equal(resumed.phase, 'draft');
    assert.equal(resumed.reached, 8);
    assert.equal(resumed.snapshot, null);
    assert.ok(!/deadline|remainingTime|expiresAt|countdown/.test(JSON.stringify(resumed)));
  } finally { Date.now = originalNow; }
  const report = await buildSnapshot(state);
  assert.equal(report.reports.length, 8);
  assert.equal(report.reports[3].categoryMatches, null);
  assert.equal(report.reports[3].consequence.length, 0);
  assert.equal(state.phase, 'draft', 'Constructing a report is not confirmation or persistence');
});

test('storage failure cannot mutate draft or expose a partial final lock', async () => {
  const draft = complete();
  const snapshot = await buildSnapshot(draft);
  const candidate: RoundState = { ...draft, phase: 'submitted', snapshot };
  assert.throws(() => persist({ getItem: () => null, setItem: () => { throw new Error('Quota'); } }, candidate));
  assert.equal(draft.phase, 'draft');
  assert.equal(draft.snapshot, null);
  let raw = '';
  persist({ getItem: () => raw, setItem: (_key, value) => { raw = value; } }, candidate);
  const restored = restore(raw);
  assert.equal(restored.phase, 'submitted');
  assert.equal(restored.snapshot, null, 'Derived report is rebuilt, never trusted from storage');
  assert.deepEqual(await buildSnapshot(restored), snapshot);
  for (const action of [{ type: 'decision', value: 'Reject' }, { type: 'draft', patch: { amount: '1' } }, { type: 'worksheet', field: 'dti', value: '1' }] as const) assert.equal(reduceRound(candidate, action), candidate);
});

test('room recomputes from learner choices; incomplete allocation is not a zero offer', () => {
  assert.equal(plannedAllocation(emptyDraft(), CASES[0]), null);
  const draft = { ...emptyDraft(), decision: 'Reject' as Decision }; assert.equal(plannedAllocation(draft, CASES[0]), 0);
  draft.decision = 'Approve'; assert.equal(plannedAllocation(draft, CASES[0]), 500e6);
  assert.equal(money(500e6), '500,000,000');
});

test('comparison slots allow deliberate replacement, prevent duplicates/future sources and remain locked after submit', async () => {
  let s = reduceRound(newRound(), { type: 'start' });
  const first = `dossier:${CASES[0].id}`;
  const future = `dossier:${CASES[1].id}`;
  assert.equal(reduceRound(s, { type: 'board-slot', slot: 0, source: future }), s);
  assert.equal(reduceRound(s, { type: 'board-slot', slot: 0, source: `cic:${CASES[0].id}` }), s);
  s = reduceRound(s, { type: 'board-slot', slot: 0, source: first });
  assert.deepEqual(s.boardSources, [first]);
  assert.equal(reduceRound(s, { type: 'board-slot', slot: 1, source: first }), s);
  s = reduceRound(s, { type: 'draft', patch: { cicOpened: true } });
  s = reduceRound(s, { type: 'board-slot', slot: 1, source: `cic:${CASES[0].id}` });
  assert.equal(s.boardSources.length, 2);
  assert.deepEqual(restore(JSON.stringify(s)).boardSources, s.boardSources);
  assert.equal(reduceRound({ ...s, phase: 'submitted' }, { type: 'board-slot', slot: 0, source: '' }).boardSources, s.boardSources);
});

test('old saves keep raw working and original tabs; additional source tabs restore without a schema reset', () => {
  let s = reduceRound(newRound(), { type: 'start' });
  s = reduceRound(s, { type: 'decision', value: 'Reduce limit' });
  s = reduceRound(s, { type: 'draft', patch: { amount: '9,001,234.50', notes: 'Keep my original notes' } });
  s = reduceRound(s, { type: 'tab', value: 'cic' });
  const old = restore(JSON.stringify(s));
  assert.equal(old.attemptId, s.attemptId);
  assert.equal(old.dossierTabs[CASES[0].id], 'cic');
  assert.equal(old.drafts[CASES[0].id].amount, '9,001,234.50');
  for (const value of ['income', 'purpose', 'reserves', 'environment'] as const) {
    const updated = reduceRound(old, { type: 'tab', value });
    assert.equal(restore(JSON.stringify(updated)).dossierTabs[CASES[0].id], value);
    assert.deepEqual(updated.drafts, old.drafts);
  }
});

test('source sections preserve authored evidence, including separate reserves and conflicting purpose documents', async () => {
  const { sourceExcerpts } = await import('../src/domain/sourceExcerpts');
  for (const file of CASES) {
    const sections = sourceExcerpts(file);
    for (const paragraphs of Object.values(sections)) {
      assert.ok(paragraphs.length);
      for (const p of paragraphs) assert.ok(file.narrative.some(original => original.includes(p)));
    }
    assert.ok(sections.environment[0].startsWith('Bank sector note:'));
    assert.equal(file.narrative.length >= 6, true);
  }
  assert.ok(sourceExcerpts(CASES[5]).reserves.some(p => p.includes('brother lent him')));
  assert.ok(sourceExcerpts(CASES[7]).purpose.some(p => p.includes('Cầu Giấy')));
});

test('new physical workspace settings and board positions migrate old saves without changing decisions or working', () => {
  let s = reduceRound(newRound(), { type: 'start' });
  s = reduceRound(s, { type: 'draft', patch: { notes: 'Original learner reasoning' } });
  s = reduceRound(s, { type: 'decision', value: 'Approve' });
  const source = `dossier:${CASES[0].id}`;
  s = reduceRound(s, { type: 'board', source });
  const originalDraft = structuredClone(s.drafts);
  s = reduceRound(s, { type: 'board-move', source, x: -50, y: 130 });
  assert.deepEqual(s.boardLayout[source], { x: 0, y: 100 });
  assert.deepEqual(s.drafts, originalDraft);
  assert.equal(reduceRound(s, { type: 'board-move', source: `dossier:${CASES[1].id}`, x: 20, y: 30 }), s);
  assert.equal(reduceRound(s, { type: 'board-move', source, x: NaN, y: 30 }), s);
  assert.equal(reduceRound({ ...s, phase: 'submitted' }, { type: 'board-move', source, x: 10, y: 20 }).boardLayout, s.boardLayout);
  assert.deepEqual(restore(JSON.stringify(s)).boardLayout, s.boardLayout);
  s = reduceRound(s, { type: 'desk-copy', id: 'WH-0005' });
  assert.equal(restore(JSON.stringify(s)).deskCopy, 'WH-0005');
  assert.deepEqual(s.drafts, originalDraft);
  const old = JSON.parse(JSON.stringify(s)); delete old.boardLayout; delete old.settings.sound; delete old.deskCopy;
  const migrated = restore(JSON.stringify(old));
  assert.equal(migrated.attemptId, s.attemptId);
  assert.deepEqual(migrated.drafts, originalDraft);
  assert.deepEqual(migrated.boardLayout, {});
  assert.equal(migrated.settings.sound, true);
  assert.equal(migrated.deskCopy, null);
});

test('room framing preserves the complete overview and bounded close-ups on portrait, desktop and ultrawide', async () => {
  const { roomFrame, targetBounds } = await import('../src/game/roomState');
  const { ROOM_SIZE, ROOM_OBJECTS } = await import('../src/game/roomArt');
  const { directionFor } = await import('../src/game/spatial');
  for (const [w, h] of [[390, 700], [1280, 650], [1920, 1000], [2560, 900]]) {
    for (let d = 0; d < 4; d++) {
      const overview = roomFrame(w, h, d, false);
      assert.ok(overview.x >= -1e-7 && overview.y >= -1e-7);
      assert.ok(overview.x + ROOM_SIZE.width * overview.scale <= w + 1e-7);
      assert.ok(overview.y + ROOM_SIZE.height * overview.scale <= h + 1e-7);
      const close = roomFrame(w, h, d, true);
      assert.ok(close.x <= 1e-7 && close.y <= 1e-7);
      assert.ok(close.x + ROOM_SIZE.width * close.scale >= w - 1e-7);
      assert.ok(close.y + ROOM_SIZE.height * close.scale >= h - 1e-7);
    }
  }
  for (const object of ROOM_OBJECTS) {
    const target = targetBounds(object);
    assert.ok(parseFloat(target.left) >= 0 && parseFloat(target.top) >= 0);
    assert.ok(parseFloat(target.left) + parseFloat(target.width) <= 100);
    assert.ok(parseFloat(target.top) + parseFloat(target.height) <= 100);
  }
  assert.equal(directionFor('warehouse', 0), 1);
  assert.equal(directionFor('board', 0), 2);
  assert.equal(directionFor('worksheet', 2), 0);
  assert.equal(directionFor('office', 3), 3);
});

test('physical work contexts retain the originating applicant, source and carried copy', async () => {
  const { contextOf, pushContext } = await import('../src/game/spatial');
  let s = reduceRound(newRound(), { type: 'start' });
  s = reduceRound(s, { type: 'tab', value: 'income' });
  const folder = contextOf(s, 'WH-0005');
  assert.deepEqual(folder, { view: 'dossier', current: 0, tab: 'income', record: null, copy: 'WH-0005', terminalPage: 'warehouse', notebookPage: 'worksheet' });
  const stack = pushContext([], folder);
  assert.equal(pushContext(stack, folder), stack);
  const terminal = contextOf({ ...s, view: 'warehouse', selectedRecord: 'WH-0005' });
  const extended = pushContext(stack, terminal);
  assert.equal(extended.at(-2), folder);
  assert.equal(extended.at(-1)?.record, 'WH-0005');
  let capped = extended;
  for (let i = 0; i < 20; i++) capped = pushContext(capped, { ...folder, view: i % 2 ? 'warehouse' : 'board' });
  assert.ok(capped.length <= 8);
});
