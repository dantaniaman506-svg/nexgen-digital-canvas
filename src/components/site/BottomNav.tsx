import { Link, useRouterState } from "@tanstack/react-router";
import { House, Info, Layers, Award, Briefcase, Send } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { to: "/", label: "Home", icon: House },
  { to: "/about", label: "About", icon: Info },
  { to: "/services", label: "Services", icon: Layers },
  { to: "/#why", label: "Why", icon: Award, matchHash: "#why" },
  { to: "/#industries", label: "Industries", icon: Briefcase, matchHash: "#industries" },
  { to: "/contact", label: "Contact", icon: Send },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="glass-strong fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-2 shadow-2xl"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.to === "/"
            ? pathname === "/"
            : item.to.startsWith("/#")
              ? false
              : pathname.startsWith(item.to);
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
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="relative h-5 w-5" strokeWidth={2.2} />
          </Link>
        );
      })}
    </motion.nav>
  );
}
