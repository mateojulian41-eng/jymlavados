import { Mail, MapPin, Phone } from "lucide-react";
import { SITE, DEFAULT_WA } from "@/lib/site";

const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#resultados", label: "Resultados" },
  { href: "#proceso", label: "Proceso" },
  { href: "#cobertura", label: "Cobertura" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#cotizar", label: "Cotizar" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-950 text-sm font-bold text-white">
                J&M
              </div>
              <div>
                <p className="font-semibold text-brand-950">{SITE.name}</p>
                <p className="text-sm text-muted">{SITE.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Limpieza profesional a domicilio en Cartagena. Sofás, colchones,
              alfombras y más — con garantía y atención personalizada.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
              Navegación
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
              Contacto
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={DEFAULT_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-brand-700"
                >
                  <Phone size={15} className="text-brand-500" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-sm text-muted hover:text-brand-700"
                >
                  <Mail size={15} className="text-brand-500" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-500" />
                {SITE.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos
            reservados.
          </p>
          <p className="text-xs text-muted">{SITE.schedule}</p>
        </div>
      </div>
    </footer>
  );
}
