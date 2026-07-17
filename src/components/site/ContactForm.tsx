import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { Send, Check, Phone, X } from "lucide-react";
import { BRAND, CONTACT, services, industries } from "@/lib/site-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  business: z.string().trim().min(2, "Please enter your business name").max(120),
  industry: z.string().trim().min(2, "Please select an industry").max(80),
  service: z.string().trim().min(2, "Please select a service").max(120),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30),
  message: z.string().trim().max(600).optional(),
});

const industryOptions = industries
  .map((i) => i.title)
  .filter((t) => t !== "And more…");

const recipients = [
  {
    id: "vedant",
    name: CONTACT.phone1Name,
    phone: CONTACT.phone1,
    wa: CONTACT.phone1Tel,
  },
  {
    id: "prem",
    name: CONTACT.phone2Name,
    phone: CONTACT.phone2,
    wa: CONTACT.phone2Tel,
  },
];

export function ContactForm({ dense = false }: { dense?: boolean }) {
  const [values, setValues] = useState({
    name: "",
    business: "",
    industry: "",
    industryCustom: "",
    service: "",
    phone: "+91 ",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const update = (k: keyof typeof values, v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (validated) setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  useEffect(() => {
    if (!showRecipientModal) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowRecipientModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showRecipientModal]);

  const validate = () => {
    const industryValue =
      values.industry === "Other" ? values.industryCustom : values.industry;
    const parsed = schema.safeParse({ ...values, industry: industryValue });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path[0] as string] = issue.message;
      }
      setErrors(errs);
      return null;
    }
    setErrors({});
    return { ...parsed.data, industry: industryValue };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidated(true);
    const data = validate();
    if (!data) return;
    setShowRecipientModal(true);
  };

  const sendToRecipient = (wa: string) => {
    const waDigits = wa.replace(/\D/g, "");
    const industryValue =
      values.industry === "Other" ? values.industryCustom : values.industry;
    const lines = [
      `*New Lead — ${BRAND.name}*`,
      `*Name:* ${values.name.trim()}`,
      `*Business:* ${values.business.trim()}`,
      `*Industry:* ${industryValue}`,
      `*Service Interested In:* ${values.service}`,
      `*Phone:* ${values.phone.trim()}`,
    ];
    if (values.message.trim())
      lines.push(`*Message:* ${values.message.trim()}`);
    const url = `https://wa.me/${waDigits}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
    setShowRecipientModal(false);
  };

  const inputCls =
    "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 placeholder:text-muted-foreground/60";

  /* Trigger styled to match the glass inputs */
  const triggerCls =
    "h-auto w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-left transition-colors hover:border-brand-blue focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 data-[placeholder]:text-muted-foreground/60";

  /* Dropdown content styled to match dark glass theme */
  const contentCls =
    "z-50 rounded-2xl border border-border bg-popover/95 backdrop-blur-xl shadow-xl p-1";

  const itemCls =
    "rounded-xl px-3 py-2 text-sm cursor-pointer focus:bg-brand-blue/10 focus:text-foreground data-[highlighted]:bg-brand-blue/10";

  const isOtherIndustry = values.industry === "Other";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`glass rounded-3xl ${dense ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Full Name
            </label>
            <input
              className={inputCls}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Business Name */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Business Name
            </label>
            <input
              className={inputCls}
              value={values.business}
              onChange={(e) => update("business", e.target.value)}
              placeholder="Your company name"
            />
            {errors.business && (
              <p className="mt-1 text-xs text-destructive">{errors.business}</p>
            )}
          </div>

          {/* Industry — custom Radix Select */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Industry
            </label>
            <Select
              value={values.industry}
              onValueChange={(v) => {
                update("industry", v);
                update("industryCustom", "");
              }}
            >
              <SelectTrigger className={triggerCls}>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent className={contentCls}>
                {industryOptions.map((i) => (
                  <SelectItem key={i} value={i} className={itemCls}>
                    {i}
                  </SelectItem>
                ))}
                <SelectItem value="Other" className={itemCls}>
                  Other — type your own
                </SelectItem>
              </SelectContent>
            </Select>
            {isOtherIndustry && (
              <input
                className={`${inputCls} mt-2`}
                value={values.industryCustom}
                onChange={(e) => update("industryCustom", e.target.value)}
                placeholder="Type your industry…"
                autoFocus
              />
            )}
            {errors.industry && (
              <p className="mt-1 text-xs text-destructive">{errors.industry}</p>
            )}
          </div>

          {/* Service — custom Radix Select */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Service Interested In
            </label>
            <Select
              value={values.service}
              onValueChange={(v) => update("service", v)}
            >
              <SelectTrigger className={triggerCls}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className={contentCls}>
                {services.map((s) => (
                  <SelectItem key={s.slug} value={s.title} className={itemCls}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="mt-1 text-xs text-destructive">{errors.service}</p>
            )}
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Phone (WhatsApp)
            </label>
            <input
              className={inputCls}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91 99999 99999"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Message{" "}
              <span className="font-normal opacity-60">(optional)</span>
            </label>
            <textarea
              className={`${inputCls} min-h-[100px] resize-none`}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Tell us a bit about your goals…"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-brand-gradient brand-glow-shadow mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display font-semibold text-white transition-transform hover:scale-[1.01] sm:w-auto"
        >
          Send on WhatsApp <Send className="h-4 w-4" />
        </button>
      </form>

      {/* Recipient chooser modal */}
      {showRecipientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="glass w-full max-w-sm rounded-3xl p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold">
                  Who should we contact?
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Choose a team member to send your message to
                </p>
              </div>
              <button
                onClick={() => setShowRecipientModal(false)}
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {recipients.map((r) => (
                <button
                  key={r.id}
                  onClick={() => sendToRecipient(r.wa)}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-background/40 px-4 py-4 text-left transition-all hover:border-brand-blue hover:bg-brand-blue/5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight">{r.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {r.phone}
                    </p>
                  </div>
                  <Check className="h-4 w-4 shrink-0 text-brand-blue opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              You'll be redirected to WhatsApp — choose either contact
            </p>
          </div>
        </div>
      )}
    </>
  );
}
