import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { currentCopies } from '../application/objectActions';
import { CASES, WAREHOUSE } from '../content';
import { searchError, searchRecords } from '../domain/search';
import { ScrollCue } from '../ui/ScrollCue';
import type { Game } from '../ui/types';

const PROVINCES = [...new Set(WAREHOUSE.map(record => record.province))].sort((a, b) => a.localeCompare(b, 'vi'));

function TerminalScroll({ game, readerId, label, children, className = '' }: {
  game: Game; readerId: string; label: string; children: ReactNode; className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);
  const latest = useRef(game);
  latest.current = game;
  useLayoutEffect(() => {
    if (element.current) element.current.scrollTop = latest.current.state.scroll[readerId] ?? 0;
  }, [readerId]);
  return <div ref={element} className={`cs-terminal-scroll ${className}`} role="region" aria-label={label} tabIndex={0} onScroll={event => {
    if (event.target !== event.currentTarget) return;
    const top = event.currentTarget.scrollTop;
    if (Math.abs((latest.current.state.scroll[readerId] ?? 0) - top) > 8) latest.current.send({ type: 'scroll', key: readerId, top });
  }}>{children}{game.learning && <ScrollCue target={element} refresh={readerId} />}</div>;
}

export function ConceptTerminal({ game, service, onOpen }: {
  game: Game; service: 'warehouse' | 'cic'; onOpen: (screen: string) => void;
}) {
  const { state, send } = game;
  const file = CASES[state.current];
  const draft = state.drafts[file.id];
  const locked = state.phase === 'submitted';
  const [form, setForm] = useState(state.query);
  const [touched, setTouched] = useState(false);
  const [readOnlyCic, setReadOnlyCic] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const error = searchError(form);
  const searched = !searchError(state.query);
  const results = useMemo(() => searchRecords(WAREHOUSE, state.query, state.seed), [state.query, state.seed]);
  const selected = WAREHOUSE.find(record => record.id === state.selectedRecord);
  const physicalCopy = currentCopies(state).find(copy => copy.recordId === selected?.id);
  const cicVisible = draft.cicOpened || readOnlyCic === file.id;
  const patch = (value: Partial<typeof form>) => setForm(previous => ({ ...previous, ...value }));

  useEffect(() => { setForm(state.query); }, [state.query]);
  useEffect(() => { heading.current?.focus(); }, [service, state.selectedRecord, cicVisible]);

  function openService(page: 'warehouse' | 'cic') {
    send({ type: 'object', action: { kind: 'terminal-page', page } });
    onOpen(page);
  }
  function backToResults() {
    const recordId = selected?.id;
    send({ type: 'record', id: null });
    if (recordId) requestAnimationFrame(() => document.getElementById(`cs-record-${recordId}`)?.focus());
  }
  function readCopy() {
    if (!selected) return;
    if (game.inspectCopy) game.inspectCopy(selected.id);
    else onOpen('copy');
  }

  return <section className="cs-terminal" data-service={service} data-mode={service === 'cic' ? cicVisible ? 'cic-reader' : 'cic-idle' : selected ? 'record' : searched ? 'results' : 'idle'} aria-label="Research terminal">
    <nav className="cs-terminal-services" aria-label="Terminal services">
      <button type="button" className="cs-terminal-service" aria-pressed={service === 'warehouse'} onClick={() => openService('warehouse')}>Warehouse</button>
      <button type="button" className="cs-terminal-service" aria-pressed={service === 'cic'} onClick={() => openService('cic')}>CIC</button>
    </nav>
    <div className="cs-terminal-case"><strong>{file.id}</strong><span>{file.name}</span>{game.learning && <span className="learning-identity">{file.age} · {file.province} · Application details</span>}{locked ? <span>Read-only</span> : null}</div>
    <div className="cs-terminal-content">
      {service === 'cic' ? <section className="cs-terminal-cic">
        <h2 className="cs-terminal-title" ref={heading} tabIndex={-1}>Credit record</h2>
        {!cicVisible ? <div className="cs-terminal-cic-gate">
          <p>Open the applicant’s CIC source to read their credit history and individual payments.</p>
          <button type="button" onClick={() => {
            if (locked) setReadOnlyCic(file.id);
            else send({ type: 'draft', patch: { cicOpened: true } });
          }}>Check CIC</button>
        </div> : <>
          <div className="cs-terminal-actions">
            <span className="cs-terminal-status">Source: {file.id} · CIC</span>
            <button type="button" disabled={locked} onClick={() => send({ type: 'board', source: `cic:${file.id}` })}>
              {state.boardSources.includes(`cic:${file.id}`) ? 'Remove from comparison' : 'Add to comparison'}
            </button>
          </div>
          <TerminalScroll game={game} readerId={`concept:cic:${file.id}`} label={`${file.id} CIC source`} className="cs-terminal-document">
            {file.cic.map((paragraph, index) => <p className="cs-terminal-paragraph" key={index}>{paragraph}</p>)}
          </TerminalScroll>
        </>}
      </section> : selected ? <section className="cs-terminal-record">
        <div className="cs-terminal-record-header">
          <button type="button" className="cs-terminal-back" onClick={backToResults}>Back to results</button>
          <span className="cs-terminal-id">{selected.id}</span>
        </div>
        <h2 className="cs-terminal-title" ref={heading} tabIndex={-1}>{selected.name}</h2>
        <p className="cs-terminal-profile">{selected.age} · {selected.province}</p>
        <TerminalScroll game={game} readerId={`concept:record:${selected.id}`} label={`${selected.id} documents`} className="cs-terminal-document">
          <p className="cs-terminal-headline">{selected.headline}</p>
          {selected.documents.map((paragraph, index) => <p className="cs-terminal-paragraph" key={index}>{paragraph}</p>)}
        </TerminalScroll>
        <div className="cs-terminal-actions">
          <button type="button" disabled={locked} aria-pressed={draft.pin === selected.id} onClick={() => send({ type: 'draft', patch: { pin: game.learning && draft.pin === selected.id ? null : selected.id } })}>{game.learning ? draft.pin === selected.id ? 'Detach record' : 'Attach record' : 'Use this record'}</button>
          <button type="button" disabled={locked || !!physicalCopy && physicalCopy.location !== 'inventory'} onClick={() => send({ type: 'object', action: { kind: 'take-copy', recordId: selected.id } })}>
            {physicalCopy ? physicalCopy.location === 'inventory' ? 'Select copy' : `Copy on ${physicalCopy.location}` : game.learning ? 'Make a copy' : 'Take copy'}
          </button>
          {physicalCopy ? <button type="button" onClick={readCopy}>Read copy</button> : null}
        </div>
        {game.learning ? <>
          <p className="learning-record-status" role="status">Assessment source: {draft.pin ?? 'Not attached'} · Copy: {physicalCopy ? physicalCopy.location === 'inventory' ? 'Carried' : `On ${physicalCopy.location}` : 'Not made'}</p>
          <details className="learning-terminal-help"><summary>Attachment & copies</summary><p>Attach records your evidence choice for {file.id}; it does not confirm a match. Make a copy to carry to the desk or board. These are separate actions.</p></details>
        </> : <>
          {draft.pin === selected.id ? <p className="cs-terminal-status" role="status">Selected for {file.id}: {selected.id}</p> : null}
          {physicalCopy ? <p className="cs-terminal-copy-status">Copy collected for {file.id} · {physicalCopy.location === 'inventory' ? 'carried' : `on ${physicalCopy.location}`}</p> : null}
        </>}
      </section> : <>
        <form className="cs-terminal-search" onSubmit={event => {
          event.preventDefault();
          setTouched(true);
          if (error) return;
          send({ type: 'query', value: form });
          send({ type: 'record', id: null });
        }}>
          <div className="cs-terminal-fields">
            <label className="cs-terminal-field cs-terminal-name"><span>Name · required</span><input name="concept-search-name" autoComplete="off" maxLength={100} value={form.name} onChange={event => patch({ name: event.target.value })} aria-invalid={touched && !form.name.trim() || undefined} aria-describedby={touched && error ? 'cs-search-error' : undefined} /></label>
            <label className="cs-terminal-field"><span>Age / range</span><input name="concept-search-age" inputMode="text" maxLength={30} value={form.age} onChange={event => patch({ age: event.target.value })} /></label>
            <label className="cs-terminal-field"><span>Province</span><select name="concept-search-province" value={form.province} onChange={event => patch({ province: event.target.value })}><option value="">Any province</option>{PROVINCES.map(province => <option key={province}>{province}</option>)}</select></label>
            <button type="submit">Search</button>
          </div>
          <div className="cs-terminal-options">
            <label><input type="checkbox" checked={form.strict} onChange={event => patch({ strict: event.target.checked })} />Exact diacritics</label>
            <label><input type="checkbox" checked={form.fuzzy} onChange={event => patch({ fuzzy: event.target.checked })} />One character difference per word</label>
          </div>
          {touched && error ? <p id="cs-search-error" className="cs-terminal-error" role="alert">{error}</p> : null}
        </form>
        <TerminalScroll game={game} readerId={`concept:results:${state.query.name.slice(0, 60)}:${state.query.age}:${state.query.province.slice(0, 30)}:${+state.query.strict}${+state.query.fuzzy}`} label="Warehouse search results" className="cs-terminal-results">
          <h2 className="cs-terminal-title" ref={heading} tabIndex={-1}>{searched ? `${results.length} ${results.length === 1 ? 'record' : 'records'}` : 'Income verification directory'}</h2>
          {!searched ? <p className="cs-terminal-empty">Search the shared directory of {WAREHOUSE.length} records. Open a record to read its documents.</p> : results.length === 0 ? <p className="cs-terminal-empty" role="status">No records found. Widen the name search or remove an optional filter.</p> : <ul className="cs-terminal-result-list">{results.map(record => <li key={record.id}>
            <button id={`cs-record-${record.id}`} type="button" className="cs-terminal-row" onClick={() => send({ type: 'record', id: record.id })}>
              <span className="cs-terminal-id">{record.id}</span><strong>{record.name}</strong><span className="cs-terminal-profile">{record.age} · {record.province}</span><span className="cs-terminal-headline">{record.headline}</span>
            </button>
          </li>)}</ul>}
        </TerminalScroll>
      </>}
    </div>
    {service === 'warehouse' && draft.pin && (!game.learning || !selected) ? <div className="cs-terminal-pin"><span>{game.learning ? 'Assessment source' : `Selected for ${file.id}`}: {draft.pin}</span><button type="button" disabled={locked} onClick={() => send({ type: 'draft', patch: { pin: null } })}>{game.learning ? 'Detach record' : 'Clear selection'}</button></div> : null}
  </section>;
}
