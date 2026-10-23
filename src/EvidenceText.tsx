import { useEffect, useRef, useState } from 'react';
import { CASES } from '../content';
import type { Game } from './types';

export function EvidenceText({ game, text, sourceLabel }: { game: Game; text: string[]; sourceLabel: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [excerpt, setExcerpt] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => { setExcerpt(''); setMessage(''); }, [sourceLabel]);
  const rememberSelection = () => {
    if (game.state.phase === 'submitted') return;
    const selected = window.getSelection();
    if (!selected?.anchorNode || !selected.focusNode || !root.current?.querySelector('.prose')?.contains(selected.anchorNode) || !root.current.querySelector('.prose')?.contains(selected.focusNode)) return;
    const value = selected.toString().trim();
    setExcerpt(value.length <= 1500 ? value : '');
    setMessage(value.length > 1500 ? 'Select a shorter excerpt to add to notes.' : '');
  };
  const clip = (value = excerpt) => {
    if (game.stale || game.recovery || game.busy || game.state.phase === 'submitted') return;
    const file = CASES[game.state.current];
    const old = game.state.drafts[file.id].notes;
    const next = `${old}${old ? '\n\n' : ''}[${sourceLabel}]\n${value}`;
    if (next.length > 20000) { setMessage('Notes are full. Edit your notes before adding another excerpt.'); return; }
    game.send({ type: 'draft', patch: { notes: next } });
    setExcerpt(''); setMessage('Excerpt added to your personal notes.');
  };
  return <div ref={root} className="evidence-text" onPointerUp={event => { if (!(event.target as HTMLElement).closest('button')) rememberSelection(); }} onKeyUp={rememberSelection}>
    {game.learning && game.state.phase !== 'submitted' && <p className="learning-excerpt-tip">Select text to keep a short excerpt, or use + Note for a whole paragraph.</p>}
    <div className="prose">{text.map((paragraph, i) => <div className="source-paragraph" key={i}><p>{paragraph}</p>{game.state.phase !== 'submitted' ? <button className="collect-paragraph" aria-label={`Save paragraph ${i + 1} to notes`} onClick={() => clip(paragraph)}>+ Note</button> : null}</div>)}</div>
    {excerpt ? <div className="excerpt-tools"><span>{excerpt.length} characters selected</span><button onMouseDown={event => event.preventDefault()} onClick={() => clip()}>Add excerpt to notes</button><button className="text-button" onClick={() => setExcerpt('')}>Dismiss</button></div> : null}
    {message ? <p className="fine excerpt-status" role="status">{message} <button className="text-button" onClick={() => game.send({ type: 'view', view: 'board' })}>Read notes on board</button></p> : null}
  </div>;
}
