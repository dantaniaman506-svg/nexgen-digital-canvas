import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { BRAND, CONTACT } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="px-5 pt-16 pb-40">
      <div className="glass mx-auto max-w-6xl rounded-3xl p-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={BRAND.logoUrl} alt="Nexgen logo" className="h-11 w-11 rounded-full bg-black object-cover" />
              <span className="font-display text-xl font-bold text-brand-gradient">{BRAND.name}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              {BRAND.fullName}. We turn ideas into impact with digital marketing, web development and creative that actually grows businesses.
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
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-blue" /><span>{CONTACT.city}</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-blue" /><a href={`tel:${CONTACT.phone1Tel}`} className="hover:text-brand-blue">{CONTACT.phone1}</a></li>
              <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-brand-blue" /><a href={`tel:${CONTACT.phone2Tel}`} className="hover:text-brand-blue">{CONTACT.phone2}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-blue" /><a href={`mailto:${CONTACT.email}`} className="hover:text-brand-blue">{CONTACT.email}</a></li>
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
                  className="glass flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-brand-blue"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
