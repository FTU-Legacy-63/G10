import { CASES } from '../content';
import type { RoundState, View } from '../domain/types';
import { currentCopies } from '../application/objectActions';
import { ROOM_COPY, ROOM_OBJECTS, ROOM_SIZE } from './roomArt';
import type { RoomArtObject, RoomObjectId } from './roomArt';

export function objectState(state: RoundState, id: RoomObjectId, activeView: View = state.view): string {
  const caseId = CASES[state.current].id;
  switch (id) {
    case 'folder': return state.objects.folderOpen[caseId] ? 'open' : 'closed';
    case 'notebook': return activeView === 'worksheet' ? 'open' : 'closed';
    case 'terminal': return activeView === 'warehouse' ? 'active' : 'idle';
    case 'board': return state.boardSources.length ? 'used' : 'empty';
    case 'ledger': return activeView === 'review' || activeView === 'summary' ? 'open' : 'closed';
    case 'guide': return activeView === 'help' ? 'open' : 'closed';
    case 'copy': return 'placed';
  }
}
export function roomPresentation(state: RoundState, activeView: View) {
  return {
    states: Object.fromEntries(ROOM_OBJECTS.map(object => [object.id, objectState(state, object.id, activeView)])),
    deskCopy: (currentCopies(state).find(copy => copy.location === 'desk' && copy.recordId === state.deskCopy) ?? currentCopies(state).filter(copy => copy.location === 'desk').at(-1))?.recordId ?? null,
    boardSources: state.boardSources,
    boardLayout: state.boardLayout,
  };
}
export type RoomPresentation = ReturnType<typeof roomPresentation>;
export function sourceLabel(source: string) {
  const [kind, id] = source.split(':');
  return kind === 'record' ? id : `${kind === 'cic' ? 'CIC' : 'File'} · ${id}`;
}
export function boardPaperRect(source: string, slot: number, layout: RoundState['boardLayout']) {
  const point = layout[source] ?? { x: slot * 100, y: slot * 20 };
  return { x: 395 + point.x * 4.32, y: 235 + point.y * .6, width: 340, height: 270 };
}
export function artForView(view: View): RoomArtObject {
  return ROOM_OBJECTS.find(object => object.view === (view === 'summary' ? 'review' : view)) ?? ROOM_OBJECTS[0];
}
export function targetBounds(object: Pick<RoomArtObject, 'x' | 'y' | 'width' | 'height' | 'hitInset'>) {
  const [left, top, right, bottom] = object.hitInset;
  return { left: `${(object.x + left) / ROOM_SIZE.width * 100}%`, top: `${(object.y + top) / ROOM_SIZE.height * 100}%`, width: `${(object.width - left - right) / ROOM_SIZE.width * 100}%`, height: `${(object.height - top - bottom) / ROOM_SIZE.height * 100}%` };
}
export function roomFrame(width: number, height: number, direction: number, focused = false) {
  const overview = Math.min(width / ROOM_SIZE.width, height / ROOM_SIZE.height);
  if (!focused) return { scale: overview, x: (width - ROOM_SIZE.width * overview) / 2, y: (height - ROOM_SIZE.height * overview) / 2 };
  const centers = [[800, 660], [800, 430], [800, 375], [970, 680]];
  const zoom = direction === 1 ? 1.55 : direction === 2 ? 1.28 : 1.2;
  const scale = Math.max(width / ROOM_SIZE.width, height / ROOM_SIZE.height) * zoom;
  const [cx, cy] = centers[direction];
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  return { scale, x: clamp(width / 2 - cx * scale, width - ROOM_SIZE.width * scale, 0), y: clamp(height / 2 - cy * scale, height - ROOM_SIZE.height * scale, 0) };
}
export { ROOM_COPY };
