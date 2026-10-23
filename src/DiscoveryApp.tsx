import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useGame } from '../application/useGame';
import type { Action } from '../application/round';
import { roundReady } from '../application/round';
import { currentCopies } from '../application/objectActions';
import { CASES, WAREHOUSE } from '../content';
import { validateDecision } from '../domain/finance';
import type { DossierTab, View } from '../domain/types';
import type { Game } from '../ui/types';
import { Worksheet } from '../ui/Worksheet';
import { DecisionPanel } from '../ui/DecisionPanel';
import { BoardView } from '../ui/BoardView';
import { ReviewView } from '../ui/ReviewView';
import { PaperCopy } from '../ui/PaperCopy';
import { ReadingPane } from '../ui/ReadingPane';
import { NotebookSource } from './NotebookSource';
import { enterFolder } from './folderEntry';
import { firstCaseStep, firstRoomCue } from './learningFlow';
import { ConceptDossier } from '../concept/ConceptDossier';
import { ConceptTerminal } from '../concept/ConceptTerminal';
import { ConceptPaper } from '../concept/ConceptPaper';
import { ConceptReport } from '../concept/ConceptReport';
import { ConceptBackground } from '../concept/ConceptBackground';
import { playFoley } from '../game/sound';
import { PILOT_SAVE_KEY, PILOT_PREFS_KEY, parsePreferences, resumeScreen } from './profile';
import { APPROVED_SCREEN_ART, approvedRoomArt } from './approvedArt';
import type { Settings } from './profile';
import { useReducedMotion, useSceneBlink } from './useSceneBlink';
import { receiptState, SERVICE_LINES } from './discoveryFlow';
import { TitleScreen } from './TitleScreen';
import { SettingsPanel } from './SettingsPanel';
import { GameDialog } from './GameDialog';
import { ConversationLine } from './ConversationLine';
import { Orientation } from './Orientation';
import { Rulebook } from './Rulebook';
import '../concept/fonts.css';
import '../concept/concept.css';
import './integration.css';
import './discovery.css';
import './approved-style.css';
import './interaction-fixes.css';
import './learning.css';

type Room = 0 | 1 | 2 | 3;
type Screen = 'room' | 'meeting' | 'briefing' | 'dossier' | 'document' | 'decision' | 'worksheet' | 'warehouse' | 'cic' | 'board' | 'review' | 'help' | 'copy' | 'summary' | 'detail';
type Place = { screen: Screen; room: Room };
type ReturnPlace = Place & { caseIndex: number; tab: DossierTab; record: string | null; copy: string | null; focus: string | null };
type Dialog = 'menu' | 'settings' | 'help' | 'submit' | 'restart' | 'copies' | 'replace' | null;
const OWNER: Record<Screen, Room> = { meeting: 0, room: 1, briefing: 1, dossier: 1, document: 1, decision: 1, worksheet: 1, warehouse: 2, cic: 2, board: 3, review: 3, help: 3, copy: 1, summary: 3, detail: 3 };
const VIEW: Record<Screen, View> = { meeting: 'office', room: 'office', briefing: 'office', dossier: 'dossier', document: 'dossier', decision: 'dossier', worksheet: 'worksheet', warehouse: 'warehouse', cic: 'warehouse', board: 'board', review: 'review', help: 'help', copy: 'dossier', summary: 'summary', detail: 'summary' };
const FROM_VIEW: Record<View, Screen> = { office: 'room', dossier: 'dossier', warehouse: 'warehouse', worksheet: 'worksheet', board: 'board', review: 'review', help: 'help', summary: 'summary' };


