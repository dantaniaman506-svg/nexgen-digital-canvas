import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function GradientBlobs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" style={{ overflow: "clip" }}>
      {/* Corner blob — top left, soft */}
      <motion.div
        style={{
          y: y1,
          rotate: rot,
          top: "-18%",
          left: "-18%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-blue) 45%, transparent), transparent 70%)",
        }}
        className="animate-blob absolute h-[520px] w-[520px] rounded-full blur-[130px] opacity-70"
      />
      {/* Corner blob — bottom right */}
      <motion.div
        style={{
          y: y2,
          bottom: "-20%",
          right: "-18%",
          animationDelay: "6s",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-cyan) 40%, transparent), transparent 70%)",
        }}
        className="animate-blob absolute h-[520px] w-[520px] rounded-full blur-[130px] opacity-60"
      />

      {/* Blue-tinted grid — no central vignette, subtle everywhere */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--brand-blue) 14%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--brand-blue) 14%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Floating particles for polish */}
      {[
        { top: "18%", left: "12%", delay: 0, size: 4 },
        { top: "32%", right: "18%", delay: 1.4, size: 3 },
        { top: "68%", left: "22%", delay: 2.2, size: 5 },
        { top: "78%", right: "28%", delay: 0.8, size: 3 },
        { top: "24%", left: "48%", delay: 3.1, size: 3 },
        { top: "58%", right: "10%", delay: 1.8, size: 4 },
      ].map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            background: "var(--brand-cyan)",
            boxShadow: "0 0 12px var(--brand-blue)",
          }}
          className="absolute rounded-full"
        />
      ))}

      {/* Subtle scanline sweep */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--brand-blue) 8%, transparent), transparent)",
        }}
      />
    </div>
  );
}
