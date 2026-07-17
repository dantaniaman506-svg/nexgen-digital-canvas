import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/site-data";

/** Always dark-styled — no theme branching. */
export function FloatingLogo() {
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
            borderRadius: 16,
            padding: "6px 14px 6px 6px",
            backdropFilter: "blur(20px) saturate(160%)",
            backgroundColor: "rgba(0,0,0,0.50)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 28px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)",
            textDecoration: "none",
            transition: "transform 0.2s",
          }}
        >
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
              background: "#000",
            }}
          >
            <img
              src="/logos/ndm-dark.png"
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
                color: "rgba(255,255,255,0.42)",
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
