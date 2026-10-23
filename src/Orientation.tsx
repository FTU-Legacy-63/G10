export function Orientation({ onStart, onBook, started = false, submitted = false }: { onStart: () => void; onBook: () => void; started?: boolean; submitted?: boolean }) {
  return <section className="discovery-orientation" aria-labelledby="orientation-title">
    <header><h2 id="orientation-title">Your assignment</h2><p>{submitted ? 'Shift submitted · Instructions for reference · Read-only' : 'Credit officer · Eight applications · Macro: Normal'}</p></header>
    <ol className="discovery-assignment-steps">
      <li><h3>Assess eight dossiers</h3><p>Meet each client and receive their folder. Take it to your desk to read the application and supporting evidence.</p></li>
      <li><h3>Investigate, then decide</h3><p>Find income evidence in Warehouse, open CIC and consult the credit rulebook. Record your assessment in the folder; the notebook is optional.</p></li>
      <li><h3>Review before submitting</h3><p>Choose a decision for all eight dossiers and complete its required inputs. Check the round ledger, then confirm Submit to see your assessments.</p></li>
    </ol>
    <aside className="discovery-assignment-time"><strong>No time limit</strong><p>Your work saves on this device. Decisions remain editable until you confirm Submit.</p></aside>
    <footer><span>Click objects to work · ◀ ▶ to explore · Esc for menu</span><div><button onClick={onBook}>Show me the rulebook</button><button className="cs-primary" onClick={onStart}>{submitted ? 'Return to the desk' : started ? 'Return to reception' : 'Meet the first client'}</button></div></footer>
  </section>;
}
