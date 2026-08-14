import Link from "next/link";
import { ArrowRight, CircleHelp, MessageCircle } from "lucide-react";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Contacto — Yuri POS",
  description: "Conoce el siguiente paso para hablar sobre Yuri POS y sus módulos.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contacto"
        title="Hablemos cuando haya algo que construir."
        description="Yuri POS está tomando forma como una plataforma de gestión para negocios reales. Esta página queda preparada para conectar el canal de contacto definitivo."
      />
      <section className="standby-page-section">
        <div className="container contact-grid">
          <div className="standby-card standby-card-main">
            <span className="standby-icon"><MessageCircle size={24} aria-hidden="true" /></span>
            <p className="eyebrow">Canal en preparación</p>
            <h2>La conversación comercial todavía se conectará.</h2>
            <p>No mostramos un correo, teléfono ni formulario ficticio. Cuando el canal real esté definido, esta página podrá recibir solicitudes sin perder información por el camino.</p>
            <div className="standby-actions">
              <Link className="button button-primary" href="/#precios">Revisar planes <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link className="text-link" href="/#modulos">Explorar módulos <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
          <aside className="standby-card standby-card-note">
            <CircleHelp size={21} aria-hidden="true" />
            <h3>¿Qué puedes revisar mientras tanto?</h3>
            <ul>
              <li>El índice completo de módulos.</li>
              <li>La diferencia entre farmacia y abarrotes.</li>
              <li>Los planes de referencia.</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
