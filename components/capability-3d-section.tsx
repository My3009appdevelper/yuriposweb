import Image from "next/image";
import { capabilityHighlights } from "@/lib/yuri-content";

export function Capability3DSection() {
  return (
    <section className="capability-3d-section capability-section-3d capability-3d-light capability-3d-bleed" id="beneficios" aria-labelledby="capability-3d-title">
      <div className="container">
        <div className="capability-3d-intro">
          <div>
            <p className="eyebrow">Una vista más tangible</p>
            <h2 id="capability-3d-title">La operación, convertida en sistema.</h2>
          </div>
        </div>

        <div className="capability-3d-grid">
          {capabilityHighlights.map((item) => (
            <article className="capability-3d-card" key={item.id}>
              <p className="capability-3d-eyebrow capability-3d-card-eyebrow">{item.eyebrow}</p>
              <div className="capability-3d-art">
                <Image
                  src={`/assets/difference-yuri/${item.id}.webp`}
                  alt={`${item.title}: ilustración 3D de Yuri POS`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 700px) 86vw, (max-width: 1080px) 42vw, 25vw"
                />
              </div>
              <div className="capability-3d-card-copy">
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
