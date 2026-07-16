import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/site-data";

export function FloatingLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-4 left-4 z-50"
    >
      <Link
        to="/"
        className="glass flex items-center gap-2 rounded-full px-3 py-2 shadow-lg"
      >
        <img
          src={BRAND.logoUrl}
          alt={`${BRAND.name} logo`}
          className="h-9 w-9 rounded-full object-cover bg-black"
        />
        <span className="font-display text-base sm:text-lg font-bold tracking-tight pr-2">
          <span className="text-brand-gradient">{BRAND.name}</span>
        </span>
      </Link>
    </motion.div>
  );
}
