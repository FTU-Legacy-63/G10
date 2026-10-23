/** Approved scenes, not the later empty room/prop regenerations.
 * Raster writing is layout reference only; live controls cover every printed content area.
 * S01 retains its existing text-free derivative so the title and hover pointer remain live.
 */
const ORIGINAL = '/assets/concept-study/';
const APPROVED = '/assets/integration-pilot/approved/';
export const approvedRoomArt = (room: number) => `${ORIGINAL}s02-r0${room + 1}.png`;
export const APPROVED_SCREEN_ART = {
  title: '/assets/integration-pilot/v1/title.png',
  briefing: `${APPROVED}briefing.png`,
  dossier: `${ORIGINAL}s06.png`,
  document: `${APPROVED}document.png`,
  copy: `${APPROVED}document.png`,
  decision: `${ORIGINAL}s12.png`,
  worksheet: `${ORIGINAL}s10.png`,
  warehouse: `${ORIGINAL}s08.png`,
  cic: `${ORIGINAL}s09.png`,
  board: `${ORIGINAL}s11.png`,
  review: `${ORIGINAL}s13.png`,
  summary: `${ORIGINAL}s15.png`,
  detail: `${ORIGINAL}s16.png`,
  help: `${APPROVED}rulebook.png`,
  // The approved reception scene supports the requested short, unboxed conversation.
  meeting: `${ORIGINAL}s02-r01.png`,
} as const;
