import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { CASES } from '../content';
import { money, validateDecision } from '../domain/finance';
import { sourceExcerpts } from '../domain/sourceExcerpts';
import { DOSSIER_TABS } from '../domain/types';
import type { DossierTab } from '../domain/types';
import { ScrollCue } from '../ui/ScrollCue';
import type { Game } from '../ui/types';

interface ConceptProps {
  game: Game;
  onOpen: (screen: string) => void;
  advancing?: boolean;
  physical?: boolean;
  continueLabel?: string;
}

const TAB_NAMES: Record<DossierTab, string> = {
  application: 'Application',
  loan: 'Loan',
  income: 'Income & obligations',
  cic: 'Credit record',
  purpose: 'Purpose',
  reserves: 'Reserves',
  environment: 'Environment',
  collateral: 'Collateral',
};

export function ConceptDossier({ game, onOpen, advancing = false, physical = false, continueLabel }: ConceptProps) {
  const { state, send } = game;
  const file = CASES[state.current];
  const draft = state.drafts[file.id];
  const tab = state.dossierTabs[file.id];
  const tabs = DOSSIER_TABS.filter(id => id !== 'collateral' || file.product === 'Secured');
  const excerpts = sourceExcerpts(file);
  const reader = useRef<HTMLDivElement>(null);
  const readerKey = `concept:dossier:${file.id}:${tab}`;
  const latest = useRef(game);
  latest.current = game;
  const [attempted, setAttempted] = useState(false);

  const error = validateDecision(draft, file);
  const locked = state.phase === 'submitted';
  const unavailable = game.busy || game.stale || !!game.recovery;

  useLayoutEffect(() => {
    if (reader.current) reader.current.scrollTop = latest.current.state.scroll[readerKey] ?? 0;
  }, [readerKey]);

  useEffect(() => { setAttempted(false); }, [file.id]);


  const selectTab = (value: DossierTab) => send({ type: 'tab', value });
  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, value: DossierTab) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
      (tabs.indexOf(value) + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    selectTab(tabs[next]);
    document.getElementById(`cs-dossier-tab-${tabs[next]}`)?.focus();
  };
  const paragraphs = tab === 'application' ? file.narrative :
    tab === 'income' ? excerpts.income :
    tab === 'purpose' ? excerpts.purpose :
    tab === 'reserves' ? excerpts.reserves :
    tab === 'environment' ? excerpts.environment : [];

  return <section className={`cs-dossier${physical ? ' cs-dossier-physical' : ''}`} aria-labelledby="cs-dossier-title">
    <header className="cs-dossier-header">
      <div><span className="cs-source-id">{file.id}</span><h2 id="cs-dossier-title">{file.name}</h2></div>
      {game.learning ? <div className="learning-header-meta"><span className="learning-application-number">Application {state.current + 1} of {CASES.length}</span><span className="cs-macro-label">Macro: Normal</span></div> : <span className="cs-macro-label">Macro: Normal</span>}
    </header>
    <nav className="cs-dossier-tabs" role="tablist" aria-label="Dossier sources" data-count={tabs.length}>
      {tabs.map(value => <button key={value} type="button" role="tab" id={`cs-dossier-tab-${value}`}
        aria-controls="cs-dossier-source" aria-selected={tab === value} tabIndex={tab === value ? 0 : -1}
        onClick={() => selectTab(value)} onKeyDown={event => moveTab(event, value)}>{TAB_NAMES[value]}</button>)}
    </nav>
    <div className="cs-dossier-layout">
      <div ref={reader} className="cs-dossier-reader" tabIndex={0} aria-label="Dossier reading pane" onScroll={event => {
        if (event.target !== event.currentTarget) return;
        const top = event.currentTarget.scrollTop;
        if (Math.abs((latest.current.state.scroll[readerKey] ?? 0) - top) > 8) {
          latest.current.send({ type: 'scroll', key: readerKey, top });
        }
      }}>
        <article className="cs-dossier-page" id="cs-dossier-source" role="tabpanel" aria-labelledby={`cs-dossier-tab-${tab}`}>
          <h3>{tab === 'application' ? 'Application & supporting evidence' : TAB_NAMES[tab]}</h3>
          <p className="cs-source-caption">{file.id} · Branch records · Read-only source</p>
          {tab === 'loan' ? <dl className="cs-source-facts">
            <div><dt>Product</dt><dd>{file.product}</dd></div>
            <div><dt>Requested amount</dt><dd>{money(file.principal)} VND</dd></div>
            <div><dt>Requested tenor</dt><dd>{file.requestedMonths} months</dd></div>
            <div><dt>Adjusted tenor</dt><dd>{file.appliedMonths} months</dd></div>
            <div><dt>Annual interest rate</dt><dd>{Math.round(file.annualRate * 100)}%</dd></div>
            <div><dt>Estimated monthly installment</dt><dd>{money(file.emi)} VND/month</dd></div>
          </dl> : null}
          {tab === 'income' ? <p className="cs-source-caption">Declared by the applicant; not verified.</p> : null}
          {paragraphs.map((paragraph, index) => <p className="cs-source-paragraph" key={`${tab}-${index}`}>{paragraph}</p>)}
          {tab === 'cic' ? <div className="cs-cic-entry">
            <p>Open the applicant’s CIC source to read the authored credit history and individual active payments.</p>
            <button type="button" onClick={() => onOpen('cic')}>Check CIC</button>
            {draft.cicOpened ? <p className="cs-source-caption">This source has been opened and can be read again.</p> : null}
          </div> : null}
          {tab === 'collateral' && file.product === 'Secured' ? <dl className="cs-source-facts">
            {file.collateral.map(([field, value]) => <div key={field}><dt>{field}</dt><dd>{value}</dd></div>)}
          </dl> : null}
        </article>
        {game.learning && <ScrollCue target={reader} refresh={readerKey} />}
      </div>
      <aside className="cs-dossier-actionrail" aria-label="Dossier actions">
        <div className={game.learning ? 'learning-actions-content' : undefined} style={!game.learning ? { display: 'contents' } : undefined}>
        <button type="button" onClick={() => onOpen('document')}>Open document</button>
        <button type="button" onClick={() => onOpen('worksheet')}>Your worksheet</button>
        <button type="button" onClick={() => onOpen('decision')}>Your decision</button>
        <p className="cs-draft-status" role="status">{locked ? 'Submitted · read-only' : game.saveError ? 'Draft is not saved' : physical && !draft.decision ? 'No decision yet' : game.learning ? error ? 'Decision recorded · Required input missing' : 'Saved · Required inputs complete' : 'Draft saved'}</p>
        {game.learning && <>
          <div className="learning-source-status"><span>CIC: {draft.cicOpened ? 'Opened' : 'Not opened'}</span><span>Assessment source: {draft.pin ?? 'Not attached'}</span></div>
          {game.learning.firstStep && <p className="learning-first-step"><strong>First application</strong>{game.learning.firstStep}</p>}
          <button type="button" className="learning-reference" onClick={() => game.learning?.openGuide('Apply the rules in order')}>Read assessment rules</button>
        </>}

        {attempted && error ? <p className="cs-field-error" role="alert">{error}</p> : null}
        </div>
        {!locked ? <button type="button" className="cs-continue" disabled={unavailable || advancing || physical && !!error} onClick={() => {
          setAttempted(true);
          if (error || unavailable) return;
          send({ type: 'continue' });
        }}>{continueLabel ?? `Save & ${state.current === CASES.length - 1 ? 'review' : 'continue'}`}</button> : null}
      </aside>
    </div>
  </section>;
}
