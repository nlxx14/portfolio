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
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
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
    value: 3,
    label: "Projects",
    description: "Completed and published projects",
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
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "#a78bfa" },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
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
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
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
      setCount(0);
      return;
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

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="section-padding overflow-x-clip border-t border-white/[0.06]"
    >
      <div className="container-custom">
        <p className="mb-12 font-mono text-sm text-[#a78bfa]">
          01 / ABOUT ME
        </p>

        {/* Intro: name — photo — text */}
        <RevealGroup className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left */}
          <RevealItem>
            <h2 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              <span className="text-gradient">Hi, I&apos;m</span>
              <br />
              Noly Sereño
            </h2>

            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#8b5cf6] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7c3aed]"
            >
              <Mail size={16} />
              Contact me
            </Link>
          </RevealItem>

          {/* Center: photo */}
          <RevealItem>
            <div className="relative mx-auto h-[26rem] w-[20rem] sm:h-[32rem] sm:w-[24rem]">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 rounded-full bg-violet-600/20 blur-[100px]" />

              {imgError ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-dashed border-zinc-700 p-6 text-center font-mono text-xs leading-6 text-zinc-500">
                  Add your transparent photo at
                  <br />
                  public/about.png
                </div>
              ) : (
                <Image
                  src="/cutt.png"
                  alt="Noly Sereño"
                  fill
                  sizes="(min-width: 640px) 24rem, 20rem"
                  className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(139,92,246,0.25)] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </RevealItem>

          {/* Right */}
          <RevealItem>
            <p className="leading-8 text-zinc-300">
              I&apos;m a{" "}
              <span className="font-semibold text-white">
                Full-Stack Developer
              </span>{" "}
              focused on building technology that is both functional and
              engaging. I enjoy combining code and design to create digital
              products that stand out.
            </p>

            <p className="mt-5 leading-8 text-zinc-400">
              With React, Next.js and modern web technologies, I turn ideas
              into intuitive, responsive and impactful digital experiences.
            </p>

            <Link
              href="#projects"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
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
        <RevealGroup className="mt-8">
          <RevealItem>
            <p className="mb-3 font-mono text-sm text-[#a78bfa]">EDUCATION</p>
          </RevealItem>
          <RevealItem>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              My education.
            </h3>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {education.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title}>
                <div className="h-full rounded-xl border border-zinc-800 bg-[#111116] p-7 transition-all hover:border-[#a78bfa]/40">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#a78bfa]/10 text-[#a78bfa]">
                    <Icon size={22} />
                  </div>

                  <p className="mt-6 font-mono text-xs text-[#a78bfa]">
                    {item.period}
                  </p>
                  <h4 className="mt-3 text-lg font-semibold leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-zinc-500">{item.school}</p>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">
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
                <div className="flex items-center justify-between gap-6 rounded-xl border border-zinc-800 bg-[#111116] p-7 transition-all hover:border-[#a78bfa]/40">
                  <div>
                    <p className="text-gradient text-6xl font-bold leading-none tracking-tight">
                      <Counter value={stat.value} />+
                    </p>
                    <p className="mt-4 text-lg font-semibold">{stat.label}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {stat.description}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#a78bfa]/10 text-[#a78bfa]">
                    <Icon size={26} />
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Tech Stack & Tools Grid */}
        <RevealGroup className="mt-16">
          <RevealItem>
            <p className="mb-3 font-mono text-sm text-[#a78bfa]">
              TECH STACK &amp; TOOLS
            </p>
          </RevealItem>
          <RevealItem>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Technologies I work with.
            </h3>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {skillGroups.map((group) => (
            <RevealItem key={group.category}>
              <div className="h-full rounded-xl border border-zinc-800 bg-[#111116] p-7 transition-all hover:border-[#a78bfa]/40">
                <p className="font-mono text-xs uppercase tracking-wider text-[#a78bfa]">
                  {group.category}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-[#a78bfa]/40 hover:bg-white/[0.06]"
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