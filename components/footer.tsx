import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" href="/" aria-label="Saruki POS, ir a Inicio">
            <span className="brand-logo" aria-hidden="true">
              <Image
                className="brand-logo-image"
                src="/assets/brand/saruki-logo-light.png"
                alt=""
                width={2048}
                height={1306}
              />
            </span>
            <span className="brand-product-label">POS</span>
          </Link>
          <p className="footer-summary">
            Plataforma de gestión operativa y punto de venta para negocios que quieren trabajar con más orden.
          </p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Explorar</span>
          <Link href="/#beneficios">Beneficios</Link>
          <Link href="/#modulos">Módulos</Link>
          <Link href="/#precios">Planes</Link>
        </div>
        <div className="footer-links">
          <span className="footer-label">Siguiente paso</span>
          <Link href="/#contacto">
            Hablemos <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <Link href="/demo">Probar la demo</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Saruki POS · Portfolio comercial</span>
        <span>Precios y capacidades sujetos a revisión</span>
      </div>
    </footer>
  );
}

