import { useEffect, useRef } from "react";

/** Always-on jellyfish video background — no theme branching, no conditions. */
export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 1.4;
    v.play().catch(() => {});
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        className="h-full w-full object-cover"
        src="/videos/hero-dark.mp4"
      />
      {/* Dark overlay — keeps text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.08 0.04 265 / 0.38) 0%, oklch(0.06 0.05 255 / 0.28) 50%, oklch(0.08 0.04 265 / 0.38) 100%)",
        }}
      />
      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 110% at 50% 50%, transparent 50%, oklch(0.04 0.03 265 / 0.45) 100%)",
        }}
      />
    </div>
  );
}
