import test from 'node:test';
import assert from 'node:assert/strict';
import { CASES, WAREHOUSE } from '../src/content';
import { copyKey, copyTargetError, currentCopies, selectedCopy } from '../src/application/objectActions';
import type { ObjectAction } from '../src/application/objectActions';
import { newRound, reduceRound, roundReady } from '../src/application/round';
import { persist, restore } from '../src/infrastructure/persistence';
import type { RoundState } from '../src/domain/types';

const first = CASES[0].id;
const record = WAREHOUSE[0].id;
const key = copyKey(first, record);
const object = (state: RoundState, action: ObjectAction) => reduceRound(state, { type: 'object', action });
const started = () => reduceRound(newRound(), { type: 'start' });
const taken = () => object(reduceRound(started(), { type: 'record', id: record }), { kind: 'take-copy', recordId: record });

test('a record becomes one selected carried copy only through explicit take, with no identity/finance signal', () => {
  const initial = started();
  assert.equal(object(initial, { kind: 'take-copy', recordId: record }), initial, 'A record must be opened at the terminal first');
  const reading = reduceRound(initial, { type: 'record', id: record });
  assert.equal(reading.objects.copies.length, 0, 'Opening/searching is not collecting');
  const s = object(reading, { kind: 'take-copy', recordId: record });
  assert.deepEqual(s.objects.copies, [{ id: key, caseId: first, recordId: record, location: 'inventory' }]);
  assert.equal(s.objects.selectedCopy, key);
  assert.equal(s.deskCopy, null);
  assert.deepEqual(s.boardSources, []);
  assert.deepEqual(s.drafts, initial.drafts, 'Taking a copy does not choose a matching borrower or assess a decision');
  assert.equal(object(s, { kind: 'take-copy', recordId: record }), s, 'No duplicate copy or revision from repeated take');
  assert.equal(object(s, { kind: 'take-copy', recordId: 'WH-NOT-REAL' }), s);
  assert.equal(object(s, { kind: 'select-copy', copyId: copyKey(CASES[7].id, record) }), s);
});

test('selected copy can be put on desk, picked up, pinned and returned without navigation or draft mutation', () => {
  const carried = taken();
  const drafts = carried.drafts;
  let s = object(carried, { kind: 'use-copy', target: 'desk' });
  assert.equal(s.view, carried.view, 'Only navigation layer changes the current view');
  assert.equal(s.deskCopy, record);
  assert.equal(s.objects.copies[0].location, 'desk');
  assert.equal(selectedCopy(s), null);
  assert.match(copyTargetError(s, 'board')!, /Select/);
  s = object(s, { kind: 'pick-up', copyId: key });
  assert.equal(s.deskCopy, null);
  assert.equal(s.objects.selectedCopy, key);
  s = object(s, { kind: 'use-copy', target: 'board' });
  assert.deepEqual(s.boardSources, [`record:${record}`]);
  assert.equal(s.objects.copies[0].location, 'board');
  s = object(s, { kind: 'pick-up', copyId: key });
  assert.deepEqual(s.boardSources, []);
  assert.equal(s.objects.copies[0].location, 'inventory');
  s = object(s, { kind: 'return-copy', copyId: key });
  assert.deepEqual(s.objects.copies, []);
  assert.equal(s.objects.selectedCopy, null);
  assert.deepEqual(s.drafts, drafts);
});

test('full board requires an explicit replacement and sends displaced copies back to carried inventory', () => {
  let s = taken();
  s = object(s, { kind: 'use-copy', target: 'board' });
  s = reduceRound(s, { type: 'board-slot', slot: 1, source: `dossier:${first}` });
  const another = WAREHOUSE[1].id;
  s = reduceRound(s, { type: 'record', id: another });
  s = object(s, { kind: 'take-copy', recordId: another });
  assert.match(copyTargetError(s, 'board')!, /Choose which source/);
  assert.equal(object(s, { kind: 'use-copy', target: 'board' }), s);
  s = object(s, { kind: 'use-copy', target: 'board', slot: 0 });
  assert.deepEqual(s.boardSources, [`record:${another}`, `dossier:${first}`]);
  assert.equal(s.objects.copies.find(copy => copy.recordId === record)?.location, 'inventory');
  assert.equal(s.objects.copies.find(copy => copy.recordId === another)?.location, 'board');
  assert.equal(s.objects.selectedCopy, null);
});

