"use client";

import { motion } from "framer-motion";
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

const techStack: { name: string; icon: IconType }[] = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "MySQL", icon: SiMysql },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Python", icon: SiPython },
  { name: "Figma", icon: SiFigma },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
];

export default function TechMarquee() {
  const repeated = [...techStack, ...techStack];

  return (
    <div
      aria-label="Tech stack"
      className="relative left-1/2 -mt-6 mb-8 h-32 w-screen -translate-x-1/2 overflow-hidden py-4 sm:h-36"
    >
      {/* Ribbon 1 (Back of the X): Violet banner tilted +3.5deg, scrolling right */}
      <div className="absolute left-1/2 top-1/2 w-[115%] -translate-x-1/2 -translate-y-1/2 rotate-[3.5deg] border-y border-violet-300/30 bg-[#7c3aed] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center whitespace-nowrap"
        >
          {repeated.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <span
                key={`back-${i}`}
                className="flex items-center gap-2.5 text-sm font-black uppercase tracking-tight text-white sm:text-lg"
              >
                <Icon size={18} className="shrink-0 text-white" />
                {tech.name}
                <span className="px-5 text-xs text-violet-200 sm:px-7 sm:text-sm">
                  ✦
                </span>
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* Ribbon 2 (Front of the X): White banner tilted -3.5deg, scrolling left */}
      <div className="absolute left-1/2 top-1/2 w-[115%] -translate-x-1/2 -translate-y-1/2 -rotate-[3.5deg] border-y border-white bg-white py-3 shadow-[0_14px_40px_rgba(0,0,0,0.75)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center whitespace-nowrap"
        >
          {repeated.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <span
                key={`front-${i}`}
                className="flex items-center gap-2.5 text-sm font-black uppercase tracking-tight text-black sm:text-lg"
              >
                <Icon size={18} className="shrink-0 text-black" />
                {tech.name}
                <span className="px-5 text-xs text-violet-600 sm:px-7 sm:text-sm">
                  ✦
                </span>
              </span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
