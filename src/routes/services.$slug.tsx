import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import { GradientBlobs } from "@/components/site/GradientBlobs";
import { getServiceBySlug, services, type Service } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  notFoundComponent: () => (
    <section className="min-h-screen flex items-center justify-center px-5">
      <div className="glass rounded-3xl p-10 text-center max-w-md">
        <h1 className="font-display text-3xl font-extrabold">Service not found</h1>
        <p className="mt-2 text-muted-foreground">The service you're looking for doesn't exist.</p>
        <Link to="/services" className="bg-brand-gradient mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white">
          All services
        </Link>
      </div>
    </section>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: Service };
  const Icon = service.icon;

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    /* overflow-x: clip keeps every section from bleeding past the viewport */
    <div style={{ overflowX: "clip" }}>
      <section className="relative px-5 pt-32 pb-14 overflow-hidden">
        <GradientBlobs />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm"
          >
            <Icon className="h-4 w-4 text-brand-blue" />
            <span className="font-medium">Service</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-display font-extrabold leading-[1.05]"
            style={{ fontSize: "clamp(2.25rem, 6.5vw, 4rem)" }}
          >
            <span className="text-brand-gradient">{service.title}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            {service.intro}
          </motion.p>

          {/* ── Primary CTA ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              to="/contact"
              search={{ service: service.title }}
              className="bg-brand-gradient brand-glow-shadow group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 font-display text-base font-bold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <Zap className="h-5 w-5 shrink-0" />
              Get This Service
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-sm text-muted-foreground">Free consultation · No commitment</p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-16">
        <div className="mx-auto max-w-5xl">
          {/* Service hero image — shown only when the service has one */}
          {service.image && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="mb-12 overflow-hidden rounded-3xl"
              style={{
                boxShadow:
                  "0 20px 60px -12px rgba(79,127,255,0.28), 0 4px 24px rgba(0,0,0,0.18)",
                maxHeight: 420,
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                style={{ maxHeight: 420 }}
                loading="lazy"
              />
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display text-3xl font-extrabold leading-tight sm:text-4xl"
          >
            {service.sectionTitle}{" "}
            <span className="text-brand-gradient">{service.sectionTitleAccent}</span>
          </motion.h2>
          {service.narrative.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="mt-4 text-muted-foreground leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      {service.expertise && (
        <section className="relative px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="font-display text-2xl font-extrabold sm:text-3xl"
            >
              Our <span className="text-brand-gradient">Expertise</span>
            </motion.h3>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {service.expertise.map((e, i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-3xl p-6 hover:brand-glow-shadow transition-all hover:-translate-y-1"
                >
                  <h4 className="font-display text-lg font-bold">{e.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display text-2xl font-extrabold sm:text-3xl"
          >
            Why Choose Us for{" "}
            <span className="text-brand-gradient">{service.title}</span>
          </motion.h3>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.whyChoose.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06 }}
                className="glass flex items-start gap-4 rounded-2xl p-5"
              >
                <div className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  <Check className="h-5 w-5 text-white" strokeWidth={3} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-bold">{w.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass-strong mx-auto max-w-4xl rounded-3xl p-10 text-center"
        >
          <Sparkles className="mx-auto h-8 w-8 text-brand-blue" />
          <h3 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            {service.closing?.title ?? (
              <>
                Ready to <span className="text-brand-gradient">get started</span>?
              </>
            )}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {service.closing?.body ??
              `Let's talk about how ${service.title} can move real business metrics for you.`}
          </p>
          <Link
            to="/contact"
            search={{ service: service.title }}
            className="bg-brand-gradient brand-glow-shadow group mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            <Zap className="h-4 w-4" />
            Get This Service
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      <section className="relative px-5 pb-20">
        <div className="mx-auto max-w-6xl">
          <h3 className="font-display text-xl font-extrabold">
            Explore more <span className="text-brand-gradient">services</span>
          </h3>
          {/* md:grid-cols-3 — 768px threshold, safe for all phones */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <Link
                  key={r.slug}
                  to="/services/$slug"
                  params={{ slug: r.slug }}
                  className="glass group flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                >
                  <div className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <RIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold truncate">{r.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
