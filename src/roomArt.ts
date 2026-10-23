/** Original vector office. Artwork and HTML targets use one 1600×900 world frame.
 * Images are tight transparent layers; each state's image has identical dimensions.
 * Geometry x/y is its top-left, origin (0,0); no baked text or interaction handlers.
 */
export const ROOM_SIZE = { width: 1600, height: 900 } as const;
export const ROOM_PALETTE = {
  ink: '#303a35', wall: '#bec2af', wallShade: '#aeb6a3', cream: '#eee8d4',
  paper: '#f6f0dd', sage: '#5b786d', sageLight: '#91a496', clay: '#af7560',
  wood: '#967457', woodLight: '#b49a79', woodDark: '#675649', brass: '#b59a60',
  screen: '#263f39', screenActive: '#719182', floor: '#827666',
} as const;
export type RoomObjectId = 'folder' | 'notebook' | 'terminal' | 'board' | 'guide' | 'ledger' | 'copy';
export interface RoomArtObject {
  id: RoomObjectId; view: 'dossier' | 'worksheet' | 'warehouse' | 'board' | 'help' | 'review'; label: string; direction: number; x: number; y: number; width: number; height: number;
  origin: readonly [number, number]; hitInset: readonly [number, number, number, number];
  states: Readonly<Record<string, string>>;
}
const base = '/assets/room-v2/';
export const ROOM_ART = ['front-room.svg', 'right-room.svg', 'rear-room.svg', 'left-room.svg'].map(file => base + file);
export const ROOM_OBJECTS: readonly RoomArtObject[] = [
  { id:'folder', view:'dossier', label:'Open application folder', direction:0, x:350, y:585, width:380, height:235, origin:[0,0], hitInset:[8,8,8,6], states:{ closed:base+'folder-closed.svg', open:base+'folder-open.svg' } },
  { id:'notebook', view:'worksheet', label:'Open assessment notebook', direction:0, x:990, y:605, width:250, height:210, origin:[0,0], hitInset:[12,8,10,10], states:{ closed:base+'notebook-closed.svg', open:base+'notebook-open.svg' } },
  { id:'terminal', view:'warehouse', label:'Use research terminal', direction:1, x:565, y:235, width:470, height:410, origin:[0,0], hitInset:[20,4,20,4], states:{ idle:base+'terminal-idle.svg', active:base+'terminal-active.svg' } },
  { id:'board', view:'board', label:'Use evidence board', direction:2, x:345, y:135, width:910, height:485, origin:[0,0], hitInset:[4,4,4,4], states:{ empty:base+'board-empty.svg', used:base+'board-used.svg' } },
  { id:'guide', view:'help', label:'Read the credit guide', direction:3, x:630, y:620, width:280, height:200, origin:[0,0], hitInset:[8,8,8,8], states:{ closed:base+'guide-closed.svg', open:base+'guide-open.svg' } },
  { id:'ledger', view:'review', label:'Open round ledger', direction:3, x:1010, y:610, width:290, height:210, origin:[0,0], hitInset:[8,8,8,8], states:{ closed:base+'ledger-closed.svg', open:base+'ledger-open.svg' } },
] as const;
export const ROOM_COPY = { id:'copy', direction:0, x:775, y:630, width:155, height:170, origin:[0,0], hitInset:[6,4,6,6], states:{ carried:base+'copy-carried.svg', placed:base+'copy-placed.svg' } } as const;
export function roomObject(id: RoomObjectId): RoomArtObject { return ROOM_OBJECTS.find(object => object.id === id)!; }
export function roomTextureKey(id: RoomObjectId, state: string) { return `room-v2:${id}:${state}`; }
