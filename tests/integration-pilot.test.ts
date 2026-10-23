import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { newRound, reduceRound } from '../src/application/round';
import { persist, restore, SAVE_KEY } from '../src/infrastructure/persistence';
import { PILOT_SAVE_KEY, PILOT_PREFS_KEY, PILOT_OWNER_KEY, parsePreferences, resumeScreen } from '../src/integration/profile';
import manifest from '../design/integration-pilot/asset-manifest.v1.json';
import approved from '../public/assets/integration-pilot/approved/provenance.json';

test('pilot progress, preferences and writer ownership use separate namespaces', () => {
  assert.equal(new Set([SAVE_KEY, 'the-credit-desk:concept-study:v1', PILOT_SAVE_KEY, PILOT_PREFS_KEY, PILOT_OWNER_KEY]).size, 5);
  const values = new Map([[SAVE_KEY, 'legacy raw bytes'], ['the-credit-desk:concept-study:v1', 'concept raw bytes']]);
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
  let state = reduceRound(newRound(), { type: 'start' });
  state = reduceRound(state, { type: 'decision', value: 'Reject' });
  persist(storage, state, PILOT_SAVE_KEY); persist(storage, newRound(), PILOT_SAVE_KEY);
  assert.equal(values.get(SAVE_KEY), 'legacy raw bytes');
  assert.equal(values.get('the-credit-desk:concept-study:v1'), 'concept raw bytes');
});

test('preferences reject partial, malformed and unsupported settings without becoming game state', () => {
  for (const raw of [null, '{', '{}', '{"textSize":999,"reducedMotion":true,"sound":false}', '{"textSize":130,"reducedMotion":true}']) {
    assert.deepEqual(parsePreferences(raw), { textSize: 100, reducedMotion: false, sound: true });
  }
  assert.deepEqual(parsePreferences('{"textSize":130,"reducedMotion":true,"sound":false,"ignored":"x"}'), { textSize: 130, reducedMotion: true, sound: false });
});

test('every title entry lands at R02 without mutating the saved attempt or its previous context', () => {
  let state = newRound();
  const assertLanding = () => {
    const raw = JSON.stringify(state);
    assert.deepEqual(resumeScreen(state), { screen: 'room', room: 1 });
    assert.equal(JSON.stringify(state), raw);
  };
  assertLanding();
  state = reduceRound(state, { type: 'start' });
  state = reduceRound(state, { type: 'draft', patch: { notes: 'Keep this working' } });
  for (const view of ['dossier','worksheet','board','review','help','warehouse','office','summary'] as const) {
    state = reduceRound(state, { type: 'view', view });
    for (let room = 0; room < 4; room++) { state = reduceRound(state, { type: 'direction', value: room }); assertLanding(); }
  }
  state = reduceRound(state, { type: 'object', action: { kind: 'terminal-page', page: 'cic' } });
  assertLanding();
  state = { ...state, phase: 'submitted' }; assertLanding();
  assert.equal(state.drafts['KHCN-01'].notes, 'Keep this working');
  assert.equal(state.phase, 'submitted');
});

test('reviewing an older file does not move the intake frontier or overwrite its raw working', () => {
  let state = reduceRound(newRound(), { type:'start' });
  state = reduceRound(state,{type:'decision',value:'Reject'});
  state = reduceRound(state,{type:'continue'});
  state = reduceRound(state,{type:'decision',value:'Reduce limit'});
  state = reduceRound(state,{type:'draft',patch:{amount:'1,000,000',notes:'QA working'}});
  state = reduceRound(state,{type:'case',index:0});
  const restored=restore(JSON.stringify(state));
  assert.equal(restored.current,0); assert.equal(restored.reached-1,1);
  assert.equal(restored.drafts['KHCN-02'].amount,'1,000,000');
  assert.equal(restored.drafts['KHCN-02'].notes,'QA working');
  assert.equal(reduceRound(restored,{type:'case',index:2}),restored);
});

test('historical pilot plates retain their original bytes, dimensions and reference assets', () => {
  assert.equal(manifest.entries.length,5);
  for (const entry of manifest.entries) {
    const bytes=readFileSync(entry.file);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256);
    assert.deepEqual([bytes.readUInt32BE(16),bytes.readUInt32BE(20)],[1672,941]);
    assert.ok(readFileSync(entry.reference).length>0);
  }
});

test('unavailable or muted audio cannot interrupt document work', async () => {
  const { playFoley } = await import('../src/game/sound');
  const previous=globalThis.AudioContext; let requests=0;
  globalThis.AudioContext=class { constructor() { requests++; throw new Error('QA audio denied'); } } as unknown as typeof AudioContext;
  try {
    assert.doesNotThrow(() => playFoley('paper',false)); assert.equal(requests,0);
    for (const kind of ['paper','keyboard','tack','wood'] as const) assert.doesNotThrow(() => playFoley(kind,true));
    assert.equal(requests,4);
  } finally { globalThis.AudioContext=previous; }
});

test('assignment, source reader and rulebook use exact copies of the selected approved screens', () => {
  assert.deepEqual(approved.map(entry => entry.id), ['briefing', 'document', 'rulebook']);
  for (const entry of approved) {
    const runtime = readFileSync(entry.file);
    assert.deepEqual(runtime, readFileSync(entry.source), entry.id);
    assert.equal(createHash('sha256').update(runtime).digest('hex'), entry.sha256, entry.id);
  }
});
