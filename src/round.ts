import { CASES, DATASET, WAREHOUSE } from '../content';
import { assessReference, parseNumber, validateDecision, withinTolerance } from '../domain/finance';
import { emptyObjects, reconcileLegacyObjects, reduceObjectAction } from './objectActions';
import type { ObjectAction } from './objectActions';
import { COVENANTS, DECISIONS, WORKSHEET_FIELDS } from '../domain/types';
import type { Draft, RoundState, Snapshot, View, WorksheetField, Decision, Covenant } from '../domain/types';

export function emptyDraft(): Draft {
  return { decision: null, amount: '', covenants: [], worksheet: Object.fromEntries(WORKSHEET_FIELDS.map(f => [f.id, ''])) as Record<WorksheetField, string>, pin: null, notes: '', cicOpened: false };
}
export function newRound(): RoundState {
  return { schema: 1, dataset: DATASET, policy: 'g1-v1-open-finance', attemptId: crypto.randomUUID(), revision: 0,
    started: false, phase: 'draft', reached: 1, current: 0, direction: 0, view: 'office',
    drafts: Object.fromEntries(CASES.map(c => [c.id, emptyDraft()])), seed: crypto.getRandomValues(new Uint32Array(1))[0],
    query: { name: '', age: '', province: '', strict: false, fuzzy: false }, selectedRecord: null, boardSources: [], deskCopy: null,
    dossierTabs: Object.fromEntries(CASES.map(c => [c.id, 'application' as const])), scroll: {}, snapshot: null,
    settings: { textSize: 100, reducedMotion: false, sound: true }, boardLayout: {}, objects: emptyObjects() };
}
export type Action =
  | { type: 'object'; action: ObjectAction }
  | { type: 'start' } | { type: 'view'; view: View } | { type: 'direction'; value: number }
  | { type: 'case'; index: number } | { type: 'continue' }
  | { type: 'decision'; value: Decision }
  | { type: 'draft'; patch: Partial<Pick<Draft, 'amount' | 'covenants' | 'pin' | 'notes' | 'cicOpened'>> }
  | { type: 'worksheet'; field: WorksheetField; value: string }
  | { type: 'query'; value: RoundState['query'] } | { type: 'record'; id: string | null }
  | { type: 'desk-copy'; id: string | null }
  | { type: 'tab'; value: RoundState['dossierTabs'][string] }
  | { type: 'board'; source: string } | { type: 'board-slot'; slot: number; source: string } | { type: 'board-move'; source: string; x: number; y: number } | { type: 'scroll'; key: string; top: number }
  | { type: 'settings'; value: Partial<RoundState['settings']> };
