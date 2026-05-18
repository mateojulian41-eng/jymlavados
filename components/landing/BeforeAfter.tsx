"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "./SectionHeader";

const cases = [
  {
    title: "Sofá de sala",
    location: "Bocagrande",
    before: "Manchas, olor a humedad y polvo acumulado",
    after: "Tela revitalizada, sin olores, listo el mismo día",
    beforeImage: IMAGES.desinfeccion,
    afterImage: IMAGES.sofa,
  },
  {
    title: "Colchón matrimonial",
    location: "Manga",
    before: "Manchas y ácaros por años de uso",
    after: "Desinfectado, fresco y seguro para dormir",
    beforeImage: IMAGES.desinfeccion,
    afterImage: IMAGES.colchon,
  },
  {
    title: "Limpieza profunda",
    location: "Crespo",
    before: "Suciedad profunda en fibras del tapizado",
    after: "Extracción visible, como nuevo al instante",
    beforeImage: IMAGES.sofa,
    afterImage: IMAGES.extraccion,
  },
] as const;

type CaseItem = (typeof cases)[number];

function ComparisonCard({
  title,
  location,
  before,
  after,
  beforeImage,
  afterImage,
}: CaseItem) {
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(92, Math.max(8, x)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="card-shadow overflow-hidden rounded-2xl border border-white/10 bg-surface"
    >
      <motion.div
        ref={containerRef}
        role="slider"
        aria-label={`Comparar antes y después: ${title}`}
        aria-valuemin={8}
        aria-valuemax={92}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(8, p - 5));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(92, p + 5));
        }}
        className="relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div className="absolute inset-0">
          <Image
            src={afterImage.src}
            alt={afterImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <motion.div className="absolute inset-0 bg-linear-to-t from-brand-950/75 via-transparent to-brand-950/30" />
          <div className="absolute bottom-4 right-4 z-20 max-w-[180px] text-right">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Después
            </span>
            <p className="mt-2 text-xs font-medium leading-snug text-white drop-shadow-md sm:text-sm">
              {after}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeImage.src}
            alt={beforeImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover brightness-90 contrast-105 saturate-75"
          />
          <motion.div className="absolute inset-0 bg-brand-950/35" />
          <div className="absolute bottom-4 left-4 z-20 max-w-[180px]">
            <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Antes
            </span>
            <p className="mt-2 text-xs font-medium leading-snug text-white drop-shadow-md sm:text-sm">
              {before}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-y-0 z-30 w-0.5 bg-white shadow-[0_0_16px_rgba(255,255,255,0.6)]"
          style={{ left: `${position}%` }}
        >
          <motion.div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-600 text-white shadow-xl">
            <GripVertical size={16} aria-hidden />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="border-t border-border px-5 py-4">
        <p className="font-semibold text-brand-950">{title}</p>
        <p className="text-sm text-muted">{location}, Cartagena</p>
      </div>
    </motion.article>
  );
}

export function BeforeAfter() {
  return (
    <section
      id="resultados"
      className="scroll-mt-24 border-y border-brand-900/20 bg-brand-950 py-20 text-white sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          label="Resultados reales"
          title="La diferencia se ve al instante"
          description="Compara el antes y el después con fotos de nuestro equipo en acción. Arrastra el control."
          align="center"
          theme="dark"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cases.map((item) => (
            <ComparisonCard key={item.title} {...item} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-lg text-center text-sm text-brand-200/70">
          Resultados típicos con limpieza profunda e inyección-extracción. El
          resultado final puede variar según el material y el tiempo de uso.
        </p>
      </div>
    </section>
  );
}
