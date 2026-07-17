import { motion } from "framer-motion";
import { CONTACT } from "@/lib/site-data";

// Proper WhatsApp SVG icon — green circle + white logo
function WhatsAppIcon({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="28" cy="28" r="28" fill="#25D366" />
      <path
        d="M28 12C19.163 12 12 19.163 12 28c0 2.837.74 5.503 2.036 7.818L12 44l8.42-2.008A15.93 15.93 0 0028 44c8.837 0 16-7.163 16-16S36.837 12 28 12z"
        fill="#25D366"
      />
      <path
        d="M28 13.5C19.991 13.5 13.5 19.991 13.5 28c0 2.952.826 5.714 2.265 8.07l-1.487 5.42 5.566-1.46A14.46 14.46 0 0028 42.5c8.009 0 14.5-6.491 14.5-14.5S36.009 13.5 28 13.5z"
        fill="white"
      />
      <path
        d="M22.45 20.5c-.4-.9-1.05-.87-1.45-.88-.37-.01-.8-.01-1.22-.01-.43 0-1.12.16-1.71.8-.59.63-2.25 2.2-2.25 5.36s2.3 6.22 2.62 6.65c.32.43 4.47 7.1 11 9.67 1.53.59 2.73.94 3.66 1.2 1.54.43 2.94.37 4.04.22 1.23-.17 3.79-1.55 4.33-3.05.53-1.5.53-2.78.37-3.05-.16-.27-.59-.43-1.24-.75-.64-.32-3.79-1.87-4.38-2.08-.59-.21-1.02-.32-1.45.32-.43.64-1.66 2.08-2.03 2.51-.38.43-.75.48-1.4.16-.64-.32-2.71-1-5.16-3.19-1.91-1.7-3.2-3.81-3.57-4.45-.38-.64-.04-.98.28-1.3.29-.28.64-.75.96-1.12.32-.37.43-.64.64-1.07.21-.43.11-.8-.05-1.12-.16-.32-1.45-3.49-1.99-4.77z"
        fill="#25D366"
      />
    </svg>
  );
}

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
      whileTap={{ scale: 0.92 }}
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: 96,
        right: 20,
        zIndex: 50,
        display: "block",
        lineHeight: 0,
        filter: "drop-shadow(0 4px 20px rgba(37,211,102,0.55))",
      }}
    >
      <WhatsAppIcon size={56} />
    </motion.a>
  );
}
