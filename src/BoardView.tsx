import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { CASES, WAREHOUSE } from '../content';
import { boardPaperRect, sourceLabel } from '../game/roomState';
import { EvidenceText } from './EvidenceText';
import { ReadingPane } from './ReadingPane';
import type { Game } from './types';

function sourceContent(key: string) {
  const [kind, id] = key.split(':');
  if (kind === 'record') {
    const r = WAREHOUSE.find(r => r.id === id)!;
    return { title: `${r.id} · ${r.name} · ${r.age} · ${r.province}`, text: r.documents };
  }
  const file = CASES.find(c => c.id === id)!;
  return { title: `${id} · ${file.name} · ${kind === 'cic' ? 'CIC' : 'Application'}`, text: kind === 'cic' ? file.cic : file.narrative };
}
function PinnedCard({ game, source, slot, children }: { game: Game; source?: string; slot: number; children: ReactNode }) {
  const initial = source && game.state.boardLayout[source] || { x: slot * 100, y: slot * 20 };
  const [point, setPoint] = useState(initial);
  const pointRef = useRef(point); pointRef.current = point;
  const card = useRef<HTMLElement>(null);
  const drag = useRef<{ pointer: number; x: number; y: number; px: number; py: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  useEffect(() => { setPoint(initial); }, [initial.x, initial.y, source]);
  const locked = !source || game.state.phase === 'submitted';
  const constrain = (x: number, y: number) => ({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  const commit = (x: number, y: number) => { const next = constrain(x, y); setPoint(next); if (source) game.send({ type: 'board-move', source, ...next }); };
  const move = (dx: number, dy: number) => commit(point.x + dx, point.y + dy);
  const style = { '--pin-x': `${point.x * .54}%`, '--pin-y': `${point.y * .18}%`, '--paper-angle': slot ? '1deg' : '-1deg' } as CSSProperties;
  return <article ref={card} className={`comparison-card pinned-card ${dragging ? 'dragging' : ''}`} style={style}>
    <button className="pin-handle" aria-describedby="board-layout-description" disabled={locked} aria-label={`Move source ${slot + 1}; drag or use arrow keys`} onPointerDown={event => {
      if (locked) return; event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId);
      drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, px: point.x, py: point.y }; setDragging(true);
    }} onPointerMove={event => {
      const start = drag.current, parent = card.current?.parentElement;
      if (!start || !parent) return;
      const bounds = parent.getBoundingClientRect();
      const next = constrain(start.px + (event.clientX - start.x) / (bounds.width * .54) * 100, start.py + (event.clientY - start.y) / (bounds.height * .18) * 100);
      pointRef.current = next; setPoint(next);
    }} onPointerUp={() => { if (drag.current) commit(pointRef.current.x, pointRef.current.y); drag.current = null; setDragging(false); }} onPointerCancel={() => { drag.current = null; setPoint(initial); setDragging(false); }} onKeyDown={event => {
      const delta: Record<string, [number, number]> = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] };
      if (delta[event.key]) { event.preventDefault(); move(...delta[event.key]); }
    }}><span className="push-pin" aria-hidden="true" /><span>Source {slot + 1}</span><span aria-hidden="true">⠿</span></button>
    {children}
    <div className="pin-movement" aria-label={`Position source ${slot + 1}`}><span>Wall position</span>{[['left', -10, 0, '←'], ['up', 0, -10, '↑'], ['down', 0, 10, '↓'], ['right', 10, 0, '→']].map(([label, dx, dy, icon]) => <button key={String(label)} disabled={locked} aria-label={`Move source ${slot + 1} ${label}`} onClick={() => move(Number(dx), Number(dy))}>{icon}</button>)}</div>
  </article>;
}
export function BoardView({ game, onOpenSource }: { game: Game; onOpenSource?: (source: string) => void }) {
  const { state, send } = game;
  const file = CASES[state.current];
  const available = [...new Set([
    ...CASES.slice(0, state.reached).flatMap(c => [`dossier:${c.id}`, ...(state.drafts[c.id].cicOpened ? [`cic:${c.id}`] : [])]),
    ...Object.values(state.drafts).flatMap(d => d.pin ? [`record:${d.pin}`] : []),
    ...state.objects.copies.map(copy => `record:${copy.recordId}`),
    ...(state.selectedRecord ? [`record:${state.selectedRecord}`] : []), ...state.boardSources,
  ])];
  const openOriginal = (source: string) => {
    if (onOpenSource) { onOpenSource(source); return; }
    const [kind, id] = source.split(':');
    if (kind === 'record') { send({ type: 'record', id }); send({ type: 'view', view: 'warehouse' }); }
    else { send({ type: 'case', index: CASES.findIndex(c => c.id === id) }); send({ type: 'tab', value: kind === 'cic' ? 'cic' : 'application' }); }
  };
  return <div className="board-view">
    <div className="board-caption"><h3>Comparison board</h3><p className="fine">Pin two sources, arrange them and keep your own notes.</p></div>
    <div className="compact-board-layout"><h4>Wallboard layout</h4><div className="board-map" aria-label="Wallboard arrangement">{state.boardSources.map((source, slot) => { const p = boardPaperRect(source, slot, state.boardLayout); return <span key={source} style={{ left: `${(p.x - 345) / 9.1}%`, top: `${(p.y - 135) / 4.85}%`, width: `${p.width / 9.1}%`, height: `${p.height / 4.85}%` }}>{sourceLabel(source)}</span>; })}{!state.boardSources.length ? <p>No sources pinned</p> : null}</div><p id="board-layout-description" className="fine">Move buttons arrange this wallboard. Read the full documents below.</p></div>
    <div className="board-workbench"><div className="pinboard-stage" aria-label="Pinned evidence">
      {[0, 1].map(slot => {
        const source = state.boardSources[slot];
        const content = source ? sourceContent(source) : null;
        return <PinnedCard key={slot} game={game} source={source} slot={slot}>
          <label className="comparison-selector"><span className="sr-only">Source {slot + 1}</span><select aria-label={`Source ${slot + 1}`} value={source ?? ''} disabled={state.phase === 'submitted'} onChange={e => send({ type: 'board-slot', slot, source: e.target.value })}><option value="">Choose a source to pin</option>{available.map(s => <option key={s} value={s} disabled={state.boardSources.some((old, i) => i !== slot && old === s)}>{sourceContent(s).title}</option>)}</select></label>
          {source && content ? <><ReadingPane game={game} id={`compare:${source}`} label={`Source ${slot + 1} document`}><EvidenceText game={game} sourceLabel={content.title} text={content.text} /></ReadingPane><div className="comparison-actions"><button className="text-button" onClick={() => openOriginal(source)}>Open original</button><button className="text-button" disabled={state.phase === 'submitted'} onClick={() => send({ type: 'board', source })}>Unpin</button></div></> : <p className="empty-pin">Choose an application, an opened CIC source or a Warehouse record you have read.</p>}
        </PinnedCard>;
      })}
    </div><div className="board-notepaper"><span className="paper-tape" aria-hidden="true" /><label className="field notes-field">Personal notes · {file.name}<textarea rows={9} maxLength={20000} value={state.drafts[file.id].notes} disabled={state.phase === 'submitted'} onChange={e => send({ type: 'draft', patch: { notes: e.target.value } })} placeholder="Evidence, questions and reasoning…" /></label><p className="fine">Your working · unscored</p></div></div>
  </div>;
}
