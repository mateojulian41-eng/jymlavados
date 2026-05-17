"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const reviews = [
  {
    name: "Laura P.",
    zone: "Bocagrande",
    text: "Mi sofá quedó como nuevo. Puntuales, cuidadosos y el olor desapareció por completo. Ya los recomendé en el edificio.",
    initials: "LP",
  },
  {
    name: "Mario R.",
    zone: "El Laguito",
    text: "El colchón tenía humedad desde hace meses. Lo dejaron impecable y el precio fue justo. Servicio de verdad profesional.",
    initials: "MR",
  },
  {
    name: "Catalina A.",
    zone: "Manga",
    text: "Tengo dos perros y la alfombra parecía sin solución. Resultado increíble. Responden rápido por WhatsApp.",
    initials: "CA",
  },
  {
    name: "Andrés V.",
    zone: "Crespo",
    text: "Lavaron los muebles del comedor y las sillas. Secaron rápido y no dejaron desorden. Volveré a contratarlos.",
    initials: "AV",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="scroll-mt-24 bg-brand-50/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          label="Testimonios"
          title="Familias de Cartagena que ya confían"
          description="Más de 500 hogares han renovado sus espacios con J&M Lavados."
        />

        <motion.div
          className="mt-14 grid gap-4 sm:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {reviews.map((r) => (
            <motion.blockquote
              key={r.name}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative rounded-2xl border border-border bg-surface p-6 card-shadow sm:p-8"
            >
              <Quote
                className="absolute right-6 top-6 text-brand-100"
                size={40}
                strokeWidth={1}
              />
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-brand-900/90 sm:text-base">
                &ldquo;{r.text}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <motion.div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-950 text-xs font-bold text-white">
                  {r.initials}
                </motion.div>
                <div>
                  <cite className="not-italic text-sm font-semibold text-brand-950">
                    {r.name}
                  </cite>
                  <p className="text-xs text-muted">{r.zone}, Cartagena</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
