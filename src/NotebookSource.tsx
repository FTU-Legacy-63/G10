import { useId } from 'react';
import { CASES, WAREHOUSE } from '../content';
import { currentCopies } from '../application/objectActions';
import { EvidenceText } from '../ui/EvidenceText';
import { ReadingPane } from '../ui/ReadingPane';
import type { Game } from '../ui/types';

/** Re-read sources already opened/attached/collected by this learner; never infer a match. */
export function NotebookSource({ game, selected, onSelect }: { game: Game; selected: string; onSelect: (id: string) => void }) {
  const file = CASES[game.state.current], draft = game.state.drafts[file.id], id = useId();
  const records = [...new Set([...(draft.pin ? [draft.pin] : []), ...currentCopies(game.state).map(copy => copy.recordId)])];
  const sources = [
    { id: 'application', label: `${file.id} · Application`, text: file.narrative },
    ...(draft.cicOpened ? [{ id: 'cic', label: `${file.id} · CIC`, text: file.cic }] : []),
    ...records.flatMap(recordId => { const record = WAREHOUSE.find(row => row.id === recordId); return record ? [{ id: record.id, label: `${record.id} · ${record.name}`, text: record.documents }] : []; }),
  ];
  const source = sources.find(item => item.id === selected) ?? sources[0];
  return <div className="cs-notebook-source">
    <header><span>{file.id}</span><h2>{file.name}</h2><label className="learning-source-picker" htmlFor={id}>Reference source<select id={id} value={source.id} onChange={e => onSelect(e.target.value)}>{sources.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></header>
    <ReadingPane game={game} id={`integration:notebook-source:${file.id}:${source.id}`} className="cs-scroll" label="Notebook reference source"><EvidenceText game={game} sourceLabel={source.label} text={source.text} /></ReadingPane>
  </div>;
}
