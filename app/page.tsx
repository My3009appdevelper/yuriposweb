import { Capability3DSection } from "@/components/capability-3d-section";
import { ContactSection } from "@/components/contact-section";
import { ModuleIndex } from "@/components/module-index";
import { PricingTable } from "@/components/pricing-table";
import { SectionHeading } from "@/components/section-heading";
import { YuriHero } from "@/components/yuri-hero";
import { pricingPlans, yuriModules } from "@/lib/yuri-content";

export default function HomePage() {
  return (
    <>
      <YuriHero />
      <Capability3DSection />
      <ModuleIndex modules={yuriModules} />
      <section className="pricing-section" id="precios" aria-labelledby="pricing-title">
        <div className="container">
          <SectionHeading
            id="pricing-title"
            align="center"
            eyebrow="Planes de referencia"
            title="Empieza con lo que necesitas. Crece cuando estés listo."
            description="Tres formas de acercar Yuri POS a la escala de tu negocio."
          />
          <PricingTable plans={pricingPlans} />
        </div>
      </section>
      <ContactSection />
    </>
  );
}

