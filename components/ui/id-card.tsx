"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";

const techStack = [
  "NEXT.JS",
  "REACT",
  "VUE.JS",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "NODE.JS",
  "EXPRESS.JS",
  "LARAVEL",
  "MONGODB",
  "MYSQL",
  "PYTHON",
  "GIT",
  "VERCEL",
];

const strapText = "FULL-STACK DEVELOPER  •  ".repeat(40);

const barcode = [
  2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1,
];

// Resting length of the strap above the metal crimp
const STRAP_LENGTH = 260;
// Distance (rem) from the top of the card up to the metal crimp
const CRIMP_REM = 4.125;

type Controls = ReturnType<typeof animate>;

const strapBase =
  "pointer-events-none absolute left-1/2 -ml-4 w-8 overflow-hidden bg-[#18181b] shadow-[3px_0_8px_rgba(0,0,0,0.5),-3px_0_8px_rgba(0,0,0,0.5)]";

/** Woven fabric look: weave, round shading, stitching and printed text */
function StrapDecor() {
  return (
    <>
      <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_3px)]" />
      <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(0,0,0,0.6),rgba(255,255,255,0.1)_28%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.06)_72%,rgba(0,0,0,0.6))]" />
      <div className="absolute inset-y-0 left-[0.3rem] border-l border-dashed border-white/25" />
      <div className="absolute inset-y-0 right-[0.3rem] border-r border-dashed border-white/25" />
      <div className="absolute inset-0 overflow-hidden">
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rotate-180 whitespace-pre font-mono text-[0.55rem] font-bold tracking-[0.25em] text-white/55 [writing-mode:vertical-rl]">
          {strapText}
        </span>
      </div>
    </>
  );
}

