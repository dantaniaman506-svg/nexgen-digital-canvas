import { useEffect, useRef, useState } from "react";

export function DarkModeVideoBackground() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isDark) {
      v.playbackRate = 1.4; // slightly faster for energy
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isDark]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
      style={{ opacity: isDark ? 1 : 0 }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        src="/videos/hero-dark.mp4"
      />
      {/* Very light overlay — video stays vivid and clear */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.08 0.04 265 / 0.38) 0%, oklch(0.06 0.05 255 / 0.28) 50%, oklch(0.08 0.04 265 / 0.38) 100%)",
        }}
      />
      {/* Soft edge vignette only */}
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
