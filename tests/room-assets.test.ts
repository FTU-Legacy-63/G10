import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { ROOM_ART, ROOM_OBJECTS, ROOM_COPY } from '../src/game/roomArt';
import { artForView, objectState, roomPresentation } from '../src/game/roomState';
import { directionFor } from '../src/game/spatial';
import { newRound, reduceRound } from '../src/application/round';
import { CASES } from '../src/content';

test('every live room layer exists with exact declared dimensions and unchanged asset provenance', () => {
  const manifest = JSON.parse(readFileSync('design/room-v2-manifest.json', 'utf8'));
  const used = new Set([...ROOM_ART, ...[...ROOM_OBJECTS, ROOM_COPY].flatMap(object => Object.values(object.states))]);
  assert.equal(used.size, 18);
  for (const url of used) {
    const source = readFileSync(`public${url}`);
    const record = manifest.assets.find((asset: { runtimeURL: string }) => asset.runtimeURL === url);
    assert.ok(record, url);
    assert.equal(createHash('sha256').update(source).digest('hex'), record.sha256, url);
    assert.match(source.toString(), new RegExp(`width="${record.width}" height="${record.height}"`));
    assert.equal(/<(text|script|foreignObject|image)\b/.test(source.toString()), false, 'Art has no baked text, external imagery or executable content');
    if (record.kind === 'prop-state') assert.equal(record.alpha.min, 0, 'A prop has verified real alpha');
  }
});

test('each close-up, room target and return direction refer to the same physical object', () => {
  for (const object of ROOM_OBJECTS) {
    assert.equal(directionFor(object.view, 0), object.direction, object.id);
    assert.equal(artForView(object.view).id, object.id);
  }
  assert.equal(artForView('summary').id, 'ledger');
  assert.equal(directionFor('summary', 0), artForView('summary').direction);
});

test('room reflects durable folder and copy placement while reading navigation stays transient', () => {
  let state = reduceRound(newRound(), { type: 'start' });
  state = reduceRound(state, { type: 'object', action: { kind: 'folder', open: true } });
  state = reduceRound(state, { type: 'record', id: 'WH-0005' });
  state = reduceRound(state, { type: 'object', action: { kind: 'take-copy', recordId: 'WH-0005' } });
  assert.equal(roomPresentation(state, 'office').deskCopy, null);
  state = reduceRound(state, { type: 'object', action: { kind: 'use-copy', target: 'desk' } });
  assert.equal(roomPresentation(state, 'office').deskCopy, 'WH-0005');
  assert.equal(objectState(state, 'folder', 'office'), 'open');
  assert.equal(objectState(state, 'notebook', 'office'), 'closed');
  assert.equal(objectState(state, 'notebook', 'worksheet'), 'open');
  state = reduceRound(state, { type: 'desk-copy', id: null });
  assert.equal(roomPresentation(state, 'office').deskCopy, 'WH-0005', 'Closing a reader cannot remove a placed sheet');
  assert.equal(state.objects.copies[0].caseId, CASES[0].id);
});

test('still-room rendering keeps actual board papers and IDs when the animation engine is absent', async () => {
  const { createElement } = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { Office } = await import('../src/game/Office');
  let state = reduceRound(newRound(), { type: 'start' });
  state = reduceRound(state, { type: 'record', id: 'WH-0005' });
  state = reduceRound(state, { type: 'board', source: 'record:WH-0005' });
  state = reduceRound(state, { type: 'board', source: 'dossier:KHCN-01' });
  const html = renderToStaticMarkup(createElement(Office, { state, direction: 2, activeView: 'office', started: true, canContinue: true, reducedMotion: true, onContinue() {}, onTurn() {}, onOpen() {}, onInspectCopy() {}, onUseCopy() {}, onStart() {} }));
  assert.equal((html.match(/class="fallback-board-paper"/g) ?? []).length, 2);
  assert.match(html, /room-board-labels/);
  assert.match(html, /WH-0005/);
  assert.match(html, /KHCN-01/);
  assert.doesNotMatch(html, /assets\/office\//);
});
