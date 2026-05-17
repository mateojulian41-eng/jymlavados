"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const cases = [
  {
    title: "Sofá de sala",
    location: "Bocagrande",
    before: "Manchas, olor a humedad y polvo acumulado",
    after: "Tela revitalizada, sin olores, listo el mismo día",
  },
  {
    title: "Colchón matrimonial",
    location: "Manga",
    before: "Manchas y ácaros por años de uso",
    after: "Desinfectado, fresco y seguro para dormir",
  },
  {
    title: "Alfombra decorativa",
    location: "Crespo",
    before: "Manchas de mascotas y tráfico diario",
    after: "Colores recuperados y fibras suaves",
  },
];

function ComparisonCard({
  title,
  location,
  before,
  after,
}: (typeof cases)[0]) {
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
        <div className="absolute inset-0 bg-linear-to-br from-brand-100 via-brand-50 to-accent-muted/50">
          <motion.div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-center">
              <span className="rounded-full bg-brand-600/15 px-3 py-1 text-xs font-semibold text-brand-800">
                Después
              </span>
              <p className="mt-3 max-w-[200px] text-sm font-medium leading-snug text-brand-900">
                {after}
              </p>
            </div>
          </motion.div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden bg-linear-to-br from-slate-400 via-slate-300 to-slate-200"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-center">
              <span className="rounded-full bg-slate-700/15 px-3 py-1 text-xs font-semibold text-slate-800">
                Antes
              </span>
              <p className="mt-3 max-w-[200px] text-sm font-medium leading-snug text-slate-900">
                {before}
              </p>
            </div>
          </div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.5)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-600 text-white shadow-xl">
            <GripVertical size={16} aria-hidden />
          </div>
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
          description="Compara el antes y el después de trabajos reales en hogares de Cartagena. Arrastra o desliza el control."
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
