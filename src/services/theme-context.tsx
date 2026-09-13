"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

// External store for theme — avoids the need for setState inside an effect
let currentTheme: Theme = "dark";
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setThemeValue(next: Theme) {
  currentTheme = next;
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }
  listeners.forEach((cb) => cb());
}

// Initialise from localStorage once on module load (client only)
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("theme") as Theme | null;
  currentTheme = stored || "dark";
  document.documentElement.classList.toggle("dark", currentTheme === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    setThemeValue(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
