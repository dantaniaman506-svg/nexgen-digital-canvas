import { Link, useRouterState } from "@tanstack/react-router";
import { House, Info, Layers, Award, Briefcase, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { hapticLight } from "@/lib/haptic";

const items = [
  { to: "/", label: "Home", icon: House, sectionId: "hero" },
  { to: "/about", label: "About", icon: Info, sectionId: "about" },
  { to: "/services", label: "Services", icon: Layers, sectionId: "services" },
  { to: "/#why", label: "Why Us", icon: Award, sectionId: "why" },
  { to: "/#industries", label: "Industries", icon: Briefcase, sectionId: "industries" },
  { to: "/contact", label: "Contact", icon: Send, sectionId: "contact" },
];

const ITEM_SIZE = 44;
const ITEM_GAP = 4;
const STEP = ITEM_SIZE + ITEM_GAP;

/** Returns which section is most prominent in the viewport right now */
function detectCurrentSection(): string {
  const viewportMid = window.scrollY + window.innerHeight * 0.45;
  let best = "hero";
  let bestDist = Infinity;

  for (const item of items) {
    const el = document.getElementById(item.sectionId);
    if (!el) continue;
    const top = el.offsetTop;
    const dist = Math.abs(top - viewportMid);
    if (dist < bestDist) {
      bestDist = dist;
      best = item.sectionId;
    }
  }
  return best;
}

/** Map a non-home pathname to its matching sectionId */
function sectionForPath(pathname: string): string | null {
  const match = items.find(
    (i) => i.to !== "/" && !i.to.startsWith("/#") && pathname.startsWith(i.to),
  );
  return match ? match.sectionId : null;
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  const [activeSection, setActiveSection] = useState<string>(() => {
    if (isHome) return "hero";
    return sectionForPath(pathname) ?? "hero";
  });
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  // When true, scroll-spy won't override a manually clicked section
  const pauseUntil = useRef<number>(0);

  /* Delayed mount — slides up after page load */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  /* Theme sync */
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setIsDark(el.classList.contains("dark")),
    );
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* On route change to a non-home page, lock the indicator to that page's section */
  useEffect(() => {
    if (!isHome) {
      const s = sectionForPath(pathname);
      if (s) setActiveSection(s);
    }
    // On home, scroll-spy will take over — don't reset here
  }, [pathname, isHome]);

  /* Scroll-spy — home page only, using scroll event for reliability */
  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      if (Date.now() < pauseUntil.current) return;
      setActiveSection(detectCurrentSection());
    };

    // Run once immediately so initial position is correct
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const handleClick = useCallback(
    (sectionId: string, to: string) => {
      // Immediately update the indicator — never let a later effect override it
      hapticLight();
      setActiveSection(sectionId);
      // Pause scroll-spy for 1.2 s so the scroll animation doesn't fight us
      pauseUntil.current = Date.now() + 1200;

      if (isHome) {
        if (to === "/") {
          // Home icon — jump to top instantly
          window.scrollTo({ top: 0, behavior: "instant" });
        } else if (to.startsWith("/#")) {
          const id = to.slice(2);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "instant" });
        }
      }
    },
    [isHome],
  );

  const activeIndex = items.findIndex((i) => i.sectionId === activeSection);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: 80, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.9 }}
            aria-label="Main navigation"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: ITEM_GAP,
              borderRadius: 9999,
              padding: "6px 8px",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
              backgroundColor: isDark
                ? "rgba(10,15,40,0.70)"
                : "rgba(255,255,255,0.68)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.10)"
                : "1px solid rgba(255,255,255,0.92)",
              boxShadow: isDark
                ? "0 8px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.08)"
                : "0 8px 40px rgba(80,120,255,0.12), 0 2px 0 rgba(255,255,255,0.90) inset",
              pointerEvents: "auto",
              whiteSpace: "nowrap",
              transition: "background-color 0.35s, border-color 0.35s, box-shadow 0.35s",
            }}
          >
            {/* Sliding active indicator */}
            {activeIndex >= 0 && (
              <motion.span
                animate={{ x: activeIndex * STEP }}
                transition={{
                  type: "spring",
                  stiffness: 480,
                  damping: 36,
                  mass: 0.7,
                }}
                style={{
                  position: "absolute",
                  left: 8,
                  top: 6,
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #6C5CE7 0%, #4F7FFF 45%, #00B4D8 100%)",
                  boxShadow:
                    "0 4px 20px -4px rgba(79,127,255,0.65), 0 0 0 1px rgba(255,255,255,0.15) inset",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
            )}

            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.sectionId;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-label={item.label}
                  onClick={() => handleClick(item.sectionId, item.to)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    borderRadius: "50%",
                    flexShrink: 0,
                    zIndex: 1,
                    transition: "color 0.25s, transform 0.2s",
                    color: isActive
                      ? "#fff"
                      : isDark
                        ? "rgba(140,160,255,0.70)"
                        : "rgba(60,80,180,0.55)",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
