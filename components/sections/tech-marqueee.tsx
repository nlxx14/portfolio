"use client";

import { motion } from "framer-motion";

// Edit this list to change the tech stack in the banner
const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "Framer Motion",
  "Git",
  "GitHub",
  "MySQL",
  "NoSQL",
  "Python",
];

export default function TechMarquee() {
  return (
    <section
      aria-label="Tech stack"
      className="-mt-12 overflow-hidden border-y border-white bg-white py-3"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center whitespace-nowrap"
      >
        {/* The list is repeated twice so the loop never shows a gap */}
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={i}
            className="flex items-center text-base font-black uppercase tracking-tight text-black sm:text-xl"
          >
            {tech}
            <span className="px-5 text-sm sm:px-8 sm:text-base">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
