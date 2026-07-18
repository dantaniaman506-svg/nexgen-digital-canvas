/**
 * Haptic feedback via Web Vibration API.
 * Silently no-ops on browsers/devices that don't support it (desktop, iOS Safari).
 */

function vibe(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // ignore — some browsers throw on vibrate
  }
}

/** Very light tap — nav icons, toggles */
export const hapticLight = () => vibe(6);

/** Standard button press — CTAs, links */
export const hapticMedium = () => vibe(12);

/** Positive confirm — form submit, WhatsApp send */
export const hapticSuccess = () => vibe([10, 50, 10]);

/** Heavy confirm — final action selected (recipient choose) */
export const hapticHeavy = () => vibe([18, 60, 18]);
