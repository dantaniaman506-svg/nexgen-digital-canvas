import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { reviews } from "@/lib/site-data";

const popVariants = {
  rest:  { scale: 1,    y: 0 },
  hover: { scale: 1.04, y: -4 },
  tap:   { scale: 1.06, y: -5 },
};
const popTransition = { type: "spring" as const, stiffness: 500, damping: 22 };

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <motion.div
      variants={popVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={popTransition}
      className="glass mx-3 flex w-[320px] shrink-0 cursor-pointer flex-col gap-3 rounded-2xl p-5">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-brand-blue text-brand-blue" />
        ))}
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
      <div className="mt-2 flex items-center gap-3 pt-3 border-t border-border/50">
        <div className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white">
          {r.initials}
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-bold truncate">{r.name}</p>
          <p className="text-xs text-muted-foreground truncate">{r.role}</p>
          <p className="text-xs text-brand-blue truncate">{r.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ReviewsMarquee() {
  const row1 = [...reviews, ...reviews];
  const row2 = [...reviews.slice().reverse(), ...reviews.slice().reverse()];

  return (
    <section className="marquee-pause relative overflow-hidden py-16">
      <div className="mx-auto max-w-6xl px-5 mb-8 text-center">
        <p className="text-brand-blue font-display text-sm font-semibold tracking-widest uppercase">
          Loved by clients
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
          What people <span className="text-brand-gradient">say about us</span>
        </h2>
      </div>

      <div className="flex w-max animate-marquee-left">
        {row1.map((r, i) => <Card key={`a-${i}`} r={r} />)}
      </div>
      <div className="mt-4 flex w-max animate-marquee-right">
        {row2.map((r, i) => <Card key={`b-${i}`} r={r} />)}
      </div>
    </section>
  );
}
