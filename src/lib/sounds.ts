/**
 * Satisfying mechanical click sound — synthesized via Web Audio API.
 */
export function playGrowthSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // ── 1. Clicky "tick" — filtered white noise burst ──────────────
    const bufLen = Math.floor(ctx.sampleRate * 0.04);
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuf;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 2200;
    bandpass.Q.value = 0.8;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.55, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    noiseNode.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseNode.start(now);
    noiseNode.stop(now + 0.04);

    // ── 2. Body thud — short low sine for weight ───────────────────
    const thud = ctx.createOscillator();
    thud.type = "sine";
    thud.frequency.setValueAtTime(180, now);
    thud.frequency.exponentialRampToValueAtTime(60, now + 0.04);

    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(0.4, now);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    thud.connect(thudGain);
    thudGain.connect(ctx.destination);
    thud.start(now);
    thud.stop(now + 0.07);

    setTimeout(() => ctx.close(), 300);
  } catch { /* silent fail */ }
}
