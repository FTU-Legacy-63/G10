import { CASES, WAREHOUSE } from '../content';
import type { ObjectWorkspace, PhysicalCopy, RoundState } from '../domain/types';

/** Physical actions have one reducer; scene hit areas and HTML controls send the same action. */
export type ObjectAction =
  | { kind: 'take-copy'; recordId: string }
  | { kind: 'transfer-copy'; copyId: string; target: 'desk' | 'board'; slot?: 0 | 1 }
  | { kind: 'select-copy'; copyId: string | null }
  | { kind: 'use-copy'; target: 'desk' | 'board'; slot?: 0 | 1 }
  | { kind: 'pick-up'; copyId: string }
  | { kind: 'return-copy'; copyId: string }
  | { kind: 'folder'; open: boolean }
  | { kind: 'terminal-page'; page: 'warehouse' | 'cic' }
  | { kind: 'notebook-page'; page: 'worksheet' | 'notes' };

const recordIds = new Set(WAREHOUSE.map(record => record.id));
export const copyKey = (caseId: string, recordId: string) => `${caseId}/${recordId}`;
export function emptyObjects(): ObjectWorkspace {
  return { copies: [], selectedCopy: null, terminalPage: 'warehouse', notebookPage: 'worksheet', folderOpen: Object.fromEntries(CASES.map(file => [file.id, false])) };
}
export function currentCopies(state: RoundState): PhysicalCopy[] {
  return state.objects.copies.filter(copy => copy.caseId === CASES[state.current].id);
}
export function selectedCopy(state: RoundState): PhysicalCopy | null {
  return currentCopies(state).find(copy => copy.id === state.objects.selectedCopy) ?? null;
}
const replaceCopy = (objects: ObjectWorkspace, value: PhysicalCopy): ObjectWorkspace => ({
  ...objects, copies: objects.copies.some(copy => copy.id === value.id) ? objects.copies.map(copy => copy.id === value.id ? value : copy) : [...objects.copies, value],
});
const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);

/** An absent field is a legacy save. Import only material the learner explicitly collected. */
export function restoreObjects(value: unknown, state: Pick<RoundState, 'current' | 'reached' | 'drafts' | 'boardSources' | 'deskCopy' | 'view'>): ObjectWorkspace {
  let objects = emptyObjects();
  const reachedIds = new Set(CASES.slice(0, state.reached).map(file => file.id));
  if (value !== undefined) {
    if (!isObject(value) || !Array.isArray(value.copies) || value.copies.length > state.reached * WAREHOUSE.length || !isObject(value.folderOpen)) throw new Error('The saved office objects are invalid.');
    const ids = new Set<string>();
    const boardRecords = new Set<string>();
    for (const entry of value.copies) {
      if (!isObject(entry) || typeof entry.caseId !== 'string' || !reachedIds.has(entry.caseId) || typeof entry.recordId !== 'string' || !recordIds.has(entry.recordId) || entry.id !== copyKey(entry.caseId, entry.recordId) || !['inventory', 'desk', 'board'].includes(String(entry.location)) || ids.has(String(entry.id))) throw new Error('A saved copy is invalid.');
      if (entry.location === 'board' && boardRecords.has(entry.recordId)) throw new Error('A saved copy is pinned more than once.');
      if (entry.location === 'board') boardRecords.add(entry.recordId);
      ids.add(String(entry.id));
      objects.copies.push({ id: String(entry.id), caseId: entry.caseId, recordId: entry.recordId, location: entry.location as PhysicalCopy['location'] });
    }
    for (const file of CASES.slice(0, state.reached)) {
      const open = value.folderOpen[file.id];
      if (typeof open === 'boolean') objects.folderOpen[file.id] = open;
    }
    if (value.terminalPage !== undefined && !['warehouse', 'cic'].includes(String(value.terminalPage))) throw new Error('The saved terminal page is invalid.');
    if (value.notebookPage !== undefined && !['worksheet', 'notes'].includes(String(value.notebookPage))) throw new Error('The saved notebook page is invalid.');
    objects.terminalPage = value.terminalPage === 'cic' ? 'cic' : 'warehouse';
    objects.notebookPage = value.notebookPage === 'notes' ? 'notes' : 'worksheet';
    // A selected item belongs to the currently open applicant, never a future or different case.
    objects.selectedCopy = typeof value.selectedCopy === 'string' && objects.copies.some(copy => copy.id === value.selectedCopy && copy.caseId === CASES[state.current].id && copy.location === 'inventory') ? value.selectedCopy : null;
  } else {
    // An already-open legacy reader stays open after the additive migration.
    if (state.view === 'dossier' || state.view === 'worksheet') objects.folderOpen[CASES[state.current].id] = true;
    for (const file of CASES.slice(0, state.reached)) {
      const recordId = state.drafts[file.id].pin;
      if (recordId && recordIds.has(recordId)) objects = replaceCopy(objects, { id: copyKey(file.id, recordId), caseId: file.id, recordId, location: 'inventory' });
    }
  }
  // Existing boardSources and the open reader remain canonical for backwards compatibility.
  for (const source of state.boardSources) {
    const recordId = source.startsWith('record:') ? source.slice(7) : null;
    if (!recordId || !recordIds.has(recordId)) continue;
    const existing = objects.copies.find(copy => copy.recordId === recordId && copy.location === 'board') ?? objects.copies.find(copy => copy.recordId === recordId);
    const caseId = existing?.caseId ?? CASES[state.current].id;
    objects = replaceCopy(objects, { id: copyKey(caseId, recordId), caseId, recordId, location: 'board' });
  }
  if (value === undefined && state.deskCopy && recordIds.has(state.deskCopy)) {
    const caseId = CASES[state.current].id;
    const id = copyKey(caseId, state.deskCopy);
    const existing = objects.copies.find(copy => copy.id === id);
    objects = replaceCopy(objects, { id, caseId, recordId: state.deskCopy, location: state.boardSources.includes(`record:${state.deskCopy}`) ? 'board' : existing?.location === 'board' ? 'board' : 'desk' });
  }
  // Missing/corrupt optional placement cannot manufacture a pin or lose the actual evidence.
  objects.copies = objects.copies.map(copy => copy.location === 'board' && !state.boardSources.includes(`record:${copy.recordId}`) ? { ...copy, location: 'inventory' } : copy);
  if (!objects.copies.some(copy => copy.id === objects.selectedCopy && copy.location === 'inventory')) objects.selectedCopy = null;
  return objects;
}

