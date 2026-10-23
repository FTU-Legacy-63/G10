import { useEffect, useRef, useState } from 'react';
import { playFoley } from '../game/sound';

export function TitleScreen({ canContinue, busy, modalOpen, onContinue, onNew, onSettings, reducedMotion = false, sound = false }: {
  canContinue: boolean; busy: boolean; modalOpen?: boolean; onContinue: () => void; onNew: () => void; onSettings: () => void; reducedMotion?: boolean; sound?: boolean;
}) {
  const [knock, setKnock] = useState(0), [moving, setMoving] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  function touchDoor() {
    if (moving) return;
    setKnock(value => value + 1); setMoving(true); playFoley('wood', sound);
    timer.current = window.setTimeout(() => setMoving(false), 1600);
  }
  return <section className={`ip-title${reducedMotion ? ' ip-title-still' : ''}`} aria-label="Title screen" inert={modalOpen}>
    <h1>THE CREDIT<br />DESK</h1>
    <nav aria-label="Start or continue"><button disabled={!canContinue || busy} onClick={onContinue}><span className="ip-menu-pointer" aria-hidden="true">▶</span>Continue</button><button disabled={busy} onClick={onNew}><span className="ip-menu-pointer" aria-hidden="true">▶</span>New Game</button></nav>
    <div className="ip-window-light" aria-hidden="true" />
    <div className="ip-window-shadow" aria-hidden="true"><svg key={knock} className={moving ? 'ip-cat-startled' : 'ip-cat-idle'} viewBox="0 0 180 100"><path d="M25 77c9-12 10-24 26-25 12-1 16 4 24 7 9 2 18-3 25-9l-1-20 10 9 12-10 1 18c15 13 14 29-1 35l-2 14h-8l-5-15-42 1-5 14h-8l2-16-20 1c-25-1-31-23-22-39 4-7 10-8 12-3-17 8-12 30 2 38z" /></svg></div>
    <button className={`ip-door-knocker${moving && !reducedMotion ? ' ip-knocking' : ''}`} aria-label="Knock on the door" onClick={touchDoor} disabled={busy}>
      <svg viewBox="0 0 44 64" aria-hidden="true"><path d="M14 7Q22 1 30 7l2 25-20 0z" fill="#a58c50" /><circle cx="22" cy="16" r="5" fill="#c6ae6b" /><g className="ip-knocker-ring"><path d="M12 23C-3 46 10 59 22 59S47 46 32 23" fill="none" stroke="#241c11" strokeWidth="7" /><path d="M12 23C-3 46 10 59 22 59S47 46 32 23" fill="none" stroke="#b9a065" strokeWidth="4" /></g></svg>
    </button>
    <button className="ip-settings-gear" aria-label="Settings" onClick={onSettings} disabled={busy}>
      <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m20 4 8 0 1 6 4 2 5-3 6 6-3 5 1 4 6 1 0 8-6 1-2 4 3 5-6 6-5-3-4 1-1 6-8 0-1-6-4-2-5 3-6-6 3-5-1-4-6-1 0-8 6-1 2-4-3-5 6-6 5 3 4-1z" transform="translate(3 0) scale(.86)" /><circle cx="24" cy="24" r="7" /></svg>
    </button>
  </section>;
}
