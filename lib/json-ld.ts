import { SITE, PRICES, SERVICE_LABELS } from "./site";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.tagline,
    telephone: `+${SITE.phoneRaw}`,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cartagena",
      addressRegion: "Bolívar",
      addressCountry: "CO",
    },
    areaServed: {
      "@type": "City",
      name: "Cartagena de Indias",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de limpieza",
      itemListElement: Object.entries(SERVICE_LABELS).map(
        ([id, name], index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name,
          },
          price: PRICES[id as keyof typeof PRICES],
          priceCurrency: "COP",
        }),
      ),
    },
  };
}

export function faqJsonLd(
  faqs: readonly { q: string; a: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
