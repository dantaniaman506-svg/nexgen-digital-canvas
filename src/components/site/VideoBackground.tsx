import { useEffect, useRef, useState } from "react";

function DarkVideo({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = 1.4;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible]);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <video
        ref={ref}
        loop muted playsInline autoPlay preload="auto"
        className="h-full w-full object-cover"
        src="/videos/hero-dark.mp4"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg,oklch(0.08 0.04 265/.38) 0%,oklch(0.06 0.05 255/.28) 50%,oklch(0.08 0.04 265/.38) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 110% at 50% 50%,transparent 50%,oklch(0.04 0.03 265/.45) 100%)",
        }}
      />
    </div>
  );
}

function LightVideo({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible]);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <video
        ref={ref}
        loop muted playsInline preload="auto"
        className="h-full w-full object-cover"
        src="/videos/hero-light.mp4"
      />
      {/* Warm cream overlay — keeps text legible */}
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

/** Dual-video background. Listens to <html> class changes for seamless switching. */
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
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <DarkVideo  visible={isDark}  />
      <LightVideo visible={!isDark} />
    </div>
  );
}
