"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40, transition: { duration: 0.3 } },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Wrap a block of content. When it enters the viewport, its
 * <RevealItem> children appear one by one. It resets when it
 * leaves, so it replays on every scroll (down and up).
 */
export function RevealGroup({ children, className }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A single element that fades up inside a <RevealGroup>. */
export function RevealItem({ children, className }: Props) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
    