import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Phone, ShieldCheck, ChevronDown } from "lucide-react";
import { CONTACT, BRAND } from "@/lib/site-data";
import { GradientBlobs } from "../GradientBlobs";
import { hapticMedium, hapticLight } from "@/lib/haptic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 pt-24 pb-16 lg:pt-20">
      <GradientBlobs />

      {/* Blueprint grid — both themes, different opacity */}
      <div
        aria-hidden
        className="dark:block hidden"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(99,140,255,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,140,255,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
        }}
      />
      <div
        aria-hidden
        className="block dark:hidden"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(80,100,180,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(80,100,180,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm"
        >
          <Sparkles className="h-4 w-4 text-brand-blue" />
          <span className="font-medium">{BRAND.tagline}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-display font-extrabold leading-[1.05]"
          style={{ fontSize: "clamp(2.75rem, 9vw, 5.75rem)" }}
        >
          We Are Creative{" "}
          <span className="text-brand-gradient">Digital Marketing Agency</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          We turn ideas into impact with innovative digital marketing strategies. Social media,
          SEO, ads, websites &amp; apps — all under one roof, engineered to grow your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            onClick={() => hapticMedium()}
            className="bg-brand-gradient brand-glow-shadow group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Get a Free Growth Plan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                onClick={() => hapticLight()}
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-foreground transition-transform hover:scale-[1.02]"
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
                  onClick={() => hapticMedium()}
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
                  onClick={() => hapticMedium()}
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground sm:text-sm"
        >
          <ShieldCheck className="h-4 w-4 text-brand-blue" />
          Trusted by 50+ brands · 100% Secure &amp; Confidential
        </motion.div>
      </div>
    </section>
  );
}
