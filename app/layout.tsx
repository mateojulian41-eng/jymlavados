import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE, FAQS } from "@/lib/site";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/json-ld";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const title = `${SITE.name} | Limpieza profesional a domicilio en Cartagena`;
const description =
  "Lavado premium de sofás, colchones, alfombras y muebles. Eliminación de manchas y olores, desinfección y secado rápido. Cotiza por WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "lavado de sofás Cartagena",
    "limpieza de colchones Cartagena",
    "lavado de alfombras",
    "limpieza a domicilio",
    "J&M Lavados",
    "limpieza de muebles Cartagena",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: SITE.tagline,
    locale: "es_CO",
    type: "website",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

const structuredData = [localBusinessJsonLd(), faqJsonLd(FAQS)];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
