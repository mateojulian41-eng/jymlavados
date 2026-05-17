"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { DEFAULT_WA } from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";
import { QuoteCalculator } from "./QuoteCalculator";

const stats = [
  { value: "+500", label: "Clientes atendidos" },
  { value: "4.9", label: "Calificación promedio" },
  { value: "2h", label: "Secado promedio" },
];

const badges = [
  { icon: Shield, text: "Garantía de satisfacción" },
  { icon: Sparkles, text: "Productos seguros" },
  { icon: CheckCircle2, text: "Respuesta en minutos" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      <motion.div
        className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] glow-orb opacity-60"
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <motion.div
        className="relative mx-auto max-w-6xl px-5 sm:px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-surface/80 px-3 py-1.5 text-xs font-medium text-brand-800 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
              </span>
              Disponibles hoy en Cartagena
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl font-semibold leading-[1.08] tracking-tight text-brand-950 sm:text-5xl lg:text-[3.25rem]"
            >
              Limpieza premium que transforma tu hogar{" "}
              <span className="text-gradient">en minutos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
            >
              Eliminamos manchas, olores y bacterias de sofás, colchones y
              alfombras con tecnología de inyección-extracción. Servicio a
              domicilio, secado rápido y resultados que se ven al instante.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <WhatsAppButton href={DEFAULT_WA} size="lg">
                Cotizar por WhatsApp
              </WhatsAppButton>
              <a
                href="#resultados"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-brand-950 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                Ver resultados
                <ArrowRight size={16} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {badges.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon size={15} />
                  </span>
                  {text}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:max-w-md"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2 }}
                  className="text-center sm:text-left"
                >
                  <p className="text-2xl font-semibold tracking-tight text-brand-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div className="relative pb-4 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-brand-100/80 via-transparent to-accent-muted/40 blur-2xl" />
              <div id="cotizar" className="relative scroll-mt-28">
                <QuoteCalculator />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute left-0 top-full mt-5 z-10 hidden rounded-2xl border border-border/60 bg-surface p-4 shadow-lg shadow-brand-900/8 lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-950">
                    Negocio familiar
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    Confianza en Cartagena
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
