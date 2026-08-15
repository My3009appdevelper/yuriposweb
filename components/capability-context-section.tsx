import Image from "next/image";
import { capabilityHighlights } from "@/lib/yuri-content";

export function CapabilityContextSection() {
  return (
    <section className="capability-context-section capability-section-context" id="diferencia-contexto" aria-labelledby="capability-context-title">
      <div className="container">
        <div className="capability-context-intro">
          <div>
            <p className="eyebrow">Una ventaja que se nota</p>
            <h2 id="capability-context-title">Lo que cambia en tu día.</h2>
          </div>
          <p>Menos fricción en el momento importante. Más contexto para que tu equipo trabaje con confianza.</p>
        </div>

        <div className="capability-context-grid">
          {capabilityHighlights.map((item, index) => (
            <article className={`capability-context-card capability-context-card-${item.visualKey}`} key={item.id}>
              <div className="capability-context-visual" aria-hidden="true">
                <Image
                  className="capability-context-image"
                  src={`/assets/difference-yuri/${item.id}.webp`}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 700px) 86vw, (max-width: 1080px) 42vw, 25vw"
                />
                <span className="capability-context-image-wash" />
                <span className="capability-context-orbit capability-context-orbit-one" />
                <span className="capability-context-orbit capability-context-orbit-two" />
                <span className="capability-context-node capability-context-node-one" />
                <span className="capability-context-node capability-context-node-two" />
                <span className="capability-context-node capability-context-node-three" />
                <span className="capability-context-index">0{index + 1}</span>
              </div>
              <div className="capability-context-card-copy">
                <p className="capability-context-eyebrow">{item.eyebrow}</p>
                <p className="capability-context-tagline">{item.contextTagline}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
