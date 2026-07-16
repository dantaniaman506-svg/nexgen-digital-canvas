import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { CONTACT, BRAND } from "@/lib/site-data";
import { GradientBlobs } from "../GradientBlobs";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 pt-24 pb-16">
      <GradientBlobs />
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
            className="bg-brand-gradient brand-glow-shadow group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Get a Free Growth Plan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`tel:${CONTACT.phone1Tel}`}
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-foreground transition-transform hover:scale-[1.02]"
          >
            <Phone className="h-4 w-4 text-brand-blue" />
            Call Us Now
          </a>
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
