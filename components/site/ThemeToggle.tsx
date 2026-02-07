"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20.5 14.7A7.5 7.5 0 0 1 9.3 3.5a6.2 6.2 0 1 0 11.2 11.2Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const onToggle = useCallback(() => {
    // resolvedTheme 只用在點擊行為判斷，不用來決定 render 的 SVG
    const current = (theme === "system" ? resolvedTheme : theme) ?? "light";
    setTheme(current === "dark" ? "light" : "dark");
  }, [theme, resolvedTheme, setTheme]);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white/60 backdrop-blur hover:bg-white/80 dark:border-white/15 dark:bg-black/40 dark:hover:bg-black/55"
    >
      {/* 固定輸出兩個 icon，靠 CSS 決定顯示，避免 hydration mismatch */}
      <SunIcon className="h-5 w-5 block dark:hidden" />
      <MoonIcon className="h-5 w-5 hidden dark:block" />
    </button>
  );
}
