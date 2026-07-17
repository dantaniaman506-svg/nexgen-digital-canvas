import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/site-data";

export function FloatingLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="fixed top-3 left-3 z-50 sm:top-4 sm:left-4"
    >
      <Link
        to="/"
        aria-label={`${BRAND.fullName} home`}
        className="glass group flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 shadow-lg transition-transform hover:scale-[1.02]"
        style={{ backgroundColor: "color-mix(in oklab, var(--card) 35%, transparent)" }}
      >
        <span
          className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--brand-cyan) 40%, transparent), var(--ink))",
            boxShadow:
              "0 0 0 1px color-mix(in oklab, var(--brand-cyan) 55%, transparent), 0 0 18px -4px color-mix(in oklab, var(--brand-blue) 60%, transparent)",
          }}
        >
          <img
            src={BRAND.logoUrl}
            alt=""
            className="h-8 w-8 object-contain"
          />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-extrabold tracking-tight text-brand-gradient">
            {BRAND.name}
          </span>
          <span className="mt-0.5 text-[9px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Digital Marketing Agency
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
