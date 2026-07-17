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
        className="group flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 shadow-lg transition-all hover:scale-[1.02]"
        style={{
          backdropFilter: "blur(18px)",
          backgroundColor: "color-mix(in oklab, var(--card) 30%, transparent)",
          border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
          boxShadow:
            "0 4px 24px oklch(0 0 0 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.22)",
        }}
      >
        {/* "N" letter mark */}
        <span
          className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full select-none"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-purple) 0%, var(--brand-blue) 55%, var(--brand-cyan) 100%)",
            boxShadow:
              "0 0 0 1px color-mix(in oklab, var(--brand-cyan) 40%, transparent), 0 0 20px -4px color-mix(in oklab, var(--brand-blue) 65%, transparent)",
          }}
        >
          <span
            className="font-display text-[22px] font-extrabold leading-none text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            N
          </span>
        </span>

        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-extrabold tracking-tight text-brand-gradient">
            {BRAND.name}
          </span>
          <span className="mt-0.5 text-[9px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Digital Marketing
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
