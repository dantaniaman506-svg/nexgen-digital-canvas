import { motion } from "framer-motion";
import { industries } from "@/lib/site-data";

export function Industries() {
  return (
    <section id="industries" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase">Industries</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Industries <span className="text-brand-gradient">We Serve</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass group flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition-transform hover:-translate-y-1"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-all group-hover:bg-brand-gradient"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--brand-blue) 12%, transparent)",
                  }}
                >
                  <Icon
                    className="h-6 w-6 text-brand-blue transition-colors group-hover:text-white"
                    strokeWidth={2}
                  />
                </div>
                <p className="font-display text-sm font-semibold">{ind.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
