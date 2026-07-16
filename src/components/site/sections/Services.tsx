import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site-data";

export function Services() {
  return (
    <section id="services" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase">Services</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Everything You Need, <span className="text-brand-gradient">One Team.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Twelve specialist services that plug into one growth engine — designed to move
            metrics, not just tick boxes.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all hover:-translate-y-1 hover:brand-glow-shadow"
                >
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-60"
                    style={{
                      background:
                        "radial-gradient(circle, color-mix(in oklab, var(--brand-cyan) 60%, transparent), transparent 70%)",
                    }}
                  />
                  <div className="bg-brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue">
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
