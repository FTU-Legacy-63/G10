import { useRef, useState } from 'react';
import type { Action } from './round';
import type { View } from '../domain/types';
import type { Game } from '../ui/types';
import { contextOf, directionFor, pushContext } from '../game/spatial';
import type { WorkContext } from '../game/spatial';
import { playFoley } from '../game/sound';
import { artForView } from '../game/roomState';

export function useWorkspaceNavigation(core: Game, restoreCopy: (id: string | null) => void) {
  const latest = useRef(core); latest.current = core;
  const [history, setHistory] = useState<WorkContext[]>([]);
  const stack = useRef(history);
  const returnFocus = useRef<string | null>(null);
  const lastKeySound = useRef(0);
  const blocked = () => !!(latest.current.stale || latest.current.recovery || latest.current.busy);
  const store = (value: WorkContext[]) => { stack.current = value; setHistory(value); };
  const sound = (kind: 'paper' | 'keyboard' | 'tack' | 'wood') => playFoley(kind, latest.current.state.settings.sound);
  const activate = (view: View) => {
    const game = latest.current;
    game.send({ type: 'direction', value: directionFor(view, game.state.direction) });
    game.send({ type: 'view', view });
  };
  const remember = () => store(pushContext(stack.current, contextOf(latest.current.state, latest.current.copyOnDesk ?? null)));
  const close = () => {
    if (blocked()) return;
    const game = latest.current;
    const direction = directionFor(game.state.view, game.state.direction);
    const target = `object-${artForView(game.state.view).view}`;
    returnFocus.current = target;
    store([]); sound('paper');
    game.send({ type: 'direction', value: direction }); game.send({ type: 'view', view: 'office' });
  };
  const back = () => {
    if (blocked()) return;
    const previous = stack.current.at(-1);
    if (!previous) { close(); return; }
    store(stack.current.slice(0, -1)); sound('paper');
    const game = latest.current;
    if (previous.view !== 'office') game.send({ type: 'case', index: previous.current });
    game.send({ type: 'tab', value: previous.tab });
    game.send({ type: 'record', id: previous.record });
    restoreCopy(previous.copy);
    game.send({ type: 'object', action: { kind: 'terminal-page', page: previous.terminalPage } });
    game.send({ type: 'object', action: { kind: 'notebook-page', page: previous.notebookPage } });
    activate(previous.view);
  };
  const travel = (view: View) => {
    if (blocked()) return;
    if (view === 'office') { close(); return; }
    store([]); sound(view === 'warehouse' ? 'wood' : 'paper'); activate(view);
  };
  const send = (action: Action) => {
    if (blocked()) return;
    const game = latest.current;
    if (action.type === 'view') {
      if (action.view === 'office') { close(); return; }
      if (action.view !== game.state.view && game.state.view !== 'office') remember();
      sound(action.view === 'warehouse' ? 'wood' : 'paper'); activate(action.view); return;
    }
    if (action.type === 'case') {
      if (action.index < 0 || action.index >= game.state.reached) return;
      if (game.state.view !== 'dossier' || action.index !== game.state.current) remember();
      game.send({ type: 'direction', value: 0 }); sound('paper');
    } else if (action.type === 'continue' || action.type === 'start') { store([]); sound('paper'); }
    else if (action.type === 'object') sound(action.action.kind === 'use-copy' && action.action.target === 'board' ? 'tack' : 'paper');
    else if (action.type === 'board' || action.type === 'board-slot' || action.type === 'board-move') sound('tack');
    else if (action.type === 'tab' || action.type === 'record' || action.type === 'decision') sound('paper');
    else if (action.type === 'query' || action.type === 'worksheet' || action.type === 'draft') {
      if (performance.now() - lastKeySound.current > 110) { sound('keyboard'); lastKeySound.current = performance.now(); }
    }
    game.send(action);
  };
  return { game: { ...core, send }, history, travel, back, close, returnFocus, reset: () => store([]) };
}
