import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/site-data";

export function FloatingLogo() {
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
            borderRadius: 9999,
            padding: "6px 16px 6px 6px",
            backdropFilter: "blur(28px) saturate(200%)",
            WebkitBackdropFilter: "blur(28px) saturate(200%)",
            backgroundColor: isDark
              ? "rgba(0,0,0,0.52)"
              : "rgba(255,255,255,0.62)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(255,255,255,0.90)",
            boxShadow: isDark
              ? "0 4px 28px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.07)"
              : "0 4px 24px rgba(80,120,255,0.10), 0 1px 0 rgba(255,255,255,0.80) inset",
            textDecoration: "none",
            transition:
              "background-color 0.35s, border-color 0.35s, box-shadow 0.35s, transform 0.2s",
          }}
        >
          {/* Logo mark */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 9999,
              overflow: "hidden",
              flexShrink: 0,
              background: isDark ? "#000" : "transparent",
              transition: "background 0.35s",
            }}
          >
            <img
              src={isDark ? "/logos/ndm-dark.png" : "/logos/ndm-light.png"}
              alt="NDM logo"
              width={44}
              height={44}
              style={{
                width: 44,
                height: 44,
                objectFit: "contain",
                display: "block",
              }}
              draggable={false}
            />
          </span>

          {/* Brand text */}
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
                color: isDark
                  ? "rgba(255,255,255,0.42)"
                  : "rgba(50,60,130,0.52)",
                transition: "color 0.35s",
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