test('per-applicant copies survive case switches and cannot be moved under another case binding', () => {
  let s = taken();
  s = object(s, { kind: 'folder', open: true });
  s = reduceRound(s, { type: 'decision', value: 'Approve' });
  s = reduceRound(s, { type: 'continue' });
  assert.equal(currentCopies(s).length, 0);
  assert.equal(s.objects.selectedCopy, null);
  assert.equal(object(s, { kind: 'pick-up', copyId: key }), s);
  assert.equal(object(s, { kind: 'select-copy', copyId: key }), s);
  const nextKey = copyKey(CASES[1].id, record);
  s = object(s, { kind: 'take-copy', recordId: record });
  assert.equal(currentCopies(s)[0].id, nextKey, 'Same shared directory record can be deliberately examined for another case');
  s = reduceRound(s, { type: 'case', index: 0 });
  assert.equal(currentCopies(s)[0].id, key);
  assert.equal(s.objects.folderOpen[first], true);
  assert.equal(s.objects.folderOpen[CASES[1].id], false);
  assert.equal(s.objects.selectedCopy, null);
  assert.deepEqual(restore(JSON.stringify(s)).objects, s.objects);
});

test('legacy saves migrate only actual pins/copies/board sources and preserve every original draft and identifier', () => {
  let s = started();
  s = reduceRound(s, { type: 'draft', patch: { pin: record, notes: 'My original evidence note' } });
  s = reduceRound(s, { type: 'desk-copy', id: record });
  s = reduceRound(s, { type: 'decision', value: 'Reduce limit' });
  s = reduceRound(s, { type: 'draft', patch: { amount: '5,000,000' } });
  const old = JSON.parse(JSON.stringify(s)); delete old.objects;
  const migrated = restore(JSON.stringify(old));
  assert.deepEqual(migrated.drafts, s.drafts);
  assert.equal(migrated.attemptId, s.attemptId);
  assert.equal(migrated.revision, s.revision);
  assert.equal(migrated.deskCopy, record);
  assert.deepEqual(migrated.objects.copies, [{ id: key, caseId: first, recordId: record, location: 'desk' }]);
  // A legacy open desk reader migrates as placed, without altering the old pin binding.
  assert.equal(migrated.objects.selectedCopy, null);
  assert.equal(migrated.objects.folderOpen[first], true, 'The old saved reader stays open');
  const blank = JSON.parse(JSON.stringify(newRound())); delete blank.objects;
  assert.deepEqual(restore(JSON.stringify(blank)).objects.copies, []);
  assert.ok(Object.values(restore(JSON.stringify(blank)).objects.folderOpen).every(open => !open));
});

test('legacy unowned reader and pinned board record gain stable placement without becoming matches', () => {
  const old = JSON.parse(JSON.stringify(started())); delete old.objects;
  old.deskCopy = record;
  let migrated = restore(JSON.stringify(old));
  assert.equal(migrated.objects.copies[0].location, 'desk');
  assert.equal(migrated.drafts[first].pin, null);
  old.boardSources = [`record:${record}`];
  migrated = restore(JSON.stringify(old));
  assert.equal(migrated.objects.copies[0].location, 'board');
  assert.equal(migrated.objects.copies.length, 1);
  assert.equal(migrated.drafts[first].pin, null);
});

test('new object states round-trip through the existing save namespace with exact placement and selection', () => {
  let s = taken();
  s = object(s, { kind: 'folder', open: true });
  let raw = '';
  persist({ getItem: () => raw, setItem: (_key, value) => { raw = value; } }, s);
  assert.deepEqual(restore(raw).objects, s.objects);
  s = object(s, { kind: 'use-copy', target: 'desk' });
  assert.deepEqual(restore(JSON.stringify(s)).objects, s.objects);
  assert.equal(restore(JSON.stringify(s)).deskCopy, record);
  s = object(s, { kind: 'pick-up', copyId: key });
  s = object(s, { kind: 'use-copy', target: 'board' });
  s = reduceRound(s, { type: 'board-move', source: `record:${record}`, x: 37, y: 69 });
  const resumed = restore(JSON.stringify(s));
  assert.deepEqual(resumed.objects, s.objects);
  assert.deepEqual(resumed.boardLayout, s.boardLayout);
});

test('invalid physical IDs, future bindings and duplicate copies cannot enter restored progress', () => {
  const s = taken();
  for (const copy of [
    { ...s.objects.copies[0], id: 'forged' },
    { ...s.objects.copies[0], caseId: CASES[7].id, id: copyKey(CASES[7].id, record) },
    { ...s.objects.copies[0], recordId: 'WH-FAKE', id: copyKey(first, 'WH-FAKE') },
    { ...s.objects.copies[0], location: 'unknown' },
  ]) assert.throws(() => restore(JSON.stringify({ ...s, objects: { ...s.objects, copies: [copy] } })));
  assert.throws(() => restore(JSON.stringify({ ...s, objects: { ...s.objects, copies: [...s.objects.copies, ...s.objects.copies] } })));
  const invalidSelection = restore(JSON.stringify({ ...s, objects: { ...s.objects, selectedCopy: 'forged' } }));
  assert.equal(invalidSelection.objects.selectedCopy, null);
});

