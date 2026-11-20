"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bodoni_Moda } from "next/font/google";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
});

type Bits = { id: number; text: string; left: number; top: number };

function randomBinary() {
  const groups = 2 + Math.floor(Math.random() * 2);
  return Array.from({ length: groups }, () =>
    Array.from({ length: 3 + Math.floor(Math.random() * 6) }, () =>
      Math.random() > 0.5 ? "1" : "0"
    ).join("")
  ).join(" ");
}

function generateBits(): Bits[] {
  return Array.from({ length: 9 }, (_, id) => {
    // keep the strings above and below the "LOADING" text
    const above = Math.random() > 0.5;
    return {
      id,
      text: randomBinary(),
      left: 20 + Math.random() * 55,
      top: above ? 30 + Math.random() * 12 : 58 + Math.random() * 12,
    };
  });
}

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [bits, setBits] = useState<Bits[]>([]);

  // Floating binary (generated after mount to avoid hydration mismatch)
  useEffect(() => {
    setBits(generateBits());
    const id = setInterval(() => setBits(generateBits()), 700);
    return () => clearInterval(id);
  }, []);

  // Progress: climbs to 90%, then finishes once the page has fully loaded
  useEffect(() => {
    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const id = setInterval(() => {
      setProgress((p) => {
        const cap = loaded ? 100 : 90;
        if (p >= cap) return p;
        return Math.min(cap, p + Math.random() * 6 + 1);
      });
    }, 120);

    return () => {
      clearInterval(id);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  // Fade out shortly after reaching 100%
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(t);
    }
  }, [progress]);

  // Lock scrolling while the loader is visible
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  const value = Math.floor(progress);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black bg-[radial-gradient(ellipse_at_center,#101010_0%,#000_70%)]"
        >
          {/* Floating binary */}
          {bits.map((b) => (
            <motion.span
              key={`${b.id}-${b.text}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.7 }}
              style={{ left: `${b.left}%`, top: `${b.top}%` }}
              className="absolute font-mono text-[11px] font-bold tracking-wider text-zinc-300"
            >
              {b.text}
            </motion.span>
          ))}

          {/* LOADING */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className={`${display.className} text-6xl uppercase tracking-tight text-white sm:text-7xl md:text-8xl`}
            >
              Loading
            </h1>
          </div>

          {/* Progress bar */}
          <div className="absolute inset-x-6 bottom-6">
            <span
              className="absolute -top-7 font-mono text-xs font-bold text-white"
              style={{ left: `${value}%`, transform: "translateX(-50%)" }}
            >
              {value}%
            </span>

            <div className="h-2 w-full border border-white">
              <div
                className="h-full bg-white transition-[width] duration-150 ease-out"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}