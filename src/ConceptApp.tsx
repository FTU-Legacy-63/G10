import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { playFoley } from '../game/sound';
import { useGame } from '../application/useGame';
import type { Action } from '../application/round';
import { roundReady } from '../application/round';
import { currentCopies } from '../application/objectActions';
import { CASES, WAREHOUSE } from '../content';
import type { DossierTab, View } from '../domain/types';
import type { Game } from '../ui/types';
import { Worksheet } from '../ui/Worksheet';
import { DecisionPanel } from '../ui/DecisionPanel';
import { BoardView } from '../ui/BoardView';
import { ReviewView } from '../ui/ReviewView';
import { ConceptReport } from './ConceptReport';
import { PaperCopy } from '../ui/PaperCopy';
import { EvidenceText } from '../ui/EvidenceText';
import { ConceptDossier } from './ConceptDossier';
import { ConceptMeeting } from './ConceptMeeting';
import { ConceptTerminal } from './ConceptTerminal';
import { ConceptBackground } from './ConceptBackground';
import { ConceptPaper } from './ConceptPaper';
import { ART_ROOT, PILOT_PREFS_KEY, PILOT_R02, parsePreferences, resumeScreen } from '../integration/profile';
import type { CameraFocus, ExperienceProfile, Settings } from '../integration/profile';
import { TitleScreen } from '../integration/TitleScreen';
import { SettingsPanel } from '../integration/SettingsPanel';
import { IncomingTray } from '../integration/IncomingTray';
import './fonts.css';
import './concept.css';

export const CONCEPT_SAVE_KEY = 'the-credit-desk:concept-study:v1';
type Room = 0 | 1 | 2 | 3;
type Screen = 'room' | 'meeting' | 'dossier' | 'document' | 'warehouse' | 'cic' | 'worksheet' | 'decision' | 'board' | 'review' | 'summary' | 'detail' | 'copy' | 'help' | 'briefing' | 'intake';
type Place = { room: Room; screen: Screen };
type ReturnPlace = Place & { caseIndex: number; tab: DossierTab; record: string | null; copy: string | null; focus: HTMLElement | null; focusName?: string | null };
type Dialog = 'menu' | 'submit' | 'restart' | 'copies' | 'replace' | 'settings' | null;
const ROOMS = ['Client room', 'Dossier desk', 'Records room', 'Review room'];
const ROLES = ['Meet the applicant', 'Folder · notebook · decision', 'Warehouse · Check CIC', 'Board · guide · round ledger'];
const OWNER: Partial<Record<Screen, Room>> = { intake: 1, meeting: 0, dossier: 1, document: 1, worksheet: 1, decision: 1, copy: 1, briefing: 1, warehouse: 2, cic: 2, board: 3, review: 3, summary: 3, detail: 3, help: 3 };
const ART: Partial<Record<Screen, string>> = { meeting: 's05', dossier: 's06', document: 's06', warehouse: 's08', cic: 's09', worksheet: 's10', decision: 's12', board: 's11', review: 's13', summary: 's15', detail: 's16', copy: 's06' };
const TITLES: Partial<Record<Screen, string>> = { intake: 'Incoming dossiers', meeting: 'Applicant meeting', dossier: 'Application folder', document: 'Source document', warehouse: 'Warehouse', cic: 'Check CIC', worksheet: 'Personal notebook', decision: 'Your decision', board: 'Comparison board', review: 'Round ledger', summary: 'Summary', detail: 'Dossier assessment', copy: 'Document copy', help: 'Credit rulebook', briefing: 'Shift briefing' };
const VIEW: Partial<Record<Screen, View>> = { intake: 'office', room: 'office', dossier: 'dossier', document: 'dossier', meeting: 'dossier', warehouse: 'warehouse', cic: 'warehouse', worksheet: 'worksheet', decision: 'dossier', board: 'board', review: 'review', summary: 'summary', detail: 'summary', copy: 'dossier', help: 'help', briefing: 'help' };
const FROM_VIEW: Record<View, Screen> = { office: 'room', dossier: 'dossier', warehouse: 'warehouse', worksheet: 'worksheet', board: 'board', review: 'review', help: 'help', summary: 'summary' };

