
# Nexgen Digital Marketing — Full Site Build

Reference: the Adwebsolution screenshots you shared. I'll replicate that exact structural design (floating logo pill, top-right theme toggle, bottom icon nav, WhatsApp float, glass cards, gradient headings, marquee reviews, animated counters, etc.) but rebrand as **Nexgen** with your logo colors (magenta → electric blue → cyan/purple gradient).

Note on stack: your prompt specs a plain React+Vite SPA, but this project is on **TanStack Start** (file-based routing, SSR-ready). I'll keep all your design/animation specs 1:1 and adapt only the routing/entry (TanStack routes instead of `App.tsx` section switch). Every visual, animation, and content spec you gave is preserved.

## Branding tokens (in `src/styles.css`)

- `--brand-magenta`: oklch(0.65 0.29 340)  (~#c026d3 pink-magenta from logo)
- `--brand-blue`: oklch(0.55 0.24 265)     (electric blue)
- `--brand-cyan`: oklch(0.82 0.15 195)     (cyan/teal from logo tip)
- `--brand-purple`: oklch(0.50 0.25 290)
- `--gold` → mapped to `--brand-blue` (primary accent) so all existing "gold" utilities become the electric-blue/purple/cyan gradient
- `--gold-glow` → `--brand-cyan`
- Gradient text/buttons: `linear-gradient(135deg, magenta → blue → cyan)` matching logo
- Light theme: cream/white bg, ink text
- Dark theme: near-black navy bg, cream text, brand gradient accents glow

## Pages (TanStack routes)

```
/                → Home
/about           → About Us
/services        → Services index (all 13 services grid)
/services/website-development
/services/social-media-marketing
/services/shoot-management
/services/seo
/services/content-creation
/services/branding
/services/video-editing
/services/influencer-marketing
/services/logo-design
/services/offline-marketing
/services/amazon-marketplace
/services/performance-marketing
/contact         → Contact page (form + address + phones)
```

Each route has proper `head()` with unique title/description/og tags. Root has sitewide defaults.

## Global UI (rendered on every page via `__root.tsx`)

- `SmoothScroll` — Lenis wrapper
- `FloatingLogo` — top-left frosted pill with Nexgen logo + name
- `ThemeToggle` — top-right, sun/moon, `localStorage` key `nexgen-theme`
- `ScrollProgress` — top gradient bar
- `WhatsAppFloat` — bottom-right green circle → `wa.me/919664946844`
- `BottomNav` — fixed bottom icon pill: Home / About / Services / Why / Industries / Contact (uses router `Link`, active based on route match; on Home also uses IntersectionObserver for in-page sections)
- `GradientBlobs` — hero background layer

## Home page sections (id anchors for bottom-nav on `/`)

1. **Hero** — badge "Digital Marketing & Growth Agency", H1 "We Are Creative **Digital Marketing Agency**" (accent gradient on "Digital Marketing Agency"), subtitle from brief, primary CTA "Get a Free Growth Plan →", secondary "Call Us Now" → `tel:+919664946844`, trust badge "Trusted by 50+ brands · 100% Secure & Confidential"
2. **Welcome / About intro** — full welcome paragraph + trust card (3 rows) + mini stats: **5+ Years Experience**, **400+ Projects**, **50+ Brands**, plus "Our Promise: Strategy · Creativity · Engagement · Growth"
3. **Reviews marquee** — 2 opposite rows, 6 review cards duplicated for seamless loop
4. **What We Offer / Services** — H2 "Digital Marketing Excellence for **Your Brand**", 3-col glass card grid featuring core services (Website Dev, Social Media, Shoot Mgmt, SEO, Content, Branding, Video, Influencer, Logo, Offline, Amazon, Performance) — each card links to its service page
5. **Why Us** — 7 points (Result-Driven, Experienced Team, Measurable Reporting, Tailored Solutions, Quality & Reliability, Customer Support, Expertise)
6. **Industries** — 8 tiles (E-commerce, Healthcare, Education, Restaurants, Real Estate, Travel, Services, And more…)
7. **Results / Numbers That Speak** — animated counters: 5+ Years, 400+ Projects, 50+ Brands, 10+ Industries
8. **FAQ** — 4 Q&As from brief in accordion glass cards
9. **Contact** — form (Name, Business, Industry combobox, Service select, Phone prefilled +91, Message) → Zod validate → opens WhatsApp `wa.me/919664946844` with formatted message

## About page

Hero "Helping Businesses **Grow Online**" + full about paragraph, then Mission card, Vision card, "Why Choose Us" 4-point grid (Expertise/Customized/Quality/Support), and "Before know who we are?" narrative block. Ends with CTA banner → Contact.

## Services index page

Grid of all 13 service cards with icon, title, one-line desc → each links to its detail page.

## Service detail pages (12 pages, shared layout)

Each renders: Hero (service name + intro), main narrative section (title in accent gradient), Expertise sub-cards (3 for services that specify them), "Why Choose Us" 4 bullets, closing CTA → Contact. Content taken verbatim from your brief for: Website Development, Social Media Marketing, Shoot Management, Content Creation, Branding, Video Editing, Influencer Marketing, Logo Design, Offline Marketing, Amazon Marketplace, Performance Marketing. SEO page uses the SEO description you gave in the FAQ approach paragraph.

## Contact page

Full contact form (same as home) + info card with:
- **Address:** The Emporio, 412, Visat, Sarkhej–Gandhinagar Hwy, opp. 4D Square Mall, Kalpana Nagar, Nigam Nagar, Motera, Ahmedabad, Gujarat 382424
- **Phone 1:** +91 96649 46844 (tel + WhatsApp link)
- **Phone 2:** +91 97149 34644 (tel + WhatsApp link)
- Embedded Google Maps iframe of the address
- Social icons (Instagram/Facebook/LinkedIn/YouTube — placeholder `#` until you share URLs)

## Footer (every page)

Glass card, 3 cols: brand + tagline / Quick Links (routes) / Contact info + social icons. Copyright "© 2026 Nexgen Digital Marketing Solutions".

## Data file

`src/lib/site-data.ts` centralizes: services array, industries, whyUs points, stats, reviews (6), FAQ, CONTACT constants (phones, WhatsApp, email placeholder, address).

## Assets

- Upload your Nexgen logo (first image) as `/public/logo.png` via Lovable Assets
- Favicon derived from logo

## Animations (per your spec)

- Hero: staggered `animate` fade+rise 0/0.1/0.25/0.4/0.6s
- Sections: `whileInView` fade+y:20, once, margin -80px
- Why Us: x:-20 stagger 0.06s
- Industries: scale 0.9→1 stagger 0.05s
- Services: y:30 stagger (i%6)*0.05s
- Counters: `useInView` + `animate()` 0→value over 2s ease-out
- WhatsApp button: spring scale-in, delay 1s
- Marquee: 40s linear infinite, opposite rows, pause on hover
- Blob drift: 18s ease-in-out infinite
- Respects `prefers-reduced-motion`

## Technical details

- Framer Motion, Lenis (`@studio-freight/lenis`), Lucide icons, Zod already available or will install
- Tailwind v4 `@theme inline` + custom utilities: `text-brand-gradient`, `glass`, `glass-strong`, `brand-glow-shadow`
- Fonts: Sora (600/800) + Inter (400/500) loaded via `<link>` in `__root.tsx` head (not CSS `@import` — Tailwind v4 requirement)
- WhatsApp message format exactly as specified in your prompt
- All routes get proper SEO head() metadata

## Deliverable

Complete end-to-end site, all pages fully populated with your content, matching the reference layout structurally 1:1 with Nexgen's blue/electric-blue/purple/magenta gradient identity replacing the orange.
