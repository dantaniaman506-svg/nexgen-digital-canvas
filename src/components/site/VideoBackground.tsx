import { useEffect, useRef, useState } from "react";

/** Keeps a video element playing at all times — survives tab switches, phone locks, and iOS suspensions. */
function useKeepAlive(
  ref: React.RefObject<HTMLVideoElement | null>,
  visible: boolean,
  rate = 1,
) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.playbackRate = rate;

    const tryPlay = () => {
      if (!visible) return;
      if (v.paused || v.ended) {
        v.play().catch(() => {
          // iOS sometimes needs a second attempt after a very short delay
          setTimeout(() => v.play().catch(() => {}), 250);
        });
      }
    };

    // Initial play/pause
    if (visible) {
      tryPlay();
    } else {
      v.pause();
    }

    // Re-play when the user returns from another app, lock screen, or tab
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    // Re-play when the window regains focus (desktop tab switch)
    const onFocus = () => tryPlay();
    // Re-play if the browser suspends/stalls the video (e.g. low memory)
    const onSuspend = () => { if (visible) setTimeout(tryPlay, 400); };
    const onStalled  = () => { if (visible) setTimeout(tryPlay, 400); };
    // Re-play if the video ends despite loop (some browsers miss the loop attribute on resume)
    const onEnded    = () => { if (visible) { v.currentTime = 0; tryPlay(); } };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", onFocus);
    v.addEventListener("suspend", onSuspend);
    v.addEventListener("stalled",  onStalled);
    v.addEventListener("ended",    onEnded);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", onFocus);
      v.removeEventListener("suspend", onSuspend);
      v.removeEventListener("stalled",  onStalled);
      v.removeEventListener("ended",    onEnded);
    };
  }, [visible, rate]);
}

/** Dark theme background — uses uploaded images instead of video.
 *  Mobile: portrait image | Desktop (lg+): landscape image.
 */
function DarkImage({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, pointerEvents: "none" }}
    >
      {/* Mobile image (portrait) — hidden on lg+ */}
      <img
        src="/images/dark-bg-mobile.png"
        alt=""
        aria-hidden="true"
        className="block lg:hidden h-full w-full object-cover object-center"
        style={{ position: "absolute", inset: 0 }}
        fetchPriority="high"
      />
      {/* Desktop image (landscape) — hidden below lg */}
      <img
        src="/images/dark-bg-desktop.png"
        alt=""
        aria-hidden="true"
        className="hidden lg:block h-full w-full object-cover object-center"
        style={{ position: "absolute", inset: 0 }}
        fetchPriority="high"
      />
      {/* Dark tint overlays — same as the original video overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg,oklch(0.08 0.04 265/.28) 0%,oklch(0.06 0.05 255/.18) 50%,oklch(0.08 0.04 265/.28) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 110% at 50% 50%,transparent 50%,oklch(0.04 0.03 265/.35) 100%)",
        }}
      />
    </div>
  );
}

function LightVideo({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useKeepAlive(ref, visible, 1);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, pointerEvents: "none" }}
    >
      <video
        ref={ref}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        className="h-full w-full object-cover"
        src="/videos/hero-light.mp4"
        {...({ "webkit-playsinline": "true", "x-webkit-airplay": "deny" } as object)}
      />
      {/* Light tint overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg,oklch(0.99 0.005 80/.68) 0%,oklch(0.97 0.008 230/.52) 55%,oklch(0.99 0.005 80/.64) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 90% at 50% 50%,transparent 35%,oklch(0.92 0.01 250/.28) 100%)",
        }}
      />
    </div>
  );
}

/** Full-page background. Dark mode: image (mobile/desktop responsive). Light mode: video. */
export function VideoBackground() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setIsDark(el.classList.contains("dark")),
    );
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{ willChange: "opacity" }}
    >
      <DarkImage  visible={isDark}  />
      <LightVideo visible={!isDark} />
    </div>
  );
}
