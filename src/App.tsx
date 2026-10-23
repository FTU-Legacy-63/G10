import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useGame } from './application/useGame';
import { useWorkspaceNavigation } from './application/useWorkspaceNavigation';
import { CASES } from './content';
import { roundReady } from './application/round';
import { money, plannedAllocation } from './domain/finance';
import type { View } from './domain/types';
import { Office } from './game/Office';
import { sourceLabel } from './game/roomState';
import { directionFor, VIEW_LABEL } from './game/spatial';
import { Arrow, Dialog } from './ui/Primitives';
import { HelpView } from './ui/HelpView';
import { WorkObject } from './ui/WorkObject';
import { ItemTray } from './ui/ItemTray';
import { playFoley } from './game/sound';
import { currentCopies, selectedCopy } from './application/objectActions';
import type { Game } from './ui/types';
const TASKS: { view: View; label: string; hint: string }[] = [
  { view: 'office', label: 'Look around', hint: 'Return to the room' },
  { view: 'dossier', label: 'Dossier', hint: 'Open the application folder on your desk' },
  { view: 'warehouse', label: 'Warehouse', hint: 'Use the research terminal' },
  { view: 'worksheet', label: 'Worksheet', hint: 'Open your assessment notebook' },
  { view: 'board', label: 'Comparison & notes', hint: 'Work at the evidence board' },
  { view: 'review', label: 'Round ledger', hint: 'Review reached dossiers and Submit' },
  { view: 'help', label: 'Rulebook', hint: 'Read the reference book' },
];
type Modal = 'menu' | 'settings' | 'guide' | 'briefing' | 'submit' | 'restart' | null;
export default function App() {
  const core = useGame();
  const copyOnDesk = core.state.deskCopy;
  const setCopyOnDesk = (id: string | null) => core.send({ type: 'desk-copy', id });
  const workspace = useWorkspaceNavigation({ ...core, copyOnDesk }, setCopyOnDesk);
  const [placement, setPlacement] = useState<{ copyId?: string; source?: string } | null>(null);
  const [objectStatus, setObjectStatus] = useState('');
  useEffect(() => { if (!objectStatus) return; const timer = window.setTimeout(() => setObjectStatus(''), 3600); return () => window.clearTimeout(timer); }, [objectStatus]);
  const useCopy = (target: 'desk' | 'board', slot?: 0 | 1, copyId?: string) => {
    if (core.state.phase === 'submitted' || core.stale || core.recovery || core.busy) return;
    const copy = currentCopies(core.state).find(copy => copy.id === (copyId ?? selectedCopy(core.state)?.id));
    if (!copy) { setObjectStatus('Select a carried copy first.'); return; }
    if (target === 'board' && slot === undefined && core.state.boardSources.length === 2 && !core.state.boardSources.includes(`record:${copy.recordId}`)) { setPlacement({ copyId: copy.id }); return; }
    if (target === 'board' && copy.location === 'board') { workspace.game.send({ type: 'view', view: 'board' }); return; }
    if (!core.sendObjects([{ kind: 'transfer-copy', copyId: copy.id, target, slot }])) { if (target === 'desk' && copy.location === 'desk') workspace.game.send({ type: 'view', view: 'dossier' }); return; }
    playFoley(target === 'board' ? 'tack' : 'paper', core.state.settings.sound);
    setPlacement(null); setObjectStatus(`${copy.recordId} ${target === 'desk' ? 'placed on the desk' : 'pinned to the board'}.`);
    workspace.game.send({ type: 'view', view: target === 'desk' ? 'dossier' : 'board' });
  };
  const game: Game = { ...workspace.game, copyOnDesk, useCopy, send: action => {
    if (action.type === 'board' && core.state.phase === 'draft' && !core.state.boardSources.includes(action.source) && core.state.boardSources.length === 2) { setPlacement({ source: action.source }); return; }
    if (['case', 'tab', 'continue', 'start'].includes(action.type)) setCopyOnDesk(null);
    if (action.type === 'view' && action.view === 'warehouse') core.send({ type: 'object', action: { kind: 'terminal-page', page: 'warehouse' } });
    workspace.game.send(action);
    if (['start', 'continue', 'case'].includes(action.type) || action.type === 'view' && action.view === 'dossier' && core.state.view !== 'dossier') core.send({ type: 'object', action: { kind: 'folder', open: true } });
  }, inspectCopy: id => {
    setCopyOnDesk(id);
    if (id && !['dossier', 'worksheet'].includes(core.state.view)) workspace.game.send({ type: 'view', view: 'dossier' });
  } };
  const { state, send } = game;
  const [modal, setModal] = useState<Modal>(null);
  const [titleScreen, setTitleScreen] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const latest = useRef({ game, workspace }); latest.current = { game, workspace };
  const opened = state.started ? state.reached : 0;
  const amounts = CASES.slice(0, state.reached).map(c => plannedAllocation(state.drafts[c.id], c));
  const total = amounts.reduce<number>((sum, n) => sum + (n ?? 0), 0);
  const isWork = state.view !== 'office' && !titleScreen;
  const activeView = isWork ? state.view : 'office';
  const direction = directionFor(activeView, state.direction);
  const navigate = (view: View) => { setTitleScreen(false); if (view === 'dossier') { setCopyOnDesk(null); core.send({ type: 'object', action: { kind: 'folder', open: true } }); } workspace.travel(view); setModal(null); };
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const { game, workspace } = latest.current;
      if (document.querySelector('dialog[open]') || game.recovery || game.stale) return;
      if (event.key === 'Escape' && game.state.view !== 'office') { event.preventDefault(); workspace.back(); return; }
      if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key === '?') { event.preventDefault(); setModal('guide'); return; }
      if (game.state.view === 'office' && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault(); game.send({ type: 'direction', value: game.state.direction + (event.key === 'ArrowLeft' ? -1 : 1) });
      }
    };
    window.addEventListener('keydown', listener); return () => window.removeEventListener('keydown', listener);
  }, []);
  useEffect(() => {
    if (isWork) title.current?.focus({ preventScroll: true });
    else {
      const target = workspace.returnFocus.current;
      if (target) document.getElementById(target)?.focus({ preventScroll: true });
    }
  }, [state.view, state.current, titleScreen]);
  return <div className={`game-shell spatial-shell pointclick-shell ${state.settings.reducedMotion ? 'reduced-motion' : ''}`} style={{ '--reading-scale': state.settings.textSize / 100 } as CSSProperties}>
    <header className="app-header"><a className="wordmark" href="#office" onClick={e => { e.preventDefault(); navigate('office'); }}>The Credit Desk</a><div className="shift-progress"><span>{opened}/8 dossiers opened</span><span>{state.phase === 'submitted' ? 'Shift submitted' : game.saveError ? 'Unsaved changes' : game.recovery ? 'Saved progress needs attention' : 'Saved on this device'}</span></div>
      {state.started && ['review', 'summary'].includes(state.view) ? <div className="room-hud"><span>Room planned{amounts.some(a => a === null) || state.reached < CASES.length ? ' · incomplete' : ''}</span><strong>{money(total)} <small>/ 4,590,000,000 VND</small></strong></div> : null}
      <nav className="header-actions" aria-label="Game menu"><button aria-label="How assessment works" onClick={() => setModal('guide')}>?</button><button onClick={() => setModal('settings')}>Settings</button><button className="menu-button" onClick={() => setModal('menu')}>Menu</button></nav>
    </header>
    {game.saveError ? <div className="notice" role="alert"><span>{game.saveError}</span><button onClick={game.retrySave}>Retry saving</button><button onClick={game.downloadSave}>Export working</button></div> : null}
    {game.stale ? <div className="notice" role="alert"><span>Progress changed in another tab. Reload to use the latest saved working.</span><button onClick={() => location.reload()}>Reload</button><button onClick={game.downloadSave}>Export this tab’s working</button></div> : null}
    {game.recovery ? <div className="notice" role="alert"><span>{game.recovery} Your previous save has not been overwritten.</span><button onClick={() => location.reload()}>Retry loading</button><button onClick={game.downloadSave}>Export saved progress</button><button onClick={() => setModal('restart')}>Start fresh</button></div> : null}
    <main className={`world-stage ${isWork ? `using-${state.view}` : 'looking-around'}`}>
      <div className="office-layer" inert={isWork}><Office state={state} direction={direction} activeView={activeView} started={state.started && !titleScreen} canContinue={state.started} reducedMotion={state.settings.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches} onContinue={() => setTitleScreen(false)} onTurn={value => send({ type: 'direction', value })} onOpen={navigate} onInspectCopy={id => game.inspectCopy?.(id)} onUseCopy={useCopy} onStart={() => setModal(state.started ? 'restart' : 'briefing')} /></div>
      {isWork ? <WorkObject game={game} heading={title} backLabel={workspace.history.length ? `Back to ${VIEW_LABEL[workspace.history.at(-1)!.view].toLowerCase()}` : 'Step back'} onBack={workspace.back} onClose={workspace.close} onSubmit={() => setModal('submit')} onRestart={() => setModal('restart')} /> : null}
      {state.started && !titleScreen ? <ItemTray game={game} onOpen={navigate} /> : null}
      {objectStatus ? <p className="object-feedback" role="status" key={objectStatus}>{objectStatus}<button aria-label="Dismiss object status" onClick={() => setObjectStatus('')}>×</button></p> : null}
    </main>
    {placement ? <Dialog title="Choose a place on the board" onClose={() => setPlacement(null)}><p>Both source places are occupied. Choose which source to replace. A displaced Warehouse copy returns to the tray. Original documents remain available.</p><div className="placement-options">{state.boardSources.map((source, slot) => <button key={source} onClick={() => { if (placement.copyId) useCopy('board', slot as 0 | 1, placement.copyId); else if (placement.source) { workspace.game.send({ type: 'board-slot', slot, source: placement.source }); workspace.game.send({ type: 'view', view: 'board' }); setPlacement(null); } }}>Replace source {slot + 1}<strong>{sourceLabel(source)}</strong></button>)}<button onClick={() => setPlacement(null)}>Keep both sources</button></div></Dialog> : null}
    {modal ? <Dialog title={modal === 'menu' ? 'Your workspace' : modal === 'settings' ? 'Settings' : modal === 'guide' ? 'How assessment works' : modal === 'briefing' ? 'Welcome to the credit desk' : modal === 'submit' ? 'Submit round?' : 'Start a new shift?'} busy={modal === 'submit' && game.busy} onClose={() => setModal(null)}>
      {modal === 'guide' ? <HelpView /> : null}
      {modal === 'menu' ? <div className="menu-tasks"><button onClick={() => setModal(null)}><strong>Resume</strong><span>Return to your current task</span><Arrow /></button>{TASKS.map(task => <button key={task.view} disabled={!state.started && task.view !== 'help'} onClick={() => navigate(task.view)}><strong>{task.label}</strong><span>{task.hint}</span><Arrow /></button>)}{state.phase === 'submitted' ? <button onClick={() => navigate('summary')}><strong>Final Summary</strong><span>Reopen your locked report</span><Arrow /></button> : null}<button onClick={() => setModal('settings')}><strong>Settings</strong><span>Reading size and motion</span><Arrow /></button>{state.started ? <><button onClick={() => { setTitleScreen(true); setModal(null); }}><strong>Title screen</strong><span>Keep this attempt for Continue</span><Arrow /></button><button onClick={() => setModal('restart')}><strong>New shift</strong><span>Replace the current saved attempt</span><Arrow /></button></> : null}</div> : null}
      {modal === 'settings' ? <div className="settings-form"><label className="field">Reading text size<select value={state.settings.textSize} onChange={e => send({ type: 'settings', value: { textSize: Number(e.target.value) } })}><option value={100}>100%</option><option value={115}>115%</option><option value={130}>130%</option></select></label><label className="check-label"><input type="checkbox" checked={state.settings.reducedMotion} onChange={e => send({ type: 'settings', value: { reducedMotion: e.target.checked } })} />Reduce motion</label><label className="check-label"><input type="checkbox" checked={state.settings.sound} onChange={e => send({ type: 'settings', value: { sound: e.target.checked } })} />Object sounds</label><p className="fine">Progress is stored in this browser on this device. There is no account or cross-device sync.</p><button onClick={game.downloadSave}>Export progress</button></div> : null}
      {modal === 'briefing' ? <div><p>You have eight applications to assess. Read their evidence, identify income in the Warehouse, and use Check CIC to inspect credit history and active debts.</p><p>Your worksheet is optional. Decisions remain provisional, and you can review reached dossiers. The full explanation arrives only after you confirm the entire round.</p><p><strong>There is no time limit.</strong> Save, take a break and return whenever you need.</p><div className="dialog-actions"><button onClick={() => setModal(null)}>Keep looking around</button><button className="primary" onClick={() => { send({ type: 'start' }); setTitleScreen(false); setModal(null); }}>Open first dossier <Arrow /></button></div></div> : null}
      {modal === 'submit' ? <div><p>Decisions cannot be changed after this.</p><p>All worksheets, pinned records, notes and decisions will be locked together. You can keep editing for as long as you need.</p><div className="dialog-actions"><button disabled={game.busy} onClick={() => setModal(null)}>Keep editing</button><button className="primary" disabled={!roundReady(state) || game.busy || game.stale} onClick={async () => { if (await game.submit()) { workspace.reset(); setModal(null); } }}>{game.busy ? 'Saving final round…' : 'Submit round'}</button></div></div> : null}
      {modal === 'restart' ? <div><p>This replaces the current saved attempt. Export your progress first if you want to retain it.</p><div className="dialog-actions"><button onClick={game.downloadSave}>Export progress</button><button onClick={() => setModal(null)}>Cancel</button><button className="primary" onClick={() => { game.restart(); workspace.reset(); setCopyOnDesk(null); setModal(null); }}>Start fresh</button></div></div> : null}
    </Dialog> : null}
  </div>;
}
