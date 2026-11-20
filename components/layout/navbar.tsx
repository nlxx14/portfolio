
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
      <nav className="container-custom flex h-20 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-[#a78bfa]">{"<"}</span>
          Xeno
          <span className="text-[#a78bfa]">{"/>"}</span>
        </Link>

        <div className="flex items-center gap-7">
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
            Let's talk
          </Link>
        </div>
      </nav>
    </header>
  );
}
