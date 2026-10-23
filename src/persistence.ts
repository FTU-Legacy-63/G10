import { restoreObjects } from '../application/objectActions';
import { CASES, WAREHOUSE } from '../content';
import { COVENANT_IDS, emptyDraft, newRound, roundReady, VIEWS } from '../application/round';
import { DECISIONS, DOSSIER_TABS, WORKSHEET_FIELDS } from '../domain/types';
import type { Draft, RoundState, View } from '../domain/types';

export const SAVE_KEY = 'the-credit-desk:rebuild:v1';
export interface StoragePort { getItem(key: string): string | null; setItem(key: string, value: string): void }
const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const text = (v: unknown, max = 20000): v is string => typeof v === 'string' && v.length <= max;
const index = (v: unknown, min: number, max: number): v is number => Number.isInteger(v) && Number(v) >= min && Number(v) <= max;
const recordIds = new Set(WAREHOUSE.map(r => r.id));

export function restore(raw: string): RoundState {
  const data: unknown = JSON.parse(raw);
  if (!isObject(data) || data.schema !== 1 || data.dataset !== 'extended-8-g1-v1' || data.policy !== 'g1-v1-open-finance') throw new Error('This save belongs to a different content or policy version.');
  if (!text(data.attemptId, 100) || !index(data.revision, 0, Number.MAX_SAFE_INTEGER) || typeof data.started !== 'boolean' || !['draft', 'submitted'].includes(String(data.phase)) || !index(data.reached, 1, 8) || !index(data.current, 0, data.reached - 1) || !index(data.direction, 0, 3) || !index(data.seed, 0, 2 ** 32 - 1)) throw new Error('The saved round has an invalid state.');
  if (!isObject(data.drafts) || !isObject(data.query) || !isObject(data.settings)) throw new Error('The saved working cannot be read.');
  const drafts: Record<string, Draft> = {};
  for (const [i, file] of CASES.entries()) {
    const d = data.drafts[file.id];
    if (!isObject(d) || !(d.decision === null || DECISIONS.includes(d.decision as never)) || !text(d.amount, 100) || !text(d.notes) || typeof d.cicOpened !== 'boolean' || !(d.pin === null || recordIds.has(String(d.pin))) || !Array.isArray(d.covenants) || new Set(d.covenants).size !== d.covenants.length || !d.covenants.every(c => COVENANT_IDS.includes(c)) || !isObject(d.worksheet)) throw new Error('A saved dossier is invalid.');
    const worksheet = { ...emptyDraft().worksheet };
    for (const f of WORKSHEET_FIELDS) {
      const value = d.worksheet[f.id];
      if (!text(value, 100)) throw new Error('A saved worksheet is invalid.');
      if ('choices' in f && value && !(f.choices as readonly string[]).includes(value)) throw new Error('A saved worksheet choice is invalid.');
      if ('secured' in f && file.product === 'Unsecured' && value) throw new Error('Unexpected collateral working.');
      worksheet[f.id] = value;
    }
    if (file.product === 'Unsecured' && d.covenants.includes('reappraisal')) throw new Error('Invalid covenant.');
    if (i >= data.reached && (d.decision !== null || d.amount || d.notes || d.pin !== null || d.cicOpened || d.covenants.length || Object.values(worksheet).some(Boolean))) throw new Error('A future dossier contains unexpected working.');
    drafts[file.id] = { decision: d.decision as Draft['decision'], amount: d.amount, notes: d.notes, pin: d.pin as string | null, cicOpened: d.cicOpened, covenants: d.covenants, worksheet };
    if (i < data.reached - 1 && !d.decision) throw new Error('The reached order is invalid.');
  }
  const q = data.query;
  if (!text(q.name, 100) || !text(q.age, 30) || !text(q.province, 100) || typeof q.strict !== 'boolean' || typeof q.fuzzy !== 'boolean') throw new Error('Invalid saved search.');
  const settings = data.settings;
  if (![100, 115, 130].includes(Number(settings.textSize)) || typeof settings.reducedMotion !== 'boolean') throw new Error('Invalid saved settings.');
  const base = newRound();
  const dossierTabs = { ...base.dossierTabs };
  if (isObject(data.dossierTabs)) for (const file of CASES) {
    const value = data.dossierTabs[file.id];
    if (DOSSIER_TABS.filter(tab => tab !== 'collateral' || file.product === 'Secured').includes(value as never)) dossierTabs[file.id] = value as typeof dossierTabs[string];
  }
  const reached = data.reached;
  const allowedSources = new Set([...CASES.slice(0, reached).flatMap(c => [`dossier:${c.id}`, ...(drafts[c.id].cicOpened ? [`cic:${c.id}`] : [])]), ...WAREHOUSE.map(r => `record:${r.id}`)]);
  if (!Array.isArray(data.boardSources) || data.boardSources.length > 2 || !data.boardSources.every(s => typeof s === 'string' && allowedSources.has(s))) throw new Error('Invalid saved comparison.');
  const scroll: Record<string, number> = {};
  if (isObject(data.scroll)) for (const [key, value] of Object.entries(data.scroll)) if (key.length < 150 && typeof value === 'number' && Number.isFinite(value) && value >= 0) scroll[key] = value;
  const boardLayout: RoundState['boardLayout'] = {};
  if (isObject(data.boardLayout)) for (const [source, value] of Object.entries(data.boardLayout)) {
    if (allowedSources.has(source) && isObject(value) && typeof value.x === 'number' && typeof value.y === 'number' && Number.isFinite(value.x) && Number.isFinite(value.y)) boardLayout[source] = { x: Math.max(0, Math.min(100, value.x)), y: Math.max(0, Math.min(100, value.y)) };
  }
  const result: RoundState = { ...base, attemptId: data.attemptId, revision: data.revision, started: data.started,
    phase: data.phase as RoundState['phase'], reached, current: data.current, direction: data.direction, seed: data.seed, drafts,
    view: VIEWS.includes(data.view as View) ? data.view as View : 'office',
    query: { name: q.name, age: q.age, province: q.province, strict: q.strict, fuzzy: q.fuzzy },
    selectedRecord: recordIds.has(String(data.selectedRecord)) ? String(data.selectedRecord) : null,
    deskCopy: recordIds.has(String(data.deskCopy)) ? String(data.deskCopy) : null,
    boardSources: data.boardSources, boardLayout, dossierTabs, scroll, snapshot: null,
    settings: { textSize: Number(settings.textSize), reducedMotion: settings.reducedMotion, sound: typeof settings.sound === 'boolean' ? settings.sound : true } };
  result.objects = restoreObjects(data.objects, result);
  // Saved derived values and snapshots are never trusted. Rebuild the report after restore.
  if (result.phase === 'submitted' && !roundReady(result)) throw new Error('The submitted save is incomplete.');
  if (result.phase === 'draft' && result.view === 'summary') result.view = 'review';
  return result;
}
export function persist(storage: StoragePort, state: RoundState, saveKey: string = SAVE_KEY): string {
  const raw = JSON.stringify({ ...state, snapshot: null });
  storage.setItem(saveKey, raw);
  return raw;
}
