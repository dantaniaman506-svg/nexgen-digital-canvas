import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function GradientBlobs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{
          y: y1,
          rotate: rot,
          top: "-12%",
          left: "-10%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-blue) 65%, transparent), transparent 70%)",
        }}
        className="animate-blob absolute h-[520px] w-[520px] rounded-full blur-[110px]"
      />
      <motion.div
        style={{
          y: y2,
          top: "18%",
          right: "-12%",
          animationDelay: "6s",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-cyan) 60%, transparent), transparent 70%)",
        }}
        className="animate-blob absolute h-[460px] w-[460px] rounded-full blur-[110px]"
      />
      <motion.div
        style={{
          y: y3,
          bottom: "-14%",
          left: "22%",
          animationDelay: "12s",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-purple) 55%, transparent), transparent 70%)",
        }}
        className="animate-blob absolute h-[420px] w-[420px] rounded-full blur-[110px]"
      />

      {/* Blue-tinted grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--brand-blue) 18%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--brand-blue) 18%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />
      {/* Soft blue vignette glow behind grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, color-mix(in oklab, var(--brand-blue) 14%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
