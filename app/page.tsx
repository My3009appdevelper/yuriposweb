import { CapabilityStrip } from "@/components/capability-strip";
import { AudienceSection } from "@/components/audience-section";
import { ModuleIndex } from "@/components/module-index";
import { PricingTable } from "@/components/pricing-table";
import { SectionHeading } from "@/components/section-heading";
import { YuriHero } from "@/components/yuri-hero";
import { audienceStories, pricingPlans, yuriModules } from "@/lib/yuri-content";

export default function HomePage() {
  return (
    <>
      <YuriHero />
      <CapabilityStrip />
      <ModuleIndex modules={yuriModules} />
      {audienceStories.map((story) => (
        <AudienceSection
          key={story.id}
          story={story}
          modules={story.moduleIds.map((moduleId) => yuriModules.find((module) => module.id === moduleId)).filter((module): module is (typeof yuriModules)[number] => Boolean(module))}
        />
      ))}
      <section className="pricing-section" id="precios" aria-labelledby="pricing-title">
        <div className="container">
          <SectionHeading
            id="pricing-title"
            align="center"
            eyebrow="Planes de referencia"
            title="Empieza con lo que necesitas. Crece cuando estés listo."
            description="Tres formas de acercar Yuri POS a la escala de tu negocio. La contratación y los límites finales se definirán antes de publicar."
          />
          <PricingTable plans={pricingPlans} />
        </div>
      </section>
      <section className="home-cta-section" aria-labelledby="home-cta-title">
        <div className="container home-cta-card">
          <div>
            <p className="eyebrow">Siguiente paso</p>
            <h2 id="home-cta-title">Tu operación puede sentirse más clara.</h2>
            <p>Conoce el alcance de Yuri POS y descubre qué módulos tienen sentido para tu negocio.</p>
          </div>
          <a className="button button-primary" href="/contacto">Hablemos <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </>
  );
}
