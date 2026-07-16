import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "nexgen-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
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
      className="glass fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-105"
    >
      {dark ? (
        <Sun className="h-5 w-5 text-brand-cyan" />
      ) : (
        <Moon className="h-5 w-5 text-brand-blue" />
      )}
    </button>
  );
}
