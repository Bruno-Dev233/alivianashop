import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "aurelis-admin-theme";

export type AdminTheme = "light" | "dark";

function apply(theme: AdminTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/** Modo claro/escuro do painel de gestão (persistido no navegador). */
export function useAdminTheme() {
  const [theme, setTheme] = useState<AdminTheme>("light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AdminTheme | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    apply(initial);
    return () => document.documentElement.classList.remove("dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: AdminTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      apply(next);
      return next;
    });
  }, []);

  return { theme, toggle };
}
