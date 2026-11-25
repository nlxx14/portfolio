"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("light");
}

function getServerThemeSnapshot() {
  return true;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isLight = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const toggleTheme = () => {
    const nextLight = !isLight;
    document.documentElement.classList.toggle("light", nextLight);
    try {
      localStorage.setItem("theme", nextLight ? "light" : "dark");
    } catch {
      // ignore storage restrictions
    }
  };

  // Always return to the landing page (#home at top) when the site is refreshed
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  // Track scroll position for navbar backdrop + auto-hide at About + active section highlight
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));

    const updateActive = () => {
      setScrolled(window.scrollY > 24);

      const aboutEl = document.getElementById("about");
      const reachedAbout = aboutEl
        ? aboutEl.getBoundingClientRect().top <= 80
        : false;
      setHidden(reachedAbout);
      if (reachedAbout) setMobileOpen(false);

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 48
      ) {
        setActiveHref("#contact");
        return;
      }

      const threshold = window.innerHeight * 0.35;
      let current = "#home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          current = `#${id}`;
        }
      }
      setActiveHref(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  const highlightedHref = hoveredHref ?? activeHref;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={hidden ? { y: "-100%", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
          hidden ? "pointer-events-none" : ""
        } ${
          scrolled
            ? "border-white/[0.1] bg-[#09090b]/90 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl light:border-zinc-950/10 light:bg-[#f8f8fa]/90 light:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
            : "border-white/[0.06] bg-[#09090b]/75 backdrop-blur-lg light:border-zinc-950/[0.07] light:bg-[#f8f8fa]/80"
        }`}
      >
        <nav className="container-custom flex h-20 items-center justify-between">
          <Link
            href="#home"
            onClick={() => setActiveHref("#home")}
            className="group inline-flex items-center text-lg font-bold tracking-tight transition-transform duration-200 hover:scale-[1.03]"
          >
            <span className="text-zinc-400 transition-colors group-hover:text-white light:text-zinc-500 light:group-hover:text-zinc-950">
              {"<"}
            </span>
            <span className="text-white light:text-zinc-950">Xeno</span>
            <span className="text-zinc-400 transition-colors group-hover:text-white light:text-zinc-500 light:group-hover:text-zinc-950">
              {"/>"}
            </span>
          </Link>

          <div className="flex items-center gap-2.5 md:gap-3.5">
            <div
              onMouseLeave={() => setHoveredHref(null)}
              className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 md:flex light:border-zinc-950/[0.08] light:bg-zinc-950/[0.03]"
            >
              {navLinks.map((link) => {
                const isHighlighted = highlightedHref === link.href;
                const isActive = activeHref === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredHref(link.href)}
                    onClick={() => setActiveHref(link.href)}
                    className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      isHighlighted
                        ? "text-white light:text-zinc-950"
                        : isActive
                          ? "text-zinc-200 light:text-zinc-800"
                          : "text-zinc-400 hover:text-zinc-200 light:text-zinc-600 light:hover:text-zinc-950"
                    }`}
                  >
                    {isHighlighted && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/[0.09] light:border-zinc-950/10 light:bg-white light:shadow-sm"
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Dark / Light mode toggle */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
              title={isLight ? "Switch to dark mode" : "Switch to light mode"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-zinc-200 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white light:border-zinc-950/15 light:bg-white light:text-zinc-700 light:hover:border-zinc-950/30 light:hover:text-zinc-950"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isLight ? (
                  <motion.span
                    key="moon"
                    initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={16} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    initial={{ rotate: 60, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -60, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#contact"
                className="inline-block rounded-lg border border-white/25 bg-white/[0.04] px-4 py-2 text-sm text-zinc-100 transition-colors hover:border-white/50 hover:bg-white/10 light:border-zinc-950/20 light:bg-zinc-950 light:text-white light:hover:bg-zinc-800"
              >
                Let&apos;s talk
              </Link>
            </motion.div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="inline-flex items-center justify-center rounded-lg border border-zinc-800 p-2 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white md:hidden light:border-zinc-300 light:text-zinc-700 light:hover:border-zinc-400 light:hover:text-zinc-950"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Subtle scroll progress bar along the bottom edge of the navbar */}
        <motion.div
          style={{ scaleX }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-gradient-to-r from-zinc-600 via-zinc-300 to-white light:from-zinc-300 light:via-zinc-600 light:to-zinc-950"
        />

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-white/[0.06] bg-[#09090b]/95 backdrop-blur-xl md:hidden light:border-zinc-950/10 light:bg-[#f8f8fa]/95"
            >
              <div className="flex flex-col gap-1.5 px-6 py-4">
                {navLinks.map((link, i) => {
                  const isActive = activeHref === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.035 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveHref(link.href);
                          setMobileOpen(false);
                        }}
                        className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-white/10 font-medium text-white light:bg-zinc-950/10 light:text-zinc-950"
                            : "text-zinc-300 hover:bg-white/[0.04] hover:text-white light:text-zinc-700 light:hover:bg-zinc-950/[0.05] light:hover:text-zinc-950"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating quick theme toggle when navbar auto-hides past Hero */}
      <AnimatePresence>
        {hidden && (
          <motion.button
            type="button"
            onClick={toggleTheme}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2 }}
            aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
            title={isLight ? "Switch to dark mode" : "Switch to light mode"}
            className="fixed bottom-6 right-6 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#111116]/90 text-zinc-200 shadow-lg backdrop-blur-md transition-colors hover:border-white/40 hover:text-white light:border-zinc-950/15 light:bg-white/90 light:text-zinc-700 light:hover:border-zinc-950/30 light:hover:text-zinc-950"
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
