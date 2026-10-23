import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { newRound, reduceRound } from '../src/application/round';
import { CASES } from '../src/content';
import { enterFolder } from '../src/integration/folderEntry';
import { firstCaseStep, firstRoomCue } from '../src/integration/learningFlow';
import { DecisionPanel } from '../src/ui/DecisionPanel';
import { FIELD_HELP } from '../src/ui/LearningHelp';
import { WORKSHEET_FIELDS } from '../src/domain/types';
import { ConceptTerminal } from '../src/concept/ConceptTerminal';
import { NotebookSource } from '../src/integration/NotebookSource';
import type { Game } from '../src/ui/types';

function exampleGame(state = reduceRound(newRound(), { type: 'start' }), learning = true) {
  return { state, send: () => {}, busy: false, stale: false, recovery: null, learning: learning ? { openGuide: () => {}, firstStep: firstCaseStep(state) } : undefined } as unknown as Game;
}

test('dossier can be entered repeatedly without requiring another state change or altering the draft', () => {
  let state = reduceRound(newRound(), { type: 'start' });
  const open = () => { const next = reduceRound(state, { type: 'object', action: { kind: 'folder', open: true } }); const changed = next !== state; state = next; return changed; };
  assert.equal(enterFolder(state, false, open), true);
  state = reduceRound(state, { type: 'draft', patch: { notes: 'Keep my evidence and reasoning.' } });
  const saved = JSON.stringify(state);
  assert.equal(enterFolder(state, false, () => { throw new Error('Already open needs no mutation'); }), true);
  assert.equal(JSON.stringify(state), saved);
  assert.equal(enterFolder(state, true, open), false, 'stale/recovery/busy guard still takes priority');
  const fresh = reduceRound(newRound(), { type: 'start' });
  assert.equal(enterFolder(fresh, false, () => false), false, 'real rejected transitions remain rejected');
});

test('first-case guidance is procedural, optional and absent on later or submitted cases', () => {
  let state = newRound(); const raw = JSON.stringify(state);
  assert.equal(firstRoomCue(state, 0, false), 'reception-folder');
  assert.equal(JSON.stringify(state), raw);
  state = reduceRound(state, { type: 'start' });
  assert.equal(firstRoomCue(state, 1, false), 'current-folder');
  assert.match(firstCaseStep(state)!, /open the application/);
  state = reduceRound(state, { type: 'object', action: { kind: 'folder', open: true } });
  assert.match(firstCaseStep(state)!, /Warehouse/);
  state = reduceRound(state, { type: 'decision', value: 'Approve' });
  assert.match(firstCaseStep(state)!, /Decision recorded/);
  state = reduceRound(state, { type: 'continue' });
  assert.equal(firstCaseStep(state), undefined);
  assert.equal(firstRoomCue(state, 2, false), undefined);
  assert.equal(firstCaseStep({ ...state, current: 0, reached: 1, phase: 'submitted' }), undefined);
});

test('physical amount input explains invalid formatting and bounds immediately, without changing validation', () => {
  let state = reduceRound(reduceRound(newRound(), { type: 'start' }), { type: 'decision', value: 'Reduce limit' });
  state = reduceRound(state, { type: 'draft', patch: { amount: '7.000.000' } });
  let html = renderToStaticMarkup(createElement(DecisionPanel, { game: exampleGame(state), physical: true }));
  assert.match(html, /aria-invalid="true"/); assert.match(html, /Please enter a valid number/); assert.match(html, /monthly payment, not the loan total/);
  state = reduceRound(state, { type: 'draft', patch: { amount: String(CASES[0].emi + 1) } });
  html = renderToStaticMarkup(createElement(DecisionPanel, { game: exampleGame(state), physical: true }));
  assert.match(html, /cannot exceed the original estimate/);
  const legacy = renderToStaticMarkup(createElement(DecisionPanel, { game: exampleGame(state, false) }));
  assert.doesNotMatch(legacy, /How do I choose|monthly payment, not the loan total/);
});

test('each worksheet field has public contextual help, without computed case answers', () => {
  assert.ok(WORKSHEET_FIELDS.every(field => FIELD_HELP[field.id]));
  const text = JSON.stringify(FIELD_HELP);
  assert.doesNotMatch(text, /WH-\d|KHCN-\d|63\.05|19\.5|36,000,000/);
  assert.match(FIELD_HELP.dti.text, /Household living costs are not debt payments/);
});

test('research clarifies attachment separately from making a copy and preserves older route labels', () => {
  const state = reduceRound(reduceRound(newRound(), { type: 'start' }), { type: 'record', id: 'WH-0005' });
  const props = { service: 'warehouse' as const, onOpen: () => {} };
  const html = renderToStaticMarkup(createElement(ConceptTerminal, { ...props, game: exampleGame(state) }));
  assert.match(html, /Attach record/); assert.match(html, /Make a copy/); assert.match(html, /does not confirm a match/); assert.match(html, /Application details/);
  const legacy = renderToStaticMarkup(createElement(ConceptTerminal, { ...props, game: exampleGame(state, false) }));
  assert.match(legacy, /Use this record/); assert.doesNotMatch(legacy, /Application details/);
});

test('notebook reference offers only reached application and sources the learner opened or collected', () => {
  let state = reduceRound(newRound(), { type: 'start' });
  const show = () => renderToStaticMarkup(createElement(NotebookSource, { game: exampleGame(state), selected: 'cic', onSelect: () => {} }));
  let html = show(); assert.doesNotMatch(html, /<option value="cic"|<option value="WH-/);
  state = reduceRound(state, { type: 'draft', patch: { cicOpened: true, pin: 'WH-0005' } });
  html = show(); assert.match(html, /<option value="cic"/); assert.match(html, /<option value="WH-0005"/);
  assert.doesNotMatch(html, /KHCN-02|Reference decision|Correct classification/);
});
