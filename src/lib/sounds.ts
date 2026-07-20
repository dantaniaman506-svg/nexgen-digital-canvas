/**
 * Plays a satisfying "growth launch" sound using the Web Audio API.
 * No external files needed — fully synthesized.
 */
export function playGrowthSound() {
  try {
    const ctx = new AudioContext();

    const play = (
      freq: number,
      startTime: number,
      duration: number,
      gainPeak: number,
      type: OscillatorType = "sine",
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
      // slight pitch rise for each note — feels "uplifting"
      osc.frequency.exponentialRampToValueAtTime(
        freq * 1.015,
        ctx.currentTime + startTime + duration,
      );

      gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gain.gain.linearRampToValueAtTime(gainPeak, ctx.currentTime + startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTime + duration);

      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + duration + 0.01);
    };

    // Quick ascending arpeggio: C5 → E5 → G5 → C6
    play(523.25, 0.00, 0.22, 0.32);        // C5
    play(659.25, 0.07, 0.22, 0.28);        // E5
    play(783.99, 0.14, 0.24, 0.26);        // G5
    play(1046.5, 0.21, 0.45, 0.22);        // C6 — long tail

    // Soft shimmer on top
    play(2093,   0.21, 0.35, 0.07, "sine"); // C7 shimmer

    // Auto-close context after sound is done
    setTimeout(() => ctx.close(), 900);
  } catch {
    // AudioContext blocked (e.g. SSR) — fail silently
  }
}
