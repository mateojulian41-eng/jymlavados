"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Car,
  Droplets,
  Sparkles,
  Wind,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Agenda",
    desc: "Escríbenos por WhatsApp, confirmamos horario y te damos el precio final.",
  },
  {
    step: "02",
    icon: Car,
    title: "Llegamos",
    desc: "Puntualidad garantizada. Llevamos todo el equipo a tu domicilio en Cartagena.",
  },
  {
    step: "03",
    icon: Droplets,
    title: "Lavado profundo",
    desc: "Inyección-extracción industrial que remueve suciedad, manchas y bacterias.",
  },
  {
    step: "04",
    icon: Wind,
    title: "Secado rápido",
    desc: "Extracción de humedad para que uses tus muebles el mismo día.",
  },
  {
    step: "05",
    icon: Sparkles,
    title: "Entrega impecable",
    desc: "Revisamos contigo el resultado. No pagas si no quedas satisfecho.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          label="Cómo trabajamos"
          title="Un proceso simple, resultados premium"
          description="Sin complicaciones. Tú agendas, nosotros transformamos tus espacios con estándares profesionales."
        />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-linear-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative text-center lg:text-left"
              >
                <div className="mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-border bg-surface card-shadow lg:mx-0">
                  <span className="text-[10px] font-bold tracking-widest text-brand-500">
                    {item.step}
                  </span>
                  <item.icon
                    className="mt-2 text-brand-700"
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold text-brand-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
