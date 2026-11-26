"use client";

import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const elsewhereLinks = [
  {
    label: "GitHub ↗",
    href: "https://github.com/nlxx14",
    external: true,
  },
  {
    label: "LinkedIn ↗",
    href: "https://linkedin.com/in/noly-sereno-1b1b3b337/",
    external: true,
  },
  {
    label: "Direct Email ↗",
    href: "mailto:nolysereno75@gmail.com",
    external: false,
  },
  {
    label: "Resume / CV ↗",
    href: "/noly-sereno-cv.pdf",
    external: true,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#09090b] pt-20 pb-10 transition-colors duration-300 light:border-zinc-950/10 light:bg-[#f8f8fa]">
      {/* Atmospheric misty mountain backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/footer-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="block object-cover object-bottom opacity-65 light:hidden"
        />
        <Image
          src="/footer-bg-light.webp"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover object-bottom opacity-90 light:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-[#09090b]/45 to-[#09090b]/85 light:from-[#f8f8fa] light:via-[#f8f8fa]/20 light:to-[#f8f8fa]/75" />
      </div>

      <div className="container-custom relative z-10">
        {/* Top grid: Brand + Editorial Statement on left, Navigation columns on right */}
        <div className="flex flex-col justify-between gap-14 md:flex-row md:items-start">
          {/* Left column */}
          <div className="max-w-md">
            <Link
              href="#home"
              className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-zinc-200 transition-colors hover:text-white light:text-zinc-800 light:hover:text-zinc-950"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40 light:border-zinc-950/35">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-200 light:bg-zinc-900" />
              </span>
              XENO©
            </Link>

            <h2 className="mt-7 font-serif text-4xl leading-[1.04] tracking-tight text-white sm:text-5xl md:text-[3.25rem] light:text-zinc-950">
              Go beyond
              <br />
              the last scroll.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-400 light:text-zinc-600">
              A little space for what comes next. Available for internships,
              freelance builds, and full-stack collaborations.
            </p>
          </div>

          {/* Right columns: Explore & Elsewhere */}
          <div className="grid grid-cols-2 gap-12 sm:gap-20 md:pt-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Explore
              </p>
              <ul className="mt-5 space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white light:text-zinc-600 light:hover:text-zinc-950"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Elsewhere
              </p>
              <ul className="mt-5 space-y-2.5">
                {elsewhereLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="text-sm text-zinc-400 transition-colors hover:text-white light:text-zinc-600 light:hover:text-zinc-950"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom hairline divider + copyright + Back to Top */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.1] pt-7 sm:flex-row sm:items-center light:border-zinc-950/10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400 light:text-zinc-600">
            © 2026 Noly Sereño — All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-200 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 hover:text-white light:border-zinc-950/15 light:bg-white/75 light:text-zinc-800 light:hover:border-zinc-950/40 light:hover:bg-white light:hover:text-zinc-950"
          >
            Back to top
            <ArrowUp
              size={13}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
