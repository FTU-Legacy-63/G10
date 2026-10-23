import { CASES } from '../content';
import { EvidenceText } from './EvidenceText';
import type { Game } from './types';

export function CicView({ game }: { game: Game }) {
  const file = CASES[game.state.current], draft = game.state.drafts[file.id];
  return <section className="cic-terminal document-body"><h3>Credit record · {file.id}</h3><p>Request the applicant’s CIC source to read their credit history and individual active payments.</p>{!draft.cicOpened && game.state.phase !== 'submitted' ? <button className="primary" onClick={() => { game.send({ type: 'draft', patch: { cicOpened: true } }); requestAnimationFrame(() => document.getElementById('cic-source-heading')?.focus()); }}>Check CIC</button> : <><div className="document-heading"><h4 id="cic-source-heading" tabIndex={-1}>CIC source</h4><button className="text-button" disabled={game.state.phase === 'submitted'} onClick={() => game.send({ type: 'board', source: `cic:${file.id}` })}>{game.state.boardSources.includes(`cic:${file.id}`) ? 'Remove from comparison' : 'Add to comparison'}</button></div><EvidenceText game={game} sourceLabel={`${file.id} · Credit record`} text={file.cic} /></>}</section>;
}
