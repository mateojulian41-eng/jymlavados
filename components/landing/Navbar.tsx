"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, DEFAULT_WA } from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";
import { cn } from "@/lib/cn";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#resultados", label: "Resultados" },
  { href: "#proceso", label: "Proceso" },
  { href: "#cobertura", label: "Zonas" },
  { href: "#preguntas", label: "FAQ" },
  { href: "#cotizar", label: "Cotizar" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,padding] duration-300",
        scrolled ? "nav-scrolled py-3" : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <a href="#" className="group flex min-w-0 items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-950 text-white shadow-lg shadow-brand-900/20">
            <span className="relative z-10 text-sm font-bold tracking-tight">
              J&M
            </span>
            <span className="absolute inset-0 bg-linear-to-br from-brand-500/40 to-accent/30 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-brand-950">
              {SITE.name}
            </p>
            <p className="truncate text-xs text-muted">{SITE.location}</p>
          </div>
        </a>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Principal"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 md:block">
          <WhatsAppButton href={DEFAULT_WA} size="sm">
            Cotizar ahora
          </WhatsAppButton>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Móvil">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-950 hover:bg-brand-50"
                >
                  {link.label}
                </a>
              ))}
              <WhatsAppButton href={DEFAULT_WA} className="mt-3 w-full">
                Cotizar por WhatsApp
              </WhatsAppButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
