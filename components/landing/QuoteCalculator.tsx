"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, PackagePlus } from "lucide-react";
import {
  type ServiceId,
  type QuoteLine,
  PRICES,
  SERVICE_LABELS,
  formatCOP,
  buildWhatsAppUrl,
  quoteMessage,
  quoteLineTotal,
  quoteTotal,
  MAX_QUOTE_QUANTITY,
  isServiceId,
} from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";
import { cn } from "@/lib/cn";

const serviceOptions = Object.entries(SERVICE_LABELS) as [ServiceId, string][];

type CartLine = QuoteLine & { id: number };

let lineIdCounter = 0;

function newLine(service: ServiceId = "sofa", quantity = 1): CartLine {
  return {
    id: ++lineIdCounter,
    service,
    quantity,
  };
}

function initialService(): ServiceId {
  if (typeof window === "undefined") return "sofa";
  const fromQuery = new URLSearchParams(window.location.search).get("servicio");
  return fromQuery && isServiceId(fromQuery) ? fromQuery : "sofa";
}

function LineEditor({
  line,
  canRemove,
  onChange,
  onRemove,
}: {
  line: CartLine;
  canRemove: boolean;
  onChange: (patch: Partial<Pick<CartLine, "service" | "quantity">>) => void;
  onRemove: () => void;
}) {
  const atMax = line.quantity >= MAX_QUOTE_QUANTITY;
  const subtotal = quoteLineTotal(line);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      className="rounded-xl border border-border bg-brand-50/40 p-4"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <label className="sr-only" htmlFor={`service-${line.id}`}>
          Servicio
        </label>
        <select
          id={`service-${line.id}`}
          value={line.service}
          onChange={(e) => onChange({ service: e.target.value as ServiceId })}
          className="select-chevron min-w-0 flex-1 appearance-none rounded-lg border border-border bg-surface py-2.5 pl-3 pr-9 text-sm font-medium text-brand-950 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        >
          {serviceOptions.map(([id, label]) => (
            <option key={id} value={id}>
              {label} — {formatCOP(PRICES[id])}
            </option>
          ))}
        </select>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            aria-label="Quitar este servicio"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label={`Cantidad de ${SERVICE_LABELS[line.service]}`}
        >
          <button
            type="button"
            onClick={() =>
              onChange({ quantity: Math.max(1, line.quantity - 1) })
            }
            disabled={line.quantity <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-brand-950 transition-colors hover:border-brand-400 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Disminuir cantidad"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-[2ch] text-center text-lg font-semibold tabular-nums text-brand-950">
            {line.quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              onChange({
                quantity: Math.min(MAX_QUOTE_QUANTITY, line.quantity + 1),
              })
            }
            disabled={atMax}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-brand-950 transition-colors hover:border-brand-400 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Aumentar cantidad"
          >
            <Plus size={16} />
          </button>
          <span className="text-xs text-muted">ud.</span>
        </div>
        <p className="text-sm font-semibold text-brand-800">
          {formatCOP(subtotal)}
        </p>
      </div>
    </motion.div>
  );
}

export function QuoteCalculator() {
  const [lines, setLines] = useState<CartLine[]>(() => [
    newLine(initialService(), 1),
  ]);

  useEffect(() => {
    const service = initialService();
    setLines((prev) => {
      if (
        prev.length === 1 &&
        prev[0]!.service === "sofa" &&
        service !== "sofa"
      ) {
        return [{ ...prev[0]!, service }];
      }
      return prev;
    });
  }, []);

  const total = useMemo(() => quoteTotal(lines), [lines]);
  const itemCount = useMemo(
    () => lines.reduce((n, l) => n + l.quantity, 0),
    [lines],
  );

  const waUrl = useMemo(() => buildWhatsAppUrl(quoteMessage(lines)), [lines]);

  const updateLine = useCallback(
    (id: string, patch: Partial<Pick<CartLine, "service" | "quantity">>) => {
      setLines((prev) =>
        prev.map((l) => (l.id === id ? { ...l, ...patch } : l)),
      );
    },
    [],
  );

  const removeLine = useCallback((id: string) => {
    setLines((prev) =>
      prev.length <= 1 ? prev : prev.filter((l) => l.id !== id),
    );
  }, []);

  const addLine = useCallback(() => {
    setLines((prev) => {
      const used = new Set(prev.map((l) => l.service));
      const next = serviceOptions.find(([id]) => !used.has(id))?.[0] ?? "sofa";
      return [...prev, newLine(next, 1)];
    });
  }, []);

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
        Agrega todos los servicios que necesites. Un solo mensaje a WhatsApp.
      </p>

      <div className="mt-6 space-y-4">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <LineEditor
              key={line.id}
              line={line}
              canRemove={lines.length > 1}
              onChange={(patch) => updateLine(line.id, patch)}
              onRemove={() => removeLine(line.id)}
            />
          ))}
        </AnimatePresence>

        <button
          type="button"
          onClick={addLine}
          disabled={lines.length >= serviceOptions.length}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-brand-300 bg-brand-50/50 py-3 text-sm font-semibold text-brand-700 transition-colors",
            "hover:border-brand-500 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          <PackagePlus size={18} />
          Agregar otro servicio
        </button>

        <motion.div
          layout
          className="rounded-xl border border-brand-200/80 bg-linear-to-br from-brand-50 to-accent-muted/30 p-5"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Total estimado
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {lines.length} servicio{lines.length !== 1 ? "s" : ""} ·{" "}
                {itemCount} pieza{itemCount !== 1 ? "s" : ""} · visita incluida
              </p>
            </div>
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
          </div>
        </motion.div>

        <WhatsAppButton href={waUrl} className="w-full" size="lg">
          Enviar cotización por WhatsApp
        </WhatsAppButton>
        <p className="text-center text-xs text-muted">
          Respuesta promedio en menos de 10 minutos · Lun–Sáb 8:00–18:00
        </p>
      </div>
    </motion.div>
  );
}
