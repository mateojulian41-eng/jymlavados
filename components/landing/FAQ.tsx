"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <motion.div className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionHeader
          label="Preguntas frecuentes"
          title="Resolvemos tus dudas antes de agendar"
          description="Lo que más nos preguntan en Cartagena sobre tiempos, productos y garantía."
          align="center"
        />

        <motion.div className="mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="overflow-hidden rounded-2xl border border-border bg-surface card-shadow"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-brand-950 sm:text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-brand-600 transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <p className="border-t border-border px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
