import Link from "next/link";
import { ArrowLeft, ArrowRight, Construction, DatabaseZap, Sparkles } from "lucide-react";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Demo — Yuri POS",
  description: "Estado de la futura demo web interactiva de Yuri POS.",
};

export default function DemoPage() {
  return (
    <>
      <PageIntro
        eyebrow="Demo · Próximamente"
        title="Una demo para explorar Yuri POS sin tocar datos reales."
        description="La demo interactiva está en espera mientras preparamos una edición web aislada, precargada y segura para que cada visitante pueda probarla sin afectar a otra persona."
      />
      <section className="standby-page-section">
        <div className="container demo-standby-layout">
          <div className="demo-standby-card">
            <span className="standby-icon"><Construction size={24} aria-hidden="true" /></span>
            <p className="eyebrow">Estado actual</p>
            <h2>La demo todavía no está disponible.</h2>
            <p>Cuando se habilite, cada sesión tendrá datos de ejemplo y cambios locales que se borrarán al cerrarla. Así se podrá experimentar sin compartir una cuenta ni modificar una instalación real.</p>
            <Link className="button button-primary" href="/#modulos">Mientras tanto, ver módulos <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="demo-future-list">
            <div><DatabaseZap size={22} aria-hidden="true" /><span><strong>Datos precargados</strong><small>Un negocio de ejemplo listo para explorar.</small></span></div>
            <div><Sparkles size={22} aria-hidden="true" /><span><strong>Sesión aislada</strong><small>Los cambios de cada visitante viven solo en su sesión.</small></span></div>
            <div><ArrowLeft size={22} aria-hidden="true" /><span><strong>Sin afectar producción</strong><small>La demo no se conectará a los datos operativos del sistema.</small></span></div>
          </div>
        </div>
      </section>
    </>
  );
}