test('legacy board controls and reader actions maintain physical consistency', () => {
  let s = taken();
  s = reduceRound(s, { type: 'board-slot', slot: 0, source: `record:${record}` });
  assert.equal(s.objects.copies[0].location, 'board');
  assert.equal(s.objects.selectedCopy, null);
  s = reduceRound(s, { type: 'board-slot', slot: 0, source: '' });
  assert.equal(s.objects.copies[0].location, 'inventory');
  assert.equal(reduceRound(s, { type: 'board', source: `record:WH-FAKE` }), s);
  assert.equal(reduceRound(s, { type: 'board-slot', slot: 0, source: `record:WH-FAKE` }), s);
  assert.equal(reduceRound(s, { type: 'board', source: `dossier:${CASES[7].id}` }), s);
});

test('submitted rounds lock working copy locations and remain readable; collecting is never a completion gate', () => {
  let s = taken();
  for (let i = 0; i < CASES.length; i++) {
    s = reduceRound(s, { type: 'decision', value: 'Approve' });
    s = reduceRound(s, { type: 'continue' });
  }
  assert.ok(roundReady(s));
  s = reduceRound(s, { type: 'case', index: 0 });
  s = object(s, { kind: 'select-copy', copyId: key });
  const locked = { ...s, phase: 'submitted' as const };
  for (const action of [
    { kind: 'use-copy', target: 'desk' },
    { kind: 'use-copy', target: 'board', slot: 0 },
    { kind: 'pick-up', copyId: key },
    { kind: 'return-copy', copyId: key },
    { kind: 'take-copy', recordId: record },
  ] as const) assert.equal(object(locked, action), locked);
  assert.match(copyTargetError(locked, 'desk')!, /submitted/);
  assert.equal(object(locked, { kind: 'folder', open: true }).objects.folderOpen[first], true, 'Read-only opening is navigation');
  const read = reduceRound(locked, { type: 'desk-copy', id: WAREHOUSE[3].id });
  assert.deepEqual(read.objects, locked.objects, 'Read-only navigation cannot manufacture new physical working copies');
});


test('terminal and notebook pages restore read context without opening CIC or editing submitted working', () => {
  let s = started();
  s = object(s, { kind: 'terminal-page', page: 'cic' });
  s = object(s, { kind: 'notebook-page', page: 'notes' });
  assert.equal(s.drafts[first].cicOpened, false);
  const resumed = restore(JSON.stringify(s));
  assert.equal(resumed.objects.terminalPage, 'cic');
  assert.equal(resumed.objects.notebookPage, 'notes');
  const locked = { ...s, phase: 'submitted' as const };
  const changed = object(object(locked, { kind: 'terminal-page', page: 'warehouse' }), { kind: 'notebook-page', page: 'worksheet' });
  assert.deepEqual(changed.drafts, locked.drafts);
  assert.equal(changed.objects.terminalPage, 'warehouse');
  assert.equal(changed.objects.notebookPage, 'worksheet');
  const old = JSON.parse(JSON.stringify(s)); delete old.objects.terminalPage; delete old.objects.notebookPage;
  old.objects.folderOpen[CASES[7].id] = true;
  const migrated = restore(JSON.stringify(old));
  assert.equal(migrated.objects.terminalPage, 'warehouse');
  assert.equal(migrated.objects.notebookPage, 'worksheet');
  assert.equal(migrated.objects.folderOpen[CASES[7].id], false);
});


test('pinning into an empty second space creates a dense restorable board rather than a saved hole', () => {
  const s = object(taken(), { kind: 'use-copy', target: 'board', slot: 1 });
  assert.deepEqual(s.boardSources, [`record:${record}`]);
  assert.deepEqual(restore(JSON.stringify(s)).boardSources, s.boardSources);
});


test('copy order and bindings remain exact when restoring mixed carried, desk and global-board material', () => {
  let s = taken();
  s = object(s, { kind: 'use-copy', target: 'board' });
  const second = WAREHOUSE[1].id;
  s = reduceRound(s, { type: 'record', id: second });
  s = object(s, { kind: 'take-copy', recordId: second });
  s = object(s, { kind: 'use-copy', target: 'desk' });
  const third = WAREHOUSE[2].id;
  s = reduceRound(s, { type: 'record', id: third });
  s = object(s, { kind: 'take-copy', recordId: third });
  assert.deepEqual(restore(JSON.stringify(s)).objects, s.objects);
  const raw = JSON.stringify(s);
  assert.equal(JSON.stringify(restore(raw).objects), JSON.stringify(s.objects));
});

