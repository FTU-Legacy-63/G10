import { CASES } from '../content';
import { validateDecision } from '../domain/finance';
import type { Game } from '../ui/types';

export function IncomingTray({ game, onFirst, onResume, onAdvance, advancing }: {
  game: Game; onFirst: () => void; onResume: () => void; onAdvance: () => void; advancing: boolean;
}) {
  const { state } = game;
  const tail = CASES[state.reached - 1];
  const atTail = state.current === state.reached - 1;
  const incomplete = validateDecision(state.drafts[tail.id], tail);
  const blocked = game.busy || game.stale || !!game.recovery || advancing;
  return <>
    <div className="ip-tray-folder-label">{state.started ? <><strong>{tail.id}</strong><span>{tail.name}</span></> : <span>Incoming dossier</span>}</div>
    <section className="ip-tray-controls" aria-labelledby="ip-tray-title"><h2 id="ip-tray-title">Incoming dossiers</h2>
      {!state.started ? <><p>Open the first dossier when you are ready.</p><button className="cs-primary" onClick={onFirst} disabled={blocked}>Open first dossier</button></> : <>
        <p>{state.reached} of {CASES.length} dossiers opened</p>
        <button className="cs-primary" onClick={onResume} disabled={blocked}>Resume current dossier</button>
        <button onClick={onAdvance} disabled={blocked || !atTail || !!incomplete || state.phase === 'submitted'}>{state.reached === CASES.length ? 'Review round' : 'Open next dossier'}</button>
        <p className="ip-tray-helper">{!atTail ? 'Return to the current intake dossier to continue.' : incomplete ? 'Complete the current decision and required inputs to continue.' : state.phase === 'submitted' ? 'Submitted · Read-only' : 'Your decision can still be edited before Submit.'}</p>
      </>}
    </section>
  </>;
}
