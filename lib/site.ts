export const SITE = {
  name: "J&M Lavados",
  tagline: "Limpieza profesional a domicilio",
  phone: "320 663 0229",
  phoneRaw: "573206630229",
  whatsapp: "https://wa.me/573206630229",
  email: "Jymlavados2020@gmail.com",
  location: "Cartagena, Colombia",
  schedule: "Lunes a Sábado · 8:00 AM – 6:00 PM",
  founded: "2020",
} as const;

export const COVERAGE_ZONES = [
  "Bocagrande",
  "El Laguito",
  "Manga",
  "Crespo",
  "Castillogrande",
  "Pie de la Popa",
  "Centro",
  "Bosque",
  "Turbaco",
  "Mamonal",
] as const;

export const FAQS = [
  {
    q: "¿Cuánto tarda el secado?",
    a: "Con nuestra extracción industrial, la mayoría de piezas quedan listas en 2 a 4 horas según el material y la humedad del día.",
  },
  {
    q: "¿Los productos son seguros para niños y mascotas?",
    a: "Sí. Usamos químicos biodegradables de uso profesional, seguros para familias y mascotas una vez finalizado el proceso.",
  },
  {
    q: "¿Cobran visita o desplazamiento?",
    a: "El desplazamiento dentro de Cartagena está incluido en la cotización. Para zonas periféricas te confirmamos antes de agendar.",
  },
  {
    q: "¿Qué pasa si no quedo satisfecho?",
    a: "Ofrecemos garantía de satisfacción: revisamos contigo el resultado y, si hace falta, repetimos el tratamiento sin costo adicional.",
  },
  {
    q: "¿Cómo agendo el servicio?",
    a: "Escríbenos por WhatsApp con el servicio y la cantidad. Te confirmamos precio final, horario y llegamos a tu domicilio.",
  },
] as const;

export type ServiceId =
  | "muebles"
  | "sofa"
  | "colchon"
  | "alfombra"
  | "tapete"
  | "profunda";

export const PRICES: Record<ServiceId, number> = {
  muebles: 75000,
  sofa: 80000,
  colchon: 90000,
  alfombra: 60000,
  tapete: 45000,
  profunda: 120000,
};

export const SERVICE_LABELS: Record<ServiceId, string> = {
  muebles: "Lavado de muebles",
  sofa: "Lavado de sofás",
  colchon: "Lavado de colchones",
  alfombra: "Lavado de alfombras",
  tapete: "Lavado de tapetes",
  profunda: "Limpieza profunda",
};

export function isServiceId(value: string): value is ServiceId {
  return value in PRICES;
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppUrl(
  message: string,
  phone = SITE.phoneRaw,
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export type QuoteLine = {
  service: ServiceId;
  quantity: number;
};

export function quoteLineTotal(line: QuoteLine): number {
  return PRICES[line.service] * line.quantity;
}

export function quoteTotal(lines: QuoteLine[]): number {
  return lines.reduce((sum, line) => sum + quoteLineTotal(line), 0);
}

export function quoteMessage(lines: QuoteLine[]): string {
  const total = quoteTotal(lines);
  const items = lines
    .map(
      (line, i) =>
        `${i + 1}. ${SERVICE_LABELS[line.service]} × ${line.quantity} — ${formatCOP(quoteLineTotal(line))}`,
    )
    .join("\n");

  return (
    `Hola J&M Lavados 👋\n\n` +
    `Vi su página y me gustaría cotizar:\n\n` +
    `${items}\n\n` +
    `💰 Total estimado: ${formatCOP(total)}\n\n` +
    `¿Tienen disponibilidad en Cartagena?`
  );
}

/** @deprecated Usa quoteMessage con un arreglo de líneas */
export function quoteMessageSingle(service: ServiceId, quantity: number): string {
  return quoteMessage([{ service, quantity }]);
}

export const DEFAULT_WA = buildWhatsAppUrl(
  "Hola J&M Lavados, me gustaría solicitar una cotización para limpieza a domicilio en Cartagena.",
);

export const MAX_QUOTE_QUANTITY = 20;
