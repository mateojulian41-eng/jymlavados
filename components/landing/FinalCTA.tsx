"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { DEFAULT_WA, SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { WhatsAppButton } from "./WhatsAppButton";

export function FinalCTA() {
  return (
    <section className="px-5 pb-20 sm:px-6 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-brand-950 px-6 py-16 text-center sm:px-12 sm:py-20"
      >
        <Image
          src={IMAGES.domicilio.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
          aria-hidden
        />
        <motion.div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-600/30 blur-3xl" />
        <motion.div
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40 grid-pattern-dark"
          aria-hidden
        />
        <motion.div className="pointer-events-none absolute inset-0 bg-linear-to-r from-brand-950 via-brand-950/90 to-brand-950/75" />

        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Agenda hoy
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Tu hogar merece verse{" "}
            <span className="text-gradient-light">impecable</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-brand-200/90">
            Cotiza en segundos por WhatsApp. Sin compromiso, con respuesta
            humana y visita a domicilio en {SITE.location}.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <WhatsAppButton href={DEFAULT_WA} size="lg">
              Pedir cotización ahora
            </WhatsAppButton>
            <a
              href={`tel:+${SITE.phoneRaw}`}
              className="inline-flex h-14 items-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone size={18} />
              {SITE.phone}
            </a>
          </div>

          <p className="mt-8 flex items-center justify-center gap-1.5 text-sm text-brand-200/90">
            <span>{SITE.schedule}</span>
            <ArrowUpRight size={14} className="shrink-0 text-accent" aria-hidden />
          </p>
        </div>
      </motion.div>
    </section>
  );
}
