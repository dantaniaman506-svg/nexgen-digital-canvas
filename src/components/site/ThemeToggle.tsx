import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEPLOY = "20260717";

function applyTheme(dark: boolean) {
  const html = document.documentElement;
  if (dark) {
    html.classList.add("dark");
    html.classList.remove("light");
    localStorage.setItem("ndm-theme", "dark");
  } else {
    html.classList.remove("dark");
    html.classList.add("light");
    localStorage.setItem("ndm-theme", "light");
  }
  localStorage.setItem("ndm-deploy", DEPLOY);
}

/** Sun/moon toggle — dark is the default. Persists choice in localStorage per browser. */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  // Stay in sync if something else mutates the class (e.g. the inline script)
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark")),
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    const next = !isDark;
    applyTheme(next);
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 12,
        backdropFilter: "blur(20px) saturate(160%)",
        backgroundColor: isDark
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.08)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(0,0,0,0.10)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        cursor: "pointer",
        transition: "background 0.3s, border 0.3s",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            <Sun className="h-4 w-4 text-yellow-300" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            <Moon className="h-4 w-4 text-brand-blue" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
