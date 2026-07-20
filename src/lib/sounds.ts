/**
 * Soft satisfying "tap" sound — gentle two-note bell chime.
 * Fully synthesized, no external files.
 */
export function playGrowthSound() {
  try {
    const ctx = new AudioContext();

    const note = (
      freq: number,
      startTime: number,
      duration: number,
      peak: number,
    ) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      // Triangle wave — much softer/warmer than sine at same volume
      osc.type = "triangle";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);

      const t0 = ctx.currentTime + startTime;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(peak, t0 + 0.012);   // very quick soft attack
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

      osc.start(t0);
      osc.stop(t0 + duration + 0.02);
    };

    // Two soft bell notes — A5 then C#6 (a major third up)
    // Feels like a gentle, positive "ding-ding"
    note(880,  0.00, 0.5, 0.09);   // A5  — first tap, soft
    note(1108, 0.14, 0.6, 0.07);   // C#6 — second tap, quieter

    setTimeout(() => ctx.close(), 1000);
  } catch { /* silent fail */ }
}
