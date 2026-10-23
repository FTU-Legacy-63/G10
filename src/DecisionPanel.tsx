import { useState } from 'react';
import { CASES } from '../content';
import { money, parseNumber, presentValue, validateDecision } from '../domain/finance';
import { COVENANTS, DECISIONS } from '../domain/types';
import { LearningHelp } from './LearningHelp';
import { Arrow } from './Primitives';
import type { Game } from './types';
export function DecisionPanel({ game, continueLabel, physical = false }: { game: Game; continueLabel?: string; physical?: boolean }) {
  const { state, send } = game;
  const file = CASES[state.current];
  const draft = state.drafts[file.id];
  const [attempted, setAttempted] = useState(false);
  const error = validateDecision(draft, file);
  const readOnly = state.phase === 'submitted';
  const showError = !!error && (attempted || !!game.learning && (!!draft.amount.trim() || draft.decision === 'Add conditions'));
  const parsed = parseNumber(draft.amount);
  return <aside className="decision-panel" aria-label="Your provisional decision">
    <h3>{readOnly ? 'Final decision' : 'Your decision'}</h3>
    <p className="fine">{readOnly ? 'This round has been submitted.' : 'Provisional until you submit the round.'}</p>
    <LearningHelp game={game} title="How do I choose?" text="Apply the public checks in order, using the application, income evidence and CIC. This help does not assess your choice. Your notebook is optional." chapter="Decision precedence" />
    <fieldset disabled={readOnly} className="decision-options"><legend className="sr-only">Choose one decision</legend>
      {DECISIONS.map(choice => <label key={choice} className={`decision-option ${draft.decision === choice ? 'selected' : ''}`}><input type="radio" name={`decision-${file.id}`} value={choice} checked={draft.decision === choice} onChange={() => { setAttempted(false); send({ type: 'decision', value: choice }); }} />{choice}</label>)}
    </fieldset>
    {!readOnly && draft.decision ? <p className="decision-helper fine">Changing the decision clears its amount or conditions. Your worksheet and notes stay.</p> : null}
    {(draft.decision === 'Reduce limit' || draft.decision === 'Require more collateral') ? <label className="field payload">
      {draft.decision === 'Reduce limit' ? 'Max installment (VND/month)' : 'Additional collateral (VND)'}
      <input type="text" inputMode="decimal" maxLength={100} value={draft.amount} disabled={readOnly} aria-invalid={showError} aria-describedby={game.learning ? 'decision-error number-format decision-limit' : 'decision-error number-format'} onChange={e => send({ type: 'draft', patch: { amount: e.target.value } })} onBlur={() => { if (draft.amount) setAttempted(true); }} />
      {game.learning && <span id="decision-limit" className="fine">{draft.decision === 'Reduce limit' ? `Enter a monthly payment, not the loan total. Maximum ${money(file.emi)} VND/month.` : `Enter the extra collateral value, not the total security. Maximum ${money(file.principal / .70)} VND.`}</span>}
      <span id="number-format" className="fine">Use 1234567 or 1,234,567.</span>
    </label> : null}
    {draft.decision === 'Reduce limit' && parsed !== null && !error ? <div className="pv-preview"><span>Proposed loan amount</span><strong>{money(presentValue(parsed, file.annualRate, file.appliedMonths))} VND</strong><span className="fine">Converted from your installment over {file.appliedMonths} months.</span></div> : null}
    {draft.decision === 'Add conditions' ? <fieldset className="covenants" disabled={readOnly}><legend>Attach at least one condition</legend>{COVENANTS.filter(c => file.product === 'Secured' || c.id !== 'reappraisal').map(c => <label key={c.id}><input type="checkbox" checked={draft.covenants.includes(c.id)} onChange={e => send({ type: 'draft', patch: { covenants: e.target.checked ? [...draft.covenants, c.id] : draft.covenants.filter(id => id !== c.id) } })} />{c.label}</label>)}</fieldset> : null}
    <div id="decision-error" className="field-error" role={showError ? 'alert' : undefined}>{showError ? error : null}</div>
    {!readOnly ? <button className="primary continue-button" onClick={() => { setAttempted(true); if (!error) send({ type: 'continue' }); }} disabled={game.busy || game.stale || !!game.recovery || physical && !!error}>{continueLabel ?? `Save & ${state.current === CASES.length - 1 ? 'review' : 'continue'}`} {!physical && <Arrow />}</button> : <button onClick={() => send({ type: 'view', view: 'summary' })}>Open Summary</button>}
    {!physical && <button className="text-button" onClick={() => send({ type: 'view', view: 'review' })}>Review opened dossiers</button>}
  </aside>;
}
