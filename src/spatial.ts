import type { RoundState, View, DossierTab } from '../domain/types';
import { CASES } from '../content';

export type Station = 'desk' | 'terminal' | 'board' | 'shelf';
export const STATIONS: Record<Exclude<View, 'office'>, Station> = {
  dossier: 'desk', worksheet: 'desk', review: 'shelf', summary: 'shelf', warehouse: 'terminal', board: 'board', help: 'shelf',
};
export const STATION_DIRECTION: Record<Station, number> = { desk: 0, terminal: 1, board: 2, shelf: 3 };
export const STATION_LABEL: Record<Station, string> = { desk: 'Your desk', terminal: 'Research terminal', board: 'Evidence board', shelf: 'Reference shelf' };
export const VIEW_LABEL: Record<View, string> = { office: 'Office', dossier: 'Application folder', worksheet: 'Assessment notebook', warehouse: 'Warehouse terminal', board: 'Evidence board', review: 'Round ledger', help: 'Credit rulebook', summary: 'Final report' };
export interface WorkContext { view: View; current: number; tab: DossierTab; record: string | null; copy: string | null; terminalPage: RoundState['objects']['terminalPage']; notebookPage: RoundState['objects']['notebookPage'] }
export function contextOf(state: RoundState, copy: string | null = null): WorkContext {
  const id = CASES[state.current].id;
  return { view: state.view, current: state.current, tab: state.dossierTabs[id], record: state.selectedRecord, copy, terminalPage: state.objects.terminalPage, notebookPage: state.objects.notebookPage };
}
export function pushContext(stack: WorkContext[], context: WorkContext): WorkContext[] {
  const last = stack.at(-1);
  return last?.view === context.view && last.current === context.current ? stack : [...stack.slice(-7), context];
}
export function directionFor(view: View, fallback: number) {
  return view === 'office' ? fallback : STATION_DIRECTION[STATIONS[view]];
}
