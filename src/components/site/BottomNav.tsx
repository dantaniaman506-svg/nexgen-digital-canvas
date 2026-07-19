import { Link, useRouterState } from "@tanstack/react-router";
import { House, Info, Layers, Award, Briefcase, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { hapticLight } from "@/lib/haptic";

const items = [
  { to: "/",            label: "Home",       icon: House,    sectionId: "hero"       },
  { to: "/about",       label: "About",      icon: Info,     sectionId: "about"      },
  { to: "/services",    label: "Services",   icon: Layers,   sectionId: "services"   },
  { to: "/#why",        label: "Why Us",     icon: Award,    sectionId: "why"        },
  { to: "/#industries", label: "Industries", icon: Briefcase,sectionId: "industries" },
  { to: "/contact",     label: "Contact",    icon: Send,     sectionId: "contact"    },
];

const ITEM_SIZE = 44;
const ITEM_GAP  = 4;
const STEP      = ITEM_SIZE + ITEM_GAP;

/** Which section is closest to the viewport midpoint right now */
function detectCurrentSection(): string {
  const mid = window.scrollY + window.innerHeight * 0.45;
  let best = "hero", bestDist = Infinity;
  for (const item of items) {
    const el = document.getElementById(item.sectionId);
    if (!el) continue;
    const dist = Math.abs(el.offsetTop - mid);
    if (dist < bestDist) { bestDist = dist; best = item.sectionId; }
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

/** Is this link a same-page navigation that doesn't need a route change? */
function isSamePage(to: string, isHome: boolean) {
  return to === "/" || (to.startsWith("/#") && isHome);
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome   = pathname === "/";

  const [activeSection, setActiveSection] = useState<string>(() => {
    if (isHome) return "hero";
    return sectionForPath(pathname) ?? "hero";
  });
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark]   = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  // When true, scroll-spy waits before overriding a manual click
  const pauseUntil = useRef<number>(0);

  /* Delayed mount */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  /* Theme sync */
  useEffect(() => {
    const el  = document.documentElement;
    const obs = new MutationObserver(() => setIsDark(el.classList.contains("dark")));
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* ── Route-change handler ────────────────────────────────────────────
     Cross-page navigation: set circle AFTER the new page is mounted,
     not in the click handler.  Same-page (home scroll): scroll-spy handles it.
  */
  useEffect(() => {
    if (!isHome) {
      const s = sectionForPath(pathname);
      if (s) setActiveSection(s);
    }
  }, [pathname, isHome]);

  /* ── Hash-scroll after arriving on home from another page ────────────
     When navigating from /about → /#why the browser jumps instantly
     (scroll-behavior removed from CSS).  We also need the scroll-spy
     to fire once after the hash scroll completes so the circle lands
     on the right icon.
  */
  useEffect(() => {
    if (!isHome) return;
    // Small delay lets the browser complete its hash-scroll first
    const t = setTimeout(() => {
      setActiveSection(detectCurrentSection());
    }, 60);
    return () => clearTimeout(t);
  }, [isHome]);

  /* ── Scroll-spy (home only) ──────────────────────────────────────────*/
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      if (Date.now() < pauseUntil.current) return;
      setActiveSection(detectCurrentSection());
    };
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* ── Click handler ───────────────────────────────────────────────────
     Same-page links  → move circle immediately + instant scroll
     Cross-page links → let the route-change effect move the circle
                        after navigation completes (circle follows page)
  */
  const handleClick = useCallback(
    (sectionId: string, to: string) => {
      hapticLight();
      pauseUntil.current = Date.now() + 1200;

      if (isSamePage(to, isHome)) {
        // Immediate circle + instant jump
        setActiveSection(sectionId);
        if (to === "/") {
          window.scrollTo({ top: 0, behavior: "instant" });
        } else if (to.startsWith("/#")) {
          const el = document.getElementById(to.slice(2));
          if (el) el.scrollIntoView({ behavior: "instant" });
        }
      }
      // Cross-page: do nothing here — route change effect handles circle
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
                transition={{ type: "spring", stiffness: 480, damping: 36, mass: 0.7 }}
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
              const Icon     = item.icon;
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
