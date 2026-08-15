import { DatabaseZap, ShieldCheck, Sparkles } from "lucide-react";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Demo interactiva — Yuri POS",
  description: "Prueba Yuri POS con un negocio de ejemplo y una sesión aislada.",
};

export default function DemoPage() {
  return (
    <>
      <PageIntro
        eyebrow="Demo · Interactiva"
        title="Explora Yuri POS con un negocio de ejemplo."
        description="Prueba el flujo de trabajo dentro de una sesión aislada, con datos ficticios y sin afectar una instalación real."
      />
      <section className="demo-launch-section">
        <div className="container">
          <div className="demo-launch-header">
            <div>
              <p className="eyebrow">Sesión aislada</p>
              <h2>Una ventana real para probar la operación.</h2>
              <p>Los productos, ventas y movimientos de esta experiencia son de ejemplo. Puedes explorar la interfaz sin compartir una cuenta.</p>
            </div>
            <div className="demo-session-badge" role="status">
              <DatabaseZap size={20} aria-hidden="true" />
              <span>Datos ficticios · Sin producción</span>
            </div>
          </div>

          <div className="demo-embed-shell demo-embed-shell--web">
            <iframe
              className="demo-embed-frame"
              src="/demo-app/index.html"
              title="Demo interactiva de Yuri POS"
              loading="lazy"
              referrerPolicy="same-origin"
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
            />
          </div>

          <p className="demo-embed-note">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>Cada visitante tiene su propia sesión local. Los cambios de la demo no modifican datos reales.</span>
            <Sparkles size={18} aria-hidden="true" />
          </p>
        </div>
      </section>
    </>
  );
}
