import { YuriIcon } from "@/components/icons";
import { capabilityHighlights } from "@/lib/yuri-content";

export function CapabilityStrip() {
  return (
    <section id="diferencia-editorial" className="capability-section capability-section-editorial" aria-labelledby="capability-title">
      <div className="container">
        <div className="capability-intro">
          <p className="section-label" id="capability-title">La diferencia Yuri</p>
          <p>Una base que entiende la operación real, incluso cuando el negocio crece.</p>
        </div>
        <div className="capability-grid">
          {capabilityHighlights.map((item) => (
            <article className="capability-card" key={item.title}>
              <div className="icon-badge"><YuriIcon name={item.icon} size={21} /></div>
              <p className="capability-eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
