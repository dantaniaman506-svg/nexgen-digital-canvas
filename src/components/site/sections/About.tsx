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
            className="glass rounded-3xl p-6 sm:p-8"
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
              <div key={s.l} className="glass rounded-2xl p-4 text-center">
                <p className="text-brand-gradient font-display text-3xl font-extrabold">{s.v}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-2xl p-5"
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
