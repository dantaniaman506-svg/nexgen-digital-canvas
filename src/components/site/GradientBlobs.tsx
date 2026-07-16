export function GradientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="animate-blob absolute h-[500px] w-[500px] rounded-full blur-[110px]"
        style={{
          top: "-10%",
          left: "-8%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-magenta) 45%, transparent), transparent 70%)",
        }}
      />
      <div
        className="animate-blob absolute h-[450px] w-[450px] rounded-full blur-[110px]"
        style={{
          top: "20%",
          right: "-10%",
          animationDelay: "6s",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-blue) 45%, transparent), transparent 70%)",
        }}
      />
      <div
        className="animate-blob absolute h-[400px] w-[400px] rounded-full blur-[110px]"
        style={{
          bottom: "-10%",
          left: "20%",
          animationDelay: "12s",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--brand-cyan) 40%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
