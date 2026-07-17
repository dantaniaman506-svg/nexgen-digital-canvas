import { Link, useRouterState } from "@tanstack/react-router";
import { House, Info, Layers, Award, Briefcase, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

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

function getDefaultSection(pathname: string) {
  if (pathname === "/") return "hero";
  const match = items.find(
    (i) => i.to !== "/" && !i.to.startsWith("/#") && pathname.startsWith(i.to),
  );
  return match ? match.sectionId : "hero";
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [activeSection, setActiveSection] = useState<string>(() =>
    getDefaultSection(pathname),
  );
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );
  const scrollSpyPaused = useRef(false);

  /* Delayed mount so it slides up after page load */
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

  /* Reset active section on route change */
  useEffect(() => {
    setActiveSection(getDefaultSection(pathname));
  }, [pathname]);

  /* Scroll-spy — home page only */
  useEffect(() => {
    if (pathname !== "/") return;
    const elements = items
      .map((i) => document.getElementById(i.sectionId))
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollSpyPaused.current) return;
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActiveSection(vis[0].target.id);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.1, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const handleClick = useCallback((sectionId: string, to: string) => {
    setActiveSection(sectionId);
    scrollSpyPaused.current = true;

    /* For hash-only links on home, manually scroll to section */
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      scrollSpyPaused.current = false;
    }, 1000);
  }, []);

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
              const isActive =
                pathname === "/"
                  ? activeSection === item.sectionId
                  : item.to !== "/" && !item.to.startsWith("/#")
                    ? pathname.startsWith(item.to)
                    : false;

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
