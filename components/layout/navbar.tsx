
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
      <nav className="container-custom flex h-20 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-[#a78bfa]">{"<"}</span>
          Xeno
          <span className="text-[#a78bfa]">{"/>"}</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:block"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#contact"
            className="rounded-lg border border-[#a78bfa]/40 px-4 py-2 text-sm text-[#c4b5fd] transition-all hover:bg-[#a78bfa]/10"
          >
            Let&apos;s talk
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-800 p-2 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white sm:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[#09090b]/95 px-6 py-4 backdrop-blur-xl sm:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
