import { CASES, WAREHOUSE } from '../content';
import { money } from '../domain/finance';
import { CicView } from './CicView';
import { EvidenceText } from './EvidenceText';
import { DOSSIER_TABS } from '../domain/types';
import { sourceExcerpts } from '../domain/sourceExcerpts';
import { ReadingPane } from './ReadingPane';
import type { Game } from './types';

export function DossierView({ game }: { game: Game }) {
  const { state, send } = game;
  const file = CASES[state.current];
  const draft = state.drafts[file.id];
  const tab = state.dossierTabs[file.id];
  const tabs = DOSSIER_TABS.filter(id => id !== 'collateral' || file.product === 'Secured');
  const tabNames = { application: 'Application', loan: 'Loan request', income: 'Income & debts', cic: 'Credit record', purpose: 'Purpose', reserves: 'Reserves', environment: 'Environment', collateral: 'Collateral' };
  const pinned = WAREHOUSE.find(r => r.id === draft.pin);
  const excerpts = sourceExcerpts(file);
  const addToBoard = (kind: string) => send({ type: 'board', source: `${kind}:${file.id}` });
  return <div className="dossier-content">
    <div className="document-tabs" role="tablist" aria-label="Dossier sources">
      {tabs.map(id =>
        <button key={id} role="tab" tabIndex={tab === id ? 0 : -1} aria-selected={tab === id} aria-controls="dossier-source" id={`tab-${id}`} onClick={() => send({ type: 'tab', value: id })} onKeyDown={event => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (tabs.indexOf(id) + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
          send({ type: 'tab', value: tabs[index] });
          document.getElementById(`tab-${tabs[index]}`)?.focus();
        }}>
          {tabNames[id]}
        </button>)}
    </div>
    <ReadingPane game={game} id={`dossier:${file.id}:${tab}`} className="dossier-page" label="Source reading pane"><section key={tab} className="document-body" id="dossier-source" role="tabpanel" aria-labelledby={`tab-${tab}`}>
      {tab === 'application' ? <>
        <div className="document-heading"><h3>Application & supporting evidence</h3><button className="text-button" onClick={() => addToBoard('dossier')} disabled={state.phase === 'submitted'}>{state.boardSources.includes(`dossier:${file.id}`) ? 'Remove from comparison' : 'Add to comparison'}</button></div>
        <p className="document-caption">Applicant statements and branch observations · read-only</p>
        <EvidenceText game={game} sourceLabel={`${file.id} · ${tabNames[tab]}`} text={file.narrative} />
        <div className="source-footer">Application file {file.id} · Branch records</div>
      </> : null}
      {tab === 'loan' ? <>
        <h3>Requested loan</h3><dl className="facts">
          <div><dt>Product</dt><dd>{file.product}</dd></div>
          <div><dt>Requested amount</dt><dd>{money(file.principal)} VND</dd></div>
          <div><dt>Requested tenor</dt><dd>{file.requestedMonths} months</dd></div>
          <div><dt>Adjusted tenor</dt><dd>{file.appliedMonths} months</dd></div>
          <div><dt>Annual interest rate</dt><dd>{Math.round(file.annualRate * 100)}%</dd></div>
          <div><dt>Estimated monthly installment</dt><dd>{money(file.emi)} VND/month</dd></div>
        </dl>
        <p className="muted">The installment is supplied. Income stated in the application has not been verified; use the Warehouse evidence and CIC record in your assessment.</p>
        <button onClick={() => send({ type: 'view', view: 'warehouse' })}>Search Warehouse</button>
      </> : null}
      {tab === 'cic' ? <CicView game={game} /> : null}
      {tab === 'collateral' ? <>
        <h3>Collateral sheet</h3><p className="document-caption">One real-estate asset offered for this loan · read-only</p>
        <dl className="facts">{file.collateral.map(([field, value]) => <div key={field}><dt>{field}</dt><dd>{value}</dd></div>)}</dl>
      </> : null}
      {tab === 'income' ? <>
        <h3>Declared income & obligations</h3><p className="document-caption">Original application excerpts · declared, not verified</p>
        <EvidenceText game={game} sourceLabel={`${file.id} · ${tabNames[tab]}`} text={excerpts.income} />
        <div className="source-actions"><button onClick={() => send({ type: 'view', view: 'warehouse' })}>Open Warehouse</button><button onClick={() => send({ type: 'tab', value: 'cic' })}>Check CIC source</button></div>
      </> : null}
      {tab === 'purpose' || tab === 'reserves' ? <>
        <h3>{tab === 'purpose' ? 'Purpose & supporting evidence' : 'Reserves & own contribution'}</h3>
        <p className="document-caption">Original application excerpts · read-only</p>
        <EvidenceText game={game} sourceLabel={`${file.id} · ${tabNames[tab]}`} text={excerpts[tab]} />
      </> : null}
      {tab === 'environment' ? <>
        <h3>Industry & macro environment</h3><p className="document-caption">Authored bank sector note · round macro: Normal</p>
        <EvidenceText game={game} sourceLabel={`${file.id} · ${tabNames[tab]}`} text={excerpts.environment} />
      </> : null}
    </section>
    <div className="pinned-strip"><span>Assessment record: <strong>{pinned ? `${pinned.id} · ${pinned.name} · ${pinned.age} · ${pinned.province}` : 'No record attached'}</strong></span><button className="text-button" onClick={() => { if (pinned) send({ type: 'record', id: pinned.id }); send({ type: 'view', view: 'warehouse' }); }}>{pinned ? 'Open attached record' : 'Open Warehouse'}</button></div>
    </ReadingPane>
  </div>;
}
