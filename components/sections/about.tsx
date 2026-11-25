"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import {
  Award,
  BookOpen,
  FolderGit2,
  GraduationCap,
  Mail,
  School,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import {
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  type IconType,
} from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import TechMarquee from "@/components/sections/tech-marqueee";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/* ------------------------------------------------------------------ */
/*  EDIT YOUR CONTENT HERE                                             */
/* ------------------------------------------------------------------ */

const education: {
  icon: LucideIcon;
  period: string;
  title: string;
  school: string;
  description: string;
}[] = [
  {
    icon: GraduationCap,
    period: "2018 — 2022",
    title: "High School",
    school: "Saint Michael School Of Padada",
    description:
      "Studying networking and web technologies.",
  },
  {
    icon: School,
    period: "2022 — 2024",
    title: "Senior High School",
    school: "Cor Jesu College Inc.",
    description:
      "Completed my strand/track with a focus on computer programming and ICT.",
  },
  {
    icon: BookOpen,
    period: "2024 — Present",
    title: "Bachelor of Science in Information Technology",
    school: "Cor Jesu College Inc.",
    description:
      "Building a strong foundation in programming, web development and software engineering through my studies",
  },
];

const stats: {
  icon: LucideIcon;
  value: number;
  label: string;
  description: string;
}[] = [
  {
    icon: FolderGit2,
    value: 17,
    label: "Technologies",
    description: "Frontend, backend & developer tools",
  },
  {
    icon: Award,
    value: 2,
    label: "Certificates",
    description: "Courses and certifications earned",
  },
];

const skillGroups: {
  category: string;
  items: { name: string; icon: IconType; color: string }[];
}[] = [
  {
    category: "Frontend Development",
    items: [
      { name: "Next.js", icon: SiNextdotjs, color: "currentColor" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#EAB308" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "currentColor" },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress, color: "currentColor" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    category: "UI/UX & Developer Tools",
    items: [
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "currentColor" },
      { name: "Vercel", icon: SiVercel, color: "currentColor" },
    ],
  },
];

/* ------------------------------------------------------------------ */

/** Counts up from 0 whenever it scrolls into view */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      const raf = requestAnimationFrame(() => setCount(0));
      return () => cancelAnimationFrame(raf);
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
}

