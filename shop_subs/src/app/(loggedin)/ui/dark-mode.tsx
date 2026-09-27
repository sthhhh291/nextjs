"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const themeChangeEvent = "theme-change";

function subscribeToTheme(onChange: () => void) {
  window.addEventListener(themeChangeEvent, onChange);
  return () => window.removeEventListener(themeChangeEvent, onChange);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return false;
}

export default function DarkModeComponent() {
  const isDarkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const shouldUseDarkMode = savedTheme === "dark";
    document.documentElement.classList.toggle("dark", shouldUseDarkMode);
    window.dispatchEvent(new Event(themeChangeEvent));
  }, []);

  function toggleDarkMode() {
    const nextIsDarkMode = !getThemeSnapshot();
    document.documentElement.classList.toggle("dark", nextIsDarkMode);
    window.localStorage.setItem("theme", nextIsDarkMode ? "dark" : "light");
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className='shrink-0'>
      {isDarkMode ?
        <Sun aria-hidden='true' size={18} />
      : <Moon aria-hidden='true' size={18} />}
    </Button>
  );
}
