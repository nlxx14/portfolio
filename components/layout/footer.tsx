import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="container-custom flex flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="text-sm text-zinc-500">
        © 2026 Noly Sereño. All rights reserved.
        </p>

        
        <div className="flex items-center gap-6">
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

      </div>
    </footer>
  );
}
