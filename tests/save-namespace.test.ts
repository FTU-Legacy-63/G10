import test from 'node:test';
import assert from 'node:assert/strict';
import { newRound, reduceRound } from '../src/application/round';
import { persist, restore, SAVE_KEY } from '../src/infrastructure/persistence';
import type { StoragePort } from '../src/infrastructure/persistence';

test('a concept namespace preserves the original attempt byte-for-byte through edits and restart', () => {
  const values = new Map<string, string>();
  const storage: StoragePort = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value); },
  };
  const original = reduceRound(newRound(), { type: 'start' });
  const originalRaw = persist(storage, original);
  assert.equal(SAVE_KEY, 'the-credit-desk:rebuild:v1');
  assert.equal(storage.getItem(SAVE_KEY), originalRaw, 'Existing callers still use the original namespace');

  const conceptKey = 'the-credit-desk:concept-study:v1';
  let concept = reduceRound(newRound(), { type: 'start' });
  concept = reduceRound(concept, { type: 'draft', patch: { notes: 'Prototype-only working' } });
  const conceptRaw = persist(storage, concept, conceptKey);
  const resumed = restore(storage.getItem(conceptKey)!);
  assert.equal(resumed.attemptId, concept.attemptId);
  assert.equal(resumed.drafts['KHCN-01'].notes, 'Prototype-only working');
  assert.equal(storage.getItem(SAVE_KEY), originalRaw);

  const restarted = newRound();
  persist(storage, restarted, conceptKey);
  assert.notEqual(storage.getItem(conceptKey), conceptRaw);
  assert.equal(restore(storage.getItem(conceptKey)!).attemptId, restarted.attemptId);
  assert.equal(storage.getItem(SAVE_KEY), originalRaw, 'Restarting the concept cannot replace the original attempt');
  assert.deepEqual([...values.keys()].sort(), [SAVE_KEY, conceptKey].sort());
});
