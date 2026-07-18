/**
 * Programmatic UI sounds via Web Audio API.
 * No audio files — everything synthesized in ~1ms.
 * Silently no-ops if AudioContext is unavailable.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    if (!ctx || ctx.state === "closed") {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Mobile browsers suspend context until a user gesture — resume it
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function playTone(
  frequency: number,
  gain: number,
  duration: number,
  type: OscillatorType = "sine",
  attack = 0.006,
  release = 0.18,
  offset = 0,
) {
  const c = getCtx();
  if (!c) return;

  const osc = c.createOscillator();
  const amp = c.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, c.currentTime + offset);

  amp.gain.setValueAtTime(0, c.currentTime + offset);
  amp.gain.linearRampToValueAtTime(gain, c.currentTime + offset + attack);
  amp.gain.exponentialRampToValueAtTime(
    0.0001,
    c.currentTime + offset + duration,
  );

  osc.connect(amp);
  amp.connect(c.destination);

  osc.start(c.currentTime + offset);
  osc.stop(c.currentTime + offset + duration + release);
}

/**
 * Light mode sound — bright ascending chime (sun rising feel).
 * Two harmonics: fundamental + octave, slight shimmer.
 */
export function soundLightMode() {
  // Root note E5 → quick shimmer up to G#5
  playTone(659, 0.13, 0.22, "sine", 0.005, 0.20, 0);
  playTone(830, 0.07, 0.18, "sine", 0.005, 0.16, 0.04);
  playTone(1046, 0.05, 0.14, "sine", 0.005, 0.12, 0.10);
}

/**
 * Dark mode sound — soft descending settle (stars coming out feel).
 * Warm, low triangle wave with gentle fade.
 */
export function soundDarkMode() {
  // Root note B4 → dips to G4, warm & low
  playTone(493, 0.14, 0.26, "triangle", 0.008, 0.24, 0);
  playTone(392, 0.08, 0.22, "triangle", 0.008, 0.20, 0.06);
  playTone(294, 0.04, 0.18, "sine",     0.008, 0.16, 0.14);
}
