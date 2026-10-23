import type { Settings } from './profile';

export function SettingsPanel({ settings, onChange, onClose, status, onExport, onFullscreen, closeLabel = 'Back to work' }: {
  settings: Settings; onChange: (settings: Settings) => void; onClose: () => void; status: string; onExport?: () => void; onFullscreen?: () => void; closeLabel?: string;
}) {
  return <div className="ip-settings-panel">
    <fieldset><legend>Reading</legend><p>Text size</p><div className="ip-size-options">{[100, 115, 130].map(value => <label key={value}><input type="radio" name="reading-size" checked={settings.textSize === value} onChange={() => onChange({ ...settings, textSize: value })} />{value}%</label>)}</div>
      <div className="ip-type-sample"><h3>Dossier title</h3><p>Nguyễn · Trần · Đặng · — VND · ≤70% · ±5%</p></div>
    </fieldset>
    <fieldset><legend>Motion</legend><label><input type="checkbox" checked={settings.reducedMotion} onChange={e => onChange({ ...settings, reducedMotion: e.target.checked })} />Reduced motion</label></fieldset>
    <fieldset><legend>Audio</legend><label><input type="checkbox" checked={settings.sound} onChange={e => onChange({ ...settings, sound: e.target.checked })} />Object sounds</label></fieldset>
    <fieldset><legend>Controls</legend><dl><div><dt>Tab</dt><dd>Move focus</dd></div><div><dt>Enter / Space</dt><dd>Activate</dd></div><div><dt>Escape</dt><dd>Menu / close dialog</dd></div><div><dt>Left / Right</dt><dd>Change room in room view</dd></div></dl></fieldset>
    <footer>{onFullscreen && <button onClick={onFullscreen}>Toggle full screen</button>}{onExport && <button onClick={onExport}>Export progress</button>}<button onClick={onClose}>{closeLabel}</button><span role="status">{status}</span></footer>
  </div>;
}
