import { useEffect, useMemo, useRef, useState } from 'react';
import type Phaser from 'phaser';
import type { RoundState, View } from '../domain/types';
import { Arrow } from '../ui/Primitives';
import { currentCopies, selectedCopy } from '../application/objectActions';
import { ROOM_ART, ROOM_COPY, ROOM_OBJECTS, ROOM_SIZE } from './roomArt';
import { boardPaperRect, roomFrame, roomPresentation, sourceLabel, targetBounds } from './roomState';
import { DIRECTIONS } from './officeLayout';
import { playFoley } from './sound';

export function Office({ state, direction, activeView, started, canContinue, reducedMotion, onContinue, onTurn, onOpen, onInspectCopy, onUseCopy, onStart }: {
  state: RoundState; direction: number; activeView: View; started: boolean; canContinue: boolean; reducedMotion: boolean;
  onContinue: () => void; onTurn: (value: number) => void; onOpen: (view: View) => void; onInspectCopy: (id: string) => void; onUseCopy: (target: 'desk' | 'board') => void; onStart: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const engine = useRef<Phaser.Game | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [ready, setReady] = useState(false);
  const [retry, setRetry] = useState(0);
  const [size, setSize] = useState({ width: 1440, height: 810 });
  const roomState = useMemo(() => roomPresentation(state, activeView), [state.objects, state.current, state.deskCopy, state.boardSources, state.boardLayout, activeView]);
  const latest = useRef({ direction, activeView, reducedMotion, roomState }); latest.current = { direction, activeView, reducedMotion, roomState };
  const focused = activeView !== 'office';
  const frame = roomFrame(size.width, size.height, direction, false);
  const fallbackFrame = roomFrame(size.width, size.height, direction, focused);
  const copies = currentCopies(state), selected = selectedCopy(state);
  const placed = copies.filter(copy => copy.location === 'desk').sort((a, b) => a.recordId === roomState.deskCopy ? -1 : b.recordId === roomState.deskCopy ? 1 : 0);
  useEffect(() => { if (!started) cover.current?.querySelector<HTMLButtonElement>('button')?.focus(); }, [started]);
  useEffect(() => {
    if (!host.current) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(host.current); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reducedMotion) { setReady(false); return; }
    let disposed = false;
    Promise.all([import('phaser'), import('./OfficeScene')]).then(([{ default: Phaser }, { OfficeScene }]) => {
      if (disposed || !host.current) return;
      try {
        const instance = new Phaser.Game({ type: Phaser.CANVAS, parent: host.current, width: host.current.clientWidth, height: host.current.clientHeight,
          backgroundColor: '#303a35', banner: false, audio: { noAudio: true }, scale: { mode: Phaser.Scale.RESIZE }, scene: OfficeScene,
          callbacks: { preBoot: game => { for (const [key, value] of Object.entries(latest.current)) game.registry.set(key, value); } },
          fps: { target: 60, limit: 60 }, input: { keyboard: false, mouse: false, touch: false },
        });
        engine.current = instance;
        instance.events.on('office-ready', () => { if (!disposed) setReady(true); });
        instance.events.on('office-error', () => { if (!disposed) { setUnavailable(true); setReady(false); } });
      } catch { setUnavailable(true); }
    }).catch(() => { if (!disposed) setUnavailable(true); });
    return () => { disposed = true; engine.current?.destroy(true); engine.current = null; };
  }, [retry, reducedMotion]);
  useEffect(() => { for (const [key, value] of Object.entries(latest.current)) engine.current?.registry.set(key, value); }, [direction, activeView, reducedMotion, roomState]);
  const activate = (view: View) => { if (selected && (view === 'dossier' || view === 'board')) onUseCopy(view === 'board' ? 'board' : 'desk'); else onOpen(view); };
  const objects = ROOM_OBJECTS.filter(object => object.direction === direction);
  return <section className={`office pointclick-office ${focused ? 'object-focused' : ''} ${ready && !unavailable && !reducedMotion ? 'scene-ready' : ''}`} aria-label={`Bank office · ${DIRECTIONS[direction]}`}>
    <div ref={host} className="office-canvas" aria-hidden="true" />
    <div className="room-fallback" aria-hidden="true" style={{ left: fallbackFrame.x, top: fallbackFrame.y, width: ROOM_SIZE.width * fallbackFrame.scale, height: ROOM_SIZE.height * fallbackFrame.scale }}>
      <img src={ROOM_ART[direction]} alt="" />
      {objects.map(object => <img key={object.id} src={object.states[object.id === 'board' ? 'empty' : roomState.states[object.id]]} alt="" style={{ left: `${object.x / 16}%`, top: `${object.y / 9}%`, width: `${object.width / 16}%`, height: `${object.height / 9}%` }} />)}
      {direction === 2 ? state.boardSources.map((source, slot) => { const p = boardPaperRect(source, slot, state.boardLayout); return <div key={source} className="fallback-board-paper" style={{ left: `${p.x / 16}%`, top: `${p.y / 9}%`, width: `${p.width / 16}%`, height: `${p.height / 9}%` }} />; }) : null}
      {direction === 0 && placed.length ? <img src={ROOM_COPY.states.placed} alt="" style={{ left: `${ROOM_COPY.x / 16}%`, top: `${ROOM_COPY.y / 9}%`, width: `${ROOM_COPY.width / 16}%`, height: `${ROOM_COPY.height / 9}%` }} /> : null}
    </div>
    {unavailable ? <div className="renderer-notice" role="status">Using the still room. Every object remains available. <button onClick={() => { setUnavailable(false); setReady(false); setRetry(n => n + 1); }}>Retry animation</button></div> : null}
    {!started ? <div ref={cover} className="opening-paper"><div className="opening-mark" aria-hidden="true" /><h1>The Credit Desk</h1>
      {canContinue ? <><button className="primary" onClick={onContinue}>Continue saved shift <Arrow /></button><button onClick={onStart}>New shift</button></> : <button className="primary" onClick={onStart}>Start a shift <Arrow /></button>}
      <button className="text-button" onClick={() => onOpen('help')}>How assessment works</button>
    </div> : !focused ? <>
      <div className="scene-targets" style={{ left: frame.x, top: frame.y, width: ROOM_SIZE.width * frame.scale, height: ROOM_SIZE.height * frame.scale }}>
        {objects.map(object => <button id={`object-${object.view}`} key={object.id} className={`scene-object object-${object.id} ${selected && ['dossier', 'board'].includes(object.view) ? 'accepts-item' : ''}`} style={targetBounds(object)} data-object-state={roomState.states[object.id]} aria-label={selected && ['dossier', 'board'].includes(object.view) ? `Place ${selected.recordId} on ${object.view === 'board' ? 'board' : 'desk'}` : object.label} onClick={() => activate(object.view)}><span>{selected && ['dossier', 'board'].includes(object.view) ? `Place ${selected.recordId}` : object.label}<Arrow /></span></button>)}
        {direction === 0 && placed.length ? <button className="scene-object placed-copy" style={targetBounds(ROOM_COPY)} aria-label={`Inspect desk copy ${placed[0].recordId}`} onClick={() => onInspectCopy(placed[0].recordId)}><span>{placed[0].recordId}<Arrow /></span></button> : null}
        {direction === 2 ? <div className="room-board-labels" aria-hidden="true">{state.boardSources.map((source, i) => { const p = boardPaperRect(source, i, state.boardLayout); return <span key={source} style={{ left: `${(p.x + 20) / 16}%`, top: `${(p.y + 30) / 9}%` }}>{sourceLabel(source)}</span>; })}</div> : null}
      </div>
      <div className="compact-objects" aria-label="Objects on this wall">{objects.map(object => <button key={object.id} onClick={() => activate(object.view)}>{selected && ['dossier', 'board'].includes(object.view) ? `Place ${selected.recordId} on ${object.view === 'board' ? 'board' : 'desk'}` : object.label}</button>)}{direction === 0 && placed.length ? <button onClick={() => onInspectCopy(placed[0].recordId)}>Read {placed[0].recordId}</button> : null}</div>
    </> : null}
    {!focused ? <div className="room-navigation" aria-label="Look around the office"><button aria-label="Look left" onClick={() => { playFoley('wood', state.settings.sound); onTurn(direction - 1); }}><Arrow left /></button><span>{DIRECTIONS[direction]}<small>{direction + 1} / 4</small></span><button aria-label="Look right" onClick={() => { playFoley('wood', state.settings.sound); onTurn(direction + 1); }}><Arrow /></button></div> : null}
  </section>;
}
