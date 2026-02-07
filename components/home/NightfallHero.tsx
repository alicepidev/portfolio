"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import styles from "./NightfallHero.module.css";

/* ---------------- utilities ---------------- */

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function invLerp(a: number, b: number, v: number) {
  if (a === b) return 0;
  return clamp01((v - a) / (b - a));
}

/* ---------------- component ---------------- */

export default function NightfallHero() {
  const { resolvedTheme } = useTheme();

  // Prevent hydration mismatch with next-themes
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // IMPORTANT:
  // Make SSR + initial client render match by choosing a stable default.
  // After mount, switch to the real resolvedTheme.
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const [darkness, setDarkness] = useState(0.05);
  const targetRef = useRef<number>(0.05);
  const rafRef = useRef<number | null>(null);

  const startEasingLoop = useCallback(() => {
    if (rafRef.current !== null) return;

    const tick = () => {
      setDarkness((current) => {
        const target = targetRef.current;
        const next = current + (target - current) * 0.18;

        if (Math.abs(next - target) < 0.001) {
          rafRef.current = null;
          return target;
        }

        rafRef.current = requestAnimationFrame(tick);
        return next;
      });
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const setTargetDarkness = useCallback(
    (value: number) => {
      targetRef.current = clamp01(value);
      startEasingLoop();
    },
    [startEasingLoop]
  );

  useEffect(() => {
    setTargetDarkness(
      isDark ? Math.max(targetRef.current, 0.25) : Math.min(targetRef.current, 0.12)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      const abs = Math.abs(delta);

      const step = Math.min(0.22, Math.max(0.06, (abs / 120) * 0.14));
      const direction = delta > 0 ? 1 : -1;

      setTargetDarkness(targetRef.current + direction * step);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        setTargetDarkness(targetRef.current + 0.12);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setTargetDarkness(targetRef.current - 0.12);
      }
      if (e.key === "Home") {
        e.preventDefault();
        setTargetDarkness(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        setTargetDarkness(1);
      }
    };

    let lastY: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (lastY === null) return;

      const y = e.touches[0]?.clientY ?? lastY;
      const dy = lastY - y;
      lastY = y;

      const step = Math.min(0.18, Math.max(0.05, (Math.abs(dy) / 220) * 0.12));
      const direction = dy > 0 ? 1 : -1;

      setTargetDarkness(targetRef.current + direction * step);
      e.preventDefault();
    };

    const onTouchEnd = () => {
      lastY = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [setTargetDarkness]);

  const onReset = useCallback(() => {
    setTargetDarkness(0.05);
  }, [setTargetDarkness]);

  const onNight = useCallback(() => {
    setTargetDarkness(1);
  }, [setTargetDarkness]);

  /* ---------------- look controls ---------------- */

  const duskToNight = useMemo(() => invLerp(0.0, 0.9, darkness), [darkness]);

  const blackOverlayOpacity = useMemo(
    () => lerp(0.12, 0.78, invLerp(0.05, 1.0, darkness)),
    [darkness]
  );

  const colorWashOpacity = useMemo(() => lerp(0.35, 0.65, duskToNight), [duskToNight]);

  const rippleOpacity = useMemo(
    () => lerp(0.95, 0.55, invLerp(0.15, 1.0, darkness)),
    [darkness]
  );

  const rippleSaturation = useMemo(() => lerp(1.05, 0.65, duskToNight), [duskToNight]);

  const textGlow = useMemo(() => {
    const t = invLerp(0.25, 1.0, darkness);
    return lerp(0.12, 0.52, t);
  }, [darkness]);

  const textOpacity = useMemo(() => lerp(0.95, 0.9, invLerp(0.0, 1.0, darkness)), [darkness]);

  const starsOpacity = useMemo(() => invLerp(0.35, 0.95, darkness), [darkness]);

  return (
    <main
      className={[
        "relative h-screen w-screen overflow-hidden pt-16",
        isDark ? "bg-black text-white" : "bg-[#f7f7fb] text-slate-900",
      ].join(" ")}
    >
      {/* Sentinel at the bottom of the hero */}
      <div id="hero-sentinel" aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full" />

      <div
        className="absolute inset-0"
        role="button"
        tabIndex={0}
        aria-label="Go to night"
        onClick={onNight}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onNight();
        }}
      >
        <div className={["absolute inset-0", isDark ? styles.duskBaseDark : styles.duskBaseLight].join(" ")} />

        <div
          className={[styles.ripple, "absolute inset-0", isDark ? styles.rippleDark : styles.rippleLight].join(" ")}
          style={{
            opacity: rippleOpacity,
            filter: `blur(10px) saturate(${rippleSaturation})`,
          }}
        />

        <div
          className={[styles.stars, "absolute inset-0 pointer-events-none", isDark ? styles.starsDark : styles.starsLight].join(" ")}
          style={{ opacity: starsOpacity }}
        />

        <div
          className={["absolute inset-0 pointer-events-none", isDark ? styles.colorWashDark : styles.colorWashLight].join(" ")}
          style={{ opacity: colorWashOpacity }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark ? "black" : "#0b1220",
            opacity: blackOverlayOpacity,
          }}
        />

        <div className={["absolute inset-0 pointer-events-none", isDark ? styles.vignetteDark : styles.vignetteLight].join(" ")} />
      </div>

      <section className="relative z-10 flex h-full items-center justify-center px-6">
        <div
          className="text-center"
          style={{
            opacity: textOpacity,
            textShadow: isDark
              ? `0 0 18px rgba(255,255,255,${textGlow}), 0 0 42px rgba(120,170,255,${textGlow * 0.35})`
              : `0 0 18px rgba(255,255,255,${textGlow * 0.35}), 0 0 42px rgba(90,140,255,${textGlow * 0.18})`,
          }}
        >
          <div className={["text-xs uppercase tracking-[0.28em]", isDark ? "text-white/70" : "text-slate-700/80"].join(" ")}>
            Frontend-focused Full Stack Developer
          </div>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">Alice Pi</h1>
          <p className={["mx-auto mt-4 max-w-xl text-sm leading-relaxed md:text-base", isDark ? "text-white/70" : "text-slate-700"].join(" ")}>
            Open to opportunities
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNight();
              }}
              className={[
                "rounded-full border px-5 py-2 text-sm backdrop-blur transition",
                isDark ? "border-white/20 bg-white/5 text-white/90 hover:bg-white/10" : "border-slate-900/10 bg-white/60 text-slate-900 hover:bg-white/80",
              ].join(" ")}
            >
              Night
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className={[
                "rounded-full border px-5 py-2 text-sm transition",
                isDark ? "border-white/10 bg-transparent text-white/70 hover:text-white" : "border-slate-900/10 bg-transparent text-slate-700 hover:text-slate-900",
              ].join(" ")}
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-10 flex justify-center">
        <div className={["rounded-full border px-4 py-2 text-xs backdrop-blur", isDark ? "border-white/10 bg-black/20 text-white/70" : "border-slate-900/10 bg-white/60 text-slate-700"].join(" ")}>
          Scroll to darken, watch dusk become night
        </div>
      </div>
    </main>
  );
}
