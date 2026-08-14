import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { YuriIcon } from "@/components/icons";
import type { AudienceStory, YuriModule } from "@/lib/yuri-content";

type AudienceSectionProps = {
  story: AudienceStory;
  modules: readonly YuriModule[];
};

export function AudienceSection({ story, modules }: AudienceSectionProps) {
  const isPharmacy = story.id === "farmacias";

  return (
    <section className={`audience-section audience-section-${story.id}`} id={story.id} aria-labelledby={`${story.id}-title`}>
      <div className="container audience-grid">
        <div className="audience-copy">
          <p className="eyebrow">{story.eyebrow}</p>
          <h2 id={`${story.id}-title`}>{story.title}</h2>
          <p className="audience-description">{story.description}</p>
          <ul className="audience-bullets">
            {story.bullets.map((bullet) => <li key={bullet}><Check size={16} aria-hidden="true" />{bullet}</li>)}
          </ul>
          <Link className="text-link" href="#precios">
            Ver planes <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="audience-module-panel">
          <div className="audience-panel-topline">
            <span className="audience-panel-kicker">{isPharmacy ? "Capacidades de farmacia" : "Capacidades para abarrotes"}</span>
            <span className="audience-panel-count">{modules.length} focos</span>
          </div>
          <div className="audience-module-list">
            {modules.map((module) => (
              <div className="audience-module-row" key={module.id}>
                <span className="audience-module-icon"><YuriIcon name={module.icon} size={19} /></span>
                <span><strong>{module.name}</strong><small>{module.summary}</small></span>
              </div>
            ))}
          </div>
          <p className="audience-panel-note">Una selección de lo que Yuri POS puede organizar para este tipo de negocio.</p>
        </div>
      </div>
    </section>
  );
}