test('moving the same record onto the global board under another reached applicant returns previous owner copy safely', () => {
  let s = object(taken(), { kind: 'use-copy', target: 'board' });
  s = reduceRound(s, { type: 'decision', value: 'Approve' });
  s = reduceRound(s, { type: 'continue' });
  s = object(s, { kind: 'take-copy', recordId: record });
  const otherKey = copyKey(CASES[1].id, record);
  s = object(s, { kind: 'use-copy', target: 'board' });
  assert.equal(s.objects.copies.find(copy => copy.id === key)?.location, 'inventory');
  assert.equal(s.objects.copies.find(copy => copy.id === otherKey)?.location, 'board');
  assert.deepEqual(s.boardSources, [`record:${record}`]);
  assert.deepEqual(restore(JSON.stringify(s)).objects, s.objects);
  assert.equal(object(s, { kind: 'return-copy', copyId: key }), s, 'Cannot remove another owner material under the current applicant');
  s = object(s, { kind: 'pick-up', copyId: otherKey });
  assert.deepEqual(s.boardSources, []);
  assert.equal(s.objects.copies.length, 2);
});


test('returning an item remains returned after reload even when a historical draft pin is retained', () => {
  let s = taken();
  s = reduceRound(s, { type: 'draft', patch: { pin: record } });
  s = object(s, { kind: 'return-copy', copyId: key });
  assert.equal(s.drafts[first].pin, record);
  assert.deepEqual(restore(JSON.stringify(s)).objects.copies, []);
});

test('restore cannot bypass explicit CIC access by injecting an unopened comparison source', () => {
  const s = started();
  assert.throws(() => restore(JSON.stringify({ ...s, boardSources: [`cic:${first}`] })));
  const opened = reduceRound(s, { type: 'draft', patch: { cicOpened: true } });
  assert.deepEqual(restore(JSON.stringify({ ...opened, boardSources: [`cic:${first}`] })).boardSources, [`cic:${first}`]);
});


test('read-only applicant navigation clears active item selection without changing final placements or working', () => {
  let s = taken();
  s = reduceRound(s, { type: 'decision', value: 'Approve' });
  s = reduceRound(s, { type: 'continue' });
  s = reduceRound(s, { type: 'case', index: 0 });
  s = object(s, { kind: 'select-copy', copyId: key });
  const locked = { ...s, phase: 'submitted' as const };
  const other = reduceRound(locked, { type: 'case', index: 1 });
  assert.equal(other.objects.selectedCopy, null);
  assert.deepEqual(other.objects.copies, locked.objects.copies);
  assert.deepEqual(other.drafts, locked.drafts);
});


test('assessment record reference stays independent from physical copy collection and placement', () => {
  let s = started();
  s = reduceRound(s, { type: 'draft', patch: { pin: record } });
  assert.deepEqual(s.objects.copies, [], 'Attaching a reference is not taking a physical copy');
  s = reduceRound(s, { type: 'record', id: record });
  s = object(s, { kind: 'take-copy', recordId: record });
  s = object(s, { kind: 'use-copy', target: 'desk' });
  const copies = structuredClone(s.objects.copies);
  s = reduceRound(s, { type: 'draft', patch: { pin: WAREHOUSE[1].id } });
  assert.deepEqual(s.objects.copies, copies);
  assert.deepEqual(restore(JSON.stringify(s)).objects.copies, copies);
  s = reduceRound(s, { type: 'draft', patch: { pin: null } });
  assert.deepEqual(s.objects.copies, copies);
});

test('an atomic physical transfer commits once and rejects full-board moves without partial pickup', () => {
  const s = taken();
  const placed = object(s, { kind: 'transfer-copy', copyId: key, target: 'desk' });
  assert.equal(placed.revision, s.revision + 1);
  assert.equal(placed.objects.copies[0].location, 'desk');
  let full = reduceRound(placed, { type: 'board-slot', slot: 0, source: `dossier:${first}` });
  full = reduceRound(full, { type: 'draft', patch: { cicOpened: true } });
  full = reduceRound(full, { type: 'board-slot', slot: 1, source: `cic:${first}` });
  assert.equal(object(full, { kind: 'transfer-copy', copyId: key, target: 'board' }), full);
  assert.equal(full.deskCopy, record);
  assert.equal(full.objects.copies[0].location, 'desk');
  const pinned = object(full, { kind: 'transfer-copy', copyId: key, target: 'board', slot: 1 });
  assert.equal(pinned.revision, full.revision + 1);
  assert.equal(pinned.deskCopy, null);
  assert.equal(pinned.objects.copies[0].location, 'board');
  assert.equal(object(pinned, { kind: 'transfer-copy', copyId: 'forged', target: 'desk' }), pinned);
  const locked = { ...pinned, phase: 'submitted' as const };
  assert.equal(object(locked, { kind: 'transfer-copy', copyId: key, target: 'desk' }), locked);
  assert.equal(object(pinned, { kind: 'transfer-copy', copyId: key, target: 'board' }), pinned, 'Already pinned transfer is idempotent');
});

