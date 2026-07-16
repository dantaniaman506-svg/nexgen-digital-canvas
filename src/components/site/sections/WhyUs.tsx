import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { whyUs, BRAND } from "@/lib/site-data";

export function WhyUs() {
  return (
    <section id="why" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase">Why Us</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Why Choose <span className="text-brand-gradient">{BRAND.name}</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {whyUs.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass flex items-center gap-4 rounded-2xl p-5 transition-transform hover:translate-x-1"
            >
              <div className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Check className="h-5 w-5 text-white" strokeWidth={3} />
              </div>
              <p className="font-display font-semibold">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
