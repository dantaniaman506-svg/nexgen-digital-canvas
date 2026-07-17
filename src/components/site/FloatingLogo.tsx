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
    /* Use inline style for position — guarantees fixed layout regardless of CSS build */
    <div
      style={{
        position: "fixed",
        top: 12,
        left: 12,
        zIndex: 50,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link
          to="/"
          aria-label={`${BRAND.fullName} home`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderRadius: 16,
            padding: "6px 14px 6px 6px",
            backdropFilter: "blur(20px) saturate(160%)",
            backgroundColor: isDark ? "rgba(0,0,0,0.50)" : "rgba(255,255,255,0.60)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(0,0,0,0.08)",
            boxShadow: isDark
              ? "0 4px 28px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 4px 28px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.70)",
            textDecoration: "none",
            transition: "transform 0.2s",
          }}
        >
          {/* Logo mark — explicit pixel dimensions, no Tailwind sizing on img */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 10,
              overflow: "hidden",
              flexShrink: 0,
              background: isDark ? "#000" : "#fff",
            }}
          >
            <img
              src={isDark ? "/logos/ndm-dark.png" : "/logos/ndm-light.png"}
              alt="NDM logo"
              width={44}
              height={44}
              style={{ width: 44, height: 44, objectFit: "contain", display: "block" }}
              draggable={false}
            />
          </span>

          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span
              className="text-brand-gradient"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              {BRAND.name}
            </span>
            <span
              style={{
                marginTop: 3,
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.38)",
              }}
            >
              Digital Marketing
            </span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
