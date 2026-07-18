import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { Send, MessageCircle, X, ChevronRight } from "lucide-react";
import { BRAND, CONTACT, services, industries } from "@/lib/site-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPortal } from "react-dom";

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
    initials: CONTACT.phone1Name.split(" ").map((n: string) => n[0]).join("").slice(0, 2),
  },
  {
    id: "prem",
    name: CONTACT.phone2Name,
    phone: CONTACT.phone2,
    wa: CONTACT.phone2Tel,
    initials: CONTACT.phone2Name.split(" ").map((n: string) => n[0]).join("").slice(0, 2),
  },
];

/** Strips everything except digits from the phone field, keeps +91 prefix */
function formatPhone(raw: string) {
  // allow +, digits, spaces, dashes only
  return raw.replace(/[^\d +\-]/g, "");
}

export function ContactForm({ dense = false }: { dense?: boolean }) {
  const [values, setValues] = useState({
    name: "",
    business: "",
    industry: "",
    industryCustom: "",
    service: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [sent, setSent] = useState<string | null>(null); // which recipient was chosen
  const modalRef = useRef<HTMLDivElement>(null);

  const update = (k: keyof typeof values, v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (validated) setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  // Close modal on outside click
  useEffect(() => {
    if (!showRecipientModal) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowRecipientModal(false);
      }
    };
    // small delay so the click that opened it doesn't immediately close it
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handler);
    };
  }, [showRecipientModal]);

  // Trap Escape key
  useEffect(() => {
    if (!showRecipientModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowRecipientModal(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showRecipientModal]);

  const validate = () => {
    const industryValue =
      values.industry === "Other" ? values.industryCustom : values.industry;
    const phoneVal = values.phone.trim() === "" ? "" : values.phone.trim();
    const parsed = schema.safeParse({ ...values, industry: industryValue, phone: phoneVal || "x" });
    // re-run proper
    const result = schema.safeParse({ ...values, industry: industryValue });
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[issue.path[0] as string] = issue.message;
      }
      setErrors(errs);
      return null;
    }
    setErrors({});
    return { ...result.data, industry: industryValue };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidated(true);
    const data = validate();
    if (!data) return;
    setShowRecipientModal(true);
  };

  const sendToRecipient = (r: (typeof recipients)[0]) => {
    const waDigits = r.wa.replace(/\D/g, "");
    const industryValue =
      values.industry === "Other" ? values.industryCustom : values.industry;
    const phoneDisplay = values.phone.trim() || "Not provided";
    const lines = [
      `*New Lead — ${BRAND.name}*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `*👤 Name:* ${values.name.trim()}`,
      `*🏢 Business:* ${values.business.trim()}`,
      `*🏭 Industry:* ${industryValue}`,
      `*🎯 Service:* ${values.service}`,
      `*📞 Phone:* ${phoneDisplay}`,
    ];
    if (values.message.trim())
      lines.push(`*💬 Message:* ${values.message.trim()}`);
    const url = `https://wa.me/${waDigits}?text=${encodeURIComponent(lines.join("\n"))}`;
    setSent(r.id);
    setTimeout(() => {
      window.open(url, "_blank");
      setShowRecipientModal(false);
      setSent(null);
    }, 350);
  };

  const inputCls =
    "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 placeholder:text-muted-foreground/60";

  const triggerCls =
    "h-auto w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-left transition-colors hover:border-brand-blue focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 data-[placeholder]:text-muted-foreground/60";

  const contentCls =
    "z-[200] rounded-2xl border border-border bg-popover/95 backdrop-blur-xl shadow-xl p-1";

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

          {/* Industry */}
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

          {/* Service */}
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

          {/* Phone — +91 badge + clean input */}
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              WhatsApp Number
            </label>
            <div className="flex gap-2">
              {/* Country badge */}
              <div className="flex shrink-0 items-center gap-1.5 rounded-2xl border border-border bg-background/60 px-3 py-3 text-sm font-medium select-none">
                <span className="text-base leading-none">🇮🇳</span>
                <span className="text-muted-foreground">+91</span>
              </div>
              {/* Number input — no +91 prefix in state, cleaner */}
              <input
                className={`${inputCls} flex-1`}
                value={values.phone}
                onChange={(e) => update("phone", formatPhone(e.target.value))}
                placeholder="99999 99999"
                inputMode="tel"
                maxLength={15}
              />
            </div>
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

      {/* Recipient modal — rendered via portal so it's always on top of everything */}
      {showRecipientModal &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          >
            <div
              ref={modalRef}
              className="w-full max-w-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(15,15,25,0.97) 0%, rgba(10,10,20,0.99) 100%)",
              }}
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-1">
                    Send via WhatsApp
                  </p>
                  <h3 className="font-display text-xl font-bold text-white leading-tight">
                    Choose a team member
                  </h3>
                  <p className="mt-1 text-sm text-white/50">
                    Your message goes directly to their WhatsApp
                  </p>
                </div>
                <button
                  onClick={() => setShowRecipientModal(false)}
                  className="mt-0.5 rounded-full p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-white/8" />

              {/* Recipient cards */}
              <div className="flex flex-col gap-3 p-5">
                {recipients.map((r) => {
                  const isChosen = sent === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => sendToRecipient(r)}
                      disabled={sent !== null}
                      className={[
                        "group relative flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-200",
                        isChosen
                          ? "bg-brand-blue/20 border border-brand-blue/60 scale-[0.98]"
                          : "border border-white/8 bg-white/5 hover:bg-white/10 hover:border-brand-blue/40 hover:scale-[1.01] active:scale-[0.99]",
                      ].join(" ")}
                    >
                      {/* Avatar */}
                      <div
                        className={[
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                          isChosen
                            ? "bg-brand-blue text-white"
                            : "bg-brand-blue/15 text-brand-blue group-hover:bg-brand-blue group-hover:text-white",
                        ].join(" ")}
                      >
                        {r.initials}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-semibold text-white text-base leading-tight">
                          {r.name}
                        </p>
                        <p className="mt-0.5 text-sm text-white/50 font-mono tracking-wide">
                          {r.phone}
                        </p>
                      </div>

                      {/* Arrow / WA icon */}
                      <div
                        className={[
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                          isChosen
                            ? "bg-brand-blue text-white"
                            : "bg-white/5 text-white/30 group-hover:bg-brand-blue/20 group-hover:text-brand-blue",
                        ].join(" ")}
                      >
                        {isChosen ? (
                          <MessageCircle className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer note */}
              <p className="text-center text-xs text-white/30 pb-5">
                Opens WhatsApp — your details are pre-filled
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
