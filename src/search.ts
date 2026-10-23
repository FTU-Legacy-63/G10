import type { SearchQuery, WarehouseRecord } from './types';
export function normalize(value: string, strict = false): string {
  const lower = value.toLocaleLowerCase('vi').trim().replace(/\s+/g, ' ');
  return strict ? lower.normalize('NFC') : lower.normalize('NFD').replace(/\p{M}/gu, '').replaceAll('đ', 'd');
}
export function oneEdit(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length >= b.length) i++;
    if (a.length <= b.length) j++;
  }
  return edits + Number(i < a.length || j < b.length) <= 1;
}
function hash(text: string): number {
  let h = 2166136261;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}
export function searchError(query: SearchQuery): string | null {
  if (!query.name.trim()) return 'Enter a name to search';
  if (query.age && !/^\d{1,3}(?:\s*-\s*\d{1,3})?$/.test(query.age.trim())) return 'Use an age or range, for example 35 or 30-40';
  const [min, max = min] = query.age.trim().split(/\s*-\s*/).map(Number);
  if (query.age && (min < 0 || max > 120 || min > max)) return 'Enter an age range between 0 and 120';
  return null;
}
export function searchRecords(records: WarehouseRecord[], query: SearchQuery, seed: number): WarehouseRecord[] {
  if (searchError(query)) return [];
  const tokens = normalize(query.name, query.strict).split(' ');
  const [min, max = min] = query.age.trim().split(/\s*-\s*/).map(Number);
  return records.flatMap(record => {
    if (query.age && (record.age < min || record.age > max)) return [];
    if (query.province && record.province !== query.province) return [];
    const names = normalize(record.name, query.strict).split(' ');
    // Match distinct name tokens; one query token cannot consume the same token twice.
    const used = new Set<number>();
    let fuzzy = false;
    for (const token of tokens) {
      let index = names.findIndex((n, i) => !used.has(i) && n === token);
      if (index < 0 && query.fuzzy) { index = names.findIndex((n, i) => !used.has(i) && oneEdit(n, token)); fuzzy = true; }
      if (index < 0) return [];
      used.add(index);
    }
    return [{ record, rank: fuzzy ? 1 : 0, tie: hash(`${seed}:${record.id}`) }];
  }).sort((a, b) => a.rank - b.rank || a.tie - b.tie || a.record.id.localeCompare(b.record.id)).map(r => r.record);
}
