import { CASES } from '../content';
import { validateDecision } from '../domain/finance';
import type { RoundState } from '../domain/types';

/** Receipt belongs to the client room. Reviewing old files never changes this frontier. */
export function receiptState(state: RoundState): 'first' | 'next' | 'received' | 'submitted' {
  if (state.phase === 'submitted') return 'submitted';
  if (!state.started) return 'first';
  const tail = CASES[state.reached - 1];
  if (state.reached < CASES.length && !validateDecision(state.drafts[tail.id], tail)) return 'next';
  return 'received';
}
export const SERVICE_LINES = [
  'Hello. I’m here to submit my application.',
  'Here is my application folder.',
  'Thank you. I’ll wait while you review it.',
] as const;
// Service acknowledgements only; financial testimony and evidence remain in the dossier.
