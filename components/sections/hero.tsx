"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IdCard from "@/components/ui/id-card";

const HEADLINE_LINES = [
  "Building digital",
  "experiences with",
  "purpose & precision.",
] as const;

const DARK_GLOW_STOPS: [number, number, number][] = [
  [167, 139, 250], // #a78bfa
  [56, 189, 248],  // #38bdf8
  [52, 211, 153],  // #34d399
];

const LIGHT_GLOW_STOPS: [number, number, number][] = [
  [124, 58, 237], // #7c3aed
  [2, 132, 199],  // #0284c7
  [5, 150, 105],  // #059669
];

function lerpGlowColor(t: number, isLight: boolean): [number, number, number] {
  const stops = isLight ? LIGHT_GLOW_STOPS : DARK_GLOW_STOPS;
  const scaled = Math.min(1, Math.max(0, t)) * (stops.length - 1);
  const idx = Math.min(stops.length - 2, Math.floor(scaled));
  const f = scaled - idx;
  const a = stops[idx];
  const b = stops[idx + 1];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

function SpotlightHeadline() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const restCenters = useRef<
    {
      el: HTMLSpanElement;
      x: number;
      y: number;
      lineIdx: number;
      t: number;
    }[]
  >([]);
  const isLightRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const measureRestPositions = () => {
    const container = containerRef.current;
    if (!container) return;
    const chars = Array.from(
      container.querySelectorAll<HTMLSpanElement>("[data-char]")
    );
    restCenters.current = chars.map((el) => {
      const prevTransform = el.style.transform;
      el.style.transform = "none";
      const rect = el.getBoundingClientRect();
      el.style.transform = prevTransform;
      return {
        el,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        lineIdx: Number(el.dataset.line ?? 0),
        t: Number(el.dataset.t ?? 0),
      };
    });
  };

  useEffect(() => {
    const syncTheme = () => {
      isLightRef.current = document.documentElement.classList.contains("light");
    };
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleLayoutChange = () => {
      const container = containerRef.current;
      if (!container) return;
      const chars = Array.from(
        container.querySelectorAll<HTMLSpanElement>("[data-char]")
      );
      restCenters.current = chars.map((el) => {
        const prevTransform = el.style.transform;
        el.style.transform = "none";
        const rect = el.getBoundingClientRect();
        el.style.transform = prevTransform;
        return {
          el,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          lineIdx: Number(el.dataset.line ?? 0),
          t: Number(el.dataset.t ?? 0),
        };
      });
    };

    handleLayoutChange();
    window.addEventListener("resize", handleLayoutChange);
    window.addEventListener("scroll", handleLayoutChange, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("scroll", handleLayoutChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const updateChars = (clientX: number, clientY: number) => {
    const RADIUS = 135;
    const centers = restCenters.current;
    const isLight = isLightRef.current;

    for (let i = 0; i < centers.length; i++) {
      const meta = centers[i];
      const { el } = meta;

      const dx = meta.x - clientX;
      const dy = meta.y - clientY;
      const dist = Math.hypot(dx, dy);

      if (dist >= RADIUS) {
        el.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
        el.style.color = "";
        el.style.textShadow = "";
        continue;
      }

      const raw = 1 - dist / RADIUS;
      const p = raw * raw * (3 - 2 * raw);

      const pushX = (dx / (dist + 12)) * p * 5;
      const pushY = -p * 10 + (dy / (dist + 12)) * p * 3;
      const scale = 1 + p * 0.14;
      el.style.transform = `translate3d(${pushX.toFixed(1)}px, ${pushY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;

      const baseRgb: readonly [number, number, number] = isLight
        ? meta.lineIdx === 2
          ? [82, 82, 91]
          : [9, 9, 11]
        : meta.lineIdx === 2
          ? [180, 180, 190]
          : [250, 250, 250];
      const [br, bg, bb] = baseRgb;
      const [gr, gg, gb] = lerpGlowColor(meta.t, isLight);
      const r = Math.round(br + (gr - br) * p);
      const g = Math.round(bg + (gg - bg) * p);
      const b = Math.round(bb + (gb - bb) * p);
      el.style.color = `rgb(${r}, ${g}, ${b})`;
      el.style.textShadow = isLight
        ? `0 0 ${Math.round(p * 18)}px rgba(${gr}, ${gg}, ${gb}, ${(p * 0.25).toFixed(2)})`
        : `0 0 ${Math.round(p * 24)}px rgba(${gr}, ${gg}, ${gb}, ${(p * 0.45).toFixed(2)})`;
    }
  };

  const resetChars = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const container = containerRef.current;
    if (!container) return;
    const chars = container.querySelectorAll<HTMLSpanElement>("[data-char]");
    chars.forEach((el) => {
      el.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
      el.style.color = "";
      el.style.textShadow = "";
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLHeadingElement>) => {
    const cx = e.clientX;
    const cy = e.clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateChars(cx, cy));
  };

  let charCursor = 0;

  return (
    <h1
      ref={containerRef}
      onPointerEnter={(e) => {
        measureRestPositions();
        handlePointerMove(e);
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetChars}
      className="cursor-default select-none text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
    >
      {HEADLINE_LINES.map((lineText, lineIdx) => {
        const words = lineText.split(" ");
        const totalChars = lineText.length;
        let lineCharPos = 0;

        return (
          <span
            key={lineText}
            className={`block ${
              lineIdx === 2
                ? "font-serif font-medium italic tracking-normal text-[#b4b4be] light:text-zinc-600"
                : "text-[#fafafa] light:text-zinc-950"
            }`}
          >
            {words.map((word, wordIdx) => {
              const wordEl = (
                <span key={wordIdx} className="inline-block whitespace-nowrap">
                  {Array.from(word).map((ch) => {
                    const idx = charCursor++;
                    const t = totalChars > 1 ? lineCharPos / (totalChars - 1) : 0;
                    lineCharPos++;
                    return (
                      <span
                        key={idx}
                        data-char=""
                        data-line={lineIdx}
                        data-t={t.toFixed(3)}
                        className="inline-block will-change-transform transition-[transform,color,text-shadow] duration-200 ease-out"
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
              );
              lineCharPos++; // account for space
              return (
                <span key={wordIdx}>
                  {wordEl}
                  {wordIdx < words.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Architectural chiaroscuro light-shaft & tile backdrop */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.7, scale: 1.03 }}
        animate={{ opacity: [0.75, 0.92, 0.75], scale: [1.03, 1.0, 1.03] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="block object-cover object-center light:hidden"
        />
        <Image
          src="/hero-bg-light.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center light:block"
        />
      </motion.div>

      {/* Seamless blend into background at the bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#09090b] to-transparent light:from-[#f8f8fa]" />

      {/* Subtle studio coordinate tag (top-left below navbar, clear of lanyard) */}
      <div className="container-custom pointer-events-none absolute inset-x-0 top-24 hidden justify-start lg:flex">
        <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 light:text-zinc-500">
          6.7498° N, 125.3572° E • UTC+8
        </span>
      </div>

      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[120px] light:bg-zinc-900/[0.03]" />
      <div className="pointer-events-none absolute right-[10%] top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-zinc-300/[0.05] blur-[140px] light:bg-zinc-900/[0.04]" />

      {/* Stage clipped cleanly at the navbar bottom edge (pt-20 on section) so the strap hangs below "Projects" without bleeding behind the navbar */}
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="relative w-full overflow-hidden"
      >
        <div className="container-custom py-20 lg:py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 light:border-emerald-600/25 light:bg-emerald-500/10 light:text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 light:bg-emerald-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 light:bg-emerald-600" />
              </span>
              Open to Internships &amp; Projects
            </div>

            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-zinc-400 light:bg-zinc-500" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 light:text-zinc-600">
                FULL-STACK DEVELOPER
              </span>
            </div>

            <SpotlightHeadline />

            <p className="mt-8 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg light:text-zinc-600">
              Hi, I&apos;m{" "}
              <span className="font-medium text-white light:text-zinc-950">
                Noly Sereño
              </span>
              . I build modern, responsive, and scalable web applications using
              modern frontend and backend technologies.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#projects"
                className="group flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 light:bg-zinc-950 light:text-white light:hover:bg-zinc-800"
              >
                Explore my work
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="#contact"
                className="rounded-lg border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white light:border-zinc-300 light:text-zinc-700 light:hover:border-zinc-500 light:hover:text-zinc-950"
              >
                Get in touch
              </Link>

              <a
                href="/CV N.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.05] px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/40 hover:bg-white/[0.1] hover:text-white light:border-zinc-950/15 light:bg-zinc-950/[0.04] light:text-zinc-800 light:hover:border-zinc-950/35 light:hover:bg-zinc-950/[0.08] light:hover:text-zinc-950"
              >
                <FileText size={16} />
                Resume / CV
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <Link
                href="https://github.com/nlxx14"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-white light:text-zinc-500 light:hover:text-zinc-950"
              >
                GitHub ↗
              </Link>

              <Link
                href="https://linkedin.com/in/noly-sereno-1b1b3b337/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-white light:text-zinc-500 light:hover:text-zinc-950"
              >
                LinkedIn ↗
              </Link>
            </div>
            </motion.div>

            {/* Right: hanging ID badge aligned directly below the navbar "Projects" link */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex justify-center pt-12 lg:justify-end lg:pr-16 lg:pt-16 xl:pr-28 2xl:pr-32"
            >
              <IdCard constraintsRef={sectionRef} />
            </motion.div>
          </div>
        </div>
      </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-zinc-600 md:flex light:text-zinc-500">
          <ArrowDown size={14} />
          Scroll to explore
        </div>
    </section>
  );
}