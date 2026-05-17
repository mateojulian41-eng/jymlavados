import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Process } from "@/components/landing/Process";
import { Testimonials } from "@/components/landing/Testimonials";
import { Trust } from "@/components/landing/Trust";
import { Coverage } from "@/components/landing/Coverage";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="overflow-x-hidden">
        <Hero />
        <Services />
        <BeforeAfter />
        <Process />
        <Testimonials />
        <Trust />
        <Coverage />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
      <FloatingWhatsApp />
    </>
  );
}
