export type BlinkPhase = 'idle' | 'loading' | 'closing' | 'covered' | 'opening';
type MotionPreference = boolean | (() => boolean);
export const BLINK_TIMING = { close: 60, hold: 20, open: 80, readyTimeout: 1800 } as const;

export function pause(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(new Error('Cancelled')); return; }
    const done = () => { signal.removeEventListener('abort', cancel); resolve(); };
    const timer = setTimeout(done, ms);
    const cancel = () => { clearTimeout(timer); reject(new Error('Cancelled')); };
    signal.addEventListener('abort', cancel, { once: true });
  });
}

/** Predecode the actual image before hiding the current scene. Failed requests are retryable. */
export function prepareScene(src: string, signal: AbortSignal): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image(); let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true; clearTimeout(timer); signal.removeEventListener('abort', cancel);
      img.onload = null; img.onerror = null; resolve(ok);
    };
    const cancel = () => { finish(false); img.src = ''; };
    const timer = setTimeout(() => finish(false), 12000);
    if (signal.aborted) { cancel(); return; }
    signal.addEventListener('abort', cancel, { once: true });
    img.onload = () => { void img.decode().then(() => finish(true), () => finish(img.naturalWidth > 0)); };
    img.onerror = () => finish(false);
    img.src = src;
  });
}

/** One transaction at a time: no queued arrow presses, no uncommitted Back entries. */
export class SceneBlink {
  private controller: AbortController | null = null;
  private readySource: string | null = null;
  private waiter: { source: string; resolve: () => void } | null = null;
  constructor(private deps: {
    phase: (phase: BlinkPhase) => void;
    failed: (retry: (() => void) | null) => void;
    load: (src: string, signal: AbortSignal) => Promise<boolean>;
    wait: (ms: number, signal: AbortSignal) => Promise<void>;
  }) {}
  get busy() { return this.controller !== null; }
  ready(source: string) {
    this.readySource = source;
    if (this.waiter?.source === source) this.waiter.resolve();
  }
  cancel() {
    this.controller?.abort(); this.controller = null;
    this.waiter?.resolve(); this.waiter = null;
    this.deps.phase('idle');
  }
  run(source: string, reduced: MotionPreference, commit: () => boolean | void): boolean {
    if (this.busy) return false;
    const controller = new AbortController(); this.controller = controller;
    this.deps.failed(null); this.deps.phase('loading');
    void this.perform(source, reduced, commit, controller);
    return true;
  }
  private async perform(source: string, reduced: MotionPreference, commit: () => boolean | void, controller: AbortController) {
    const { signal } = controller, current = () => this.controller === controller && !signal.aborted;
    try {
      const loaded = await this.deps.load(source, signal);
      if (!current()) return;
      if (!loaded) { this.deps.failed(() => { this.run(source, reduced, commit); }); return; }
      const noMotion = () => typeof reduced === 'function' ? reduced() : reduced;
      if (noMotion()) { commit(); return; }
      this.deps.phase('closing'); await this.deps.wait(BLINK_TIMING.close, signal);
      if (!current()) return;
      if (noMotion()) { commit(); return; }
      this.deps.phase('covered');
      const ready = new Promise<void>(resolve => { this.waiter = { source, resolve }; if (this.readySource === source) resolve(); });
      const committed = commit() !== false;
      if (committed) {
        // A broken renderer must never trap the player behind the blink layer.
        await Promise.all([
          Promise.race([ready, this.deps.wait(BLINK_TIMING.readyTimeout, signal)]),
          this.deps.wait(BLINK_TIMING.hold, signal),
        ]);
      }
      if (!current()) return;
      this.waiter = null; this.deps.phase('opening');
      await this.deps.wait(BLINK_TIMING.open, signal);
    } catch { /* Cancellation leaves the current scene visible. */ }
    finally {
      if (this.controller === controller) {
        controller.abort(); this.waiter = null; this.controller = null; this.deps.phase('idle');
      }
    }
  }
}