/** Metal crimp, swivel and hook that clip the card to the strap */
function Hardware() {
  return (
    <svg
      viewBox="0 0 60 88"
      className="pointer-events-none absolute -top-[4.625rem] left-1/2 z-20 h-[5.5rem] w-[3.75rem] -translate-x-1/2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]"
    >
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#71717a" />
          <stop offset="0.3" stopColor="#f4f4f5" />
          <stop offset="0.55" stopColor="#a1a1aa" />
          <stop offset="1" stopColor="#52525b" />
        </linearGradient>
      </defs>

      <rect
        x="13"
        y="0"
        width="34"
        height="16"
        rx="3"
        fill="url(#metal)"
        stroke="#3f3f46"
        strokeWidth="0.8"
      />
      <rect x="16" y="3" width="28" height="2" rx="1" fill="#fff" opacity="0.5" />

      <ellipse
        cx="30"
        cy="25"
        rx="6"
        ry="9"
        fill="none"
        stroke="url(#metal)"
        strokeWidth="3"
      />

      <rect
        x="25"
        y="32"
        width="10"
        height="9"
        rx="2"
        fill="url(#metal)"
        stroke="#3f3f46"
        strokeWidth="0.6"
      />

      <path
        d="M20 38 V76 a10 10 0 0 0 20 0 V38"
        fill="none"
        stroke="url(#metal)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function IdCard({
  constraintsRef,
}: {
  constraintsRef: RefObject<HTMLElement | null>;
}) {
  const [imgError, setImgError] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const angle = useTransform([x, y], ([dx, dy]: number[]) => {
    return (-Math.atan2(dx, STRAP_LENGTH + dy) * 180) / Math.PI;
  });
  const strapHeight = useTransform([x, y], ([dx, dy]: number[]) => {
    return Math.hypot(dx, STRAP_LENGTH + dy);
  });
  const sheenX = useTransform(angle, [-15, 15], ["-12%", "12%"]);

  const idle = useRef<Controls | null>(null);
  const springs = useRef<Controls[]>([]);

  const startIdle = () => {
    idle.current?.stop();
    idle.current = animate(x, [0, 12, 0, -12, 0], {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    });
  };

  useEffect(() => {
    startIdle();
    return () => {
      idle.current?.stop();
      springs.current.forEach((s) => s.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-64 sm:w-72">
      {/* Desktop strap: runs from the top of the section to the crimp and stretches */}
      <motion.div
        style={{
          top: `calc(-${STRAP_LENGTH}px - ${CRIMP_REM}rem)`,
          height: strapHeight,
          rotate: angle,
          transformOrigin: "top center",
        }}
        className={`${strapBase} hidden lg:block`}
      >
        <StrapDecor />
      </motion.div>

      {/* The card: drag it inside the section */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        dragMomentum={false}
        onDragStart={() => {
          setHasDragged(true);
          idle.current?.stop();
          springs.current.forEach((s) => s.stop());
        }}
        onDragEnd={() => {
          const spring = {
            type: "spring",
            stiffness: 70,
            damping: 6,
          } as const;
          springs.current = [
            animate(y, 0, spring),
            animate(x, 0, { ...spring, onComplete: startIdle }),
          ];
        }}
        style={{
          x,
          y,
          rotate: angle,
          transformOrigin: `50% -${CRIMP_REM}rem`,
        }}
        className="relative cursor-grab select-none active:cursor-grabbing"
      >
        {/* Short strap for phones/tablets */}
        <div
          className={`${strapBase} bottom-[calc(100%+4.125rem)] h-16 lg:hidden`}
        >
          <StrapDecor />
        </div>

        <Hardware />

        {/* Clear plastic badge holder */}
        <div className="relative rounded-[1.1rem] border border-white/25 bg-gradient-to-br from-white/[0.18] via-white/[0.06] to-white/[0.12] px-2.5 pb-2.5 pt-7 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.85),0_0_60px_rgba(255,255,255,0.08)] light:border-zinc-950/15 light:from-zinc-950/[0.06] light:via-zinc-950/[0.02] light:to-zinc-950/[0.05] light:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.28)]">
          {/* Slot in the holder */}
          <div className="absolute left-1/2 top-2 h-3 w-[3.25rem] -translate-x-1/2 rounded-full bg-[#050507] shadow-[inset_0_2px_3px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.25)]" />

          {/* ID card */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#1a1a1f] to-[#0b0b0e] p-4">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.14),transparent_55%)]" />

            <p className="relative font-mono text-[0.65rem] tracking-[0.3em] text-zinc-400">
              FULL-STACK
            </p>
            <h3 className="relative bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-3xl font-black uppercase leading-none tracking-tight text-transparent">
              Developer
            </h3>

            {/* Photo */}
            <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-white/15">
              {imgError ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-6xl font-bold text-transparent">
                  NS
                </div>
              ) : (
                <Image
                  src="/choyy.jpg"
                  alt="Noly Sereño"
                  fill
                  draggable={false}
                  sizes="(min-width: 640px) 18rem, 16rem"
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                />
              )}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.35)]" />

              {/* Metallic chrome hologram sticker */}
              <div className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-[conic-gradient(from_0deg,#ffffff,#71717a,#e4e4e7,#3f3f46,#ffffff)] opacity-85 ring-1 ring-white/40" />
            </div>

            {/* Name row */}
            <div className="relative mt-4 flex items-end justify-between">
              <div>
                <p className="font-semibold text-white">Noly Sereño</p>
                <p className="font-mono text-xs text-zinc-500">
                  NS-2026-0142
                </p>
              </div>
              <p className="font-mono text-xs tracking-widest text-zinc-400">
                PORTFOLIO
              </p>
            </div>

            {/* Barcode */}
            <div className="relative mt-3 flex h-6 items-stretch gap-[2px] opacity-80">
              {barcode.map((w, i) => (
                <span
                  key={i}
                  className="bg-zinc-200"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>

            {/* Scrolling tech-stack banner */}
            <div className="relative mt-3 overflow-hidden border-t border-zinc-800 pt-3">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="flex w-max whitespace-nowrap font-mono text-[0.65rem] tracking-widest text-zinc-400"
              >
                {[...techStack, ...techStack].map((tech, i) => (
                  <span key={i} className="pr-6">
                    {tech} •
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Glossy plastic shine */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <motion.div
              style={{ x: sheenX }}
              className="absolute inset-y-0 -left-1/2 w-[200%] [background:linear-gradient(105deg,transparent_38%,rgba(255,255,255,0.14)_48%,rgba(255,255,255,0.04)_54%,transparent_62%)]"
            />
          </div>
        </div>
      </motion.div>

      {/* Subtle interactive drag cue */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: hasDragged ? 0 : 0.75 }}
        transition={{ duration: 0.4, delay: hasDragged ? 0 : 1.2 }}
        className="pointer-events-none mt-4 text-center font-mono text-[11px] tracking-widest text-zinc-400 light:text-zinc-500"
      >
        ✦ DRAG ID CARD ✦
      </motion.p>
    </div>
  );
}
