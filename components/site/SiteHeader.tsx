"use client";

import ThemeToggle from "./ThemeToggle";

type HeaderVariant = "transparent" | "solid";

type Props = {
  variant?: HeaderVariant;
};

export default function SiteHeader({ variant = "transparent" }: Props) {
  const isTransparent = variant === "transparent";

  const textShadowClass = isTransparent
    ? "drop-shadow-[0_1px_8px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]"
    : "";

  return (
    <header
      className={[
        "pointer-events-auto fixed left-0 right-0 top-0 z-50 px-6 py-5 md:px-10",
        "transition-colors duration-300",
        isTransparent
          ? "bg-transparent"
          : "backdrop-blur bg-white/70 dark:bg-black/40 border-b border-black/10 dark:border-white/10",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div
          className={[
            "text-sm tracking-wide transition-colors",
            "text-slate-900 dark:text-white",
            textShadowClass,
          ].join(" ")}
        >
          Home
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {[
              ["#work", "Work"],
              ["#about", "About"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={[
                  "transition-colors",
                  "text-slate-800 hover:text-slate-950 dark:text-white/80 dark:hover:text-white",
                  textShadowClass,
                ].join(" ")}
              >
                {label}
              </a>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
