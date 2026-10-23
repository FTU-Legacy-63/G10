import type { RoundState } from '../domain/types';

export const PILOT_SAVE_KEY = 'the-credit-desk:integration-pilot:v1';
export const PILOT_PREFS_KEY = 'the-credit-desk:integration-pilot:prefs:v1';
export const PILOT_OWNER_KEY = 'the-credit-desk:writer:integration-pilot:v1';
export type Settings = RoundState['settings'];
export interface ExperienceProfile { kind: 'pilot'; saveKey: string }
export const PILOT_PROFILE: ExperienceProfile = { kind: 'pilot', saveKey: PILOT_SAVE_KEY };
export const DEFAULT_SETTINGS: Settings = { textSize: 100, reducedMotion: false, sound: true };

export function parsePreferences(raw: string | null): Settings {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (value && [100, 115, 130].includes(value.textSize) && typeof value.reducedMotion === 'boolean' && typeof value.sound === 'boolean') return { textSize: value.textSize, reducedMotion: value.reducedMotion, sound: value.sound };
  } catch { /* Preferences are independent from saved work. */ }
  return { ...DEFAULT_SETTINGS };
}

export const ART_ROOT = '/assets/integration-pilot/v1/';
export type CameraFocus = { x: number; y: number; zoom: number };
export const PILOT_R02 = {
  briefing: { box: [35.5, 34, 7, 16] as const, camera: { x: 39, y: 43, zoom: 1.7 } },
  dossier: { box: [35.5, 56, 11, 13] as const, camera: { x: 41, y: 62, zoom: 1.8 } },
  intake: { box: [25, 55, 10.5, 12] as const, camera: { x: 30, y: 61, zoom: 1.7 } },
  worksheet: { box: [48.5, 56, 9, 13] as const, camera: { x: 53, y: 62, zoom: 1.7 } },
};

/** Entry is presentation only. Never mutate a saved attempt just to show its R02 landing. */
export function resumeScreen(state: RoundState): { screen: string; room: 0 | 1 | 2 | 3 } {
  void state;
  return { screen: 'room', room: 1 };
}
