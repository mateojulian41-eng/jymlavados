"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import {
  type ServiceId,
  PRICES,
  SERVICE_LABELS,
  formatCOP,
  buildWhatsAppUrl,
  quoteMessage,
  MAX_QUOTE_QUANTITY,
  isServiceId,
} from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";

const serviceOptions = Object.entries(SERVICE_LABELS) as [ServiceId, string][];

function initialService(): ServiceId {
  if (typeof window === "undefined") return "sofa";
  const fromQuery = new URLSearchParams(window.location.search).get("servicio");
  return fromQuery && isServiceId(fromQuery) ? fromQuery : "sofa";
}

export function QuoteCalculator() {
  const [service, setService] = useState<ServiceId>(initialService);
  const [quantity, setQuantity] = useState(1);

  const unitPrice = PRICES[service];
  const total = unitPrice * quantity;
  const atMax = quantity >= MAX_QUOTE_QUANTITY;

  const waUrl = useMemo(
    () => buildWhatsAppUrl(quoteMessage(service, quantity)),
    [service, quantity],
  );

  return (
    <motion.div
      className="card-shadow relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-linear-to-bl from-brand-100/90 to-transparent"
        aria-hidden
      />

      <span className="absolute right-5 top-5 rounded-full bg-brand-950 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
        Cotizador
      </span>

      <h3 className="pr-16 text-lg font-semibold text-brand-950">
        Precio estimado al instante
      </h3>
      <p className="mt-1 text-sm text-muted">
        Sin compromiso. Confirmamos el valor final según el estado de la pieza.
      </p>

      <motion.div className="mt-6 space-y-5">
        <motion.div>
          <label
            htmlFor="service"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted"
          >
            Servicio
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value as ServiceId)}
            className="select-chevron w-full appearance-none rounded-xl border border-border bg-brand-50/50 py-3.5 pl-4 pr-11 text-sm font-medium text-brand-950 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          >
            {serviceOptions.map(([id, label]) => (
              <option key={id} value={id}>
                {label} — desde {formatCOP(PRICES[id])}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div>
          <span
            id="qty-label"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted"
          >
            Cantidad
          </span>
          <motion.div
            className="flex items-center gap-3"
            role="group"
            aria-labelledby="qty-label"
          >
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-brand-950 transition-colors hover:border-brand-400 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Disminuir cantidad"
            >
              <Minus size={18} />
            </button>
            <AnimatePresence mode="wait">
              <motion.span
                key={quantity}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="min-w-[2ch] text-center text-2xl font-semibold tabular-nums text-brand-950"
                aria-live="polite"
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
            <button
              type="button"
              onClick={() =>
                setQuantity((q) => Math.min(MAX_QUOTE_QUANTITY, q + 1))
              }
              disabled={atMax}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-brand-950 transition-colors hover:border-brand-400 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Aumentar cantidad"
            >
              <Plus size={18} />
            </button>
            <span className="text-sm text-muted">unidad(es)</span>
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="rounded-xl border border-brand-200/80 bg-linear-to-br from-brand-50 to-accent-muted/30 p-5"
        >
          <motion.div className="flex items-end justify-between gap-4">
            <motion.div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Total estimado
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {formatCOP(unitPrice)} c/u · visita incluida
              </p>
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.p
                key={total}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-2xl font-semibold tracking-tight text-brand-900 sm:text-3xl"
              >
                {formatCOP(total)}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <WhatsAppButton href={waUrl} className="w-full" size="lg">
          Enviar cotización por WhatsApp
        </WhatsAppButton>
        <p className="text-center text-xs text-muted">
          Respuesta promedio en menos de 10 minutos · Lun–Sáb 8:00–18:00
        </p>
      </motion.div>
    </motion.div>
  );
}
