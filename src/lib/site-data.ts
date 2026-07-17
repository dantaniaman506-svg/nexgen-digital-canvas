import {
  Instagram,
  Search,
  MousePointerClick,
  Code2,
  Camera,
  PenTool,
  Palette,
  Film,
  Users,
  Sparkle,
  Megaphone,
  ShoppingCart,
  BarChart3,
  ShieldCheck,
  Award,
  Star,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  UtensilsCrossed,
  Building2,
  Plane,
  Wrench,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const BRAND = {
  name: "Nexgen",
  fullName: "Nexgen Digital Marketing Solutions",
  tagline: "Digital Marketing & Growth Agency",
  logoUrl: "/__l5e/assets-v1/65200df9-0827-40cd-89c4-71c9a1d2612a/nexgen-logo.png",
};

export const CONTACT = {
  phone1: "+91 96649 46844",
  phone1Tel: "+919664946844",
  phone1Name: "Vedant Prajapati",
  phone2: "+91 97149 34644",
  phone2Tel: "+919714934644",
  phone2Name: "Prem Jain",
  whatsappNumber: "919664946844",
  email: "hello@nexgendigital.in",
  address:
    "The Emporio, 412, Visat, Sarkhej–Gandhinagar Hwy, opp. 4D Square Mall, Kalpana Nagar, Nigam Nagar, Motera, Ahmedabad, Gujarat 382424",
  city: "Ahmedabad, Gujarat",
  mapsQuery:
    "The+Emporio+412+Visat+Sarkhej+Gandhinagar+Hwy+Motera+Ahmedabad+Gujarat+382424",
  instagram: "#",
  facebook: "#",
  linkedin: "#",
  youtube: "#",
};

export type Service = {
  slug: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  intro: string;
  sectionTitle: string;
  sectionTitleAccent: string;
  narrative: string[];
  expertise?: { title: string; desc: string }[];
  whyChoose: { title: string; desc: string }[];
  closing?: { title: string; body: string };
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    desc: "Fast, premium, custom-built websites that convert.",
    icon: Code2,
    intro:
      "We specialize in expert website development services tailored to your business needs. Whether you need a PHP, HTML, or WordPress website, we excel in creating high-quality, custom-built websites that enhance your online presence and drive results.",
    sectionTitle: "Crafting Custom Solutions for",
    sectionTitleAccent: "Your Digital Success",
    narrative: [
      "We specialize in expert website development services tailored to your business needs. Whether you need a PHP, HTML, or WordPress website, we excel in creating high-quality, custom-built websites that enhance your online presence and drive results.",
      "Our team focuses on delivering websites that are not only visually appealing but also functional and user-friendly, ensuring a seamless user experience. Trust us to build a website that reflects your brand's uniqueness and effectively engages your target audience.",
    ],
    expertise: [
      { title: "PHP Development", desc: "Harness the power of PHP to build dynamic and interactive websites that are robust and scalable." },
      { title: "HTML Websites", desc: "Clean, efficient HTML coding for straightforward and effective web solutions." },
      { title: "WordPress Solutions", desc: "Customized WordPress websites with intuitive CMS for easy content management and updates." },
    ],
    whyChoose: [
      { title: "Tailored Solutions", desc: "We understand every business is unique. We work closely with you to create a website that reflects your brand identity and achieves your specific goals." },
      { title: "Responsive Design", desc: "Ensuring your website looks great and functions flawlessly on all devices, providing an optimal user experience." },
      { title: "SEO Optimization", desc: "Implementing SEO best practices to enhance your website's visibility and ranking in search engines." },
      { title: "E-commerce Integration", desc: "Seamless integration of e-commerce functionalities to help you reach a wider audience and maximize sales." },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    desc: "Instagram, Facebook, LinkedIn management, content & paid ads.",
    icon: Instagram,
    intro:
      "We understand the crucial role of social media in today's digital landscape. Social platforms like Facebook, Instagram, Twitter, and LinkedIn are powerful tools for shaping brand identity, engaging audiences, and driving business growth.",
    sectionTitle: "Expert social media",
    sectionTitleAccent: "marketing solutions",
    narrative: [
      "We understand the crucial role of social media in today's digital landscape. Social platforms like Facebook, Instagram, Twitter, and LinkedIn are powerful tools for shaping brand identity, engaging audiences, and driving business growth.",
      "Whether you're a startup or an established brand, social media offers unmatched opportunities for visibility and interaction — and we make sure yours cuts through the noise.",
    ],
    expertise: [
      { title: "Social Media Management", desc: "Strategic social media management for achieving business goals through meticulous planning and campaign optimization." },
      { title: "Social Media Strategy", desc: "Crafting an effective social media strategy involves analyzing your audience, competitors, and trends to define clear goals." },
      { title: "Graphics and Content", desc: "Eye-catching visuals and engaging copy that align every post with your brand identity and resonate with your audience." },
    ],
    whyChoose: [
      { title: "Expertise", desc: "Our team comprises seasoned digital marketers who stay ahead of industry trends and platform updates." },
      { title: "Tailored Solutions", desc: "We don't believe in one-size-fits-all. Each strategy and campaign is tailored to meet your unique business needs." },
      { title: "Proven Results", desc: "Through strategic planning and meticulous execution, we have helped numerous clients achieve their social media marketing goals." },
      { title: "Full-Funnel Approach", desc: "From awareness to conversion — we build campaigns that move real business metrics, not just vanity numbers." },
    ],
    closing: {
      title: "Let's Elevate Your Social Media Presence",
      body: "Partner with us and embark on a journey towards social media success. Whether you're looking to increase brand awareness, drive website traffic, or boost conversions, we have the expertise to make it happen.",
    },
  },
  {
    slug: "shoot-management",
    title: "Shoot Management",
    desc: "Pre-production, photography, videography & post-production.",
    icon: Camera,
    intro:
      "In today's dynamic digital marketing landscape, compelling visuals are essential. Our Shoot Management services are designed to elevate your brand's visual storytelling.",
    sectionTitle: "Capturing the Essence of",
    sectionTitleAccent: "Your Brand",
    narrative: [
      "In today's dynamic digital marketing landscape, compelling visuals are essential. Our Shoot Management services are designed to elevate your brand's visual storytelling. We ensure every shot captures the essence of your brand, leaving a lasting impact on your audience.",
      "Our comprehensive approach includes meticulous pre-shoot planning, professional photography and videography, creative direction, and expert post-production. We bring your brand to life through high-quality visuals that enhance your overall marketing strategy.",
    ],
    expertise: [
      { title: "Pre-Shoot Planning", desc: "Effective shoot management begins long before the camera starts rolling. Our team collaborates closely with you to understand your brand's vision, goals, and target audience." },
      { title: "Creative Direction", desc: "We provide creative direction throughout the shoot to ensure that the visuals align with your brand's identity and marketing strategy." },
      { title: "Post-Production Excellence", desc: "The magic of shoot management extends into post-production, where our skilled editors enhance and refine the visuals." },
    ],
    whyChoose: [
      { title: "Expert Team", desc: "Our team of photographers, videographers, and creative directors are industry experts with a passion for visual storytelling." },
      { title: "Tailored Solutions", desc: "We customize our services to meet your specific needs, ensuring content reflects your brand's unique identity." },
      { title: "Quality Assurance", desc: "We uphold the highest standards of quality in every aspect of shoot management, from planning to post-production." },
      { title: "Client Collaboration", desc: "We value our clients' input and work collaboratively to bring their vision to life, ensuring complete satisfaction." },
    ],
    closing: {
      title: "Ready to elevate your brand's visual presence?",
      body: "Contact us today to learn how we can help you capture the essence of your brand and create visuals that leave a lasting impression.",
    },
  },
  {
    slug: "google-seo",
    title: "Google SEO",
    desc: "Keyword research, on/off-page, technical & local SEO.",
    icon: Search,
    intro:
      "We employ a strategic approach to SEO that encompasses thorough keyword research, meticulous on-page optimization, technical SEO audits, and content strategy refinement.",
    sectionTitle: "Get Found on",
    sectionTitleAccent: "Google, Reliably.",
    narrative: [
      "We employ a strategic approach to SEO that encompasses thorough keyword research, meticulous on-page optimization, technical SEO audits, and content strategy refinement.",
      "By optimizing your website for search engines, we aim to improve its visibility, drive organic traffic, and ultimately increase conversions — the kind of growth that compounds every month.",
    ],
    expertise: [
      { title: "Keyword Research", desc: "Deep-dive research to find the high-intent keywords your customers are actually searching for." },
      { title: "On-Page & Technical SEO", desc: "Meta, schema, speed, Core Web Vitals, internal linking — every technical lever pulled." },
      { title: "Local & Off-Page SEO", desc: "Google Business Profile, citations and authority-building backlinks that move rankings." },
    ],
    whyChoose: [
      { title: "White-Hat Only", desc: "Sustainable strategies that don't risk penalties." },
      { title: "Transparent Reporting", desc: "See exactly what's ranking, what's improving, and what's next." },
      { title: "Content + SEO", desc: "We pair technical SEO with content that actually earns links and shares." },
      { title: "ROI-Focused", desc: "Rankings matter, but revenue matters more — every campaign ties back to leads and sales." },
    ],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    desc: "Blogs, posts, newsletters and copy that convert.",
    icon: PenTool,
    intro:
      "In the dynamic world of digital marketing, content reigns supreme. Our specialized content creation services are meticulously crafted to enhance your brand's presence, captivate your audience, and deliver impactful outcomes.",
    sectionTitle: "Elevate Your Brand with",
    sectionTitleAccent: "Exceptional Content",
    narrative: [
      "In the dynamic world of digital marketing, content reigns supreme. We recognize that compelling content forms the bedrock of effective online communication. Our specialized content creation services are meticulously crafted to enhance your brand's presence, captivate your audience, and deliver impactful outcomes.",
      "Whether it's engaging blog posts, persuasive social media content, or informative newsletters, we tailor each piece to resonate with your target demographic and amplify your online visibility. Trust us to transform your ideas into compelling narratives that not only tell your story but also drive meaningful engagement and foster lasting connections.",
    ],
    whyChoose: [
      { title: "Audience-First Writing", desc: "Every piece is written for the reader first, algorithm second." },
      { title: "SEO-Optimized", desc: "Content built to rank, share and convert — not just fill a calendar." },
      { title: "Brand Voice Consistency", desc: "One voice across blogs, socials, emails and ads." },
      { title: "Data-Backed Topics", desc: "We use search and social data to pick topics that actually earn attention." },
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    desc: "Identities, guidelines and stories that resonate.",
    icon: Sparkle,
    intro:
      "We understand that a powerful brand is more than just a logo or tagline — it's the essence of your business. Our branding services capture your unique identity and communicate it effectively to your audience.",
    sectionTitle: "Crafting Unique Identities",
    sectionTitleAccent: "that Resonate & Elevate",
    narrative: [
      "We understand that a powerful brand is more than just a logo or tagline — it's the essence of your business. Our branding services capture your unique identity and communicate it effectively to your audience.",
      "From conceptualization to execution, we ensure your brand stands out in the crowded digital landscape, creating a lasting impression. Let us help you build a brand that resonates, engages, and drives success.",
    ],
    whyChoose: [
      { title: "Strategy-First", desc: "Positioning, promise and personality — all defined before we design a pixel." },
      { title: "System, Not Just Look", desc: "Complete visual + verbal guidelines your whole team can use." },
      { title: "Distinctive Design", desc: "We avoid trend-chasing and build brands that age well." },
      { title: "Launch-Ready", desc: "Assets prepared for web, print, social, packaging — everywhere you show up." },
    ],
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    desc: "Reels, ads, corporate & social videos that engage.",
    icon: Film,
    intro:
      "We understand the power of video content in today's digital landscape. Our Video Editing services are crafted to transform raw footage into captivating visual stories that engage, inspire, and resonate with your audience.",
    sectionTitle: "Transforming Concepts into",
    sectionTitleAccent: "Compelling Visual Stories",
    narrative: [
      "We understand the power of video content in today's digital landscape. Our Video Editing services are crafted to transform raw footage into captivating visual stories that engage, inspire, and resonate with your audience.",
      "We take a meticulous approach to video editing, ensuring every frame aligns seamlessly with your brand's message and objectives. Whether it's a promotional video, corporate presentation, or social media content, our skilled editors bring creativity and technical expertise to every project.",
    ],
    whyChoose: [
      { title: "Story-Driven Cuts", desc: "Every edit serves a narrative — no wasted frames." },
      { title: "Platform-Native", desc: "Formats tuned to Reels, Shorts, YouTube, LinkedIn and TV." },
      { title: "Motion + Sound Design", desc: "Titles, transitions, VFX and audio mixing done in-house." },
      { title: "Fast Turnaround", desc: "Weekly content schedules? Ad batches? We keep pace without losing quality." },
    ],
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    desc: "Creators who move your audience — end-to-end campaigns.",
    icon: Users,
    intro:
      "In today's digital landscape, influencer marketing has emerged as a powerful strategy to amplify your brand's message and engage with a broader audience.",
    sectionTitle: "Amplify Your",
    sectionTitleAccent: "Brand's Voice",
    narrative: [
      "By partnering with influencers, brands can leverage their reach and credibility to create authentic connections with potential customers.",
      "We excel in identifying and collaborating with the right influencers for your brand. Our approach ensures that your message is delivered through trusted voices, enhancing brand awareness and fostering genuine engagement with your target audience.",
    ],
    whyChoose: [
      { title: "Right-Fit Creators", desc: "Handpicked creators that match your audience, tone and price point." },
      { title: "Campaign Management", desc: "Briefs, contracts, content approvals — we handle it end-to-end." },
      { title: "Performance Tracking", desc: "Reach, engagement, saves, DMs and conversions measured across every collab." },
      { title: "Scale, Not Guesswork", desc: "Test small, double down on winners — repeatable creator engines." },
    ],
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    desc: "Distinctive marks — the cornerstone of your identity.",
    icon: Palette,
    intro:
      "We know your logo is more than a visual mark — it's the cornerstone of your brand identity. Our expert team of designers excels in creating logos that capture your brand's essence and leave a lasting impression.",
    sectionTitle: "Crafting Identities, Elevating",
    sectionTitleAccent: "Your Visual Story",
    narrative: [
      "We start by understanding your business, target audience, and values. This research helps us craft a logo that truly represents your brand.",
      "Our collaborative process ensures your feedback is incorporated, resulting in a logo that is versatile, timeless, and reflective of your unique identity.",
    ],
    whyChoose: [
      { title: "Research-Led Concepts", desc: "We understand your market before drawing a single mark." },
      { title: "Versatile Marks", desc: "Works on a billboard, a favicon and everything in between." },
      { title: "Full Logo System", desc: "Primary, secondary, monogram, black/white and clear-space rules included." },
      { title: "Unlimited Iteration Rounds", desc: "We refine until it feels right — no rushed handoffs." },
    ],
  },
  {
    slug: "offline-marketing",
    title: "Offline Marketing",
    desc: "Print, outdoor, events and BTL that complements digital.",
    icon: Megaphone,
    intro:
      "We specialize in crafting impactful offline marketing strategies that complement your digital efforts, ensuring your brand stands out in the physical realm.",
    sectionTitle: "Elevate Your Brand with",
    sectionTitleAccent: "Strategic Offline Marketing",
    narrative: [
      "We specialize in crafting impactful offline marketing strategies that complement your digital efforts, ensuring your brand stands out in the physical realm.",
      "Explore our comprehensive range of services designed to elevate your business presence — from print collateral and outdoor campaigns to event activations and BTL executions.",
    ],
    whyChoose: [
      { title: "Integrated with Digital", desc: "Offline and online campaigns work as one — same story, everywhere." },
      { title: "Local Reach Expertise", desc: "Deep experience running local campaigns across Gujarat and Pan-India." },
      { title: "Vendor Network", desc: "Printers, venues, hoardings, distributors — sourced and managed for you." },
      { title: "Measurable Offline", desc: "QR codes, unique numbers, coupon codes — everything we run, we track." },
    ],
  },
  {
    slug: "amazon-marketplace",
    title: "Amazon Marketplace Growth",
    desc: "Listings, ads, A+ content and strategy for scale.",
    icon: ShoppingCart,
    intro:
      "We specialize in empowering businesses to thrive on the Amazon Marketplace. With our tailored strategies and deep industry expertise, we unlock your brand's potential and drive sustainable growth.",
    sectionTitle: "Unlock Growth on",
    sectionTitleAccent: "Amazon Marketplace",
    narrative: [
      "We specialize in empowering businesses to thrive on the Amazon Marketplace. With our tailored strategies and deep industry expertise, we unlock your brand's potential, driving sustainable growth and maximizing your presence on one of the world's largest e-commerce platforms.",
      "We understand that succeeding on Amazon requires more than just listing products. It demands a comprehensive strategy that integrates data-driven insights, targeted marketing campaigns, and continuous optimization.",
    ],
    whyChoose: [
      { title: "Optimized Listings", desc: "Titles, bullets, images, A+ content and keyword coverage engineered to rank." },
      { title: "Sponsored Ads", desc: "Sponsored Products, Brands and Display campaigns tuned for ACoS." },
      { title: "Brand Store Design", desc: "Storefronts that showcase your full range and lift AOV." },
      { title: "Ongoing Optimization", desc: "Weekly performance reviews and iterative improvements." },
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    desc: "Google & Meta ads engineered for measurable ROI.",
    icon: BarChart3,
    intro:
      "We understand that achieving your business goals requires more than just visibility — it demands measurable results. Our Performance Marketing services are meticulously crafted to drive tangible outcomes and maximize your ROI.",
    sectionTitle: "Driving Measurable Results",
    sectionTitleAccent: "Through Performance Marketing",
    narrative: [
      "Performance Marketing is not just about increasing traffic or impressions — it's about delivering measurable actions that align with your business objectives.",
      "Whether you seek enhanced conversions, increased sales, or heightened brand awareness, our tailored strategies are designed to deliver exactly that. Every rupee is tracked, tested and optimized.",
    ],
    whyChoose: [
      { title: "Conversion-First", desc: "Every campaign is designed around a measurable business action." },
      { title: "Multi-Channel", desc: "Google, Meta, YouTube, LinkedIn — we pick channels by fit, not habit." },
      { title: "Creative + Media Together", desc: "The best targeting still needs great creative. We ship both." },
      { title: "Transparent Dashboards", desc: "You see spend, conversions and ROAS in real time." },
    ],
  },
];

export const industries = [
  { title: "E-commerce", icon: ShoppingBag },
  { title: "Healthcare", icon: HeartPulse },
  { title: "Education", icon: GraduationCap },
  { title: "Restaurants", icon: UtensilsCrossed },
  { title: "Real Estate", icon: Building2 },
  { title: "Travel", icon: Plane },
  { title: "Local Services", icon: Wrench },
  { title: "And more…", icon: Sparkles },
];

export const whyUs = [
  "Result-Driven Strategies",
  "Experienced & Skilled Team",
  "Measurable Results & Transparent Reporting",
  "Tailored Solutions For Your Business",
  "Quality & Reliability, On Time Every Time",
  "Dedicated Customer Support",
  "5+ Years Of Industry Expertise",
];

export const stats = [
  { value: 5, suffix: "+", label: "Years Active", delta: "Since 2020" },
  { value: 400, suffix: "+", label: "Projects Delivered", delta: "+38%" },
  { value: 50, suffix: "+", label: "Brands Served", delta: "+22%" },
  { value: 10, suffix: "+", label: "Industries Covered", delta: "Growing" },
];

export const reviews = [
  {
    name: "Dr. Maitri Patel",
    role: "BDS · Implantologist",
    company: "Gentle Smiles Dental",
    initials: "MP",
    text: "Professional from day one. Nexgen understood our brand without endless meetings and built a site our patients genuinely compliment. 10/10 experience.",
  },
  {
    name: "Priya Mehta",
    role: "Marketing Head",
    company: "Vaayu Interiors",
    initials: "PM",
    text: "Clean, premium, trustworthy — exactly what we wanted. Clients now book directly from the website. Worth every rupee.",
  },
  {
    name: "Karan Vora",
    role: "Founder",
    company: "KV Realty",
    initials: "KV",
    text: "Their SEO work put us on page one for four buyer-intent keywords in Ahmedabad. Site leads doubled in a quarter.",
  },
  {
    name: "Ridhi Shah",
    role: "Owner",
    company: "Bloom Boutique",
    initials: "RS",
    text: "The team runs our Instagram like it's their own brand. Content is on point and DMs are flowing every week.",
  },
  {
    name: "Aakash Joshi",
    role: "Director",
    company: "Joshi Foods",
    initials: "AJ",
    text: "Google & Meta ads are finally profitable. Full-funnel thinking, weekly reviews, honest reporting.",
  },
  {
    name: "Neha Sharma",
    role: "Co-founder",
    company: "Lumen Studio",
    initials: "NS",
    text: "From logo to full brand system to launch campaign — Nexgen carried the whole journey. Rare to find this range.",
  },
];

export const faqs = [
  {
    q: "What services do you offer?",
    a: "We provide a comprehensive suite of digital marketing services designed to amplify your brand's online presence. Our offerings include strategic social media management, compelling content creation, targeted SEO solutions, precise digital advertising campaigns, captivating graphic design, and more. Each service is meticulously crafted to meet your specific business objectives and drive tangible results.",
  },
  {
    q: "How do you approach digital marketing strategy?",
    a: "Our approach to digital marketing strategy is rooted in a blend of meticulous research, innovative thinking, and data-driven insights. We begin by gaining a deep understanding of your business goals and target audience. From there, we develop tailored strategies that leverage the latest industry trends and technologies to maximize engagement, conversion, and ROI.",
  },
  {
    q: "Can you manage my social media accounts?",
    a: "Absolutely. We specialize in comprehensive social media management services. We handle everything from content creation and scheduling to community engagement and performance analytics. Our goal is to build and maintain a vibrant social media presence that enhances brand visibility, fosters meaningful connections with your audience, and drives business growth.",
  },
  {
    q: "How can you enhance my website's SEO?",
    a: "We employ a strategic approach to SEO that encompasses thorough keyword research, meticulous on-page optimization, technical SEO audits, and content strategy refinement. By optimizing your website for search engines, we aim to improve its visibility, drive organic traffic, and ultimately increase conversions.",
  },
];

export const trustCards = [
  { icon: ShieldCheck, title: "100% Secure & Confidential", desc: "Your data and business details never leave our hands." },
  { icon: Award, title: "Trusted by 50+ Brands", desc: "Proven results across 10+ industries." },
  { icon: Star, title: "5-Star Rated Agency", desc: "Results-driven, on time, every time." },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
