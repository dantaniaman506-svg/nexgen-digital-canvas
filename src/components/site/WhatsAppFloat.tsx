import { motion } from "framer-motion";
import { CONTACT } from "@/lib/site-data";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${CONTACT.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-50"
      style={{ filter: "drop-shadow(0 4px 18px rgba(37,211,102,0.55))" }}
    >
      <img
        src="/logos/whatsapp-icon.png"
        alt="WhatsApp"
        className="h-14 w-14 rounded-full"
        draggable={false}
      />
    </motion.a>
  );
}
