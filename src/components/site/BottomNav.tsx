import { Link, useRouterState } from "@tanstack/react-router";
import { House, Info, Layers, Award, Briefcase, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const items = [
  { to: "/", label: "Home", icon: House, sectionId: "hero" },
  { to: "/about", label: "About", icon: Info, sectionId: "about" },
  { to: "/services", label: "Services", icon: Layers, sectionId: "services" },
  { to: "/#why", label: "Why", icon: Award, sectionId: "why" },
  { to: "/#industries", label: "Industries", icon: Briefcase, sectionId: "industries" },
  { to: "/contact", label: "Contact", icon: Send, sectionId: "contact" },
];

/* Each button: 44px wide, 2px gap → 46px per step */
const ITEM_SIZE = 44;
const ITEM_GAP = 2;
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
  const scrollSpyPaused = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setActiveSection(getDefaultSection(pathname));
  }, [pathname]);

  /* Scroll-spy on home page only */
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
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.1, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const handleClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    scrollSpyPaused.current = true;
    setTimeout(() => {
      scrollSpyPaused.current = false;
    }, 900);
  }, []);

  const activeIndex = items.findIndex((i) => i.sectionId === activeSection);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: ITEM_GAP,
              borderRadius: 9999,
              padding: "6px 8px",
              backdropFilter: "blur(24px) saturate(180%)",
              backgroundColor:
                "color-mix(in oklab, var(--card) 42%, transparent)",
              border:
                "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.10)",
              pointerEvents: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {/* Single pill that slides to the active item — no layoutId needed */}
            {activeIndex >= 0 && (
              <motion.span
                animate={{ x: activeIndex * STEP }}
                transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
                style={{
                  position: "absolute",
                  left: 8,           /* matches nav horizontal padding */
                  top: 6,            /* matches nav vertical padding */
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4F7FFF 0%, #3EC6E0 100%)",
                  boxShadow: "0 4px 18px -4px rgba(79,127,255,0.70)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
            )}

            {items.map((item, idx) => {
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
                  onClick={() => handleClick(item.sectionId)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    borderRadius: "50%",
                    flexShrink: 0,
                    color: isActive ? "#fff" : "var(--color-brand-blue)",
                    transition: "color 0.2s",
                    zIndex: 1,
                  }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
