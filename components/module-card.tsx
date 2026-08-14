import { YuriIcon } from "@/components/icons";
import type { YuriModule } from "@/lib/yuri-content";

export function ModuleCard({ module }: { module: YuriModule }) {
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