export function roundReady(state: RoundState): boolean {
  return state.started && state.reached === CASES.length && CASES.every(c => !validateDecision(state.drafts[c.id], c));
}
export function reduceRound(state: RoundState, action: Action): RoundState {
  if (action.type === 'object') {
    const next = reduceObjectAction(state, action.action);
    return next === state ? state : { ...next, revision: state.revision + 1 };
  }
  const file = CASES[state.current];
  const draft = state.drafts[file.id];
  const writable = ['decision', 'draft', 'worksheet', 'continue', 'board', 'board-slot', 'board-move'];
  if (state.phase === 'submitted' && writable.includes(action.type)) return state;
  let next = { ...state };
  const setDraft = (value: Draft) => { next.drafts = { ...state.drafts, [file.id]: value }; };
  switch (action.type) {
    case 'start': if (state.started) return state; next.started = true; next.view = 'dossier'; break;
    case 'view': if (action.view === 'summary' && state.phase !== 'submitted') return state; next.view = action.view; break;
    case 'direction': next.direction = ((action.value % 4) + 4) % 4; break;
    case 'case': if (!Number.isInteger(action.index) || action.index < 0 || action.index >= state.reached) return state; next.current = action.index; next.view = 'dossier'; break;
    case 'continue':
      if (validateDecision(draft, file)) return state;
      next.deskCopy = null;
      if (state.current === state.reached - 1 && state.reached < CASES.length) next.reached++;
      if (state.current < CASES.length - 1) { next.current++; next.view = 'dossier'; } else next.view = 'review';
      break;
    case 'decision':
      if (draft.decision === action.value || !DECISIONS.includes(action.value)) return state;
      setDraft({ ...draft, decision: action.value, amount: '', covenants: [] }); break;
    case 'draft': setDraft({ ...draft, ...action.patch }); break;
    case 'worksheet': setDraft({ ...draft, worksheet: { ...draft.worksheet, [action.field]: action.value } }); break;
    case 'query': next.query = action.value; break;
    case 'record': next.selectedRecord = action.id; break;
    case 'desk-copy':
      if (action.id === state.deskCopy || action.id !== null && !WAREHOUSE.some(record => record.id === action.id)) return state;
      next.deskCopy = action.id; break;
    case 'tab': next.dossierTabs = { ...state.dossierTabs, [file.id]: action.value }; break;
    case 'board': {
      const [kind, id] = action.source.split(':');
      const reached = CASES.slice(0, state.reached).find(c => c.id === id);
      const readable = kind === 'record' ? WAREHOUSE.some(r => r.id === id) && (state.selectedRecord === id || Object.values(state.drafts).some(d => d.pin === id) || state.objects.copies.some(copy => copy.recordId === id) || state.boardSources.includes(action.source)) : !!reached && (kind === 'dossier' || kind === 'cic' && state.drafts[reached.id].cicOpened);
      if (!readable) return state;
      next.boardSources = state.boardSources.includes(action.source) ? state.boardSources.filter(s => s !== action.source) : [...state.boardSources.slice(-1), action.source]; break;
    }
    case 'board-slot': {
      if (![0, 1].includes(action.slot) || state.boardSources.some((s, i) => i !== action.slot && s === action.source)) return state;
      const [kind, id] = action.source.split(':');
      const c = CASES.slice(0, state.reached).find(c => c.id === id);
      const readable = kind === 'record' ? WAREHOUSE.some(r => r.id === id) && (state.selectedRecord === id || Object.values(state.drafts).some(d => d.pin === id) || state.objects.copies.some(copy => copy.recordId === id) || state.boardSources.includes(action.source)) : !!c && (kind === 'dossier' || kind === 'cic' && state.drafts[c.id].cicOpened);
      if (action.source && !readable) return state;
      const sources = [...state.boardSources]; sources[action.slot] = action.source;
      next.boardSources = sources.filter(Boolean); break;
    }
    case 'scroll': next.scroll = { ...state.scroll, [action.key]: action.top }; break;
    case 'board-move':
      if (!state.boardSources.includes(action.source) || !Number.isFinite(action.x) || !Number.isFinite(action.y)) return state;
      next.boardLayout = { ...state.boardLayout, [action.source]: { x: Math.max(0, Math.min(100, action.x)), y: Math.max(0, Math.min(100, action.y)) } }; break;
    case 'settings': next.settings = { ...state.settings, ...action.value }; break;
  }
  next = reconcileLegacyObjects(state, next, action.type);
  next.revision++;
  return next;
}
export async function buildSnapshot(state: RoundState): Promise<Snapshot> {
  if (!roundReady(state)) throw new Error('Complete all dossiers before submitting');
  const { default: cards } = await import('../content/author-cards.json');
  return { reports: CASES.map((file, index) => {
    const draft = state.drafts[file.id];
    const reference = assessReference(file);
    let numericComparison = null;
    if (!reference.reviewIssue && draft.decision === reference.decision) {
      const expected = draft.decision === 'Reduce limit' ? reference.maxInstallment : draft.decision === 'Require more collateral' ? reference.additional : null;
      if (expected !== null) numericComparison = withinTolerance(parseNumber(draft.amount)!, expected) ? 'Within ±5% tolerance' : 'Outside ±5% tolerance';
    }
    return { reference, categoryMatches: reference.reviewIssue ? null : draft.decision === reference.decision,
      numericComparison, consequence: reference.reviewIssue ? [] : cards[index].cards[draft.decision! as keyof typeof cards[number]['cards']] };
  }) };
}

export const VIEWS: View[] = ['office', 'dossier', 'warehouse', 'worksheet', 'board', 'review', 'help', 'summary'];
export const COVENANT_IDS = COVENANTS.map(c => c.id) as Covenant[];
