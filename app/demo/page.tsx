import { ShieldCheck, Sparkles } from "lucide-react";
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
          <div className="demo-embed-shell demo-embed-shell--web">
            <iframe
              className="demo-embed-frame"
              src="/demo-app/index.html"
              title="Demo interactiva de Yuri POS"
              loading="lazy"
              referrerPolicy="same-origin"
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
