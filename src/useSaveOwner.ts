import { useEffect, useState } from 'react';
import { PILOT_OWNER_KEY } from './profile';

export function useSaveOwner() {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<'checking' | 'owned' | 'occupied' | 'unsupported'>('checking');
  useEffect(() => {
    let active = true;
    let release: (() => void) | undefined;
    setStatus('checking');
    // StrictMode's first setup is cleaned before this microtask acquires anything.
    void Promise.resolve().then(async () => {
      if (!active) return;
      if (!navigator.locks || !window.isSecureContext) { setStatus('unsupported'); return; }
      try {
        await navigator.locks.request(PILOT_OWNER_KEY, { mode: 'exclusive', ifAvailable: true }, async lock => {
          if (!active) return;
          if (!lock) { setStatus('occupied'); return; }
          const held = new Promise<void>(resolve => { release = resolve; });
          setStatus('owned');
          await held;
        });
      } catch { if (active) setStatus('unsupported'); }
    });
    return () => { active = false; release?.(); };
  }, [attempt]);
  return { status, retry: () => setAttempt(old => old + 1) };
}
