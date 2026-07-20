/**
 * Plays a warm, satisfying "growth launch" chime using the Web Audio API.
 * Fully synthesized — no external files needed.
 */
export function playGrowthSound() {
  try {
    const ctx = new AudioContext();

    // Soft reverb tail — a quiet delayed echo of the chord
    const convolver = ctx.createConvolver();
    const reverbLen = ctx.sampleRate * 0.8;
    const reverbBuf = ctx.createBuffer(2, reverbLen, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = reverbBuf.getChannelData(ch);
      for (let i = 0; i < reverbLen; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 2.5) * 0.18;
      }
    }
    convolver.buffer = reverbBuf;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(1, ctx.currentTime);
    masterGain.connect(ctx.destination);
    convolver.connect(masterGain);

    const playNote = (
      freq: number,
      startTime: number,
      duration: number,
      gainPeak: number,
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(masterGain);   // dry
      gain.connect(convolver);    // wet reverb

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

      // Smooth attack, natural decay (like a marimba / soft bell)
      gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gain.gain.linearRampToValueAtTime(gainPeak, ctx.currentTime + startTime + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration);

      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + duration + 0.05);
    };

    // Warm ascending triad — G4 → C5 → E5 → G5
    // All below 800 Hz — nothing harsh or piercing
    playNote(392.00, 0.00, 0.55, 0.20);   // G4 — warm bass note
    playNote(523.25, 0.07, 0.55, 0.17);   // C5
    playNote(659.25, 0.14, 0.60, 0.15);   // E5
    playNote(783.99, 0.21, 0.70, 0.13);   // G5 — top note, long tail

    setTimeout(() => ctx.close(), 1400);
  } catch {
    // Silently ignore (SSR or blocked AudioContext)
  }
}
