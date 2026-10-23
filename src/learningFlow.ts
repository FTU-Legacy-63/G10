import { CASES } from '../content';
import { validateDecision } from '../domain/finance';
import type { RoundState } from '../domain/types';

/** Suggested process, never a completion gate or a correctness signal. */
export function firstCaseStep(state: RoundState): string | undefined {
  if (state.phase === 'submitted' || state.current !== 0 || state.reached !== 1) return;
  const file = CASES[0], draft = state.drafts[file.id];
  if (!state.started) return 'Receive the folder from the small cabinet beside the client.';
  if (!state.objects.folderOpen[file.id]) return 'At your desk, open the application folder.';
  if (draft.decision) return validateDecision(draft, file)
    ? 'Complete the required input in Your decision. You can still revisit your sources.'
    : 'Decision recorded. Revisit your sources if needed, then save and meet the next client.';
  if (!draft.cicOpened) return 'Read the tabs. Put down the folder; the computer in the next room holds Warehouse and CIC.';
  return 'Use the notebook if helpful, consult the public rules and record Your decision. Your choice stays editable until Submit.';
}

export function firstRoomCue(state: RoundState, room: number, guideRead: boolean): string | undefined {
  if (!firstCaseStep(state)) return;
  if (room === 0 && !state.started) return 'reception-folder';
  if (!state.started) return;
  if (room === 1 && !state.objects.folderOpen[CASES[0].id]) return 'current-folder';
  if (room === 2 && !state.drafts[CASES[0].id].cicOpened) return 'terminal';
  if (room === 3 && !guideRead && !state.drafts[CASES[0].id].decision) return 'rulebook';
}
