import assert from 'node:assert/strict';
import test from 'node:test';
import { SceneBlink, pause } from '../src/integration/sceneBlink';
import type { BlinkPhase } from '../src/integration/sceneBlink';
import { dialogueLines } from '../src/integration/dialogueLayout';
import { SERVICE_LINES } from '../src/integration/discoveryFlow';

function harness(load: (src: string, signal: AbortSignal) => Promise<boolean> = async () => true) {
  const phases: BlinkPhase[] = []; let retry: (() => void) | null = null;
  let finish: () => void = () => {};
  const idle = () => new Promise<void>(resolve => { finish = resolve; });
  let waits = 0;
  const control = new SceneBlink({
    phase: phase => { phases.push(phase); if (phase === 'idle') finish(); },
    failed: action => { retry = action; }, load,
    wait: (ms, signal) => { waits++; return pause(Math.min(ms, 2), signal); },
  });
  return { control, phases, idle, retry: () => retry, waits: () => waits };
}

test('blink commits art and content together while covered and rejects repeated arrows', async () => {
  const h = harness(); let commits = 0; const done = h.idle();
  assert.ok(h.control.run('R03', false, () => {
    assert.equal(h.phases.at(-1), 'covered'); commits++; h.control.ready('R03');
  }));
  assert.equal(h.control.run('R04', false, () => { commits++; }), false);
  await done;
  assert.equal(commits, 1); assert.equal(h.control.busy, false);
  assert.deepEqual(h.phases, ['loading','closing','covered','opening','idle']);
});

test('failed preload leaves the old scene untouched and supports retry', async () => {
  let available = false, commits = 0; const h = harness(async () => available);
  const first = h.idle(); h.control.run('folder', false, () => { commits++; h.control.ready('folder'); }); await first;
  assert.equal(commits, 0); assert.ok(h.retry());
  assert.equal(h.phases.includes('closing'), false);
  available = true; const second = h.idle(); h.retry()!(); await second;
  assert.equal(commits, 1); assert.equal(h.retry(), null); assert.equal(h.control.busy, false);
});

test('a cancelled slow scene cannot later replace a newer scene', async () => {
  let release!: (loaded: boolean) => void;
  const h = harness(src => src === 'slow' ? new Promise(resolve => { release = resolve; }) : Promise.resolve(true));
  const committed: string[] = [];
  h.control.run('slow', false, () => { committed.push('slow'); });
  assert.deepEqual(h.phases, ['loading']);
  h.control.cancel();
  const done = h.idle(); h.control.run('new', false, () => { committed.push('new'); h.control.ready('new'); });
  release(true); await done;
  assert.deepEqual(committed, ['new']); assert.equal(h.control.busy, false);
});

test('reduced motion cuts without blink phases or animation waits', async () => {
  const h = harness(); let committed = false; const done = h.idle();
  h.control.run('R02', true, () => { committed = true; }); await done;
  assert.ok(committed); assert.equal(h.waits(), 0);
  assert.deepEqual(h.phases, ['loading','idle']);
});

test('renderer readiness failure cannot leave a permanent dark screen', async () => {
  const h = harness(); let committed = false; const done = h.idle();
  h.control.run('broken-renderer', false, () => { committed = true; }); await done;
  assert.ok(committed); assert.equal(h.phases.at(-1), 'idle'); assert.equal(h.control.busy, false);
});

test('save rejection during a covered commit restores the current scene and unlocks navigation', async () => {
  const h = harness(); const done = h.idle();
  h.control.run('next', false, () => false); await done;
  assert.equal(h.control.busy, false); assert.equal(h.phases.at(-1), 'idle');
});

test('animation waits cancel promptly', async () => {
  const controller = new AbortController(); const waiting = pause(10000, controller.signal);
  controller.abort(); await assert.rejects(waiting, /Cancelled/);
});

test('one-line dialogue beats preserve all authored words at compact and large widths', () => {
  for (const text of SERVICE_LINES) for (const width of [18, 28, 70]) {
    const lines = dialogueLines(text, width, value => value.length);
    assert.equal(lines.join(' '), text);
    assert.ok(lines.every(line => line.length <= width));
  }
});

test('retry honors a reduced-motion preference changed after the failed request', async () => {
  let available = false, reduced = false; const h = harness(async () => available);
  const first = h.idle(); h.control.run('book', () => reduced, () => {}); await first;
  available = true; reduced = true;
  const second = h.idle(); h.retry()!(); await second;
  assert.equal(h.phases.includes('closing'), false); assert.equal(h.control.busy, false);
});
