import { motion } from "framer-motion";
import { CONTACT } from "@/lib/site-data";

// Official WhatsApp SVG icon — green circle, white logo, no background bleed
function WhatsAppIcon({ size = 52 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Green circle */}
      <circle cx="26" cy="26" r="26" fill="#25D366" />
      {/* WhatsApp phone-in-bubble shape */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 12C18.268 12 12 18.268 12 26c0 2.61.71 5.058 1.95 7.153L12 40l5.07-1.923A13.945 13.945 0 0026 40c7.732 0 14-6.268 14-14S33.732 12 26 12zm-4.14 7.5c-.31-.693-.638-.707-.933-.72L20.3 18.77c-.263 0-.677.099-1.031.492-.353.393-1.35 1.318-1.35 3.214s1.383 3.73 1.575 3.987c.192.258 2.676 4.26 6.601 5.804 3.268 1.288 3.925 1.032 4.632.967.707-.065 2.281-.933 2.603-1.834.322-.9.322-1.672.225-1.834-.096-.161-.354-.258-.74-.45-.386-.193-2.281-1.126-2.635-1.254-.353-.128-.61-.193-.868.193-.257.386-.996 1.254-1.22 1.511-.224.257-.45.289-.836.097-.386-.193-1.63-.601-3.105-1.916-1.148-1.022-1.923-2.284-2.147-2.67-.225-.386-.024-.594.169-.786.172-.171.386-.45.578-.674.193-.225.257-.386.386-.643.128-.258.064-.483-.032-.675l-1.29-3.12z"
        fill="white"
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
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.2 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        /* Stay just above the bottom nav (nav: bottom 20 + ~56px height = 76px) */
        bottom: 84,
        right: 16,
        zIndex: 50,
        display: "block",
        lineHeight: 0,
        filter: "drop-shadow(0 4px 16px rgba(37,211,102,0.50))",
      }}
    >
      <WhatsAppIcon size={52} />
    </motion.a>
  );
}
