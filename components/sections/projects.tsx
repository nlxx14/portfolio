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

const projects: {
  title: string;
  description: string;
  image: string;
  tags: string[];
  status?: string;
  href?: string;
  github?: string;
}[] = [
  {
    title: "Xeno — Interactive Developer Portfolio",
    description:
      "My personal developer portfolio built with Next.js 16 and TypeScript, featuring a physics-driven 3D lanyard ID card, dual-theme UI, and interactive cursor effects.",
    image: "/projects/project-1.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "Live",
    href: "#home",
    github: "https://github.com/nlxx14/portfolio",
  },
  {
    title: "Laravel E-Commerce Platform",
    description:
      "A full-stack e-commerce web application currently in active development—featuring product catalogs, shopping cart management, authentication, and MySQL order processing.",
    image: "/projects/project-2.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "Full-Stack"],
    status: "In Progress",
    github: "https://github.com/nlxx14",
  },
];

const certificates = [
  {
    title: "FigmaFusion: From Concept to Interface",
    issuer: "Cor Jesu College — Association of Computer Studies Students",
    date: "March 2026",
    image: "/certificates/certificate-1.png",
    href: "#",
  },
  {
    title: "Network Addressing and Basic Troubleshooting",
    issuer: "Cisco Networking Academy",
    date: "January 2026",
    image: "/certificates/certificate-2.png",
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
      className={`relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-[#18181c] to-[#0b0b0e] light:border-zinc-200 light:from-zinc-100 light:to-zinc-200 ${className}`}
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
      className="group/btn inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white light:border-zinc-300 light:bg-zinc-50 light:text-zinc-800 light:hover:border-zinc-500 light:hover:bg-zinc-100 light:hover:text-zinc-950"
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
      className="group/btn inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white light:border-zinc-300 light:bg-zinc-50 light:text-zinc-800 light:hover:border-zinc-500 light:hover:bg-zinc-100 light:hover:text-zinc-950"
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
      className="section-padding border-t border-white/[0.06] light:border-zinc-950/10"
    >
      <RevealGroup className="container-custom">
        <RevealItem>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 light:text-zinc-500">
            02 / SELECTED WORK
          </p>
        </RevealItem>

        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            My{" "}
            <span className="font-serif font-medium italic tracking-normal text-zinc-200 light:text-zinc-700">
              work.
            </span>
          </h2>
        </RevealItem>

        <RevealItem>
          <p className="mt-4 max-w-xl text-zinc-400 light:text-zinc-600">
            A selection of projects I&apos;ve built and certificates I&apos;ve
            earned along the way.
          </p>
        </RevealItem>

        {/* Tabs */}
        <RevealItem className="mt-10 flex justify-center">
          <div className="inline-flex gap-1 rounded-2xl border border-zinc-800 bg-[#111116]/80 p-1.5 backdrop-blur light:border-zinc-200 light:bg-zinc-100/90">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`relative rounded-xl px-5 py-2.5 text-sm font-medium transition-colors sm:px-8 ${
                    isActive
                      ? "text-zinc-950 light:text-white"
                      : "text-zinc-400 hover:text-white light:text-zinc-600 light:hover:text-zinc-950"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="projects-tab-pill"
                      className="absolute inset-0 rounded-xl bg-white shadow-[0_0_24px_rgba(255,255,255,0.2)] light:bg-zinc-950 light:shadow-sm"
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
                className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2"
              >
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    variants={card}
                    className="group flex flex-col rounded-2xl border border-zinc-700/60 bg-[#111116] p-4 transition-all hover:border-white/25 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] light:border-zinc-200 light:bg-white light:shadow-sm light:hover:border-zinc-400 light:hover:shadow-md"
                  >
                    <CardImage
                      src={project.image}
                      alt={project.title}
                      label={`Add ${project.image.replace("/", "public/")}`}
                      className="aspect-[16/9]"
                    />

                    <div className="mt-6 flex items-start justify-between gap-3 px-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      {project.status && (
                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                            project.status === "In Progress"
                              ? "border-amber-500/30 bg-amber-500/10 text-amber-300 light:border-amber-600/30 light:bg-amber-500/10 light:text-amber-700"
                              : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 light:border-emerald-600/30 light:bg-emerald-500/10 light:text-emerald-700"
                          }`}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 flex-1 px-2 text-sm leading-7 text-zinc-400 light:text-zinc-600">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 px-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/[0.05] px-3 py-1 text-xs text-zinc-400 light:bg-zinc-100 light:text-zinc-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3 px-2 pb-2">
                      {project.href ? (
                        <DetailsLink href={project.href} label="Live Demo" />
                      ) : (
                        <span className="inline-flex items-center rounded-lg border border-zinc-800 bg-white/[0.02] px-4 py-2 text-xs font-mono uppercase tracking-wider text-zinc-400 light:border-zinc-200 light:bg-zinc-50 light:text-zinc-500">
                          Building now
                        </span>
                      )}
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white light:text-zinc-600 light:hover:text-zinc-950"
                        >
                          GitHub ↗
                        </Link>
                      )}
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
                    className="group flex flex-col rounded-2xl border border-zinc-700/60 bg-[#111116] p-4 transition-all hover:border-white/25 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] light:border-zinc-200 light:bg-white light:shadow-sm light:hover:border-zinc-400 light:hover:shadow-md"
                  >
                    <CardImage
                      src={cert.image}
                      alt={cert.title}
                      label={`Add ${cert.image.replace("/", "public/")}`}
                      className="aspect-[4/3]"
                      sharp
                    />

                    <p className="mt-6 px-2 font-mono text-xs text-zinc-400 light:text-zinc-500">
                      {cert.date}
                    </p>

                    <h3 className="mt-2 px-2 text-xl font-bold">
                      {cert.title}
                    </h3>

                    <p className="mt-2 flex-1 px-2 text-sm text-zinc-400 light:text-zinc-600">
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
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
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
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-300 transition-colors hover:text-white"
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