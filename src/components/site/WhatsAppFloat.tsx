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
      style={{
        position: "fixed",
        bottom: 96,
        right: 20,
        zIndex: 50,
        filter: "drop-shadow(0 4px 20px rgba(37,211,102,0.60))",
        display: "block",
        lineHeight: 0,
      }}
    >
      <img
        src="/logos/whatsapp-icon.png"
        alt="WhatsApp"
        width={56}
        height={56}
        style={{ width: 56, height: 56, borderRadius: "50%", display: "block" }}
        draggable={false}
      />
    </motion.a>
  );
}
