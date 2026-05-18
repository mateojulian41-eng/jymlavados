"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "./SectionHeader";

const tiles = [
  {
    image: IMAGES.extraccion,
    label: "Limpieza profunda",
    caption: "Inyección-extracción que remueve suciedad incrustada",
    className: "md:col-span-2 md:row-span-2",
    priority: true,
  },
  {
    image: IMAGES.alfombra,
    label: "Alfombras",
    caption: "Extracción industrial en el hogar",
    className: "md:col-span-1",
    priority: false,
  },
  {
    image: IMAGES.tapete,
    label: "Tapetes",
    caption: "Cuidado especializado pieza a pieza",
    className: "md:col-span-1",
    priority: false,
  },
  {
    image: IMAGES.muebles,
    label: "Muebles",
    caption: "Sillas y tapizados como nuevos",
    className: "md:col-span-1",
    priority: false,
  },
  {
    image: IMAGES.salaLimpia,
    label: "Resultado final",
    caption: "Hogares impecables en Cartagena",
    className: "md:col-span-2",
    priority: false,
  },
] as const;

export function Gallery() {
  return (
    <section id="galeria" className="scroll-mt-24 py-16 sm:py-20">
      <motion.div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          label="Nuestro trabajo"
          title="Resultados que se ven y se sienten"
          description="Equipo uniformado, maquinaria industrial y estándar premium en cada visita a domicilio en Cartagena."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 md:gap-5"
        >
          {tiles.map((tile, i) => (
            <motion.figure
              key={tile.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-brand-100 card-shadow ${tile.className} ${
                i === 0
                  ? "aspect-[16/10] md:aspect-auto md:min-h-[360px]"
                  : i === 4
                    ? "aspect-[21/9] md:aspect-auto md:min-h-[200px]"
                    : "aspect-[4/3] md:aspect-auto md:min-h-[200px]"
              }`}
            >
              <Image
                src={tile.image.src}
                alt={tile.image.alt}
                fill
                priority={tile.priority}
                sizes={
                  i === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : i === 4
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                }
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <motion.div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/20 to-transparent"
                aria-hidden
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="mb-2 inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                  {tile.label}
                </span>
                <p className="text-sm font-medium text-white/90 sm:text-base">
                  {tile.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
