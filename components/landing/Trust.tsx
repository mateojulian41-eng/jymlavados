"use client";

import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Headphones,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const items = [
  {
    icon: Users,
    stat: "+500",
    title: "Clientes atendidos",
    desc: "Hogares y negocios en toda Cartagena confían en nuestro servicio.",
  },
  {
    icon: ShieldCheck,
    stat: "100%",
    title: "Garantía de satisfacción",
    desc: "Si no quedas conforme, volvemos sin costo adicional.",
  },
  {
    icon: Wrench,
    stat: "Pro",
    title: "Maquinaria industrial",
    desc: "Equipos de inyección-extracción de última generación.",
  },
  {
    icon: Clock,
    stat: "<10 min",
    title: "Respuesta rápida",
    desc: "Cotizaciones y agendamiento directo por WhatsApp.",
  },
  {
    icon: Award,
    stat: "Bio",
    title: "Productos seguros",
    desc: "Biodegradables, aptos para niños, mascotas y personas mayores.",
  },
  {
    icon: Headphones,
    stat: "5★",
    title: "Atención humana",
    desc: "Te atiende el equipo real, no un bot. Negocio familiar.",
  },
];

export function Trust() {
  return (
    <section className="py-20 sm:py-28">
      <motion.div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          label="Por qué J&M"
          title="Confianza que se nota en cada detalle"
          description="Combinamos experiencia local, tecnología profesional y un estándar de calidad digno de marcas premium."
          align="center"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="flex gap-4 rounded-2xl border border-border bg-surface p-6 card-shadow transition-shadow hover:card-shadow-hover"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-950 text-white">
                <item.icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-lg font-semibold text-brand-600">
                  {item.stat}
                </p>
                <h3 className="mt-0.5 font-semibold text-brand-950">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
