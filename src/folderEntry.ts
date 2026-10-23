import { CASES } from '../content';
import type { RoundState } from '../domain/types';

/** An already-open folder is a successful read intent, not a failed state mutation. */
export function enterFolder(state: RoundState, unavailable: boolean, open: () => boolean): boolean {
  if (unavailable) return false;
  return state.objects.folderOpen[CASES[state.current].id] || open();
}
