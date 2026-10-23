import { useState } from 'react';
import { CASES } from '../content';
import { sourceExcerpts } from '../domain/sourceExcerpts';
import type { Game } from '../ui/types';

interface ConceptProps {
  game: Game;
  onOpen: (screen: string) => void;
}

const TOPICS = [
  { id: 'application', label: 'Application' },
  { id: 'income', label: 'Income' },
  { id: 'purpose', label: 'Purpose' },
  { id: 'reserves', label: 'Reserves' },
] as const;
type Topic = typeof TOPICS[number]['id'];
interface HistoryEntry { topic: Topic; index: number; text: string }

export function ConceptMeeting(props: ConceptProps) {
  return <MeetingSource key={CASES[props.game.state.current].id} {...props} />;
}

function MeetingSource({ game, onOpen }: ConceptProps) {
  const file = CASES[game.state.current];
  const excerpts = sourceExcerpts(file);
  const sources: Record<Topic, string[]> = { application: file.narrative, income: excerpts.income, purpose: excerpts.purpose, reserves: excerpts.reserves };
  const [topic, setTopic] = useState<Topic>('application');
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>(() => file.narrative[0] ? [{ topic: 'application', index: 0, text: file.narrative[0] }] : []);
  const [showHistory, setShowHistory] = useState(false);
  const [message, setMessage] = useState('');
  const text = sources[topic][index] ?? '';
  const label = TOPICS.find(item => item.id === topic)!.label;
  const locked = game.state.phase === 'submitted';
  const unavailable = game.busy || game.stale || !!game.recovery;

  const read = (nextTopic: Topic, nextIndex = 0) => {
    const paragraph = sources[nextTopic][nextIndex];
    if (!paragraph) return;
    setTopic(nextTopic); setIndex(nextIndex); setShowHistory(false); setMessage('');
    setHistory(old => old.some(entry => entry.topic === nextTopic && entry.index === nextIndex) ? old : [...old, { topic: nextTopic, index: nextIndex, text: paragraph }]);
  };
  const saveExcerpt = () => {
    if (locked || unavailable || !text) return;
    const old = game.state.drafts[file.id].notes;
    const next = `${old}${old ? '\n\n' : ''}[${file.id} · ${file.name} · Meeting source · ${label} · Branch records]\n${text}`;
    if (next.length > 20000) { setMessage('Notes are full. Edit your notes before adding another excerpt.'); return; }
    game.send({ type: 'draft', patch: { notes: next } });
    setMessage('Excerpt added to personal notes with its source.');
  };

  return <section className="cs-meeting" aria-labelledby="cs-meeting-title">
    <div className="cs-meeting-line">
      <header className="cs-meeting-header">
        <span className="cs-portrait-notice">Hình nhân vật mẫu</span>
        <h2 id="cs-meeting-title">Trích từ hồ sơ · {file.name}</h2>
        <p className="cs-source-caption">{file.id} · {label} · Lời khai và quan sát chi nhánh, giữ nguyên nguồn.</p>
      </header>
      <div className="cs-meeting-reader" tabIndex={0} aria-label={showHistory ? 'Meeting source history' : 'Current source excerpt'}>
        {showHistory ? <ol className="cs-meeting-history">
          {history.map(entry => <li key={`${entry.topic}-${entry.index}`}><button type="button" onClick={() => read(entry.topic, entry.index)}>
            <strong>{TOPICS.find(item => item.id === entry.topic)!.label}</strong><span>{entry.text}</span>
          </button></li>)}
        </ol> : <p className="cs-meeting-excerpt">{text || 'Chưa có trích đoạn được cung cấp cho chủ đề này.'}</p>}
      </div>
    </div>
    <nav className="cs-meeting-topics" aria-label="Authored source topics">
      <h3>Topics</h3>
      {TOPICS.map(item => <button type="button" key={item.id} aria-pressed={topic === item.id && !showHistory}
        disabled={!sources[item.id].length} onClick={() => read(item.id)}>{item.label}</button>)}
    </nav>
    <div className="cs-meeting-actions">
      <button type="button" disabled={showHistory || index + 1 >= sources[topic].length} onClick={() => read(topic, index + 1)}>Continue</button>
      <button type="button" aria-pressed={showHistory} onClick={() => { setShowHistory(value => !value); setMessage(''); }}>{showHistory ? 'Current excerpt' : 'History'}</button>
      <button type="button" disabled={locked || unavailable || !text || showHistory} onClick={saveExcerpt}>Save excerpt</button>
      <button type="button" onClick={() => onOpen('dossier')}>Open dossier</button>
      <button type="button" onClick={() => onOpen('room')}>End conversation</button>
      {message ? <p className="cs-meeting-status" role="status">{message}</p> : null}
    </div>
  </section>;
}
