import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/site-data";

export function FloatingLogo() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true,
  );

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="fixed top-3 left-3 z-50 sm:top-4 sm:left-4"
    >
      <Link
        to="/"
        aria-label={`${BRAND.fullName} home`}
        className="group flex items-center gap-3 rounded-2xl px-3 py-2 transition-all hover:scale-[1.02]"
        style={{
          backdropFilter: "blur(20px) saturate(160%)",
          backgroundColor: isDark
            ? "rgba(0,0,0,0.45)"
            : "rgba(255,255,255,0.55)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.10)"
            : "1px solid rgba(0,0,0,0.08)",
          boxShadow: isDark
            ? "0 4px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 4px 28px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.70)",
        }}
      >
        {/* Logo image — dark vs light variant */}
        <span
          className="flex items-center justify-center overflow-hidden rounded-xl shrink-0"
          style={{
            width: 48,
            height: 48,
            background: isDark ? "#000" : "#fff",
          }}
        >
          <img
            src={isDark ? "/logos/ndm-dark.png" : "/logos/ndm-light.png"}
            alt="NDM logo"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </span>

        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-extrabold tracking-tight text-brand-gradient">
            {BRAND.name}
          </span>
          <span
            className="mt-0.5 text-[9px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.40)" }}
          >
            Digital Marketing
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
