import DiscoveryApp from './DiscoveryApp';
import { ConceptBackground } from '../concept/ConceptBackground';
import { ART_ROOT, PILOT_SAVE_KEY } from './profile';
import { useSaveOwner } from './useSaveOwner';
import './integration.css';

export default function IntegrationApp() {
  const owner = useSaveOwner();
  if (owner.status === 'owned') return <DiscoveryApp />;
  function exportSave() {
    try {
      const raw = localStorage.getItem(PILOT_SAVE_KEY);
      if (!raw) return;
      const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
      const link = document.createElement('a'); link.href = url; link.download = 'the-credit-desk-pilot-progress.json'; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { /* No saved data is changed by export. */ }
  }
  return <main className="concept-study integration-pilot discovery-app"><div className="cs-stage ip-owner-stage">
    <ConceptBackground src={`${ART_ROOT}title.png`} reducedMotion />
    <section className="ip-owner-panel" aria-live="polite"><h1>THE CREDIT DESK</h1>
      <p>{owner.status === 'checking' ? 'Checking saved progress…' : owner.status === 'occupied' ? 'This shift is open in another tab. Return to that tab or close it before retrying here.' : 'Editing is unavailable in this browser context. Use a browser that supports Web Locks on this local preview.'}</p>
      {owner.status !== 'checking' && <div><button onClick={owner.retry}>Retry</button><button onClick={exportSave}>Export progress</button></div>}
    </section>
  </div></main>;
}