function Modal({ title, children, onClose, settings = false, returnFocus, menuSettingsFocus = false }: { title: string; children: ReactNode; onClose: () => void; settings?: boolean; returnFocus?: HTMLElement | null; menuSettingsFocus?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = returnFocus ?? document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>(settings ? 'input:checked' : menuSettingsFocus ? '[data-menu-settings]' : 'button, input, select')?.focus();
    return () => { if (previous?.isConnected) previous.focus(); else document.querySelector<HTMLElement>('.ip-title nav button:not(:disabled)')?.focus(); };
  }, []);
  return <div className="cs-dialog-shade" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={ref} className="cs-dialog" role="dialog" aria-modal="true" aria-labelledby="cs-dialog-title" onKeyDown={event => {
      if (event.key === 'Escape') { event.stopPropagation(); onClose(); }
      if (event.key !== 'Tab') return;
      const items = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href], textarea:not(:disabled)')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <header><h2 id="cs-dialog-title">{title}</h2><button onClick={onClose} aria-label="Close dialog">×</button></header>
      {children}
    </div>
  </div>;
}

export default function ConceptApp({ profile }: { profile?: ExperienceProfile } = {}) {
  const pilot = profile?.kind === 'pilot';
  const core = useGame(profile?.saveKey ?? CONCEPT_SAVE_KEY);
  const { state } = core;
  const [entry, setEntry] = useState<'title' | 'work'>(pilot ? 'title' : 'work');
  const [preferences, setPreferences] = useState<Settings>(() => { try { return parsePreferences(localStorage.getItem(PILOT_PREFS_KEY)); } catch { return parsePreferences(null); } });
  const [preferenceError, setPreferenceError] = useState('');
  const settings = pilot && (!core.hasSave || core.recovery) ? preferences : state.settings;
  const [camera, setCamera] = useState<CameraFocus | null>(null);
  const cameraTimer = useRef<number | undefined>(undefined);
  const restoreFocus = useRef<{ node: HTMLElement | null; name?: string | null } | null>(null);
  const dialogReturn = useRef<Dialog>(null);
  const [advancing, setAdvancing] = useState(false);
  useEffect(() => () => window.clearTimeout(cameraTimer.current), []);

  const [place, setPlace] = useState<Place>(() => state.phase === 'submitted' ? { room: 3, screen: 'summary' } : { room: 1, screen: 'room' });
  const [history, setHistory] = useState<ReturnPlace[]>([]);
  const [dialog, updateDialog] = useState<Dialog>(null);
  const dialogOpener = useRef<HTMLElement | null>(null);
  const [menuSettingsFocus, setMenuSettingsFocus] = useState(false);
  function setDialog(next: Dialog) {
    if (next && !dialog) dialogOpener.current = document.activeElement as HTMLElement | null;
    if (next !== 'menu') setMenuSettingsFocus(false);
    updateDialog(next);
  }
  const [copyId, setCopyId] = useState<string | null>(null);
  const [pendingCopy, setPendingCopy] = useState<string | null>(null);
  const [pendingSource, setPendingSource] = useState<string | null>(null);
  const [hint, setHint] = useState('');
  const [message, setMessage] = useState('');
  const latest = useRef({ place, state, copyId }); latest.current = { place, state, copyId };
  const pendingContinue = useRef<{ index: number; revision: number } | null>(null);
  const previousAttempt = useRef(state.attemptId);
  const file = CASES[state.current];
  const copies = currentCopies(state);
  const locked = state.phase === 'submitted';
  const blocked = core.stale || !!core.recovery || core.busy;
  const liveRegion = useRef<HTMLElement>(null);
  

  const capture = (): ReturnPlace => ({ ...latest.current.place, caseIndex: latest.current.state.current, tab: latest.current.state.dossierTabs[CASES[latest.current.state.current].id], record: latest.current.state.selectedRecord, copy: latest.current.copyId, focus: document.activeElement as HTMLElement | null, focusName: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim() });
  function navigate(screenName: string) {
    const screen = screenName as Screen;
    if (!(screen in VIEW)) return;
    if ((screen === 'summary' || screen === 'detail') && !locked) return;
    const room = screen === 'room' ? latest.current.place.room : OWNER[screen] ?? latest.current.place.room;
    if (screen === latest.current.place.screen && room === latest.current.place.room) return;
    if (!state.started && !['room', 'briefing', 'help', 'intake'].includes(screen) && !core.send({ type: 'start' })) return;
    if (pilot) playFoley(screen === 'warehouse' || screen === 'cic' ? 'wood' : 'paper', settings.sound);
    setHistory(old => [...old.slice(-39), capture()]);
    window.clearTimeout(cameraTimer.current);
    const focus = pilot && place.room === 1 && place.screen === 'room' ? PILOT_R02[screen as keyof typeof PILOT_R02]?.camera : null;
    if (focus && !settings.reducedMotion && window.innerWidth > 900) {
      setCamera(focus);
      cameraTimer.current = window.setTimeout(() => { setPlace({ screen, room }); setCamera(null); }, 180);
    } else { setPlace({ screen, room }); setCamera(null); }
    setMessage(''); setHint('');
    if (screen === 'dossier') core.send({ type: 'object', action: { kind: 'folder', open: true } });
    if (screen === 'warehouse' || screen === 'cic') core.send({ type: 'object', action: { kind: 'terminal-page', page: screen } });
    if (pilot) core.send({ type: 'direction', value: room });
    core.send({ type: 'view', view: VIEW[screen]! });
  }
  function goRoom(room: Room) {
    window.clearTimeout(cameraTimer.current); setCamera(null);
    setHistory(old => [...old.slice(-39), capture()]);
    setPlace({ room, screen: 'room' }); setHint(''); setMessage('');
    if (pilot) core.send({ type: 'direction', value: room });
    core.send({ type: 'view', view: 'office' });
  }
  function back() {
    window.clearTimeout(cameraTimer.current); setCamera(null);
    const target = history.at(-1);
    if (target) {
      restoreFocus.current = { node: target.focus, name: target.focusName };
      setHistory(old => old.slice(0, -1)); setPlace({ room: target.room, screen: target.screen });
      if (target.caseIndex !== state.current) core.send({ type: 'case', index: target.caseIndex });
      core.send({ type: 'tab', value: target.tab });
      core.send({ type: 'record', id: target.record });
      setCopyId(target.copy);
      if (pilot) core.send({ type: 'direction', value: target.room });
      core.send({ type: 'view', view: VIEW[target.screen]! });
    } else { setPlace({ room: place.room, screen: 'room' }); if (pilot) core.send({ type: 'direction', value: place.room }); core.send({ type: 'view', view: 'office' }); }
    setHint(''); setMessage('');
  }
  function send(action: Action) {
    if (action.type === 'view') { navigate(FROM_VIEW[action.view]); return true; }
    if (action.type === 'case') {
      if (action.index < 0 || action.index >= state.reached) return false;
      if (!core.send(action)) return false; navigate('dossier'); return true;
    }
    if (action.type === 'board' && !state.boardSources.includes(action.source) && state.boardSources.length >= 2 && !locked) {
      setPendingCopy(null); setPendingSource(action.source); setDialog('replace'); return false;
    }
    if (action.type === 'continue') {
      if (pendingContinue.current) return false;
      pendingContinue.current = { index: state.current, revision: state.revision };
      if (!core.send(action)) { pendingContinue.current = null; return false; }
      setAdvancing(true); return true;
    }
    return core.send(action);
  }
  function useCopy(target: 'desk' | 'board', slot?: 0 | 1, physicalId?: string) {
    const id = physicalId ?? state.objects.selectedCopy;
    if (!id || locked || blocked) return;
    const copy = copies.find(item => item.id === id);
    if (!copy) return;
    if (target === 'board' && state.boardSources.length >= 2 && !state.boardSources.includes(`record:${copy.recordId}`) && slot === undefined) {
      setPendingSource(null); setPendingCopy(id); setDialog('replace'); return;
    }
    if (core.sendObjects([{ kind: 'transfer-copy', copyId: id, target, slot }])) {
      if (target === 'board') navigate('board');
      else { setCopyId(copy.recordId); navigate('copy'); }
      setMessage(target === 'board' ? 'Copy placed on the comparison board.' : 'Copy placed on your desk.');
    }
  }
  const game: Game = { ...core, send, inspectCopy: id => { if (id) { setCopyId(id); navigate('copy'); } }, copyOnDesk: state.deskCopy, useCopy };

  // React sees a new applicant only after Continue has persisted successfully.
  useEffect(() => {
    const pending = pendingContinue.current;
    if (!pending) return;
    if (core.saveError || core.stale || core.recovery) { pendingContinue.current = null; setAdvancing(false); return; }
    if (state.revision <= pending.revision || state.current === pending.index && state.view !== 'review') return;
    pendingContinue.current = null; setAdvancing(false);
    setCopyId(null);
    if (state.view === 'review') { setHistory([capture()]); setPlace({ room: 3, screen: 'review' }); }
    else { setHistory([{ room: 1, screen: 'room', caseIndex: state.current, tab: state.dossierTabs[CASES[state.current].id], record: state.selectedRecord, copy: null, focus: null }]); setPlace({ room: 1, screen: 'dossier' }); }
  }, [state.revision, state.current, state.view, core.saveError, core.stale, core.recovery]);
  useEffect(() => {
    if (previousAttempt.current === state.attemptId) return;
    previousAttempt.current = state.attemptId;
    setPlace({ room: 1, screen: pilot ? 'briefing' : 'room' }); if (pilot) setEntry('work'); setHistory([]); setCopyId(null); setDialog(null); setMessage('');
  }, [state.attemptId]);
  useEffect(() => {
    if (entry !== 'work') return;
    const frame = requestAnimationFrame(() => {
      const target = restoreFocus.current;
      restoreFocus.current = null;
      const restored = target?.node?.isConnected ? target.node : target?.name ? [...(liveRegion.current?.querySelectorAll<HTMLElement>('button,input,textarea,select,[tabindex]') ?? [])].find(node => (node.getAttribute('aria-label') || node.textContent?.trim()) === target.name) : null;
      if (restored) restored.focus({ preventScroll: true });
      else liveRegion.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [place.screen, place.room, entry]);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (entry === 'title' || camera || dialog || (event.target as HTMLElement).closest('input,textarea,select,[contenteditable=true]')) return;
      if (event.key === 'Escape' && place.screen !== 'room') { event.preventDefault(); back(); }
      if (place.screen === 'room' && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault(); goRoom(((place.room + (event.key === 'ArrowRight' ? 1 : 3)) % 4) as Room);
      }
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  });

  const art = dialog === 'submit' ? 's14' : place.screen === 'room' || place.screen === 'help' || place.screen === 'briefing' ? `s02-r0${place.room + 1}` : ART[place.screen] ?? 's02-r02';
  function hotspot(label: string, box: [number, number, number, number], action: () => void, extra = '') {
    return <button className={`cs-hotspot ${extra}`} aria-label={label} title={label} style={{ left: `${box[0]}%`, top: `${box[1]}%`, width: `${box[2]}%`, height: `${box[3]}%` }}
      onMouseEnter={() => setHint(label)} onMouseLeave={() => setHint('')} onFocus={() => setHint(label)} onBlur={() => setHint('')} onClick={action}><span>{label}</span></button>;
  }
  function closeDialog() { if (dialog === 'settings' && dialogReturn.current === 'menu') setMenuSettingsFocus(true); setDialog(dialogReturn.current); dialogReturn.current = null; }
  function openSettings(from: Dialog = null) { dialogReturn.current = from; setDialog('settings'); }
  function changeSettings(value: Settings) {
    setPreferences(value);
    try { localStorage.setItem(PILOT_PREFS_KEY, JSON.stringify(value)); setPreferenceError(''); }
    catch { setPreferenceError('Preferences are not saved. Keep this page open and retry.'); }
    if (core.hasSave && !core.recovery) core.send({ type: 'settings', value });
  }
  function createAttempt() {
    if (core.createAttempt(settings)) { dialogReturn.current = null; setEntry('work'); setPlace({ room: 1, screen: 'briefing' }); setHistory([]); setDialog(null); }
  }
  function returnTitle() {
    if (!core.recovery && !core.stale && !core.retrySave()) return;
    setDialog(null); setEntry('title'); setHistory([]); setCamera(null);
  }
  const openTray = () => { if (!copies.length) setMessage('Collect a document copy at the Records room computer first.'); else setDialog('copies'); };
  const saveWarning = (core.saveError || core.stale || core.recovery) && <div className="cs-save-warning" role="alert"><p>{core.recovery ?? (core.stale ? 'A newer copy of this attempt is open. Reload before editing.' : core.saveError)}</p>{core.saveError && !core.recovery && <button onClick={() => core.retrySave()}>Retry save</button>}{core.recovery && locked && <button onClick={core.retryReport}>Retry report</button>}<button onClick={core.downloadSave}>Export progress</button>{(core.stale || core.recovery && locked) && <button onClick={() => location.reload()}>Reload</button>}</div>;
  const title = pilot && entry === 'title';
  const clean = pilot ? title ? 'title' : place.screen === 'room' && place.room === 1 ? 'room-r02' : ['dossier', 'decision', 'document', 'copy'].includes(place.screen) ? 'folder' : place.screen === 'briefing' ? 'briefing' : place.screen === 'intake' ? 'intake' : null : null;
  const motionStyle: CSSProperties = camera ? { transformOrigin: `${camera.x}% ${camera.y}%`, transform: `translate(${50 - camera.x}%,${50 - camera.y}%) scale(${camera.zoom})`, transition: 'transform 180ms ease-out' } : { transform: 'none', transition: settings.reducedMotion ? 'none' : 'transform 180ms ease-out' };
  return <main className={`concept-study${pilot ? ' integration-pilot' : ''}${title ? ' ip-at-title' : ''}`} style={{ '--text-factor': settings.textSize / 100 } as CSSProperties}>
    <div className={`cs-stage cs-screen-${place.screen}`} data-room={place.room + 1} data-motion={settings.reducedMotion ? "reduced" : "full"}>
      <ConceptBackground src={clean ? `${ART_ROOT}${clean}.png` : `/assets/concept-study/${art}.png`} reducedMotion={settings.reducedMotion} camera={camera} />
      {title ? <TitleScreen modalOpen={!!dialog} canContinue={core.hasSave && !core.recovery && !core.stale} busy={core.busy} onContinue={() => { setPlace(resumeScreen(state) as Place); setHistory([]); setEntry('work'); }} onNew={() => core.hasSave || core.recovery ? setDialog('restart') : createAttempt()} onSettings={() => openSettings()} /> : <div className="ip-work" inert={!!dialog}>
      <header className="cs-hud">
        <div className="cs-hud-tools"><button onClick={() => setDialog('menu')}>Menu</button><button aria-label="How to play" onClick={() => navigate('briefing')}>?</button></div>
        <div className="cs-hud-title"><span>THE CREDIT DESK</span><h1>{place.screen === 'room' ? ROOMS[place.room] : TITLES[place.screen]}</h1></div>
        <div className="cs-save-status" role="status"><span>{state.started ? state.reached : 0} / {CASES.length} opened</span><span>{core.busy ? 'Working…' : core.stale ? 'Open in another tab' : core.saveError ? 'Not saved' : locked ? 'Submitted' : state.started ? 'Saved' : 'New shift'}</span></div>
      </header>
      <section ref={liveRegion} className="cs-live-layer" aria-label={place.screen === 'room' ? `${ROOMS[place.room]} objects` : TITLES[place.screen]} tabIndex={-1} style={pilot && place.screen === 'room' ? motionStyle : undefined}>
        {place.screen === 'room' && <>
          {place.room === 0 && <>
            {hotspot('Meet the applicant', [53, 47, 13, 42], () => navigate('meeting'))}
            {hotspot('Open applicant folder at your desk', [24, 56, 10, 9], () => navigate('dossier'))}
          </>}
          {place.room === 1 && <>
            {copies.filter(copy => copy.location === 'desk').slice(-1).map(copy => <span className="cs-desk-paper" key={copy.id} aria-hidden="true">{copy.recordId}<i /><i /><i /></span>)}
            {hotspot('Read shift briefing', [...PILOT_R02.briefing.box], () => navigate('briefing'))}
            {hotspot(state.started ? 'Open current dossier' : 'Begin shift · open first dossier', [35.5, 56, 11, 13], () => navigate('dossier'))}
            {hotspot('Open personal notebook', [48.5, 56, 9, 13], () => navigate('worksheet'))}
            {hotspot(pilot ? 'Open incoming dossier tray' : 'Read collected copies', [...PILOT_R02.intake.box], pilot ? () => navigate('intake') : openTray)}
          </>}
          {place.room === 2 && <>
            {hotspot('Use computer · Warehouse & CIC', [53, 41, 18, 23], () => navigate(state.objects.terminalPage))}
            {hotspot('Read collected copies', [72.5, 53, 12, 12], openTray)}
          </>}
          {place.room === 3 && <>
            <div className="cs-wallboard" aria-hidden="true">{state.boardSources.map((source, i) => <span key={source} className="cs-wall-paper" style={{ left: `${8 + (state.boardLayout[source]?.x ?? i * 100) * .49}%`, top: `${13 + (state.boardLayout[source]?.y ?? i * 20) * .25}%` }}><i />{source.startsWith('record:') ? source.slice(7) : `${source.startsWith('cic:') ? 'CIC' : 'Application'} · ${source.split(':')[1]}`}<em /><em /><em /></span>)}</div>
            {hotspot('Read comparison board & notes', [32.5, 11, 39, 40], () => navigate('board'))}
            {hotspot(locked ? 'Open submitted report' : 'Review round ledger', [41.5, 55, 15, 13], () => navigate(locked ? 'summary' : 'review'))}
            {hotspot('Read credit rulebook', [19.5, 56, 5.5, 17], () => navigate('help'))}
          </>}
        </>}
        {place.screen === 'intake' && <IncomingTray game={game} advancing={advancing} onFirst={() => navigate('dossier')} onResume={() => { core.send({ type: 'case', index: state.reached - 1 }); navigate('dossier'); }} onAdvance={() => send({ type: 'continue' })} />}
        {place.screen === 'dossier' && <div className="cs-folder-surface"><ConceptDossier game={game} onOpen={navigate} advancing={advancing} /></div>}
        {place.screen === 'meeting' && <ConceptMeeting game={game} onOpen={navigate} />}
        {(place.screen === 'warehouse' || place.screen === 'cic') && <div className="cs-monitor-surface"><ConceptTerminal game={game} service={place.screen} onOpen={navigate} /></div>}
        {place.screen === 'worksheet' && <>
          <div className="cs-notebook-source"><header><span>{file.id}</span><h2>{file.name}</h2><p>Application · source</p></header><div className="cs-scroll"><EvidenceText game={game} sourceLabel={`${file.id} · Application`} text={file.narrative} /></div></div>
          <div className="cs-notebook-surface"><header><h2>Personal notebook</h2><p>{file.id} · {file.name}</p><nav><button aria-pressed={state.objects.notebookPage === 'worksheet'} onClick={() => core.send({ type: 'object', action: { kind: 'notebook-page', page: 'worksheet' } })}>Worksheet</button><button aria-pressed={state.objects.notebookPage === 'notes'} onClick={() => core.send({ type: 'object', action: { kind: 'notebook-page', page: 'notes' } })}>Notes</button></nav></header><div className="cs-scroll">{state.objects.notebookPage === 'worksheet' ? <Worksheet game={game} /> : <label className="cs-notes-label">Personal notes · unscored<textarea value={state.drafts[file.id].notes} maxLength={20000} disabled={locked} rows={14} onChange={e => send({ type: 'draft', patch: { notes: e.target.value } })} /></label>}</div></div>
        </>}
        {place.screen === 'decision' && <div className="cs-folder-surface cs-decision-surface"><header className="cs-paper-heading"><div><span>{file.id}</span><h2>{file.name}</h2></div><button onClick={() => navigate('dossier')}>Read dossier</button></header><div className="cs-scroll"><DecisionPanel key={file.id} game={game} /></div></div>}
        {place.screen === 'board' && <div className="cs-board-surface"><BoardView game={game} onOpenSource={source => {
          const [kind, id] = source.split(':');
          if (kind === 'record') { core.send({ type: 'record', id }); navigate('warehouse'); }
          else { core.send({ type: 'case', index: CASES.findIndex(item => item.id === id) }); core.send({ type: 'tab', value: kind === 'cic' ? 'cic' : 'application' }); navigate(kind === 'cic' ? 'cic' : 'dossier'); }
        }} /></div>}
        {place.screen === 'review' && <div className="cs-ledger-surface"><div className="cs-scroll"><ReviewView game={game} onSubmit={() => setDialog('submit')} /></div></div>}
        {(place.screen === 'summary' || place.screen === 'detail') && <div className="cs-ledger-surface cs-report-surface"><nav className="cs-report-tabs"><button aria-current={place.screen === 'summary' ? 'page' : undefined} onClick={() => navigate('summary')}>Round summary</button><button aria-current={place.screen === 'detail' ? 'page' : undefined} onClick={() => navigate('detail')}>Dossier assessments</button></nav><div className="cs-scroll"><ConceptReport game={game} mode={place.screen === 'summary' ? 'summary' : 'detail'} onDetail={index => { core.send({ type: 'case', index }); if (place.screen !== 'detail') navigate('detail'); }} onRestart={() => setDialog('restart')} /></div></div>}
        {(place.screen === 'document' || place.screen === 'help' || place.screen === 'briefing') && <div className={place.screen === 'document' ? 'cs-folder-surface cs-paper-surface' : 'cs-utility-surface'}><ConceptPaper game={game} mode={place.screen} />{pilot && place.screen === 'briefing' && <div className="ip-briefing-actions"><button onClick={() => navigate('intake')}>Open incoming tray</button><button onClick={() => goRoom(1)}>Go to dossier desk</button></div>}</div>}
        {place.screen === 'copy' && <div className="cs-folder-surface cs-paper-surface cs-scroll">{copyId ? <PaperCopy game={game} id={copyId} /> : <p>No copy selected.</p>}</div>}
      </section>
      <footer className="cs-bottom">
        {place.screen !== 'room' ? <><button className="cs-back" onClick={back}>← Back{history.at(-1)?.screen === 'room' ? ` to ${ROOMS[history.at(-1)!.room]}` : ''}</button><button onClick={() => goRoom(place.room)}>Put down</button><span className="cs-context">R0{place.room + 1} · {pilot && !state.started ? 'No active dossier' : file.id}</span></> : <>
          <button className="cs-room-arrow" aria-label="Previous room" onClick={() => goRoom(((place.room + 3) % 4) as Room)}>◀</button>
          <nav className="cs-room-nav" aria-label="Travel between rooms">{ROOMS.map((name, index) => <button key={name} aria-current={index === place.room ? 'location' : undefined} onClick={() => index !== place.room && goRoom(index as Room)}><span>0{index + 1}</span>{name}</button>)}</nav>
          <button className="cs-room-arrow" aria-label="Next room" onClick={() => goRoom(((place.room + 1) % 4) as Room)}>▶</button>
        </>}
        {!!copies.length && <button className="cs-carried" onClick={() => setDialog('copies')}>Copies ({copies.length})</button>}
      </footer>
      {place.screen === 'room' && <p className="cs-object-hint" role="status">{hint || message || ROLES[place.room]}</p>}
      {message && place.screen !== 'room' && <p className="cs-toast" role="status">{message}<button onClick={() => setMessage('')} aria-label="Dismiss message">×</button></p>}
      </div>}
      {!dialog && saveWarning}
      {dialog && <Modal key={dialog} returnFocus={dialogOpener.current} menuSettingsFocus={menuSettingsFocus && dialog === 'menu'} settings={dialog === 'settings'} title={dialog === 'settings' ? 'Settings' : dialog === 'menu' ? 'Shift menu' : dialog === 'submit' ? 'Submit this round?' : dialog === 'restart' ? 'Start a new shift?' : dialog === 'replace' ? 'Choose board space' : 'Collected copies'} onClose={closeDialog}>
        {saveWarning}
        {dialog === 'settings' && <SettingsPanel settings={settings} onChange={changeSettings} onClose={closeDialog} status={preferenceError || core.saveError || 'Preferences saved'} />}
        {dialog === 'menu' && pilot && <div className="ip-menu-content"><p>{state.started ? `${file.id} · ${file.name}` : 'Eight dossiers · untimed shift'}</p><button onClick={() => setDialog(null)}>Resume</button><nav aria-label="Work shortcuts">{(['meeting', 'intake', 'dossier', 'warehouse', 'cic', 'worksheet', 'decision', 'board', 'review', 'help', 'briefing'] as Screen[]).map(screen => <button key={screen} onClick={() => { setDialog(null); navigate(locked && screen === 'review' ? 'summary' : screen); }}>{TITLES[screen]}</button>)}</nav><div className="cs-dialog-actions"><button data-menu-settings onClick={() => openSettings('menu')}>Settings</button><button onClick={core.downloadSave}>Export progress</button><button onClick={returnTitle}>Return to Title</button><button onClick={() => { dialogReturn.current = 'menu'; setDialog('restart'); }}>New Game</button></div></div>}
        {dialog === 'menu' && !pilot && <div className="cs-menu-content"><p>{state.started ? `Current file · ${file.id} · ${file.name}` : 'Eight dossiers · untimed shift'}</p><label className="cs-field">Text size<select value={state.settings.textSize} onChange={e => core.send({ type: 'settings', value: { textSize: Number(e.target.value) } })}><option value={100}>Standard</option><option value={115}>Larger</option><option value={130}>Largest</option></select></label><label><input type="checkbox" checked={state.settings.reducedMotion} onChange={e => core.send({ type: 'settings', value: { reducedMotion: e.target.checked } })} /> Reduce motion</label><button onClick={() => { setDialog(null); navigate('briefing'); }}>Read shift briefing</button><button onClick={core.downloadSave}>Export progress</button><button onClick={() => setDialog('restart')}>Start a new shift</button></div>}
        {dialog === 'submit' && <><p>All eight decisions and required inputs are complete. Confirming Submit ends this shift and opens the assessments. You can keep reviewing without a time limit.</p><div className="cs-dialog-actions"><button onClick={() => setDialog(null)}>Keep reviewing</button><button className="cs-primary" disabled={!roundReady(state) || blocked} onClick={async () => { if (await core.submit()) { setDialog(null); setHistory([]); setPlace({ room: 3, screen: 'summary' }); } }}>Confirm Submit</button></div></>}
        {dialog === 'restart' && <><p>A new shift replaces this prototype’s saved attempt. Export your progress first if you want to keep it.</p><div className="cs-dialog-actions"><button onClick={core.downloadSave}>Export progress</button><button onClick={closeDialog}>Cancel</button><button disabled={core.busy || core.stale} onClick={pilot ? createAttempt : core.restart}>Replace with new shift</button></div></>}
        {dialog === 'copies' && <div className="cs-copy-list">{copies.map(copy => { const record = WAREHOUSE.find(item => item.id === copy.recordId)!; return <article key={copy.id}><h3>{record.id} · {record.name}</h3><p>{copy.location === 'inventory' ? 'Carried' : copy.location === 'board' ? 'On comparison board' : 'On desk'}</p><div><button onClick={() => { setDialog(null); setCopyId(record.id); navigate('copy'); }}>Read copy</button>{!locked && <><button onClick={() => { setDialog(null); useCopy('desk', undefined, copy.id); }}>Place on desk</button><button onClick={() => { setDialog(null); useCopy('board', undefined, copy.id); }}>Pin to board</button></>}</div></article>; })}</div>}
        {dialog === 'replace' && <><p>Both spaces are occupied. Choose the source to replace.</p><div className="cs-dialog-actions">{([0, 1] as const).map(slot => <button key={slot} onClick={() => { setDialog(null); if (pendingSource) { core.send({ type: 'board-slot', slot, source: pendingSource }); setPendingSource(null); navigate('board'); } else { useCopy('board', slot, pendingCopy ?? undefined); setPendingCopy(null); } }}>Replace Source {slot + 1} · {state.boardSources[slot]}</button>)}</div></>}
      </Modal>}
    </div>
  </main>;
}
