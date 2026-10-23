import { useLayoutEffect, useRef, useState } from 'react';
import { GUIDE_CHAPTERS } from '../ui/HelpView';
import { ScrollCue } from '../ui/ScrollCue';
import type { Game } from '../ui/types';

export function Rulebook({ game, initialChapter = 'Start here', onChapterChange }: { game: Game; initialChapter?: string; onChapterChange?: (chapter: string) => void }) {
  const [index, setIndex] = useState(() => Math.max(0, GUIDE_CHAPTERS.findIndex(chapter => chapter.title === initialChapter)));
  const select = (value: number) => { setIndex(value); onChapterChange?.(GUIDE_CHAPTERS[value].title); };
  const reader = useRef<HTMLDivElement>(null), latest = useRef(game); latest.current = game;
  const chapter = GUIDE_CHAPTERS[index], key = `discovery:guide:${index}`;
  useLayoutEffect(() => { if (reader.current) reader.current.scrollTop = latest.current.state.scroll[key] ?? 0; }, [key]);
  return <section className="discovery-rulebook" aria-label="Credit rulebook">
    <nav className="discovery-book-index" aria-label="Guide chapters">{GUIDE_CHAPTERS.map((item, i) => <button key={item.title} aria-current={i === index ? 'page' : undefined} onClick={() => select(i)}>{item.title}</button>)}</nav>
    <article className="discovery-book-page"><header><h2>How assessment works</h2><p>Public project rules · Reference guide</p></header>
      <div className="cs-scroll" ref={reader} tabIndex={0} aria-label="Guide chapter" onScroll={event => { const top = event.currentTarget.scrollTop; if (Math.abs((latest.current.state.scroll[key] ?? 0) - top) > 8) latest.current.send({ type: 'scroll', key, top }); }}>
        <h3>{chapter.title}</h3>{chapter.title === 'Start here' ? <div className="discovery-guide-introduction">
          <p>You are assessing eight applications. Use the documents and these public rules to support your decisions.</p>
          <section><h4>1 · Read and verify</h4><p>Receive the folder beside the client and read it at your desk. Use the computer to search Warehouse evidence and open CIC. The application contains declared information; compare it with its sources.</p></section>
          <section><h4>2 · Apply the assessment rules</h4><p>This book explains the checks and the order of decisions. Your notebook and the comparison board hold your own working.</p><button onClick={() => select(3)}>Read the assessment rules</button></section>
          <section><h4>3 · Record, review and Submit</h4><p>Record a decision in each folder and complete the required inputs. Receive the next application in the client room. When all eight are complete, review the ledger and confirm Submit to see the final assessments.</p></section>
          <p className="cs-source-caption">No time limit · Working stays editable until Submit · Esc opens the menu</p>
        </div> : chapter.title === 'Controls' ? <><p>Receive the folder beside the client, then take it to your desk. The computer holds Warehouse documents and CIC. Collected copies go into the tray on your desk or onto the pinboard.</p><p>Record a decision inside the folder. Receive the next application from the client room. At the end, use the ledger beside this book to review your decisions before Submit.</p><p>Click objects to explore. The triangles turn, return or put an object down. Esc opens the menu; Esc closes its top dialog. Tab and Enter activate controls. Left and Right turn only while viewing a room. There is no time limit.</p></> : chapter.content}
        <ScrollCue target={reader} refresh={key} />
      </div>
      <nav className="discovery-book-pagination" aria-label="Guide page navigation"><button disabled={index === 0} onClick={() => select(index - 1)}>Previous</button><span aria-live="polite">{index + 1} / {GUIDE_CHAPTERS.length}</span><button disabled={index === GUIDE_CHAPTERS.length - 1} onClick={() => select(index + 1)}>Next</button></nav>
    </article>
  </section>;
}
