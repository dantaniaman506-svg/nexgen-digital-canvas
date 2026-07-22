import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/site-data";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Home",       to: "/",           hash: null  },
  { label: "About",      to: "/about",      hash: null  },
  { label: "Services",   to: "/services",   hash: null  },
  { label: "Why Us",     to: "/",           hash: "why" },
  { label: "Industries", to: "/",           hash: "industries" },
  { label: "Contact",    to: "/contact",    hash: null  },
];

export function DesktopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setIsDark(el.classList.contains("dark")),
    );
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
    // If not on home, TanStack Router navigates to /#hash naturally
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
      // Only visible on lg+ — mobile uses FloatingLogo + BottomNav
      className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden lg:flex items-center justify-between px-10 py-3"
      style={{
        backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
        backgroundColor: scrolled
          ? isDark
            ? "rgba(4,7,22,0.78)"
            : "rgba(255,255,255,0.80)"
          : "transparent",
        borderBottom: scrolled
          ? isDark
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(180,200,255,0.30)"
          : "1px solid transparent",
        transition:
          "backdrop-filter 0.4s ease, background-color 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* ── Logo ── */}
      <Link
        to="/"
        className="pointer-events-auto flex items-center gap-2.5 no-underline select-none"
        style={{ textDecoration: "none" }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 9999,
            overflow: "hidden",
            background: isDark ? "#000" : "transparent",
            flexShrink: 0,
            transition: "background 0.35s",
          }}
        >
          <img
            src={isDark ? "/logos/ndm-dark.png" : "/logos/ndm-light.png"}
            alt="NDM"
            width={48}
            height={48}
            style={{ width: 48, height: 48, objectFit: "contain", display: "block" }}
            draggable={false}
          />
        </span>
        <span
          className="text-brand-gradient font-display font-bold"
          style={{ fontSize: 18, letterSpacing: "-0.02em" }}
        >
          {BRAND.name}
        </span>
      </Link>

      {/* ── Nav links ── */}
      <nav className="pointer-events-auto flex items-center gap-1">
        {links.map((link) => {
          const isActive = link.hash
            ? false // hash links don't get highlighted via pathname
            : link.to === "/"
              ? pathname === "/"
              : pathname.startsWith(link.to);

          const inner = (
            <span
              style={{
                display: "inline-block",
                padding: "6px 15px",
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                transition: "background 0.2s, color 0.2s",
                color: isActive
                  ? "#fff"
                  : isDark
                    ? "rgba(190,210,255,0.82)"
                    : "rgba(25,45,110,0.78)",
                background: isActive
                  ? "linear-gradient(135deg,#6C5CE7 0%,#4F7FFF 50%,#00B4D8 100%)"
                  : isDark
                    ? "rgba(255,255,255,0.00)"
                    : "rgba(0,0,50,0.00)",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLSpanElement).style.background = isDark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(80,120,255,0.08)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLSpanElement).style.background = "transparent";
              }}
            >
              {link.label}
            </span>
          );

          return link.hash ? (
            <a
              key={link.label}
              href={`/${link.hash === "hero" ? "" : "#" + link.hash}`}
              onClick={(e) => handleHashClick(e, link.hash!)}
              style={{ textDecoration: "none" }}
            >
              {inner}
            </a>
          ) : (
            <Link key={link.label} to={link.to} style={{ textDecoration: "none" }}>
              {inner}
            </Link>
          );
        })}
      </nav>

      {/* ── Theme toggle ── */}
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
