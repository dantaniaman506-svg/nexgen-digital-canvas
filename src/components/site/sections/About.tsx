import { motion } from "framer-motion";
import { trustCards, BRAND } from "@/lib/site-data";

export function About() {
  return (
    <section id="about" className="relative px-5 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase">About</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Helping Businesses <span className="text-brand-gradient">Grow Online</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            {BRAND.name} is your full-stack growth partner — digital marketing, web and app
            development under one roof. We're a group of passionate technologists and creative
            thinkers committed to developing cutting-edge solutions.
          </p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            We don't just deliver services, we engineer outcomes: more leads, more sales, more
            trust. Whether you own a startup, a small business or a big brand — we help you become
            the leader of your industry in this digital world.
          </p>
        </motion.div>

        <div className="grid gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.025, y: -4, boxShadow: "0 20px 56px -8px oklch(0.64 0.20 248 / 0.35), 0 0 0 1.5px oklch(0.64 0.20 248 / 0.20)", transition: { type: "spring", stiffness: 450, damping: 22 } }}
            whileTap={{ scale: 1.04, y: -5, boxShadow: "0 26px 64px -6px oklch(0.64 0.20 248 / 0.52), 0 0 0 2px oklch(0.86 0.13 225 / 0.32)", transition: { type: "spring", stiffness: 550, damping: 20 } }}
            className="glass cursor-pointer rounded-3xl p-6 sm:p-8"
          >
            {trustCards.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className={`flex items-start gap-4 ${i > 0 ? "mt-5 pt-5 border-t border-border/50" : ""}`}
                >
                  <div className="bg-brand-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold">{t.title}</h3>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { v: "5+", l: "Years Active" },
              { v: "400+", l: "Projects" },
              { v: "50+", l: "Brands Served" },
            ].map((s) => (
              <motion.div key={s.l}
                whileHover={{ scale: 1.07, y: -5, boxShadow: "0 16px 48px -8px oklch(0.64 0.20 248 / 0.38), 0 0 0 1.5px oklch(0.64 0.20 248 / 0.22)", transition: { type: "spring", stiffness: 500, damping: 22 } }}
                whileTap={{ scale: 1.10, y: -7, boxShadow: "0 22px 56px -6px oklch(0.64 0.20 248 / 0.55), 0 0 0 2px oklch(0.86 0.13 225 / 0.35)", transition: { type: "spring", stiffness: 600, damping: 20 } }}
                className="glass cursor-pointer rounded-2xl p-4 text-center">
                <p className="text-brand-gradient font-display text-3xl font-extrabold">{s.v}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ scale: 1.03, y: -4, boxShadow: "0 16px 48px -8px oklch(0.64 0.20 248 / 0.35), 0 0 0 1.5px oklch(0.64 0.20 248 / 0.20)", transition: { type: "spring", stiffness: 500, damping: 22 } }}
            whileTap={{ scale: 1.05, y: -5, boxShadow: "0 22px 56px -6px oklch(0.64 0.20 248 / 0.52), 0 0 0 2px oklch(0.86 0.13 225 / 0.32)", transition: { type: "spring", stiffness: 600, damping: 20 } }}
            className="glass cursor-pointer rounded-2xl p-5"
          >
            <p className="text-brand-blue font-display text-xs font-semibold tracking-widest uppercase">Our Promise</p>
            <p className="mt-1 font-display text-lg font-bold">
              Strategy · Creativity · Engagement · Growth
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
