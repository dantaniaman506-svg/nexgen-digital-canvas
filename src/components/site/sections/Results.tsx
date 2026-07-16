import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { stats } from "@/lib/site-data";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="text-brand-gradient font-display text-4xl font-extrabold sm:text-5xl">
      {Math.round(val)}
      {suffix}
    </span>
  );
}

export function Results() {
  return (
    <section id="results" className="relative overflow-hidden px-5 py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--brand-blue) 12%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase">Results</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Numbers That <span className="text-brand-gradient">Speak.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="glass-strong rounded-3xl p-6 text-center"
            >
              <Counter to={s.value} suffix={s.suffix} />
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <span
                className="mt-3 inline-block rounded-full px-2 py-0.5 text-xs font-semibold text-brand-blue"
                style={{
                  backgroundColor: "color-mix(in oklab, var(--brand-blue) 15%, transparent)",
                }}
              >
                {s.delta}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
