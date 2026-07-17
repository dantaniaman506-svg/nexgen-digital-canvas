import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "nexgen-theme";

export function ThemeToggle() {
  // Default is dark — read from DOM (index.html already applied it)
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true,
  );

  useEffect(() => {
    // index.html already applied dark before first paint.
    // Just sync React state with the DOM — never override it from localStorage.
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-105"
      style={{
        backdropFilter: "blur(20px) saturate(160%)",
        backgroundColor: dark ? "rgba(0,0,0,0.40)" : "rgba(255,255,255,0.55)",
        border: dark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: dark
          ? "0 4px 20px rgba(0,0,0,0.40)"
          : "0 4px 20px rgba(0,0,0,0.10)",
      }}
    >
      {dark ? (
        <Sun className="h-5 w-5 text-brand-cyan" />
      ) : (
        <Moon className="h-5 w-5 text-brand-blue" />
      )}
    </button>
  );
}