export function copyTargetError(state: RoundState, target: 'desk' | 'board', slot?: 0 | 1): string | null {
  if (state.phase === 'submitted') return 'This shift is submitted. Copies can be read but cannot be moved.';
  const copy = selectedCopy(state);
  if (!copy || copy.location !== 'inventory') return 'Select a carried copy first.';
  if (target === 'board' && state.boardSources.length >= 2 && !state.boardSources.includes(`record:${copy.recordId}`) && slot === undefined) return 'Both board spaces are occupied. Choose which source to replace.';
  return null;
}
export const canUseCopy = (state: RoundState, target: 'desk' | 'board', slot?: 0 | 1): boolean => copyTargetError(state, target, slot) === null;

export function reduceObjectAction(state: RoundState, action: ObjectAction): RoundState {
  const caseId = CASES[state.current].id;
  if (action.kind === 'transfer-copy') return transferCopy(state, action.copyId, action.target, action.slot);
  if (action.kind === 'terminal-page') {
    if (!['warehouse', 'cic'].includes(action.page) || state.objects.terminalPage === action.page) return state;
    return { ...state, objects: { ...state.objects, terminalPage: action.page } };
  }
  if (action.kind === 'notebook-page') {
    if (!['worksheet', 'notes'].includes(action.page) || state.objects.notebookPage === action.page) return state;
    return { ...state, objects: { ...state.objects, notebookPage: action.page } };
  }
  if (action.kind === 'folder') {
    if (state.objects.folderOpen[caseId] === action.open) return state;
    return { ...state, objects: { ...state.objects, folderOpen: { ...state.objects.folderOpen, [caseId]: action.open } } };
  }
  if (action.kind === 'select-copy') {
    if (action.copyId === state.objects.selectedCopy) return state;
    const copy = currentCopies(state).find(item => item.id === action.copyId && item.location === 'inventory');
    if (action.copyId !== null && !copy) return state;
    return { ...state, objects: { ...state.objects, selectedCopy: action.copyId } };
  }
  if (state.phase === 'submitted') return state;
  if (action.kind === 'take-copy') {
    // Reading a record is required, matching the explicit take-copy button on that record.
    if (!recordIds.has(action.recordId) || state.selectedRecord !== action.recordId) return state;
    const id = copyKey(caseId, action.recordId);
    const existing = currentCopies(state).find(copy => copy.id === id);
    if (existing) return existing.location === 'inventory' ? reduceObjectAction(state, { kind: 'select-copy', copyId: id }) : state;
    const objects = replaceCopy(state.objects, { id, caseId, recordId: action.recordId, location: 'inventory' });
    return { ...state, objects: { ...objects, selectedCopy: id } };
  }
  if (action.kind === 'use-copy') {
    const copy = selectedCopy(state);
    if (!copy || copy.location !== 'inventory') return state;
    if (action.target === 'desk') {
      const objects = replaceCopy(state.objects, { ...copy, location: 'desk' });
      return { ...state, deskCopy: copy.recordId, objects: { ...objects, selectedCopy: null } };
    }
    const source = `record:${copy.recordId}`;
    const existingSlot = state.boardSources.indexOf(source);
    const slot = existingSlot >= 0 ? existingSlot : action.slot ?? (state.boardSources.length < 2 ? state.boardSources.length : -1);
    if (slot !== 0 && slot !== 1) return state;
    const sources = [...state.boardSources]; sources[slot] = source;
    const oldSource = state.boardSources[slot];
    let objects: ObjectWorkspace = { ...state.objects, copies: state.objects.copies.map(item => item.location === 'board' && (`record:${item.recordId}` === oldSource || item.recordId === copy.recordId) ? { ...item, location: 'inventory' } : item) };
    objects = replaceCopy(objects, { ...copy, location: 'board' });
    return { ...state, boardSources: sources.filter(Boolean), objects: { ...objects, selectedCopy: null }, deskCopy: state.deskCopy === copy.recordId ? null : state.deskCopy };
  }
  const copy = currentCopies(state).find(item => item.id === action.copyId);
  if (!copy) return state;
  if (action.kind === 'pick-up') {
    if (copy.location === 'inventory' && state.objects.selectedCopy === copy.id) return state;
    const objects = replaceCopy(state.objects, { ...copy, location: 'inventory' });
    return { ...state, boardSources: copy.location === 'board' ? state.boardSources.filter(source => source !== `record:${copy.recordId}`) : state.boardSources, deskCopy: state.deskCopy === copy.recordId ? null : state.deskCopy, objects: { ...objects, selectedCopy: copy.id } };
  }
  return { ...state, boardSources: copy.location === 'board' ? state.boardSources.filter(source => source !== `record:${copy.recordId}`) : state.boardSources, deskCopy: state.deskCopy === copy.recordId ? null : state.deskCopy, objects: { ...state.objects, copies: state.objects.copies.filter(item => item.id !== copy.id), selectedCopy: state.objects.selectedCopy === copy.id ? null : state.objects.selectedCopy } };
}

