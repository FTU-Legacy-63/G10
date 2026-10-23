import { useLayoutEffect, useRef, useState } from 'react';
import { CASES } from '../content';
import { money } from '../domain/finance';
import { GUIDE_CHAPTERS } from '../ui/HelpView';
import { ScrollCue } from '../ui/ScrollCue';
import type { Game } from '../ui/types';

export function ConceptPaper({ game, mode, physical = false }: { game: Game; mode: 'document' | 'help' | 'briefing'; physical?: boolean }) {
  const { state } = game;
  const file = CASES[state.current];
  const [chapterIndex, setChapterIndex] = useState(0);
  const chapter = GUIDE_CHAPTERS[chapterIndex];
  const reader = useRef<HTMLDivElement>(null);
  const latest = useRef(game);
  latest.current = game;
  const readingKey = `concept:paper:${mode}:${mode === 'document' ? file.id : mode === 'help' ? chapterIndex : 'round'}`;

  useLayoutEffect(() => {
    if (reader.current) reader.current.scrollTop = latest.current.state.scroll[readingKey] ?? 0;
  }, [readingKey]);

  return <section className={`cs-paper cs-paper-${mode}`} aria-labelledby="cs-paper-title">
    <header className="cs-paper-header">
      <span className="cs-source-id">{mode === 'document' ? file.id : 'THE CREDIT DESK'}</span>
      <h2 id="cs-paper-title">{mode === 'document' ? 'Application & supporting evidence' : mode === 'help' ? 'How assessment works' : 'Your assignment'}</h2>
      <p className="cs-source-caption">{mode === 'document' ? `${file.name} · Read-only source` : mode === 'help' ? 'Public project rules · Reference guide' : 'Eight-case round · No time limit'}</p>
    </header>

    {mode === 'help' ? <nav className="cs-guide-contents" aria-label="Guide chapters">
      {GUIDE_CHAPTERS.map((item, index) => <button type="button" key={item.title}
        aria-current={index === chapterIndex ? 'page' : undefined}
        onClick={() => setChapterIndex(index)}>{index + 1}. {item.title}</button>)}
    </nav> : null}

    <div className="cs-paper-scroll" ref={reader} tabIndex={0} aria-label={mode === 'document' ? 'Original dossier source' : mode === 'help' ? 'Guide chapter' : 'Assignment instructions'}
      onScroll={event => {
        if (event.target !== event.currentTarget) return;
        const top = event.currentTarget.scrollTop;
        if (Math.abs((latest.current.state.scroll[readingKey] ?? 0) - top) > 8) {
          latest.current.send({ type: 'scroll', key: readingKey, top });
        }
      }}>
      {mode === 'document' ? <article className="cs-source-document">
        <h3>Application statements and branch observations</h3>
        <p className="cs-source-caption">Declared information is not verified income. Financial evidence comes from the source records, not the concept artwork.</p>
        {file.narrative.map((paragraph, index) => <p className="cs-source-paragraph" key={index}>{paragraph}</p>)}
        <section className="cs-paper-section" aria-labelledby="cs-paper-loan">
          <h3 id="cs-paper-loan">Requested loan</h3>
          <dl className="cs-source-facts">
            <div><dt>Product</dt><dd>{file.product}</dd></div>
            <div><dt>Requested amount</dt><dd>{money(file.principal)} VND</dd></div>
            <div><dt>Requested tenor</dt><dd>{file.requestedMonths} months</dd></div>
            <div><dt>Adjusted tenor</dt><dd>{file.appliedMonths} months</dd></div>
            <div><dt>Annual interest rate</dt><dd>{Math.round(file.annualRate * 100)}%</dd></div>
            <div><dt>Estimated monthly installment</dt><dd>{money(file.emi)} VND/month</dd></div>
          </dl>
        </section>
        {file.product === 'Secured' ? <section className="cs-paper-section" aria-labelledby="cs-paper-collateral">
          <h3 id="cs-paper-collateral">Collateral sheet</h3>
          <dl className="cs-source-facts">{file.collateral.map(([field, value], index) => <div key={`${field}-${index}`}><dt>{field}</dt><dd>{value}</dd></div>)}</dl>
        </section> : null}
        <footer className="cs-source-provenance"><strong>Source:</strong> {file.source}. Original public dossier content, transcribed into the active eight-case dataset. Narrative paragraphs and collateral entries are reproduced without additional borrower facts.</footer>
      </article> : null}

      {mode === 'help' ? <article className="cs-guide-chapter" key={chapter.title}>
        <h3>{chapter.title}</h3>
        {chapter.title === 'Controls' && physical ? <p>Receive applications beside the client, then read them at your desk. Click the room objects to work. Use the triangles to turn, return or put an object down. Esc opens the menu; it closes the top dialog when one is open. Left and Right turn while viewing a room. Tab and Enter navigate controls. The tray on your desk holds copies collected from the computer. The ledger beside this book reviews received dossiers before Submit.</p> : chapter.title === 'Controls' ? <p>Click a room object to open it. Use the room arrows or the room names to travel. Back returns to the previous context; Put down returns to the object’s room. Tab and Enter work with the controls. Escape closes a dialog or returns to the previous screen. Left and Right travel between rooms while you are viewing a room.</p> : chapter.content}
        <footer className="cs-source-provenance">Public project classification rules. Unresolved source bases remain marked for source review in the final assessments.</footer>
      </article> : null}

      {mode === 'briefing' ? <article className="cs-briefing-content">
        <p>Work through eight applications in one untimed round. Read the evidence, record your assessment and choose a decision for each dossier. Your working remains editable until you confirm Submit for the whole round.</p>
        <table className="cs-room-functions">
          <thead><tr><th>Room</th><th>Work here</th></tr></thead>
          <tbody>
            <tr><th scope="row">R01 · Customer meeting</th><td>Meet the current customer and read the supplied applicant statements. Return when you need to review them.</td></tr>
            <tr><th scope="row">R02 · Dossier desk</th><td>Read the application, use the optional worksheet and record or revise your provisional decision inside the folder.</td></tr>
            <tr><th scope="row">R03 · Research terminal</th><td>Search Warehouse, deliberately open CIC and collect document copies.</td></tr>
            <tr><th scope="row">R04 · Evidence and round ledger</th><td>Compare sources, keep personal notes, consult the rulebook and review the reached dossiers before submission.</td></tr>
          </tbody>
        </table>
        <h3>Use the room objects</h3>
        <p>Open a physical object to work with it. Back returns to the previous context; Put down returns to its room. Collected copies keep their source attribution. Pinning evidence records your own choice and does not confirm that it is correct.</p>
        <h3>Complete the round</h3>
        <p>Each of the eight dossiers requires one decision and any input required by that choice. Worksheet entries, notes and board placement are optional. Review the opened dossiers in the round ledger, then explicitly confirm Submit. Feedback appears in one final report after successful submission; the submitted round becomes read-only.</p>
        <p>There is no countdown, timeout, speed score or inactivity penalty. Compatible saved progress resumes the same round.</p>
        <footer className="cs-source-provenance">Shift instructions · Eight applications · Decisions stay provisional until Submit.</footer>
      </article> : null}
      {game.learning && <ScrollCue target={reader} refresh={readingKey} />}
    </div>

    {mode === 'help' ? <nav className="cs-guide-pagination" aria-label="Guide page navigation">
      <button type="button" disabled={chapterIndex === 0} onClick={() => setChapterIndex(chapterIndex - 1)}>Previous</button>
      <span aria-live="polite">{chapterIndex + 1} / {GUIDE_CHAPTERS.length}</span>
      <button type="button" disabled={chapterIndex === GUIDE_CHAPTERS.length - 1} onClick={() => setChapterIndex(chapterIndex + 1)}>Next</button>
    </nav> : null}
  </section>;
}
