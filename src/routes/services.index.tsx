import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GradientBlobs } from "@/components/site/GradientBlobs";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <section className="relative px-5 pt-32 pb-16 overflow-hidden">
        <GradientBlobs />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase"
          >
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display font-extrabold leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
          >
            Digital Marketing Excellence{" "}
            <span className="text-brand-gradient">for Your Brand</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            We elevate your brand with tailored digital marketing strategies and stunning website
            designs. From SEO to social media and user-friendly websites, our expert team
            delivers results that enhance your online presence and drive business growth.
          </motion.p>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="bg-brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="mt-5 font-display text-lg font-bold">{s.title}</h2>
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
      </section>
    </>
  );
}
