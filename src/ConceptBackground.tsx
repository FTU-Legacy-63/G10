import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { CameraFocus } from '../integration/profile';
import type Phaser from 'phaser';

const WIDTH = 1672;
const HEIGHT = 941;
const FADE_MS = 200;
const layer: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' };

/** Presentation only: the interactive and accessible controls live above this background. */
export function ConceptBackground({ src, reducedMotion, camera, originalInterior, transitionMode = 'fade', onReady }: { src: string; reducedMotion: boolean; camera?: CameraFocus | null; originalInterior?: string; transitionMode?: 'fade' | 'cut'; onReady?: (source: string) => void }) {
  const host = useRef<HTMLDivElement>(null);
  // Identity also distinguishes a quick A -> B -> A request from an old A loader.
  const [retry, setRetry] = useState(0);
  const request = useMemo(() => ({ src, retry }), [src, retry]);
  const latest = useRef({ request, reducedMotion, onReady });
  latest.current = { request, reducedMotion, onReady };
  const [ready, setReady] = useState<typeof request | null>(null);
  const [failed, setFailed] = useState<typeof request | null>(null);
  const [imageFailed, setImageFailed] = useState<typeof request | null>(null);
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const [fallbackSource, setFallbackSource] = useState(src);
  const canvasReady = ready === request && failed !== request;
  const cut = transitionMode === 'cut';
  const transition = reducedMotion || cut ? 'none' : `opacity ${FADE_MS}ms ease-out`;

  useEffect(() => {
    if (loadedSource !== src) {
      if (loadedSource) setFallbackSource(loadedSource);
      return;
    }
    if (reducedMotion) { setFallbackSource(src); return; }
    const timer = window.setTimeout(() => setFallbackSource(src), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [src, loadedSource, reducedMotion]);

  useEffect(() => {
    const parent = host.current;
    if (!parent) return;
    let disposed = false;
    let instance: Phaser.Game | null = null;
    let watchdog: number | undefined;
    const mount = document.createElement('div');
    mount.className = 'cs-background-engine';
    Object.assign(mount.style, layer);
    parent.appendChild(mount);
    const removers: (() => void)[] = [];
    const current = () => !disposed && latest.current.request === request;
    const fail = () => {
      if (!current()) return;
      window.clearTimeout(watchdog);
      setFailed(request);
      // Detach immediately; Phaser itself finishes destroying on its next frame.
      mount.style.visibility = 'hidden';
      instance?.destroy(true);
    };
    const markReady = () => {
      if (!current()) return;
      window.clearTimeout(watchdog);
      setReady(request);
      latest.current.onReady?.(src);
    };

    let canRender = false;
    try { canRender = !!document.createElement('canvas').getContext('2d'); } catch { /* DOM image remains available. */ }
    if (!canRender) fail();
    if (canRender) import('phaser').then(({ default: Phaser }) => {
      if (!current()) return;
      class BackgroundScene extends Phaser.Scene {
        constructor() { super('concept-background'); }
        preload() {
          this.load.once('loaderror', fail);
          this.load.image('concept-plate', src);
        }
        create() {
          if (!current()) return;
          if (!this.textures.exists('concept-plate')) { fail(); return; }
          this.add.image(0, 0, 'concept-plate').setOrigin(0).setDisplaySize(WIDTH, HEIGHT);
          const canvas = this.game.canvas;
          canvas.style.width = '100%';
          canvas.style.height = '100%';
          canvas.style.display = 'block';
          canvas.dataset.renderer = 'Phaser Canvas';
          canvas.dataset.sceneSource = src;
          // Keep the image fallback until the first real rendered frame exists.
          this.game.events.once(Phaser.Core.Events.POST_RENDER, markReady);
          this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.load.off('loaderror', fail);
            this.game.events.off(Phaser.Core.Events.POST_RENDER, markReady);
          });
        }
      }
      try {
        instance = new Phaser.Game({
          type: Phaser.CANVAS,
          parent: mount,
          width: WIDTH,
          height: HEIGHT,
          transparent: true,
          banner: false,
          audio: { noAudio: true },
          input: { keyboard: false, mouse: false, touch: false },
          scale: { mode: Phaser.Scale.NONE, width: WIDTH, height: HEIGHT },
          canvasStyle: 'width:100%;height:100%;display:block;',
          fps: { target: 30, limit: 30 },
          scene: BackgroundScene,
          callbacks: { postBoot: game => {
            if (!current()) { game.destroy(true); return; }
            const canvas = game.canvas;
            const onLost = (event: Event) => { event.preventDefault(); fail(); };
            canvas.addEventListener('contextlost', onLost);
            canvas.addEventListener('webglcontextlost', onLost);
            removers.push(() => {
              canvas.removeEventListener('contextlost', onLost);
              canvas.removeEventListener('webglcontextlost', onLost);
            });
          } },
        });
        watchdog = window.setTimeout(fail, 12000);
      } catch { fail(); }
    }).catch(fail);

    return () => {
      disposed = true;
      window.clearTimeout(watchdog);
      removers.forEach(remove => remove());
      instance?.events.off('postrender', markReady);
      instance?.destroy(true);
      mount.remove();
    };
  }, [request, src]);

  return <><div className="cs-background" aria-hidden="true" data-renderer={canvasReady ? 'Phaser Canvas' : 'Image fallback'} style={{ ...layer, overflow: 'hidden', background: '#292c27', transformOrigin: camera ? `${camera.x}% ${camera.y}%` : undefined, transform: camera ? `translate(${50-camera.x}%,${50-camera.y}%) scale(${camera.zoom})` : 'none' }}>
    <img className="cs-background-fallback" src={cut ? src : fallbackSource} alt="" draggable={false} style={{ ...layer, objectFit: 'fill', opacity: imageFailed === request && (cut || fallbackSource === src) ? 0 : 1 }} />
    <img key={`${src}:${retry}`} className="cs-background-incoming" src={src} alt="" draggable={false} style={{ ...layer, objectFit: 'fill', opacity: loadedSource === src && imageFailed !== request ? 1 : 0, transition }} onLoad={() => {
      if (latest.current.request !== request) return;
      setLoadedSource(src);
      setImageFailed(null);
      latest.current.onReady?.(src);
    }} onError={() => { if (latest.current.request === request) { setImageFailed(request); latest.current.onReady?.(src); } }} />
    <div ref={host} className="cs-background-canvas" style={{ ...layer, opacity: canvasReady ? 1 : 0, transition }} />
    {originalInterior && <img className="cs-original-interior" src={originalInterior} alt="" draggable={false} style={{ ...layer, objectFit: 'fill' }} />}
    {!canvasReady && loadedSource !== src && imageFailed !== request ? <span className="cs-background-loading" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', color: '#f1e8cd' }}>Loading scene…</span> : null}
    {!canvasReady && imageFailed === request ? <span className="cs-background-unavailable" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', color: '#f1e8cd' }}>Scene image unavailable</span> : null}
  </div>{imageFailed === request && <div className="cs-background-error" role="status">Scene image unavailable. Your working controls are still available. <button onClick={() => { setImageFailed(null); setLoadedSource(null); setRetry(value => value + 1); }}>Retry scene</button></div>}</>;
}
