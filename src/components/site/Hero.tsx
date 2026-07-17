import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Phone, ShieldCheck, ChevronDown } from "lucide-react";
import { CONTACT, BRAND } from "@/lib/site-data";
import { GradientBlobs } from "../GradientBlobs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 pt-24 pb-16"
    >
      {/* Gradient blobs layer */}
      <div className="absolute inset-0 z-[1]">
        <GradientBlobs />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Radial backdrop behind text for readability on video */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-[40px]"
          style={{
            background:
              "radial-gradient(ellipse 95% 80% at 50% 50%, color-mix(in oklab, var(--background) 48%, transparent) 0%, transparent 100%)",
          }}
        />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm"
          style={{
            backdropFilter: "blur(16px)",
            backgroundColor: "color-mix(in oklab, var(--card) 30%, transparent)",
            boxShadow: "0 2px 24px oklch(0.64 0.20 248 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.3)",
          }}
        >
          <Sparkles className="h-4 w-4 text-brand-blue" />
          <span className="font-medium">{BRAND.tagline}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-display font-extrabold leading-[1.05]"
          style={{
            fontSize: "clamp(2.75rem, 9vw, 5.75rem)",
            textShadow:
              "0 0 80px color-mix(in oklab, var(--brand-blue) 22%, transparent), 0 4px 32px color-mix(in oklab, var(--background) 60%, transparent)",
          }}
        >
          We Are Creative{" "}
          <span
            className="text-brand-gradient"
            style={{
              filter:
                "drop-shadow(0 0 28px color-mix(in oklab, var(--brand-blue) 40%, transparent))",
            }}
          >
            Digital Marketing Agency
          </span>
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          style={{
            textShadow: "0 1px 12px color-mix(in oklab, var(--background) 70%, transparent)",
          }}
        >
          We turn ideas into impact with innovative digital marketing strategies. Social media,
          SEO, ads, websites &amp; apps — all under one roof, engineered to grow your brand.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="bg-brand-gradient brand-glow-shadow group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-white transition-all hover:scale-[1.03] hover:shadow-2xl"
          >
            Get a Free Growth Plan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-foreground transition-all hover:scale-[1.03]"
                style={{
                  backdropFilter: "blur(16px)",
                  backgroundColor: "color-mix(in oklab, var(--card) 30%, transparent)",
                  boxShadow:
                    "0 2px 20px oklch(0.64 0.20 248 / 0.10), inset 0 1px 0 oklch(1 0 0 / 0.25)",
                }}
              >
                <Phone className="h-4 w-4 text-brand-blue" />
                Call Us Now
                <ChevronDown className="h-4 w-4 text-brand-blue" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={10}
              className="glass-strong min-w-[240px] rounded-2xl border-0 p-2 shadow-2xl"
            >
              <DropdownMenuItem asChild className="rounded-xl focus:bg-transparent">
                <a
                  href={`tel:${CONTACT.phone1Tel}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[color-mix(in_oklab,var(--brand-blue)_14%,transparent)]"
                >
                  <span className="bg-brand-gradient flex h-9 w-9 items-center justify-center rounded-full text-white">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col text-left">
                    <span className="font-display text-sm font-semibold">{CONTACT.phone1Name}</span>
                    <span className="text-[11px] text-muted-foreground">{CONTACT.phone1}</span>
                  </span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl focus:bg-transparent">
                <a
                  href={`tel:${CONTACT.phone2Tel}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[color-mix(in_oklab,var(--brand-blue)_14%,transparent)]"
                >
                  <span className="bg-brand-gradient flex h-9 w-9 items-center justify-center rounded-full text-white">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col text-left">
                    <span className="font-display text-sm font-semibold">{CONTACT.phone2Name}</span>
                    <span className="text-[11px] text-muted-foreground">{CONTACT.phone2}</span>
                  </span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground sm:text-sm"
          style={{
            textShadow: "0 1px 8px color-mix(in oklab, var(--background) 60%, transparent)",
          }}
        >
          <ShieldCheck className="h-4 w-4 text-brand-blue" />
          Trusted by 50+ brands · 100% Secure &amp; Confidential
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 p-1"
            style={{
              borderColor: "color-mix(in oklab, var(--brand-blue) 45%, transparent)",
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-brand-gradient"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
