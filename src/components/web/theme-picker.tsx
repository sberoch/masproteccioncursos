"use client";

import { useCallback, useEffect, useState } from "react";

const THEME_IDS: string[] = [
  "petrol",
  "ochre",
  "terracotta",
  "coral",
  "dusty-rose",
  "forest-green",
  "denim",
  "teal",
  "coral-pastel",
  "lavender-dream",
  "mint-fresh",
  "peachy-soft",
  "sky-blue",
];

const THEME_NAMES: { [id: string]: string } = {
  petrol: "Petrol",
  ochre: "Ochre",
  terracotta: "Terracotta",
  coral: "Coral",
  "dusty-rose": "Dusty Rose",
  "forest-green": "Forest Green",
  denim: "Denim",
  teal: "Teal",
  "coral-pastel": "Coral Pastel",
  "lavender-dream": "Lavender Dream",
  "mint-fresh": "Mint Fresh",
  "peachy-soft": "Peachy Soft",
  "sky-blue": "Sky Blue",
};

const STORAGE_KEY = "theme";
const DEFAULT_THEME = "petrol";

export function ThemePicker() {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored =
      (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY)) ||
      null;
    const current =
      (typeof document !== "undefined" &&
        document.documentElement.getAttribute("data-theme")) ||
      stored ||
      DEFAULT_THEME;
    setTheme(current);
  }, []);

  const applyTheme = useCallback((next: string) => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    setTheme(next);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-100 flex gap-2 rounded-lg border border-border bg-card p-2 shadow-lg"
      role="group"
      aria-label="Elegir tema"
    >
      {THEME_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => applyTheme(id)}
          className="h-8 w-8 rounded border-2 transition-[transform,border-color] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          style={{
            backgroundColor: `var(--swatch-${id})`,
            borderColor: theme === id ? "var(--foreground)" : "transparent",
          }}
          aria-label={THEME_NAMES[id] ?? `Tema ${id}`}
          title={THEME_NAMES[id]}
          aria-pressed={theme === id}
        />
      ))}
    </div>
  );
}
