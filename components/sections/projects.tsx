"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Award, Code, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/* ------------------------------------------------------------------ */
/*  EDIT YOUR CONTENT HERE                                             */
/*  Put project screenshots in  public/projects/                       */
/*  Put certificate images in   public/certificates/                   */
/* ------------------------------------------------------------------ */

const projects = [
  {
    title: "Your Project Name",
    description:
      "Add a short description of your project, the problem it solves, and what it does.",
    image: "/projects/project-1.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
  },
  {
    title: "Your Second Project",
    description:
      "Add a short description of your project, the problem it solves, and what it does.",
    image: "/projects/project-2.png",
    tags: ["React", "Node.js", "PostgreSQL"],
    href: "#",
  },
  {
    title: "Your Third Project",
    description:
      "Add a short description of your project, the problem it solves, and what it does.",
    image: "/projects/project-3.png",
    tags: ["Next.js", "Framer Motion"],
    href: "#",
  },
];

const certificates = [
  {
    title: "FigmaFusion: From Concept to Interface",
    issuer: "Issuing Organization",
    date: "2026",
    image: "/certificates/certificate-1.png",
    href: "#",
  },
  {
    title: "Certificate Title",
    issuer: "Issuing Organization",
    date: "2025",
    image: "/certificates/certificate-2.png",
    href: "#",
  },
  {
    title: "Certificate Title",
    issuer: "Issuing Organization",
    date: "2025",
    image: "/certificates/certificate-3.png",
    href: "#",
  },
];

const tabs = [
  { id: "projects", label: "Projects", icon: Code },
  { id: "certificates", label: "Certificates", icon: Award },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ------------------------------------------------------------------ */

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function CardImage({
  src,
  alt,
  label,
  className,
  sharp = false,
}: {
  src: string;
  alt: string;
  label: string;
  className: string;
  /** Serve the original file with no compression (best for text-heavy images) */
  sharp?: boolean;
}) {
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-[#1b1630] to-[#0d0b16] ${className}`}
    >
      {error ? (
        <div className="flex h-full w-full items-center justify-center p-4 text-center font-mono text-xs text-zinc-600">
          {label}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 45vw, (min-width: 768px) 60vw, 100vw"
          unoptimized={sharp}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

function DetailsLink({ href, label }: { href: string; label: string }) {
  // Anything that isn't an on-page "#" link opens in a new tab
  const external = !href.startsWith("#");
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group/btn inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-[#a78bfa]/50 hover:text-white"
    >
      {label}
      <ArrowRight
        size={16}
        className="transition-transform group-hover/btn:translate-x-1"
      />
    </Link>
  );
}

function DetailsButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/btn inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-[#a78bfa]/50 hover:text-white"
    >
      {label}
      <ArrowRight
        size={16}
        className="transition-transform group-hover/btn:translate-x-1"
      />
    </button>
  );
}

export default function Projects() {
  const [active, setActive] = useState<TabId>("projects");
  const [selected, setSelected] = useState<(typeof certificates)[number] | null>(
    null
  );

  // Close the popup with the Escape key, and stop the page scrolling behind it
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="projects"
      className="section-padding border-t border-white/[0.06]"
    >
      <RevealGroup className="container-custom">
        <RevealItem>
          <p className="mb-3 font-mono text-sm text-[#a78bfa]">
            02 / SELECTED WORK
          </p>
        </RevealItem>

        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            My work.
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="mt-4 max-w-xl text-zinc-400">
            A selection of projects I&apos;ve built and certificates I&apos;ve
            earned along the way.
          </p>
        </RevealItem>

        {/* Tabs */}
        <RevealItem className="mt-10 flex justify-center">
          <div className="inline-flex gap-1 rounded-2xl border border-zinc-800 bg-[#111116]/80 p-1.5 backdrop-blur">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`relative rounded-xl px-5 py-2.5 text-sm font-medium transition-colors sm:px-8 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="projects-tab-pill"
                      className="absolute inset-0 rounded-xl bg-[#8b5cf6] shadow-[0_0_24px_rgba(139,92,246,0.45)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </RevealItem>

        {/* Tab content */}
        <RevealItem className="mt-12">
          <AnimatePresence mode="wait">
            {active === "projects" ? (
              <motion.div
                key="projects"
                variants={list}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    variants={card}
                    className="group flex flex-col rounded-2xl border border-zinc-700/60 bg-[#111116] p-4 transition-all hover:border-[#a78bfa]/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]"
                  >
                    <CardImage
                      src={project.image}
                      alt={project.title}
                      label={`Add ${project.image.replace("/", "public/")}`}
                      className="aspect-[16/9]"
                    />

                    <h3 className="mt-6 px-2 text-xl font-bold">
                      {project.title}
                    </h3>

                    <p className="mt-3 flex-1 px-2 text-sm leading-7 text-zinc-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 px-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/[0.05] px-3 py-1 text-xs text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 px-2 pb-2">
                      <DetailsLink href={project.href} label="Details" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="certificates"
                variants={list}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {certificates.map((cert, i) => (
                  <motion.div
                    key={i}
                    variants={card}
                    className="group flex flex-col rounded-2xl border border-zinc-700/60 bg-[#111116] p-4 transition-all hover:border-[#a78bfa]/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]"
                  >
                    <CardImage
                      src={cert.image}
                      alt={cert.title}
                      label={`Add ${cert.image.replace("/", "public/")}`}
                      className="aspect-[4/3]"
                      sharp
                    />

                    <p className="mt-6 px-2 font-mono text-xs text-[#a78bfa]">
                      {cert.date}
                    </p>

                    <h3 className="mt-2 px-2 text-xl font-bold">
                      {cert.title}
                    </h3>

                    <p className="mt-2 flex-1 px-2 text-sm text-zinc-400">
                      {cert.issuer}
                    </p>

                    <div className="mt-6 px-2 pb-2">
                      <DetailsButton
                        label="View certificate"
                        onClick={() => setSelected(cert)}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </RevealItem>
      </RevealGroup>

      {/* Certificate popup (kept outside the animated group so it stays fixed to the screen) */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="certificate-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <X size={16} />
              Close
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full max-w-5xl flex-col items-center gap-5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.image}
                alt={selected.title}
                className="max-h-[75vh] w-auto max-w-full rounded-xl border border-zinc-700 bg-white object-contain shadow-2xl"
              />

              <div className="text-center">
                <p className="text-lg font-semibold text-white">
                  {selected.title}
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  {selected.issuer} · {selected.date}
                </p>

                {selected.href.startsWith("http") && (
                  <a
                    href={selected.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#a78bfa] transition-colors hover:text-white"
                  >
                    Verify online
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}