import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export function GameDialog({ title, children, onClose, opener, initialSettings = false }: {
  title: string; children: ReactNode; onClose: () => void; opener: HTMLElement | null; initialSettings?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    panel.current?.querySelector<HTMLElement>(initialSettings ? 'input:checked' : 'button')?.focus();
    return () => {
      if (opener?.isConnected && !opener.closest('[inert]')) opener.focus({ preventScroll: true });
      else document.querySelector<HTMLElement>('.ip-title nav button:not(:disabled), .discovery-navigation button')?.focus({ preventScroll: true });
    };
  }, []);
  return <div className="cs-dialog-shade" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="cs-dialog" ref={panel} role="dialog" aria-modal="true" aria-labelledby="discovery-dialog-title" onKeyDown={event => {
      if (event.key === 'Escape') { event.stopPropagation(); event.preventDefault(); onClose(); return; }
      if (event.key !== 'Tab') return;
      const items = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),a[href]')];
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <header><h2 id="discovery-dialog-title">{title}</h2><button className="discovery-close" aria-label="Close dialog" onClick={onClose}>×</button></header>
      {children}
    </div>
  </div>;
}
