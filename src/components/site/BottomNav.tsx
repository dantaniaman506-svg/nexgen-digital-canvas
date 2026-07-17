import { Link, useRouterState } from "@tanstack/react-router";
import { House, Info, Layers, Award, Briefcase, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const items = [
  { to: "/", label: "Home", icon: House, sectionId: "hero" },
  { to: "/about", label: "About", icon: Info, sectionId: "about" },
  { to: "/services", label: "Services", icon: Layers, sectionId: "services" },
  { to: "/#why", label: "Why", icon: Award, sectionId: "why" },
  { to: "/#industries", label: "Industries", icon: Briefcase, sectionId: "industries" },
  { to: "/contact", label: "Contact", icon: Send, sectionId: "contact" },
];

function getDefaultSection(pathname: string) {
  if (pathname === "/") return "hero";
  const match = items.find((i) => i.to !== "/" && !i.to.startsWith("/#") && pathname.startsWith(i.to));
  return match ? match.sectionId : "hero";
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [activeSection, setActiveSection] = useState<string>(() => getDefaultSection(pathname));
  const scrollSpyPaused = useRef(false);

  // On route change, update immediately
  useEffect(() => {
    setActiveSection(getDefaultSection(pathname));
  }, [pathname]);

  // Scroll-spy — only on home page
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = items.map((i) => i.sectionId);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollSpyPaused.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.1, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Click: set active immediately, pause scroll-spy briefly
  const handleClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    scrollSpyPaused.current = true;
    setTimeout(() => {
      scrollSpyPaused.current = false;
    }, 900);
  }, []);

  return (
    <motion.nav
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 28 }}
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 9999,
        padding: "6px 8px",
        backdropFilter: "blur(24px) saturate(180%)",
        backgroundColor: "color-mix(in oklab, var(--card) 40%, transparent)",
        border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.10)",
      }}
    >
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
            onClick={() => handleClick(item.sectionId)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: "50%",
              color: isActive ? "#fff" : undefined,
              transition: "color 0.2s",
              flexShrink: 0,
            }}
            className={isActive ? "" : "text-brand-blue hover:text-brand-purple"}
          >
            {isActive && (
              <motion.span
                layoutId="pill-active"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4F7FFF 0%, #3EC6E0 100%)",
                  boxShadow: "0 4px 18px -4px rgba(79,127,255,0.7)",
                  zIndex: 0,
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1, display: "flex" }}>
              <Icon size={20} strokeWidth={2.2} />
            </span>
          </Link>
        );
      })}
    </motion.nav>
  );
}
