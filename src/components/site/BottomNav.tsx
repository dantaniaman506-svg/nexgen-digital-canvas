import { Link, useRouterState } from "@tanstack/react-router";
import { House, Info, Layers, Award, Briefcase, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const items = [
  { to: "/", label: "Home", icon: House, sectionId: "hero" },
  { to: "/about", label: "About", icon: Info, sectionId: "about" },
  { to: "/services", label: "Services", icon: Layers, sectionId: "services" },
  { to: "/#why", label: "Why", icon: Award, sectionId: "why" },
  { to: "/#industries", label: "Industries", icon: Briefcase, sectionId: "industries" },
  { to: "/contact", label: "Contact", icon: Send, sectionId: "contact" },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Scroll-spy — only meaningful on home page where sections coexist
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = items.map((i) => i.sectionId);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 shadow-2xl"
      style={{ backgroundColor: "color-mix(in oklab, var(--card) 38%, transparent)" }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        let isActive = false;
        if (pathname === "/") {
          isActive = activeSection === item.sectionId;
        } else if (item.to.startsWith("/#")) {
          isActive = false;
        } else if (item.to === "/") {
          isActive = false;
        } else {
          isActive = pathname.startsWith(item.to);
        }
        return (
          <Link
            key={item.label}
            to={item.to}
            aria-label={item.label}
            className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
              isActive ? "text-white" : "text-brand-blue hover:text-brand-purple"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="bottom-nav-active"
                className="bg-brand-gradient absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 6px 20px -4px color-mix(in oklab, var(--brand-blue) 65%, transparent)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <Icon className="relative h-5 w-5" strokeWidth={2.2} />
          </Link>
        );
      })}
    </motion.nav>
  );
}
