import { useEffect, useRef, useState } from 'react';
import { buildSnapshot, newRound, reduceRound, roundReady } from './round';
import type { Action } from './round';
import { persist, restore, SAVE_KEY } from '../infrastructure/persistence';
import type { RoundState } from '../domain/types';
import type { ObjectAction } from './objectActions';

function load(saveKey: string) {
  try {
    const raw = localStorage.getItem(saveKey);
    return { state: raw ? restore(raw) : newRound(), recovery: null as string | null, raw };
  } catch (error) {
    let raw: string | null = null;
    try { raw = localStorage.getItem(saveKey); } catch { /* Storage access itself may be denied. */ }
    return { state: newRound(), recovery: error instanceof SyntaxError ? 'This saved progress cannot be read. It has been preserved. Export it before starting a new shift.' : error instanceof Error ? error.message : 'Save unavailable', raw };
  }
}
export function useGame(saveKey: string = SAVE_KEY) {
  // A mounted game owns one namespace; changing routes mounts a separate game.
  const storageKey = useRef(saveKey).current;
  const [initial] = useState(() => load(storageKey));
  const [state, setState] = useState(initial.state);
  const current = useRef(state);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [recovery, setRecovery] = useState(initial.recovery);
  const [stale, setStale] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hasSave, setHasSave] = useState(!!initial.raw && !initial.recovery);
  const staleRef = useRef(false);
  const busyRef = useRef(false);
  const lastSaved = useRef<string | null>(initial.raw);
  const update = (next: RoundState) => { current.current = next; setState(next); };
  const save = (next: RoundState) => {
    try {
      if (localStorage.getItem(storageKey) !== lastSaved.current) {
        staleRef.current = true; setStale(true); return false;
      }
      lastSaved.current = persist(localStorage, next, storageKey); setHasSave(true); setSaveError(null); return true;
    }
    catch { setSaveError('Progress is not saved. Keep this page open and retry saving.'); return false; }
  };
  function send(action: Action) {
    if (staleRef.current || recovery || busyRef.current) return false;
    const next = reduceRound(current.current, action);
    if (next === current.current) return false;
    // Even an explicit Continue cannot discard work if storage failed.
    if ((action.type === 'continue' || action.type === 'start') && !save(next)) return false;
    update(next);
    if (action.type !== 'continue' && action.type !== 'start') save(next);
    return true;
  }
  // A physical use may pick up/select then place. Commit that intent once, not three saves.
  function sendObjects(actions: ObjectAction[]) {
    if (staleRef.current || recovery || busyRef.current) return false;
    try {
      if (localStorage.getItem(storageKey) !== lastSaved.current) { staleRef.current = true; setStale(true); return false; }
    } catch { /* Keep the same in-memory/retry behavior as ordinary draft editing. */ }
    const next = actions.reduce((value, action) => reduceRound(value, { type: 'object', action }), current.current);
    if (next === current.current) return false;
    update(next); save(next); return true;
  }
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey && event.newValue !== lastSaved.current) {
        staleRef.current = true; setStale(true);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [storageKey]);
  useEffect(() => {
    let active = true;
    if (initial.state.phase === 'submitted') {
      setBusy(true); busyRef.current = true;
      buildSnapshot(initial.state).then(snapshot => {
        if (active) update({ ...initial.state, snapshot });
      }).catch(() => { if (active) setRecovery('The saved report could not be rebuilt. Your saved working has been preserved.'); })
        .finally(() => { if (active) { setBusy(false); busyRef.current = false; } });
    }
    return () => { active = false; };
  }, [initial]);
  async function submit() {
    if (busyRef.current || staleRef.current || recovery || current.current.phase === 'submitted' || !roundReady(current.current)) return false;
    busyRef.current = true; setBusy(true);
    const draft = current.current;
    try {
      const snapshot = await buildSnapshot(draft);
      if (staleRef.current || draft !== current.current) return false;
      const final: RoundState = { ...structuredClone(draft), phase: 'submitted', view: 'summary', revision: draft.revision + 1, snapshot };
      if (!save(final)) return false;
      update(final);
      return true;
    } catch { setSaveError('The round could not be submitted. Your draft is still editable. Retry when ready.'); return false; }
    finally { busyRef.current = false; setBusy(false); }
  }
  function createAttempt(settings?: RoundState['settings']) {
    if (staleRef.current || busyRef.current) return false;
    const fresh = newRound();
    if (settings && [100, 115, 130].includes(settings.textSize) && typeof settings.reducedMotion === 'boolean' && typeof settings.sound === 'boolean') fresh.settings = { ...settings };
    if (!save(fresh)) return false;
    setRecovery(null); update(fresh);
    return true;
  }
  function restart() { return createAttempt(); }
  async function retryReport() {
    if (current.current.phase !== 'submitted' || busyRef.current) return false;
    busyRef.current = true; setBusy(true);
    try {
      const snapshot = await buildSnapshot(current.current);
      update({ ...current.current, snapshot }); setRecovery(null); return true;
    } catch { setRecovery('The saved report could not be rebuilt. Your saved working has been preserved.'); return false; }
    finally { busyRef.current = false; setBusy(false); }
  }
  function downloadSave() {
    let raw: string;
    try { raw = recovery ? localStorage.getItem(storageKey) ?? JSON.stringify(current.current) : JSON.stringify(current.current, null, 2); }
    catch { raw = JSON.stringify(current.current, null, 2); }
    const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'the-credit-desk-progress.json'; a.click(); URL.revokeObjectURL(url);
  }
  return { state, send, sendObjects, submit, restart, createAttempt, hasSave, busy, stale, recovery, saveError,
    retrySave: () => !recovery && !staleRef.current && !busyRef.current && save(current.current), retryReport, downloadSave };
}
