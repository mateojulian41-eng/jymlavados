"use client";

import { motion } from "framer-motion";
import {
  Armchair,
  BedDouble,
  Droplets,
  Layers,
  LayoutGrid,
  ShieldCheck,
  Sofa,
  Sparkles,
  Wind,
} from "lucide-react";
import type { ServiceId } from "@/lib/site";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

const services: {
  icon: typeof LayoutGrid;
  title: string;
  desc: string;
  price: string;
  serviceId?: ServiceId;
  highlight?: boolean;
}[] = [
  {
    icon: LayoutGrid,
    title: "Lavado de muebles",
    desc: "Sillas, puff y tapizados del hogar con tratamiento según el material.",
    price: "Desde $75.000",
    serviceId: "muebles",
  },
  {
    icon: Sofa,
    title: "Lavado de sofás",
    desc: "Limpieza profunda de tela, microfibra y cuero. Eliminamos manchas y olores.",
    price: "Desde $80.000",
    serviceId: "sofa",
  },
  {
    icon: BedDouble,
    title: "Lavado de colchones",
    desc: "Desinfección contra ácaros, bacterias y humedad para un descanso más sano.",
    price: "Desde $90.000",
    serviceId: "colchon",
  },
  {
    icon: Layers,
    title: "Lavado de alfombras",
    desc: "Extracción industrial que remueve polvo profundo y revitaliza las fibras.",
    price: "Desde $60.000",
    serviceId: "alfombra",
  },
  {
    icon: Armchair,
    title: "Lavado de tapetes",
    desc: "Tapetes decorativos y piezas pequeñas con secado controlado.",
    price: "Desde $45.000",
    serviceId: "tapete",
  },
  {
    icon: Sparkles,
    title: "Limpieza profunda",
    desc: "Tratamiento intensivo para piezas muy sucias o sin mantenimiento prolongado.",
    price: "Desde $120.000",
    serviceId: "profunda",
  },
  {
    icon: Droplets,
    title: "Manchas y olores",
    desc: "Neutralizamos orina, humedad, comida y olores persistentes.",
    price: "Incluido",
    highlight: true,
  },
  {
    icon: ShieldCheck,
    title: "Desinfección",
    desc: "Productos biodegradables seguros para niños, mascotas y adultos mayores.",
    price: "Incluido",
    highlight: true,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function ServiceCard({
  svc,
}: {
  svc: (typeof services)[number];
}) {
  const className = cn(
    "group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-shadow duration-300",
    "hover:card-shadow-hover",
    svc.highlight && "border-brand-200/80 bg-brand-50/30",
    svc.serviceId && "cursor-pointer",
  );

  const content = (
    <>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-white transition-transform group-hover:scale-105">
        <svc.icon size={20} strokeWidth={1.75} />
      </div>
      <h3 className="text-base font-semibold text-brand-950">{svc.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{svc.desc}</p>
      <p className="mt-4 text-sm font-semibold text-brand-700">
        {svc.price}
        {!svc.highlight && (
          <span className="ml-1 font-normal text-muted">/ ud.</span>
        )}
      </p>
      {svc.serviceId && (
        <p className="mt-3 text-xs font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
          Cotizar este servicio →
        </p>
      )}
      <motion.div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-100/0 transition-colors group-hover:bg-brand-100/60" />
    </>
  );

  if (svc.serviceId) {
    return (
      <motion.a
        href={`/?servicio=${svc.serviceId}#cotizar`}
        variants={item}
        whileHover={{ y: -4 }}
        className={className}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.article variants={item} whileHover={{ y: -4 }} className={className}>
      {content}
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          label="Servicios"
          title="Cada pieza, el tratamiento que merece"
          description="Tecnología de inyección-extracción, productos premium y técnicos capacitados para resultados visibles desde el primer día."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((svc) => (
            <ServiceCard key={svc.title} svc={svc} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-2 text-sm text-muted"
        >
          <Wind size={16} className="text-brand-500" />
          Secado rápido con maquinaria profesional — sin dañar tus telas
        </motion.div>
      </div>
    </section>
  );
}
