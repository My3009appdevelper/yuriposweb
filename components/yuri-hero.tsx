import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroParallaxScene } from "@/components/hero-parallax-scene";

export function YuriHero() {
  return (
    <div className="hero-parallax-frame">
      <section className="hero-section hero-parallax-section" id="inicio">
        <div aria-hidden="true" className="hero-parallax-backdrop">
          <div className="hero-parallax-halo" />
          <HeroParallaxScene />
          <div className="hero-parallax-scrim" />
        </div>
        <div className="container hero-parallax-content">
          <div className="hero-copy">
            <p className="eyebrow">Yuri POS · gestión que acompaña</p>
            <h1>
              Más que un punto de venta.
              <span> El sistema que mantiene tu negocio en movimiento.</span>
            </h1>
            <p className="hero-description">
              Yuri POS conecta ventas, inventario, compras y administración para que una farmacia o un abarrotes pueda trabajar con más orden y decidir con mejor información.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/demo">
                Probar Demo <ArrowRight className="button-arrow" size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-bottom-line" aria-hidden="true" />
      </section>
    </div>
  );
}