function AboutPortrait() {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={(e) => {
        handlePointerMove(e);
        setHovered(true);
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovered(false)}
      className="group relative mx-auto h-[26rem] w-[20rem] cursor-crosshair sm:h-[32rem] sm:w-[24rem]"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 rounded-full bg-white/[0.08] blur-[100px] transition-colors duration-500 group-hover:bg-white/[0.13] light:bg-zinc-900/[0.06] light:group-hover:bg-zinc-900/[0.1]" />

      {imgError ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-dashed border-zinc-700 p-6 text-center font-mono text-xs leading-6 text-zinc-500 light:border-zinc-300">
          Add your transparent photo at
          <br />
          public/cutt.webp
        </div>
      ) : (
        <>
          {/* Base high-contrast monochrome B&W portrait */}
          <Image
            src="/cutt.webp"
            alt="Noly Sereño"
            fill
            sizes="(min-width: 640px) 24rem, 20rem"
            className="object-contain object-bottom grayscale contrast-[1.22] brightness-[0.86] drop-shadow-[0_20px_50px_rgba(255,255,255,0.12)] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] light:drop-shadow-[0_20px_40px_rgba(0,0,0,0.16)]"
            onError={() => setImgError(true)}
          />

          {/* Full-color portrait masked around the cursor */}
          <div
            aria-hidden="true"
            style={{
              maskImage:
                "radial-gradient(130px circle at var(--mx, -200px) var(--my, -200px), black 0%, black 42%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(130px circle at var(--mx, -200px) var(--my, -200px), black 0%, black 42%, transparent 100%)",
            }}
            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src="/cutt.webp"
              alt=""
              fill
              sizes="(min-width: 640px) 24rem, 20rem"
              className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="section-padding overflow-x-clip border-t border-white/[0.06] light:border-zinc-950/10"
    >
      <div className="container-custom">
        <p className="mb-12 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 light:text-zinc-500">
          01 / ABOUT ME
        </p>

        {/* Intro: name — photo — text */}
        <RevealGroup className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left */}
          <RevealItem>
            <h2 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              <span className="text-gradient font-serif font-medium italic tracking-normal">
                Hi, I&apos;m
              </span>
              <br />
              Noly Sereño
            </h2>

            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 light:bg-zinc-950 light:text-white light:hover:bg-zinc-800"
            >
              <Mail size={16} />
              Contact me
            </Link>
          </RevealItem>

          {/* Center: photo */}
          <RevealItem>
            <AboutPortrait />
          </RevealItem>

          {/* Right */}
          <RevealItem>
            <p className="leading-8 text-zinc-300 light:text-zinc-700">
              I&apos;m a{" "}
              <span className="font-semibold text-white light:text-zinc-950">
                Full-Stack Developer
              </span>{" "}
              focused on building technology that is both functional and
              engaging. I enjoy combining code and design to create digital
              products that stand out.
            </p>

            <p className="mt-5 leading-8 text-zinc-400 light:text-zinc-600">
              With React, Next.js and modern web technologies, I turn ideas
              into intuitive, responsive and impactful digital experiences.
            </p>

            <Link
              href="#projects"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white light:border-zinc-300 light:text-zinc-700 light:hover:border-zinc-500 light:hover:text-zinc-950"
            >
              View projects
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </RevealItem>
        </RevealGroup>

        {/* X-crossed moving tech stack banners right below the About photo */}
        <TechMarquee />

        {/* Education */}
        <div id="education" />
        <RevealGroup className="mt-8">
          <RevealItem>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 light:text-zinc-500">
              EDUCATION
            </p>
          </RevealItem>
          <RevealItem>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              My{" "}
              <span className="font-serif font-medium italic tracking-normal text-zinc-200 light:text-zinc-700">
                education.
              </span>
            </h3>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {education.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title}>
                <div className="h-full rounded-xl border border-zinc-800 bg-[#111116] p-7 transition-all hover:border-white/25 light:border-zinc-200 light:bg-white light:shadow-sm light:hover:border-zinc-400">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-200 light:bg-zinc-100 light:text-zinc-800">
                    <Icon size={22} />
                  </div>

                  <p className="mt-6 font-mono text-xs text-zinc-400 light:text-zinc-500">
                    {item.period}
                  </p>
                  <h4 className="mt-3 text-lg font-semibold leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-500">{item.school}</p>
                  <p className="mt-4 text-sm leading-7 text-zinc-400 light:text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Counters */}
        <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <RevealItem key={stat.label}>
                <div className="flex items-center justify-between gap-6 rounded-xl border border-zinc-800 bg-[#111116] p-7 transition-all hover:border-white/25 light:border-zinc-200 light:bg-white light:shadow-sm light:hover:border-zinc-400">
                  <div>
                    <p className="text-gradient text-6xl font-bold leading-none tracking-tight tabular-nums">
                      <Counter value={stat.value} />+
                    </p>
                    <p className="mt-4 text-lg font-semibold">{stat.label}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {stat.description}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-zinc-200 light:bg-zinc-100 light:text-zinc-800">
                    <Icon size={26} />
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Tech Stack & Tools Grid */}
        <div id="skills" />
        <RevealGroup className="mt-16">
          <RevealItem>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 light:text-zinc-500">
              TECH STACK &amp; TOOLS
            </p>
          </RevealItem>
          <RevealItem>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Technologies I{" "}
              <span className="font-serif font-medium italic tracking-normal text-zinc-200 light:text-zinc-700">
                work with.
              </span>
            </h3>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {skillGroups.map((group) => (
            <RevealItem key={group.category}>
              <div className="h-full rounded-xl border border-zinc-800 bg-[#111116] p-7 transition-all hover:border-white/25 light:border-zinc-200 light:bg-white light:shadow-sm light:hover:border-zinc-400">
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 light:text-zinc-500">
                  {group.category}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.06] light:border-zinc-200 light:bg-zinc-50 light:text-zinc-800 light:hover:border-zinc-400 light:hover:bg-zinc-100"
                      >
                        <SkillIcon size={15} color={skill.color} />
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}