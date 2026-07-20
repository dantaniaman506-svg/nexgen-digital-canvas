import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Mail, Clock, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { GradientBlobs } from "@/components/site/GradientBlobs";
import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : "",
  }),
  component: ContactPage,
});

function ContactPage() {
  const { service: preService } = Route.useSearch();
  return (
    <>
      <section className="relative px-5 pt-32 pb-14 overflow-hidden">
        <GradientBlobs />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display font-extrabold leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 4.25rem)" }}
          >
            Still Not Getting Leads?{" "}
            <span className="text-brand-gradient">Let's Fix That.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            Tell us a bit about your business — we'll reply on WhatsApp with a free growth plan.
          </motion.p>
        </div>
      </section>

      <section className="relative px-5 py-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <ContactForm initialService={preService} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-7 flex flex-col gap-5"
          >
            <div>
              <p className="text-brand-blue font-display text-xs font-semibold tracking-widest uppercase">Get In Touch</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold">Reach us directly</h2>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold">Address</p>
                <p className="text-sm text-muted-foreground">{CONTACT.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold">Call us</p>
                <a href={`tel:${CONTACT.phone1Tel}`} className="block text-sm text-muted-foreground hover:text-brand-blue">{CONTACT.phone1}</a>
                <a href={`tel:${CONTACT.phone2Tel}`} className="block text-sm text-muted-foreground hover:text-brand-blue">{CONTACT.phone2}</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: "#25D366" }}>
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold">WhatsApp</p>
                <a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-brand-blue">
                  Chat with us instantly
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold">Email</p>
                <a href={`mailto:${CONTACT.email}`} className="text-sm text-muted-foreground hover:text-brand-blue">{CONTACT.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold">Working hours</p>
                <p className="text-sm text-muted-foreground">Mon – Sat · 10:00 AM – 7:00 PM</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              {[
                { href: CONTACT.instagram, Icon: Instagram, label: "Instagram" },
                { href: CONTACT.facebook, Icon: Facebook, label: "Facebook" },
                { href: CONTACT.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: CONTACT.youtube, Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-brand-blue"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass mx-auto max-w-6xl overflow-hidden rounded-3xl p-2"
        >
          <iframe
            title="Nexgen office location"
            src={`https://www.google.com/maps?q=${CONTACT.mapsQuery}&output=embed`}
            className="h-[400px] w-full rounded-2xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </>
  );
}
