// Original procedural foley. No third-party recordings or correctness-dependent cue.
export type Foley = 'paper' | 'keyboard' | 'tack' | 'wood';
let context: AudioContext | undefined;
let master: GainNode | undefined;
const db = (value: number) => 10 ** (value / 20);
export function playFoley(kind: Foley, enabled: boolean) {
  if (!enabled) return;
  try {
    context ??= new AudioContext();
    if (!master) { master = context.createGain(); master.gain.value = db(-16); master.connect(context.destination); }
    if (context.state === 'suspended') void context.resume().catch(() => {});
    const duration = kind === 'paper' ? .19 : kind === 'wood' ? .11 : .065;
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) {
      const t = i / samples.length;
      samples[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) ** .7 * Math.exp(-t * (kind === 'paper' ? 2 : 7));
    }
    const source = context.createBufferSource(); source.buffer = buffer;
    source.playbackRate.value = .96 + Math.random() * .08;
    const filter = context.createBiquadFilter();
    filter.type = kind === 'wood' ? 'lowpass' : 'bandpass';
    filter.frequency.value = { paper: 1700, keyboard: 1100, tack: 2500, wood: 330 }[kind];
    filter.Q.value = kind === 'paper' ? .7 : 1.5;
    source.connect(filter); filter.connect(master);
    source.onended = () => { source.disconnect(); filter.disconnect(); };
    source.start();
  } catch { /* Audio availability must never stop document work. */ }
}
