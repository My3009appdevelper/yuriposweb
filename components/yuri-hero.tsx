import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { HeroMap } from "@/components/hero-map";

export function YuriHero() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
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
            <Link className="button button-primary" href="#modulos">
              Explorar módulos <ArrowRight className="button-icon" size={17} aria-hidden="true" />
            </Link>
            <Link className="text-link" href="#farmacias">
              Ver para quién está hecho <ArrowRight className="button-icon" size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-proof-row" aria-label="Capacidades principales">
            <span><Check size={15} aria-hidden="true" /> Venta y caja</span>
            <span><Check size={15} aria-hidden="true" /> Inventario por sucursal</span>
            <span><Check size={15} aria-hidden="true" /> Crece por módulos</span>
          </div>
        </div>
        <HeroMap />
      </div>
      <div className="hero-bottom-line" aria-hidden="true" />
    </section>
  );
}
