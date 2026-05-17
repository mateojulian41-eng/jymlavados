"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { COVERAGE_ZONES, SITE } from "@/lib/site";
import { SectionHeader } from "./SectionHeader";

export function Coverage() {
  return (
    <section
      id="cobertura"
      className="scroll-mt-24 bg-brand-50/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeader
          label="Cobertura"
          title="Llegamos a tu barrio en Cartagena"
          description={`Servicio a domicilio en la ciudad y alrededores. Si no ves tu zona, escríbenos — atendemos ${SITE.location}.`}
          align="center"
        />

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap justify-center gap-2.5"
        >
          {COVERAGE_ZONES.map((zone) => (
            <li key={zone}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/80 bg-surface px-4 py-2 text-sm font-medium text-brand-800 card-shadow">
                <MapPin size={14} className="text-brand-500" aria-hidden />
                {zone}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
