import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Sparkles, Award, Users, ShieldCheck, HeadphonesIcon } from "lucide-react";
import { GradientBlobs } from "@/components/site/GradientBlobs";
import { BRAND } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const whyChoose = [
  { icon: Award, title: "Expertise & Experience", desc: "Appropriately enhance data-centered innovation with years of proven track record across industries." },
  { icon: Users, title: "Customized Solutions", desc: "Every brand is different. We craft strategies that fit your goals, budget and stage — not templates." },
  { icon: ShieldCheck, title: "Quality & Reliability", desc: "Deadlines matter. We show up on time, every time, with work you'll be proud to publish." },
  { icon: HeadphonesIcon, title: "Customer Support", desc: "Real humans, real responses. We treat every client like our only client." },
];

function AboutPage() {
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
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display font-extrabold leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
          >
            Helping Businesses <span className="text-brand-gradient">Grow Online</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            We are a group of passionate technologists and creative thinkers who are committed to
            developing cutting-edge solutions for companies around the world. {BRAND.name} has been
            at the forefront of providing top-notch IT and marketing services for more than 5 years.
            Whether you own a startup, a small business, or a big company — we're here to help you
            lead your industry in the digital world.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            Step into the magical basket of our company where you'll explore services such as
            Graphic Design, Digital Marketing, Branding, Website Design, Motion Graphics, SEO, and
            Paid Marketing including Google Ads and Facebook.
          </motion.p>
        </div>
      </section>

      <section className="relative px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="glass rounded-3xl p-8"
          >
            <div className="bg-brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-extrabold">Our Mission</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To help organizations with the newest and most advanced technology innovations —
              customized solutions that boost production, efficiency, and growth so they reach
              their target audience. We work hard to establish long-lasting connections with
              clients around their specific requirements and go above and beyond with our digital
              services. Your vision is our mission.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8"
          >
            <div className="bg-brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-extrabold">Our Vision</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To transform the digital landscape by establishing ourselves as a renowned IT and
              marketing company. We aim to provide the best business solutions that foster
              prosperity and growth. By leveraging innovative technologies and a customer-centric
              approach, we strive to exceed client expectations and drive success in every project
              we undertake.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase">Why Choose Us</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Before you choose us, <span className="text-brand-gradient">know who we are</span>
            </h2>
            <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
              Our team is made up of experienced professionals who are leaders in their fields.
              From SEO to digital marketing, we have the knowledge and experience to manage every
              project with proficiency. We know every client is different — that's why we take a
              client-centric approach, tailoring our services to your problems and goals. Quality
              is the foundation of everything we do.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {whyChoose.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.06 }}
                  className="glass rounded-2xl p-6 flex gap-4 hover:brand-glow-shadow transition-shadow"
                >
                  <div className="bg-brand-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold">{w.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass-strong mx-auto max-w-4xl rounded-3xl p-10 text-center"
        >
          <Sparkles className="mx-auto h-8 w-8 text-brand-blue" />
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Ready to <span className="text-brand-gradient">grow with Nexgen</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tell us what you're working on — we'll reply on WhatsApp with a free growth plan.
          </p>
          <Link
            to="/contact"
            className="bg-brand-gradient brand-glow-shadow mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-white"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
