import { useCallback, useEffect, useRef, useState } from 'react';
import { pause, prepareScene, SceneBlink } from './sceneBlink';
import type { BlinkPhase } from './sceneBlink';

export function useSceneBlink() {
  const [phase, setPhase] = useState<BlinkPhase>('idle');
  const [retry, setRetry] = useState<(() => void) | null>(null);
  const [count, setCount] = useState(0);
  const controller = useRef<SceneBlink | null>(null);
  if (!controller.current) controller.current = new SceneBlink({
    phase: next => { setPhase(next); if (next === 'closing') setCount(old => old + 1); },
    failed: action => setRetry(() => action), load: prepareScene, wait: pause,
  });
  const instance = controller.current;
  useEffect(() => () => instance.cancel(), [instance]);
  const ready = useCallback((source: string) => instance.ready(source), [instance]);
  return { phase, count, retry, ready, busy: phase !== 'idle', controller: instance };
}

export function useReducedMotion(preference: boolean) {
  const [system, setSystem] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystem(query.matches);
    query.addEventListener('change', update); update();
    return () => query.removeEventListener('change', update);
  }, []);
  return preference || system;
}
