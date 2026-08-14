import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" href="/" aria-label="Yuri POS, ir a Inicio">
            <span className="brand-mark" aria-hidden="true">
              Y
            </span>
            <span>
              <strong>YURI</strong>
              <small>POS</small>
            </span>
          </Link>
          <p className="footer-summary">
            Plataforma de gestión operativa y punto de venta para negocios que quieren trabajar con más orden.
          </p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Explorar</span>
          <Link href="/#modulos">Módulos</Link>
          <Link href="/#farmacias">Farmacias</Link>
          <Link href="/#abarrotes">Abarrotes</Link>
          <Link href="/#precios">Precios</Link>
        </div>
        <div className="footer-links">
          <span className="footer-label">Siguiente paso</span>
          <Link href="/contacto">
            Hablemos <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <Link href="/demo">Ver estado de la demo</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Yuri POS · Portfolio comercial</span>
        <span>Precios y capacidades sujetos a revisión</span>
      </div>
    </footer>
  );
}
