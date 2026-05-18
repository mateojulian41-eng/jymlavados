"use client";

import Image from "next/image";
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
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

type ServiceImage = (typeof IMAGES)[keyof typeof IMAGES];

const services: {
  icon: typeof LayoutGrid;
  title: string;
  desc: string;
  price: string;
  serviceId?: ServiceId;
  highlight?: boolean;
  image?: ServiceImage;
}[] = [
  {
    icon: LayoutGrid,
    title: "Lavado de muebles",
    desc: "Sillas, puff y tapizados del hogar con tratamiento según el material.",
    price: "Desde $75.000",
    serviceId: "muebles",
    image: IMAGES.muebles,
  },
  {
    icon: Sofa,
    title: "Lavado de sofás",
    desc: "Limpieza profunda de tela, microfibra y cuero. Eliminamos manchas y olores.",
    price: "Desde $80.000",
    serviceId: "sofa",
    image: IMAGES.sofa,
  },
  {
    icon: BedDouble,
    title: "Lavado de colchones",
    desc: "Desinfección contra ácaros, bacterias y humedad para un descanso más sano.",
    price: "Desde $90.000",
    serviceId: "colchon",
    image: IMAGES.colchon,
  },
  {
    icon: Layers,
    title: "Lavado de alfombras",
    desc: "Extracción industrial que remueve polvo profundo y revitaliza las fibras.",
    price: "Desde $60.000",
    serviceId: "alfombra",
    image: IMAGES.alfombra,
  },
  {
    icon: Armchair,
    title: "Lavado de tapetes",
    desc: "Tapetes decorativos y piezas pequeñas con secado controlado.",
    price: "Desde $45.000",
    serviceId: "tapete",
    image: IMAGES.tapete,
  },
  {
    icon: Sparkles,
    title: "Limpieza profunda",
    desc: "Tratamiento intensivo para piezas muy sucias o sin mantenimiento prolongado.",
    price: "Desde $120.000",
    serviceId: "profunda",
    image: IMAGES.extraccion,
  },
  {
    icon: Droplets,
    title: "Manchas y olores",
    desc: "Neutralizamos orina, humedad, comida y olores persistentes.",
    price: "Incluido",
    highlight: true,
    image: IMAGES.domicilio,
  },
  {
    icon: ShieldCheck,
    title: "Desinfección",
    desc: "Productos biodegradables seguros para niños, mascotas y adultos mayores.",
    price: "Incluido",
    highlight: true,
    image: IMAGES.desinfeccion,
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
    "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[box-shadow,transform] duration-300",
    "hover:card-shadow-hover",
    svc.highlight && "border-brand-200/80 bg-brand-50/30",
    svc.serviceId && "cursor-pointer",
    svc.image ? "p-0" : "p-6",
  );

  const content = (
    <>
      {svc.image && (
        <div className="service-card-media relative h-36 w-full shrink-0 overflow-hidden bg-brand-100 sm:h-40">
          <Image
            src={svc.image.src}
            alt={svc.image.alt}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-surface to-transparent"
            aria-hidden
          />
        </div>
      )}
      <motion.div className={cn("relative", svc.image && "flex flex-1 flex-col p-6 pt-4")}>
        <motion.div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-white transition-transform group-hover:scale-105">
          <svc.icon size={20} strokeWidth={1.75} />
        </motion.div>
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
      </motion.div>
    </>
  );

  if (svc.serviceId) {
    return (
      <motion.a
        href={`/?servicio=${svc.serviceId}#cotizar`}
        variants={item}
        className={className}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.article variants={item} className={className}>
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
