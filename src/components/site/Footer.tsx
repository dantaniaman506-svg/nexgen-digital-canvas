import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { BRAND, CONTACT } from "@/lib/site-data";

/** Always dark-styled — no theme branching. */
export function Footer() {
  return (
    <footer className="relative z-[2] px-5 pt-16 pb-40 lg:pb-16">
      <div
        className="mx-auto max-w-6xl rounded-3xl p-8"
        style={{
          backdropFilter: "blur(28px) saturate(160%)",
          backgroundColor: "color-mix(in oklab, var(--card) 22%, transparent)",
          border: "1px solid color-mix(in oklab, var(--border) 50%, transparent)",
          boxShadow: "0 8px 48px oklch(0 0 0 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.12)",
        }}
      >
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "#000",
                }}
              >
                <img
                  src="/logos/ndm-dark.png"
                  alt="NDM logo"
                  width={48}
                  height={48}
                  style={{ width: 48, height: 48, objectFit: "contain", display: "block" }}
                  draggable={false}
                />
              </span>
              <span className="font-display text-xl font-bold text-brand-gradient">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              {BRAND.fullName}. We turn ideas into impact with digital marketing, web development
              and creative that actually grows businesses.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-brand-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-blue transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-brand-blue transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-blue transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-blue" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${CONTACT.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue transition-colors leading-snug"
                >
                  {CONTACT.address}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-brand-blue" />
                <a href={`tel:${CONTACT.phone1Tel}`} className="hover:text-brand-blue transition-colors flex flex-col">
                  <span className="font-medium text-foreground">{CONTACT.phone1Name}</span>
                  <span className="text-xs">{CONTACT.phone1}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-brand-blue" />
                <a href={`tel:${CONTACT.phone2Tel}`} className="hover:text-brand-blue transition-colors flex flex-col">
                  <span className="font-medium text-foreground">{CONTACT.phone2Name}</span>
                  <span className="text-xs">{CONTACT.phone2}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-blue" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-brand-blue transition-colors">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
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
                  className="glass flex h-9 w-9 items-center justify-center rounded-full transition-all hover:text-brand-blue hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
