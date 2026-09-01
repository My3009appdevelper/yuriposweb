import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="not-found-section">
        <div className="container not-found-card">
          <p className="eyebrow">Saruki POS · 404</p>
          <h1>Esta ruta no está en el mapa.</h1>
          <p>La página que buscas no existe o todavía está tomando forma.</p>
          <div className="standby-actions">
            <Link className="button button-primary" href="/"><ArrowLeft size={16} aria-hidden="true" /> Volver a Inicio</Link>
            <Link className="text-link" href="/contacto">Contacto <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
