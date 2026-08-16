import Image from "next/image";
import { YuriIcon } from "@/components/icons";
import type { YuriModule } from "@/lib/yuri-content";

export function ModuleCard({ module }: { module: YuriModule }) {
  if (module.visualAsset) {
    return (
      <article className="module-visual-item">
        <div className="module-visual-meta">
          <p className="module-visual-category">{module.category}</p>
          <span className={`module-plan module-plan-${module.plan.toLowerCase()}`}>{module.plan}</span>
        </div>
        <div className="module-visual-art">
          <Image
            src={module.visualAsset}
            alt={`${module.name}: ilustración 3D de Yuri POS`}
            fill
            loading="lazy"
            sizes="(max-width: 700px) 86vw, (max-width: 1050px) 42vw, 25vw"
          />
        </div>
        <div className="module-visual-copy">
          <h3>{module.name}</h3>
          <p>{module.summary}</p>
        </div>
      </article>
    );
  }

  const audienceLabel = module.audiences.includes("farmacias") && module.audiences.includes("abarrotes")
    ? "Farmacias y abarrotes"
    : module.audiences.includes("farmacias")
      ? "Especializado en farmacia"
      : module.audiences.includes("abarrotes")
        ? "Ideal para abarrotes"
        : "Administración de Yuri POS";

  return (
    <article className="module-card">
      <div className="module-card-topline">
        <span className="module-icon"><YuriIcon name={module.icon} size={21} /></span>
        <span className={`module-plan module-plan-${module.plan.toLowerCase()}`}>{module.plan}</span>
      </div>
      <p className="module-category">{module.category}</p>
      <h3>{module.name}</h3>
      <p className="module-summary">{module.summary}</p>
      <p className="module-audience">{audienceLabel}</p>
    </article>
  );
}