export default function DiscoveryApp() {
  const core = useGame(PILOT_SAVE_KEY), { state } = core;
  const [entry, setEntry] = useState<'title' | 'work'>('title');
  const [place, setPlace] = useState<Place>({ room: 1, screen: 'room' });
  const [history, setHistory] = useState<ReturnPlace[]>([]);
  const [dialog, setDialogState] = useState<Dialog>(null);
  const dialogParent = useRef<Dialog>(null), opener = useRef<HTMLElement | null>(null);
  const [preferences, setPreferences] = useState<Settings>(() => { try { return parsePreferences(localStorage.getItem(PILOT_PREFS_KEY)); } catch { return parsePreferences(null); } });
  const settings = core.hasSave && !core.recovery ? state.settings : preferences;
  const [preferenceError, setPreferenceError] = useState('');
  const [copyId, setCopyId] = useState<string | null>(null);
  const [replace, setReplace] = useState<{ copy?: string; source?: string } | null>(null);
  const [message, setMessage] = useState('');
  const [bookHint, setBookHint] = useState(false);
  const [assignmentHint, setAssignmentHint] = useState(false);
  const [guideChapter, setGuideChapter] = useState('Start here');
  const [guideRead, setGuideRead] = useState(false);
  const [notebookReferences, setNotebookReferences] = useState<Record<string, string>>({});
  const runtime = useRef(core); runtime.current = core;
  const [conversation, setConversation] = useState<number | null>(null);
  const reducedMotion = useReducedMotion(settings.reducedMotion);
  const motionPreference = useRef(reducedMotion); motionPreference.current = reducedMotion;
  const blink = useSceneBlink();
  const noticeTimer = useRef<number | undefined>(undefined);
  const latest = useRef({ place, state, copyId }); latest.current = { place, state, copyId };
  const backFocus = useRef<string | null>(null), layer = useRef<HTMLElement>(null);
  const receiptLock = useRef(false), continueLock = useRef(false);
  const copies = currentCopies(state), file = CASES[state.current], locked = state.phase === 'submitted';
  const blocked = core.busy || core.stale || !!core.recovery;
  const mode = receiptState(state);
  const advanceLabel = state.current === CASES.length - 1 ? 'Save & review' : state.current < state.reached - 1 ? 'Save & continue' : 'Save & meet next client';
  useEffect(() => () => window.clearTimeout(noticeTimer.current), []);
  useEffect(() => { receiptLock.current = false; continueLock.current = false; }, [state.revision]);
  function notify(text: string) { setMessage(text); window.clearTimeout(noticeTimer.current); noticeTimer.current = window.setTimeout(() => setMessage(''), 5200); }
  function openDialog(next: Dialog, parent: Dialog = null) {
    if (!dialog) opener.current = document.activeElement as HTMLElement | null;
    dialogParent.current = parent; setDialogState(next);
  }
  function closeDialog() { setDialogState(dialogParent.current); dialogParent.current = null; }
  function capture(): ReturnPlace {
    const current = latest.current;
    return { ...current.place, caseIndex: current.state.current, tab: current.state.dossierTabs[CASES[current.state.current].id], record: current.state.selectedRecord, copy: current.copyId, focus: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim() || null };
  }
  function commitPlace(next: Place, push = true, change?: () => boolean | void) {
    if (blink.controller.busy) return false;
    const originFocus = capture().focus;
    setBookHint(false); setMessage('');
    const apply = () => {
      const previous = { ...capture(), focus: originFocus };
      if (change?.() === false) return false;
      if (push) setHistory(old => [...old.slice(-39), previous]);
      setConversation(null); setPlace(next);
      if (next.screen === 'help') setGuideRead(true);
      if (next.screen === 'briefing') setAssignmentHint(false);
      if (core.hasSave && !core.recovery) {
        core.send({ type: 'direction', value: next.room });
        if (next.screen === 'warehouse' || next.screen === 'cic') core.send({ type: 'object', action: { kind: 'terminal-page', page: next.screen } });
        core.send({ type: 'view', view: VIEW[next.screen] });
      }
      return true;
    };
    if (place.screen === next.screen && place.room === next.room) return change ? apply() : true;
    return blink.controller.run(next.screen === 'room' ? approvedRoomArt(next.room) : APPROVED_SCREEN_ART[next.screen], () => motionPreference.current, apply);
  }
  function goRoom(room: Room) { commitPlace({ room, screen: 'room' }); }
  function navigate(value: string) {
    const screen = value as Screen; if (!(screen in VIEW) || blink.controller.busy) return;
    if (!state.started && !['room', 'meeting', 'briefing', 'help'].includes(screen)) { goRoom(0); notify('Receive the application folder from the small cabinet beside the client first.'); return; }
    if (['summary', 'detail'].includes(screen) && !locked) return;
    const room = screen === 'room' ? place.room : OWNER[screen];
    if (place.screen === screen && place.room === room) return;
    const target = { screen, room };
    playFoley(['warehouse', 'cic'].includes(screen) ? 'wood' : 'paper', settings.sound);
    commitPlace(target, true, screen === 'dossier' ? () => { const live = runtime.current; return enterFolder(live.state, live.stale || !!live.recovery || live.busy, () => live.send({ type: 'object', action: { kind: 'folder', open: true } })); } : undefined);
  }

  function back() {
    const target = history.at(-1);
    if (!target) { goRoom(place.room); return; }
    commitPlace({ room: target.room, screen: target.screen }, false, () => {
      if (target.caseIndex !== state.current && !core.send({ type: 'case', index: target.caseIndex })) return false;
      setHistory(old => old.slice(0, -1)); backFocus.current = target.focus;
      core.send({ type: 'tab', value: target.tab }); core.send({ type: 'record', id: target.record }); setCopyId(target.copy);
      return true;
    });
  }

  function openGuide(chapter: string) { setGuideChapter(chapter); navigate('help'); }
  function locateBook() {
    setDialogState(null); dialogParent.current = null; backFocus.current = 'Read credit rulebook'; goRoom(3); setBookHint(true);
    notify('The green book on the left shelf explains how assessment works.');
  }
  function receive() {
    if (locked) { notify('This shift has been submitted. Start a new shift from the title screen.'); return; }
    if (blocked || receiptLock.current) return;
    if (mode === 'received') { notify('The application is at your desk. Turn right to read the folder.'); return; }
    receiptLock.current = true;
    if (mode === 'next' && state.current !== state.reached - 1 && !core.send({ type: 'case', index: state.reached - 1 })) { receiptLock.current = false; return; }
    if (!core.send({ type: mode === 'first' ? 'start' : 'continue' })) { receiptLock.current = false; return; }
    setCopyId(null); setHistory([]); commitPlace({ room: 0, screen: 'room' }, false);
    playFoley('paper', settings.sound); notify('Application received. Take it to the desk in the next room.');
  }
  function send(action: Action): boolean {
    if (blink.controller.busy) return false;
    if (action.type === 'view') { navigate(FROM_VIEW[action.view]); return true; }
    if (action.type === 'case') return commitPlace({ room: 1, screen: 'dossier' }, true, () => core.send(action));
    if (action.type === 'continue') {
      if (blocked || continueLock.current || validateDecision(state.drafts[file.id], file)) return false;
      continueLock.current = true;
      if (state.current === state.reached - 1 && state.reached < CASES.length) {
        if (!core.retrySave()) { continueLock.current = false; return false; }
        goRoom(0); notify('Receive the next application from the folder on the small cabinet.'); continueLock.current = false; return true;
      }
      const accepted = commitPlace({ room: state.current === CASES.length - 1 ? 3 : 1, screen: state.current === CASES.length - 1 ? 'review' : 'dossier' }, true, () => {
        continueLock.current = false;
        if (!core.send(action)) return false;
        setCopyId(null); return true;
      });
      continueLock.current = false;
      return accepted;
    }
    if (action.type === 'board' && !locked && !state.boardSources.includes(action.source) && state.boardSources.length >= 2) { setReplace({ source: action.source }); openDialog('replace'); return false; }
    return core.send(action);
  }
  function useCopy(target: 'desk' | 'board', slot?: 0 | 1, id?: string) {
    const copy = copies.find(item => item.id === (id ?? state.objects.selectedCopy)); if (!copy || blocked || locked) return;
    if (target === 'board' && slot === undefined && state.boardSources.length >= 2 && !state.boardSources.includes(`record:${copy.recordId}`)) { setReplace({ copy: copy.id }); openDialog('replace'); return; }
    if (core.sendObjects([{ kind: 'transfer-copy', copyId: copy.id, target, slot }])) { setCopyId(copy.recordId); navigate(target === 'board' ? 'board' : 'copy'); }
  }
  const game: Game = { ...core, send, inspectCopy: id => { if (id) { setCopyId(id); navigate('copy'); } }, copyOnDesk: state.deskCopy, useCopy, learning: { openGuide, firstStep: firstCaseStep(state) } };
  function changeSettings(value: Settings) {
    setPreferences(value); try { localStorage.setItem(PILOT_PREFS_KEY, JSON.stringify(value)); setPreferenceError(''); } catch { setPreferenceError('Preferences are not saved.'); }
    if (core.hasSave && !core.recovery) core.send({ type: 'settings', value });
  }
  function enterWork(submitted: boolean) {
    const landing = resumeScreen(state) as Place;
    return blink.controller.run(approvedRoomArt(1), () => motionPreference.current, () => {
      setPlace(landing); setEntry('work'); setHistory([]); setCopyId(null); setConversation(null);
      setAssignmentHint(!submitted); backFocus.current = submitted ? null : 'Read shift instructions';
    });
  }
  function createAttempt() {
    if (blink.controller.busy || !core.createAttempt(settings)) return;
    setDialogState(null); dialogParent.current = null; setGuideRead(false); setNotebookReferences({}); enterWork(false);
  }
  function returnTitle() {
    if (blink.controller.busy || !core.recovery && !core.stale && !core.retrySave()) return;
    setDialogState(null); dialogParent.current = null;
    blink.controller.run(APPROVED_SCREEN_ART.title, () => motionPreference.current, () => { setEntry('title'); setHistory([]); setConversation(null); setAssignmentHint(false); });
  }
  function resume() { enterWork(locked); }
  useEffect(() => {
    if (entry !== 'work' || dialog || blink.busy) return;
    const frame = requestAnimationFrame(() => {
      const name = backFocus.current; backFocus.current = null;
      let target = name ? [...(layer.current?.querySelectorAll<HTMLElement>('button,input,textarea,select,summary,[tabindex]') ?? [])].find(node => (node.getAttribute('aria-label') || node.textContent?.trim()) === name) : null;
      const closedHelp = target?.closest('details:not([open])');
      if (closedHelp) target = closedHelp.querySelector<HTMLElement>('summary') ?? target;
      (target ?? (place.screen === 'meeting' ? layer.current?.querySelector<HTMLElement>('.discovery-conversation') : layer.current?.querySelector<HTMLElement>('.discovery-object-hint')) ?? layer.current)?.focus({ preventScroll: true });
    }); return () => cancelAnimationFrame(frame);
  }, [entry, place.screen, place.room, blink.busy]);
  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (dialog || entry === 'title') return;
      if (event.key === 'Escape') { event.preventDefault(); blink.controller.cancel(); openDialog('menu'); return; }
      if (blink.controller.busy) return;
      if ((event.target as HTMLElement).closest('input,textarea,select,[contenteditable=true]')) return;
      if (place.screen === 'room' && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); goRoom(((place.room + (event.key === 'ArrowRight' ? 1 : 3)) % 4) as Room); }
    }
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  });
  const title = entry === 'title';
  const art = title ? APPROVED_SCREEN_ART.title : place.screen === 'room' ? approvedRoomArt(place.room) : APPROVED_SCREEN_ART[place.screen];
  const printedChrome = !title && !['briefing', 'document', 'copy', 'help', 'review'].includes(place.screen);
  function object(label: string, box: readonly [number, number, number, number], action: () => void, id?: string) {
    const assignmentPrompt = id === 'assignment' && assignmentHint;
    const hint = assignmentPrompt || id === 'rulebook' && bookHint || !assignmentHint && !!id && id === firstRoomCue(state, place.room, guideRead);
    return <button className={`cs-hotspot discovery-object${hint ? ' discovery-object-hint' : ''}`} aria-label={label} aria-describedby={assignmentPrompt ? 'discovery-assignment-cue' : undefined} title={label} data-object={id} style={{ left: `${box[0]}%`, top: `${box[1]}%`, width: `${box[2]}%`, height: `${box[3]}%` }} onClick={action}>
      <span>{label}</span>
      {hint && !assignmentPrompt && <i aria-hidden="true">▾</i>}
      {assignmentPrompt && <span id="discovery-assignment-cue" className="discovery-assignment-cue">
        <span>Let’s take a look at your assignment first.</span>
        <svg className="discovery-assignment-arrow" viewBox="0 0 36 40" aria-hidden="true" focusable="false"><path d="M13 2.5 22 2 22.5 20.5 31.5 20 18 36 4.5 21 13 21.5Z" fill="currentColor" stroke="#30271b" strokeWidth="2.2" strokeLinejoin="round" /></svg>
      </span>}
    </button>;
  }

  const warning = (core.saveError || core.stale || core.recovery) && <div className="discovery-warning" role="alert"><p>{core.recovery ?? (core.stale ? 'A newer save is available. Reload before editing.' : core.saveError)}</p>{core.saveError && !core.recovery && <button onClick={() => core.retrySave()}>Retry save</button>}{core.recovery && locked && <button onClick={core.retryReport}>Retry report</button>}<button onClick={core.downloadSave}>Export progress</button>{(core.stale || core.recovery && locked) && <button onClick={() => location.reload()}>Reload</button>}</div>;
  return <main className={`concept-study integration-pilot discovery-app${title ? ' ip-at-title' : ''}`} style={{ '--text-factor': settings.textSize / 100 } as CSSProperties}>
    <div className={`cs-stage cs-screen-${place.screen}${printedChrome ? ' discovery-printed-chrome' : ''}`} data-room={place.room + 1} data-motion={reducedMotion ? 'reduced' : 'full'} data-transition={blink.phase} data-blinks={blink.count}>
      <ConceptBackground src={art} reducedMotion={reducedMotion} transitionMode="cut" onReady={blink.ready} />
      <div className="discovery-atmosphere" aria-hidden="true" />
      {title ? <TitleScreen modalOpen={!!dialog || blink.busy} canContinue={core.hasSave && !core.stale && !core.recovery} busy={core.busy} reducedMotion={reducedMotion} sound={settings.sound} onContinue={resume} onNew={() => core.hasSave || core.recovery ? openDialog('restart') : createAttempt()} onSettings={() => openDialog('settings')} /> : <div className="discovery-work" inert={!!dialog || blink.busy}>
        <section ref={layer} className="cs-live-layer" tabIndex={-1} aria-label="Office workspace">
          {place.screen === 'room' && <>
            {place.room === 0 && <>
              {object('Talk to the client', [53, 47, 13, 42], () => navigate('meeting'))}
              {object(mode === 'next' ? 'Receive next application' : 'Receive application', [24, 56, 10, 9], receive, 'reception-folder')}
            </>}
            {place.room === 1 && <>
              {object('Read shift instructions', [35.5, 34, 7, 16], () => navigate('briefing'), 'assignment')}
              {object('Open current dossier', [35.5, 56, 11, 13], () => navigate('dossier'), 'current-folder')}
              {object('Open personal notebook', [48.5, 56, 9, 13], () => navigate('worksheet'))}
              {object('Read collected copies', [25, 55, 10.5, 12], () => openDialog('copies'))}
              {copies.filter(copy => copy.location === 'desk').slice(-1).map(copy => <span className="cs-desk-paper" key={copy.id} aria-hidden="true">{copy.recordId}<i /><i /><i /></span>)}
            </>}
            {place.room === 2 && <>{object('Use the computer', [53, 41, 18, 23], () => navigate(state.objects.terminalPage), 'terminal')}{object('Read collected copies', [72.5, 53, 12, 12], () => openDialog('copies'))}</>}
            {place.room === 3 && <>
              <div className="discovery-wall-papers" aria-hidden="true">{state.boardSources.map((source, index) => <span key={source} style={{ left: `${4 + (state.boardLayout[source]?.x ?? index * 100) * .5}%`, top: `${5 + (state.boardLayout[source]?.y ?? index * 20) * .2}%` }}>{source.split(':')[1]}<i /><i /><i /></span>)}</div>
              {object('Open the comparison board', [33.5, 11.5, 37, 39], () => navigate('board'))}
              {object(locked ? 'Read the submitted report' : 'Open the round ledger', [41.5, 55, 15, 13], () => { if (!state.started) notify('Receive an application before opening the round ledger.'); else navigate(locked ? 'summary' : 'review'); })}
              <span className="discovery-book-spine" aria-hidden="true">Credit Rules</span>
              {object('Read credit rulebook', [19.5, 56, 5.5, 17], () => openGuide('Start here'), 'rulebook')}
            </>}
          </>}
          {place.screen === 'meeting' && <ConversationLine key={conversation ?? 0} index={conversation ?? 0} reducedMotion={reducedMotion} onNext={() => conversation === SERVICE_LINES.length - 1 ? goRoom(0) : setConversation(value => (value ?? 0) + 1)} />}
          {place.screen === 'briefing' && <div className="discovery-briefing"><Orientation started={state.started} submitted={locked} onStart={() => goRoom(locked ? 1 : 0)} onBook={locateBook} /></div>}
          {place.screen === 'dossier' && <div className="cs-folder-surface discovery-folder"><ConceptDossier game={game} onOpen={navigate} physical continueLabel={advanceLabel} /></div>}
          {place.screen === 'decision' && <div className="cs-folder-surface cs-decision-surface discovery-folder"><header className="cs-paper-heading"><div><span>{file.id}</span><h2>{file.name}</h2></div><button onClick={() => navigate('dossier')}>Read dossier</button></header><ReadingPane game={game} id={`integration:decision:${file.id}`} className="cs-scroll" label="Decision and required inputs"><DecisionPanel key={file.id} game={game} continueLabel={advanceLabel} physical /></ReadingPane></div>}
          {place.screen === 'document' && <div className="cs-folder-surface cs-paper-surface discovery-source"><ConceptPaper game={game} mode="document" /></div>}
          {place.screen === 'copy' && <div className="cs-folder-surface cs-paper-surface cs-scroll discovery-source">{copyId ? <PaperCopy game={game} id={copyId} /> : <p>No copy selected.</p>}</div>}
          {['warehouse', 'cic'].includes(place.screen) && <div className="cs-monitor-surface"><ConceptTerminal game={game} service={place.screen as 'warehouse' | 'cic'} onOpen={navigate} /></div>}
          {place.screen === 'worksheet' && <><NotebookSource game={game} selected={notebookReferences[file.id] ?? 'application'} onSelect={id => setNotebookReferences(old => ({ ...old, [file.id]: id }))} /><div className="cs-notebook-surface"><header><h2>Personal notebook</h2><p>{file.id} · {file.name}</p><nav><button aria-pressed={state.objects.notebookPage === 'worksheet'} onClick={() => core.send({ type: 'object', action: { kind: 'notebook-page', page: 'worksheet' } })}>Worksheet</button><button aria-pressed={state.objects.notebookPage === 'notes'} onClick={() => core.send({ type: 'object', action: { kind: 'notebook-page', page: 'notes' } })}>Notes</button></nav></header><ReadingPane game={game} id={`integration:notebook:${file.id}:${state.objects.notebookPage}`} className="cs-scroll" label="Notebook working">{state.objects.notebookPage === 'worksheet' ? <Worksheet game={game} /> : <label className="cs-notes-label">Personal notes · unscored<textarea value={state.drafts[file.id].notes} maxLength={20000} disabled={locked} rows={14} onChange={e => send({ type: 'draft', patch: { notes: e.target.value } })} /></label>}</ReadingPane></div></>}
          {place.screen === 'board' && <div className="cs-board-surface"><BoardView game={game} onOpenSource={source => { const [kind, id] = source.split(':'); if (kind === 'record') { core.send({ type: 'record', id }); navigate('warehouse'); } else { core.send({ type: 'case', index: CASES.findIndex(item => item.id === id) }); core.send({ type: 'tab', value: kind === 'cic' ? 'cic' : 'application' }); navigate(kind === 'cic' ? 'cic' : 'dossier'); } }} /></div>}
          {place.screen === 'help' && <Rulebook game={game} initialChapter={guideChapter} onChapterChange={setGuideChapter} />}
          {place.screen === 'review' && <div className="cs-ledger-surface"><div className="cs-scroll"><ReviewView game={game} physical reception onSubmit={() => openDialog('submit')} /></div></div>}
          {['summary', 'detail'].includes(place.screen) && <div className="cs-ledger-surface cs-report-surface"><nav className="cs-report-tabs"><button aria-current={place.screen === 'summary' ? 'page' : undefined} onClick={() => navigate('summary')}>Round summary</button><button aria-current={place.screen === 'detail' ? 'page' : undefined} onClick={() => navigate('detail')}>Dossier assessments</button></nav><div className="cs-scroll"><ConceptReport game={game} physical mode={place.screen === 'summary' ? 'summary' : 'detail'} onDetail={index => { core.send({ type: 'case', index }); navigate('detail'); }} onRestart={() => openDialog('restart')} /></div></div>}
        </section>
        <nav className={`discovery-navigation${place.screen === 'room' ? '' : ' discovery-navigation-focus'}`} aria-label={place.screen === 'room' ? 'Look around' : 'Return from object'}>
          {place.screen === 'room' ? <><button aria-label="Previous room" onClick={() => goRoom(((place.room + 3) % 4) as Room)}><span aria-hidden="true">◀</span></button><button aria-label="Next room" onClick={() => goRoom(((place.room + 1) % 4) as Room)}><span aria-hidden="true">▶</span></button></> : <><button aria-label="Back" onClick={back}><span aria-hidden="true">◀</span></button><button aria-label="Put down" onClick={() => goRoom(place.room)}><span aria-hidden="true">▼</span></button></>}
        </nav>
        {message && <p className="discovery-notice" role="status">{message}</p>}
      </div>}
      <div className={`discovery-flash discovery-flash-${blink.phase}`} aria-hidden="true" />
      {blink.phase === 'loading' && <p className="discovery-scene-loading" role="status">Loading scene…</p>}
      {blink.retry && <div className="discovery-transition-error" role="status"><span>The next scene could not load. Your work is still here.</span><button onClick={blink.retry}>Retry scene</button></div>}
      {!dialog && warning}
      {dialog && <GameDialog key={dialog} title={dialog === 'menu' ? 'Menu' : dialog === 'settings' ? 'Settings' : dialog === 'help' ? 'How to play' : dialog === 'restart' ? 'Start a new shift?' : dialog === 'submit' ? 'Submit this round?' : dialog === 'copies' ? 'Collected copies' : 'Choose board space'} opener={opener.current} initialSettings={dialog === 'settings'} onClose={closeDialog}>
        {warning}
        {dialog === 'menu' && <div className="discovery-menu"><p className="discovery-menu-status">{locked ? 'Submitted · read-only' : state.started ? `${state.reached} of 8 applications received · ${core.saveError ? 'Not saved' : 'Saved on this device'}` : 'No application received yet'}</p><button onClick={closeDialog}>Resume</button><button onClick={() => openDialog('settings', 'menu')}>Settings</button><button onClick={() => openDialog('help', 'menu')}>How to play</button><button onClick={returnTitle}>Return to Title</button></div>}
        {dialog === 'settings' && <SettingsPanel closeLabel={dialogParent.current === 'menu' ? 'Back to menu' : title ? 'Back to title' : 'Back to work'} settings={settings} onChange={changeSettings} onClose={closeDialog} onExport={core.hasSave ? core.downloadSave : undefined} onFullscreen={() => { try { const request = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); void request.catch(() => setPreferenceError('Use your browser’s full-screen control.')); } catch { setPreferenceError('Use your browser’s full-screen control.'); } }} status={preferenceError || core.saveError || 'Preferences saved'} />}
        {dialog === 'help' && <div className="discovery-help"><p>Receive the folder beside the client. Read it at your desk, investigate at the computer and record a decision in the folder.</p><p>The green book on the left shelf beside the pinboard contains the assessment rules. The ledger on that desk lets you review received applications.</p><p>Click objects to explore. Use the triangles to move or put an object down. Press Esc for the menu. There is no time limit.</p><button onClick={locateBook}>Show me the rulebook</button></div>}
        {dialog === 'submit' && <><p>Confirming Submit ends this untimed shift and opens the assessments. You may keep reviewing until you are ready.</p><div className="cs-dialog-actions"><button onClick={closeDialog}>Keep reviewing</button><button disabled={blocked || !roundReady(state)} onClick={async () => { if (await core.submit()) { setDialogState(null); setHistory([]); setAssignmentHint(false); commitPlace({ room: 3, screen: 'summary' }, false); } }}>Confirm Submit</button></div></>}
        {dialog === 'restart' && <><p>A new shift replaces this saved attempt. Export progress first if you want to keep a copy.</p><div className="cs-dialog-actions"><button onClick={core.downloadSave}>Export progress</button><button onClick={closeDialog}>Cancel</button><button disabled={core.stale || core.busy} onClick={createAttempt}>Replace with new shift</button></div></>}
        {dialog === 'copies' && <div className="cs-copy-list">{!copies.length ? <p>No copies collected. At the computer, open a source record and take a copy to bring it here.</p> : copies.map(copy => { const record = WAREHOUSE.find(item => item.id === copy.recordId)!; return <article key={copy.id}><h3>{record.id} · {record.name}</h3><p>{copy.location === 'board' ? 'On the board' : copy.location === 'desk' ? 'On the desk' : 'Carried'}</p><div><button onClick={() => { setDialogState(null); setCopyId(record.id); navigate('copy'); }}>Read copy</button>{!locked && <><button onClick={() => { setDialogState(null); useCopy('desk', undefined, copy.id); }}>Place on desk</button><button onClick={() => { setDialogState(null); useCopy('board', undefined, copy.id); }}>Pin to board</button></>}</div></article>; })}</div>}
        {dialog === 'replace' && <><p>Both spaces are occupied. Choose which source to replace.</p>{([0, 1] as const).map(slot => <button key={slot} onClick={() => { setDialogState(null); if (replace?.source) { core.send({ type: 'board-slot', slot, source: replace.source }); navigate('board'); } else useCopy('board', slot, replace?.copy); setReplace(null); }}>Replace Source {slot + 1} · {state.boardSources[slot]}</button>)}</>}
      </GameDialog>}
    </div>
  </main>;
}
