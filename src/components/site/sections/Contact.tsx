import { motion } from "framer-motion";
import { ContactForm } from "../ContactForm";

export function Contact() {
  return (
    <section id="contact" className="relative px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase">Contact</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Still Not Getting Leads?{" "}
            <span className="text-brand-gradient">Let's Fix That.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us a bit about your business — we'll reply on WhatsApp with a free growth plan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
