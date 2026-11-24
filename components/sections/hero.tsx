"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Edit this list to change the tech stack scrolling on the ID card
const techStack = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "NODE.JS",
  "MONGODB",
  "MYSQL",
  "FRAMER MOTION",
  "PYTHON",
  "GIT",
];

// Text printed along the lanyard
const strapText = "FULL-STACK DEVELOPER  •  ".repeat(40);

// Barcode bar widths (px)
const barcode = [2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1];

// Resting length of the strap in px (desktop). Longer = gentler swing.
const STRAP_LENGTH = 800;
// Distance (rem) from the top of the card up to the metal crimp
const CRIMP_REM = 4.125;

type Controls = ReturnType<typeof animate>;

const strapBase =
  "pointer-events-none absolute left-1/2 -ml-4 w-8 overflow-hidden bg-[#16112e] shadow-[3px_0_8px_rgba(0,0,0,0.5),-3px_0_8px_rgba(0,0,0,0.5)]";

/** Woven fabric look: weave, round shading, stitching and printed text */
function StrapDecor() {
  return (
    <>
      {/* weave */}
      <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_3px)]" />
      {/* rounded shading */}
      <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(0,0,0,0.6),rgba(255,255,255,0.1)_28%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.06)_72%,rgba(0,0,0,0.6))]" />
      {/* stitching */}
      <div className="absolute inset-y-0 left-[0.3rem] border-l border-dashed border-white/25" />
      <div className="absolute inset-y-0 right-[0.3rem] border-r border-dashed border-white/25" />
      {/* printed text */}
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

      {/* crimp that holds the strap */}
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

      {/* ring */}
      <ellipse
        cx="30"
        cy="25"
        rx="6"
        ry="9"
        fill="none"
        stroke="url(#metal)"
        strokeWidth="3"
      />

      {/* swivel barrel */}
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

      {/* hook that goes through the badge slot */}
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

function IdCard({
  constraintsRef,
}: {
  constraintsRef: RefObject<HTMLElement | null>;
}) {
  const [imgError, setImgError] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  // How far the card has been pulled from its resting spot
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // The strap and the card both tilt toward where the card is pulled
  const angle = useTransform([x, y], ([dx, dy]: number[]) => {
    return (-Math.atan2(dx, STRAP_LENGTH + dy) * 180) / Math.PI;
  });
  // The strap gets longer/shorter as the card is pulled
  const strapHeight = useTransform([x, y], ([dx, dy]: number[]) => {
    return Math.hypot(dx, STRAP_LENGTH + dy);
  });
  // The plastic shine slides as the card tilts
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
      {/* Desktop strap: runs from the top of the page to the crimp and stretches */}
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

      {/* The card: drag it anywhere inside the landing section */}
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
        <div className="relative rounded-[1.1rem] border border-white/25 bg-gradient-to-br from-white/[0.18] via-white/[0.06] to-white/[0.12] px-2.5 pb-2.5 pt-7 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.85),0_0_60px_rgba(139,92,246,0.2)]">
          {/* Slot in the holder */}
          <div className="absolute left-1/2 top-2 h-3 w-[3.25rem] -translate-x-1/2 rounded-full bg-[#050507] shadow-[inset_0_2px_3px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.25)]" />

          {/* ID card */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#1b1630] to-[#0d0b16] p-4">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(167,139,250,0.22),transparent_55%)]" />

            <p className="relative font-mono text-[0.65rem] tracking-[0.3em] text-[#a78bfa]">
              FULL-STACK
            </p>
            <h3 className="text-gradient relative text-3xl font-black uppercase leading-none tracking-tight">
              Developer
            </h3>

            {/* Photo */}
            <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-lg bg-zinc-900 ring-1 ring-white/15">
              {imgError ? (
                <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-gradient">
                  NS
                </div>
              ) : (
                <Image
                  src="/choyy.jpg"
                  alt="Noly Sereño"
                  fill
                  priority
                  draggable={false}
                  sizes="(min-width: 640px) 18rem, 16rem"
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                />
              )}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.35)]" />

              {/* Hologram sticker */}
              <div className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-[conic-gradient(from_0deg,#a78bfa,#38bdf8,#f0abfc,#fde68a,#a78bfa)] opacity-85 ring-1 ring-white/40" />
            </div>

            {/* Name row */}
            <div className="relative mt-4 flex items-end justify-between">
              <div>
                <p className="font-semibold text-white">Noly Sereño</p>
                <p className="font-mono text-xs text-zinc-500">
                  NS-2026-0142
                </p>
              </div>
              <p className="font-mono text-xs tracking-widest text-[#a78bfa]">
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
                className="flex w-max whitespace-nowrap font-mono text-[0.65rem] tracking-widest text-[#a78bfa]"
              >
                {[...techStack, ...techStack].map((tech, i) => (
                  <span key={i} className="pr-6">
                    {tech} •
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Glossy plastic shine that moves as the card tilts */}
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
        className="pointer-events-none mt-4 text-center font-mono text-[11px] tracking-widest text-zinc-400"
      >
        ✦ DRAG ID CARD ✦
      </motion.p>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* Purple background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-600/[0.10] blur-[120px]" />
      <div className="pointer-events-none absolute right-[10%] top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/[0.12] blur-[140px]" />

      <div className="container-custom py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to Internships &amp; Projects
            </div>

            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#a78bfa]" />
              <span className="font-mono text-sm tracking-wider text-[#a78bfa]">
                FULL-STACK DEVELOPER
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
              Building digital
              <br />
              experiences with
              <br />
              <span className="text-gradient">purpose & precision.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              Hi, I&apos;m{" "}
              <span className="font-medium text-white">Noly Sereño</span>. I
              build modern, responsive, and scalable web applications using
              modern frontend and backend technologies.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#projects"
                className="group flex items-center gap-2 rounded-lg bg-[#8b5cf6] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#7c3aed]"
              >
                Explore my work
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="#contact"
                className="rounded-lg border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
              >
                Get in touch
              </Link>

              <a
                href="/CV N.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#a78bfa]/35 bg-[#a78bfa]/10 px-5 py-3 text-sm font-medium text-[#c4b5fd] transition-colors hover:border-[#a78bfa]/60 hover:bg-[#a78bfa]/20 hover:text-white"
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
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-[#a78bfa]"
              >
                GitHub ↗
              </Link>

              <Link
                href="https://linkedin.com/in/noly-sereno-1b1b3b337/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-[#a78bfa]"
              >
                LinkedIn ↗
              </Link>
            </div>
          </motion.div>

          {/* Right: hanging ID badge */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex justify-center lg:justify-end lg:pr-8"
          >
            <IdCard constraintsRef={sectionRef} />
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-zinc-600 md:flex">
          <ArrowDown size={14} />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}