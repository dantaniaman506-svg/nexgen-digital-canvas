import { useState } from "react";
import { z } from "zod";
import { Send, Check } from "lucide-react";
import { BRAND, CONTACT, services, industries } from "@/lib/site-data";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  business: z.string().trim().min(2, "Please enter your business").max(120),
  industry: z.string().trim().min(2).max(80),
  service: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6, "Please enter a valid phone").max(30),
  message: z.string().trim().max(600).optional(),
});

const industryOptions = industries.map((i) => i.title).filter((t) => t !== "And more…");

export function ContactForm({ dense = false }: { dense?: boolean }) {
  const [values, setValues] = useState({
    name: "",
    business: "",
    industry: "",
    service: "",
    phone: "+91 ",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const update = (k: keyof typeof values, v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path[0] as string] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    const lines = [
      `*New Lead — ${BRAND.name}*`,
      `*Name:* ${parsed.data.name}`,
      `*Business:* ${parsed.data.business}`,
      `*Industry:* ${parsed.data.industry}`,
      `*Service Interested In:* ${parsed.data.service}`,
      `*Phone:* ${parsed.data.phone}`,
    ];
    if (parsed.data.message) lines.push(`*Message:* ${parsed.data.message}`);
    const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    setTimeout(() => {
      window.open(url, "_blank");
      setSending(false);
    }, 400);
  };

  const inputCls =
    "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30";

  return (
    <form onSubmit={submit} className={`glass rounded-3xl ${dense ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Full Name</label>
          <input className={inputCls} value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Business Name</label>
          <input className={inputCls} value={values.business} onChange={(e) => update("business", e.target.value)} placeholder="Your company" />
          {errors.business && <p className="mt-1 text-xs text-destructive">{errors.business}</p>}
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Industry</label>
          <input
            list="industry-list"
            className={inputCls}
            value={values.industry}
            onChange={(e) => update("industry", e.target.value)}
            placeholder="e.g. Real Estate"
          />
          <datalist id="industry-list">
            {industryOptions.map((i) => (
              <option key={i} value={i} />
            ))}
          </datalist>
          {errors.industry && <p className="mt-1 text-xs text-destructive">{errors.industry}</p>}
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Service Interested In</label>
          <select className={inputCls} value={values.service} onChange={(e) => update("service", e.target.value)}>
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Phone (WhatsApp)</label>
          <input className={inputCls} value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 …" />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">Message (optional)</label>
          <textarea
            className={`${inputCls} min-h-[100px]`}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us a bit about your goals…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="bg-brand-gradient brand-glow-shadow mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-70 sm:w-auto"
      >
        {sending ? (
          <>
            <Check className="h-4 w-4" /> Redirecting to WhatsApp…
          </>
        ) : (
          <>
            Send on WhatsApp <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
