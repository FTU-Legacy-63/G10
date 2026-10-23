import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SERVICE_LINES } from './discoveryFlow';
import { dialogueLines } from './dialogueLayout';

/** A semantic text-only hit target; long sentences advance in readable one-line beats. */
export function ConversationLine({ index, reducedMotion, onNext }: { index: number; reducedMotion: boolean; onNext: () => void }) {
  const text = SERVICE_LINES[index];
  const host = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => { host.current?.focus({ preventScroll: true }); }, [index]);
  const [lines, setLines] = useState<string[]>([text]);
  const [beat, setBeat] = useState(0);
  const line = lines[Math.min(beat, lines.length - 1)];
  const [progress, setProgress] = useState({ line, count: 0 });
  const visible = reducedMotion ? line.length : progress.line === line ? progress.count : 0;
  useLayoutEffect(() => {
    const node = host.current; if (!node) return;
    let alive = true;
    const layout = () => {
      if (!alive) return;
      const style = getComputedStyle(node), width = node.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 4;
      let context: CanvasRenderingContext2D | null = null;
      try { context = document.createElement('canvas').getContext('2d'); } catch { /* Readable fallback when Canvas is unavailable. */ }
      if (context) context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const next = dialogueLines(text, width, value => context ? context.measureText(value).width : value.length * parseFloat(style.fontSize) * .62);
      setLines(old => old.join('\n') === next.join('\n') ? old : next);
    };
    const observer = new ResizeObserver(layout); observer.observe(node); layout();
    void document.fonts.ready.then(layout);
    return () => { alive = false; observer.disconnect(); };
  }, [text]);
  useEffect(() => { setBeat(0); }, [lines]);
  useEffect(() => {
    if (reducedMotion) return;
    setProgress({ line, count: 0 });
    const timer = window.setInterval(() => setProgress(old => {
      if (old.line !== line) return { line, count: 0 };
      if (old.count >= line.length) { window.clearInterval(timer); return old; }
      return { line, count: old.count + 1 };
    }), 32);
    return () => window.clearInterval(timer);
  }, [line, reducedMotion]);
  const hasNext = beat < lines.length - 1 || index < SERVICE_LINES.length - 1;
  return <button ref={host} className="discovery-conversation" aria-describedby="discovery-current-line" aria-label={visible < line.length ? 'Reveal conversation line' : hasNext ? 'Next conversation line' : 'End conversation'} onClick={() => {
    if (visible < line.length) setProgress({ line, count: line.length });
    else if (beat < lines.length - 1) setBeat(old => old + 1);
    else onNext();
  }}>
    <span className="sr-only" id="discovery-current-line">{text}</span><span className="discovery-spoken-line" aria-hidden="true">{line.slice(0, visible)}</span>
  </button>;
}
