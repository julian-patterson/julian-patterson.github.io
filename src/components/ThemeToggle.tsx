"use client";

import { useEffect } from "react";
import { Moon, Sun } from "@carbon/icons-react";

const STORAGE_KEY = "jp-theme";

type Theme = "light" | "dark";

function savedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  useEffect(() => {
    const syncTheme = () => {
      const theme = savedTheme();
      if (theme) {
        applyTheme(theme);
      } else {
        delete document.documentElement.dataset.theme;
      }
    };
    const syncStoredTheme = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) syncTheme();
    };

    syncTheme();
    window.addEventListener("storage", syncStoredTheme);

    return () => {
      window.removeEventListener("storage", syncStoredTheme);
    };
  }, []);

  const toggleTheme = () => {
    const explicitTheme = document.documentElement.dataset.theme;
    const current =
      explicitTheme === "light" || explicitTheme === "dark"
        ? explicitTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    const next = current === "dark" ? "light" : "dark";

    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The theme still changes for this page if storage is unavailable.
    }
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme}>
      <span className="theme-toggle-label theme-when-light">
        Switch to dark mode
      </span>
      <span className="theme-toggle-label theme-when-dark">
        Switch to light mode
      </span>
      <span className="theme-when-light" aria-hidden="true">
        <Moon size={18} />
      </span>
      <span className="theme-when-dark" aria-hidden="true">
        <Sun size={18} />
      </span>
    </button>
  );
}
