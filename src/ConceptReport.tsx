import { CASES } from '../content';
import { SummaryView } from '../ui/SummaryView';
import type { Game } from '../ui/types';

interface ConceptReportProps {
  game: Game;
  mode: 'summary' | 'detail';
  onDetail: (index: number) => void;
  onRestart: () => void;
  physical?: boolean;
}

export function ConceptReport({ game, mode, onDetail, onRestart, physical = false }: ConceptReportProps) {
  if (game.state.phase !== 'submitted') return <section className="cs-report cs-report-unavailable" role="status">
    The report is available after you explicitly confirm submission of the complete round.
  </section>;
  const index = game.state.current;
  const file = CASES[index];
  return <section className={`cs-report cs-report-${mode}`} aria-label={mode === 'summary' ? 'Whole-round final report' : `Final assessment · ${file.id}`}>
    {mode === 'detail' ? <nav className="cs-report-navigation" aria-label="Finalized dossier assessments">
      <button type="button" disabled={index === 0 || game.busy || game.stale || !!game.recovery} onClick={() => onDetail(index - 1)}>Previous dossier</button>
      <label className="cs-report-case-picker">Dossier
        <select value={index} disabled={game.busy || game.stale || !!game.recovery} onChange={event => onDetail(Number(event.target.value))}>
          {CASES.map((item, caseIndex) => <option key={item.id} value={caseIndex}>{item.id} · {item.name}</option>)}
        </select>
      </label>
      <button type="button" disabled={index === CASES.length - 1 || game.busy || game.stale || !!game.recovery} onClick={() => onDetail(index + 1)}>Next dossier</button>
    </nav> : null}
    <SummaryView game={game} mode={mode === 'summary' ? 'overview' : 'detail'} caseIndex={index} onDetail={onDetail} onRestart={onRestart} physical={physical} />
  </section>;
}
