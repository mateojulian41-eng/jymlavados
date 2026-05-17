"use client";

import { motion } from "framer-motion";

type Props = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  theme = "light",
}: Props) {
  const centered = align === "center";
  const dark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <span
        className={`mb-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
          dark
            ? "border-white/20 bg-white/10 text-accent"
            : "border-brand-200 bg-brand-50 text-brand-700"
        }`}
      >
        {label}
      </span>
      <h2
        className={`text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-brand-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${centered ? "mx-auto" : ""} ${
            dark ? "text-brand-200/90" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