/** Keep older UI source/reader actions consistent while they transition to physical actions. */
export function reconcileLegacyObjects(previous: RoundState, next: RoundState, actionType: string): RoundState {
  if (next.phase === 'submitted') {
    return actionType === 'case' && next.current !== previous.current && next.objects.selectedCopy !== null
      ? { ...next, objects: { ...next.objects, selectedCopy: null } } : next;
  }
  let objects = next.objects;
  const caseId = CASES[next.current].id;
  if (actionType === 'case' || actionType === 'continue') objects = { ...objects, selectedCopy: null };
  if (actionType === 'desk-copy' && next.deskCopy) {
    const id = copyKey(caseId, next.deskCopy);
    const existing = objects.copies.find(copy => copy.id === id);
    if (!existing) objects = replaceCopy(objects, { id, caseId, recordId: next.deskCopy, location: next.boardSources.includes(`record:${next.deskCopy}`) ? 'board' : 'desk' });
  }
  if (actionType === 'board' || actionType === 'board-slot') {
    objects = { ...objects, copies: objects.copies.map(copy => copy.location === 'board' && !next.boardSources.includes(`record:${copy.recordId}`) ? { ...copy, location: 'inventory' } : copy) };
    for (const source of next.boardSources) {
      if (!source.startsWith('record:')) continue;
      const recordId = source.slice(7);
      if (!recordIds.has(recordId) || objects.copies.some(copy => copy.recordId === recordId && copy.location === 'board')) continue;
      const existing = objects.copies.find(copy => copy.recordId === recordId && copy.caseId === caseId) ?? objects.copies.find(copy => copy.recordId === recordId);
      objects = replaceCopy(objects, { id: existing?.id ?? copyKey(caseId, recordId), caseId: existing?.caseId ?? caseId, recordId, location: 'board' });
    }
  }
  if (objects.selectedCopy && !objects.copies.some(copy => copy.id === objects.selectedCopy && copy.caseId === caseId && copy.location === 'inventory')) objects = { ...objects, selectedCopy: null };
  return objects === next.objects ? next : { ...next, objects };
}


/** Validate the whole pickup/select/use operation before any placement can change. */
export function transferCopy(state: RoundState, copyId: string, target: 'desk' | 'board', slot?: 0 | 1): RoundState {
  if (state.phase === 'submitted') return state;
  const copy = currentCopies(state).find(item => item.id === copyId);
  if (!copy || slot !== undefined && slot !== 0 && slot !== 1) return state;
  if (target === 'board' && state.boardSources.length >= 2 && !state.boardSources.includes(`record:${copy.recordId}`) && slot === undefined) return state;
  if (copy.location === 'board' && target === 'board' && state.boardSources.includes(`record:${copy.recordId}`)) return state;
  if (copy.location === 'desk' && target === 'desk') return state.deskCopy === copy.recordId ? state : { ...state, deskCopy: copy.recordId };
  const ready = reduceObjectAction(state, copy.location === 'inventory'
    ? { kind: 'select-copy', copyId }
    : { kind: 'pick-up', copyId });
  const next = reduceObjectAction(ready, { kind: 'use-copy', target, slot });
  return next === ready ? state : next;
}
