import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { newRound, reduceRound, roundReady } from '../src/application/round';
import { receiptState } from '../src/integration/discoveryFlow';
import { restore } from '../src/infrastructure/persistence';
import manifest from '../design/discovery-refinement-2026-10-19/asset-manifest.json';

test('reception has an explicit first receipt and never infers acceptance from room navigation', () => {
  let state = newRound();
  assert.equal(receiptState(state), 'first');
  for (const room of [1, 2, 3, 0]) {
    state = reduceRound(state, {type:'direction',value:room});
    assert.equal(receiptState(state), 'first');
    assert.equal(state.started, false);
  }
  state = reduceRound(state, {type:'start'});
  assert.equal(receiptState(state), 'received');
  assert.equal(state.reached, 1);
});

test('walking to reception after a complete decision preserves the current frontier through reload', () => {
  let state = reduceRound(newRound(), {type:'start'});
  state = reduceRound(state, {type:'decision',value:'Reduce limit'});
  assert.equal(receiptState(state), 'received', 'missing amount does not enable the next receipt');
  state = reduceRound(state, {type:'draft',patch:{amount:'1,000,000',notes:'Keep this working'}});
  state = reduceRound(state, {type:'direction',value:0});
  state = restore(JSON.stringify(state));
  assert.equal(receiptState(state), 'next');
  assert.equal(state.current, 0);
  assert.equal(state.reached, 1);
  assert.equal(state.drafts['KHCN-01'].notes, 'Keep this working');
  state = reduceRound(state, {type:'continue'}); // Explicit receive in the client room.
  assert.equal(state.reached, 2);
  assert.equal(receiptState(state), 'received');
});

test('reviewing an earlier dossier cannot bypass an incomplete latest application', () => {
  let state = reduceRound(newRound(), {type:'start'});
  state = reduceRound(state, {type:'decision',value:'Reject'});
  state = reduceRound(state, {type:'continue'});
  state = reduceRound(state, {type:'case',index:0});
  assert.equal(receiptState(state), 'received');
  state = reduceRound(state, {type:'case',index:1});
  state = reduceRound(state, {type:'decision',value:'Approve'});
  state = reduceRound(state, {type:'case',index:0});
  assert.equal(receiptState(state), 'next');
  assert.equal(state.current, 0);
  assert.equal(state.reached, 2);
});

test('the eighth received application ends in explicit review, never an automatic submission', () => {
  let state = reduceRound(newRound(), {type:'start'});
  for (let index=0; index<8; index++) {
    state = reduceRound(state, {type:'decision',value:'Reject'});
    assert.equal(receiptState(state), index<7?'next':'received');
    state = reduceRound(state, {type:'continue'});
    assert.equal(state.phase, 'draft');
  }
  assert.equal(state.reached, 8);
  assert.equal(state.view, 'review');
  assert.ok(roundReady(state));
  assert.equal(receiptState({...state,phase:'submitted'}), 'submitted');
});

test('historical discovery plates retain their original bytes even though the restored route no longer mounts them', () => {
  assert.equal(manifest.length, 11);
  assert.equal(new Set(manifest.map(entry=>entry.id)).size,11);
  for (const entry of manifest) {
    const bytes=readFileSync(entry.file);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256,entry.id);
    assert.deepEqual([bytes.readUInt32BE(16),bytes.readUInt32BE(20)],entry.native,entry.id);
    assert.ok(entry.native[0]>=1671 && entry.native[1]===941);
  }
});
