"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

const cases = [
  {
    title: "Sofá de sala",
    location: "Bocagrande",
    before: "Manchas y olores",
    after: "Como nuevo",
    beforeImage: IMAGES.desinfeccion,
    afterImage: IMAGES.sofa,
  },
  {
    title: "Colchón matrimonial",
    location: "Manga",
    before: "Ácaros y manchas",
    after: "Fresco y seguro",
    beforeImage: IMAGES.colchon,
    afterImage: IMAGES.colchonDespues,
  },
  {
    title: "Alfombra de sala",
    location: "Castillogrande",
    before: "Polvo y suciedad",
    after: "Fibras revitalizadas",
    beforeImage: IMAGES.alfombra,
    afterImage: IMAGES.salaLimpia,
  },
  {
    title: "Tapete decorativo",
    location: "El Laguito",
    before: "Manchas profundas",
    after: "Colores vivos",
    beforeImage: IMAGES.tapete,
    afterImage: IMAGES.salaDespues,
  },
  {
    title: "Muebles tapizados",
    location: "Crespo",
    before: "Suciedad en tela",
    after: "Higiene total",
    beforeImage: IMAGES.mueblesProceso,
    afterImage: IMAGES.muebles,
  },
  {
    title: "Limpieza profunda",
    location: "Centro",
    before: "Suciedad incrustada",
    after: "Extracción visible",
    beforeImage: IMAGES.sofa,
    afterImage: IMAGES.extraccion,
  },
] as const;

type CaseItem = (typeof cases)[number];

function SideCaption({
  side,
  position,
  label,
  text,
}: {
  side: "before" | "after";
  position: number;
  label: string;
  text: string;
}) {
  const isBefore = side === "before";
  const safeWidth = isBefore
    ? Math.max(28, position - 6)
    : Math.max(28, 100 - position - 6);
  const visible = isBefore ? position > 22 : position < 78;

  return (
    <div
      className={cn(
        "absolute bottom-3 z-20 transition-opacity duration-200 sm:bottom-4",
        isBefore ? "left-3 sm:left-4" : "right-3 text-right sm:right-4",
        !visible && "pointer-events-none opacity-0",
      )}
      style={{ width: `${safeWidth}%`, maxWidth: "11.5rem" }}
    >
      <div
        className={cn(
          "inline-block rounded-lg px-3 py-2 backdrop-blur-md",
          isBefore ? "bg-black/45" : "bg-white/15",
        )}
      >
        <span
          className={cn(
            "block text-[10px] font-bold uppercase tracking-wider sm:text-xs",
            isBefore ? "text-white/90" : "text-white",
          )}
        >
          {label}
        </span>
        <p className="mt-1 text-[11px] font-medium leading-snug text-white sm:text-xs">
          {text}
        </p>
      </div>
    </div>
  );
}

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
      className="card-shadow overflow-hidden rounded-2xl border border-white/10 bg-brand-900/40"
    >
      <div
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
        className="relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden bg-brand-950 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="absolute inset-0">
          <Image
            src={afterImage.src}
            alt={afterImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-950/70 via-transparent to-brand-950/20" />
          <SideCaption
            side="after"
            position={position}
            label="Después"
            text={after}
          />
        </div>

        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeImage.src}
            alt={beforeImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover brightness-90 contrast-105 saturate-80"
          />
          <div className="absolute inset-0 bg-brand-950/30" />
          <SideCaption
            side="before"
            position={position}
            label="Antes"
            text={before}
          />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-y-0 z-30 w-px bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.5)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-600 text-white shadow-lg sm:h-11 sm:w-11">
            <GripVertical size={16} aria-hidden />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-brand-950/60 px-5 py-4">
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-brand-200/80">{location}, Cartagena</p>
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
      <motion.div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          label="Resultados reales"
          title="La diferencia se ve al instante"
          description="Compara el antes y el después por tipo de servicio. Arrastra el control en cada foto."
          align="center"
          theme="dark"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <ComparisonCard key={item.title} {...item} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-lg text-center text-sm text-brand-200/70">
          Resultados típicos con limpieza profunda e inyección-extracción. El
          resultado final puede variar según el material y el tiempo de uso.
        </p>
      </motion.div>
    </section>
  );
}
