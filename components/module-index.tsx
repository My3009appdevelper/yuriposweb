"use client";

import { ModuleCard } from "@/components/module-card";
import { SectionHeading } from "@/components/section-heading";
import { moduleGroups, type PlanName, type YuriModule } from "@/lib/yuri-content";

const planLegend: readonly PlanName[] = ["Esencial", "Profesional", "Escala"];

export function ModuleIndex({ modules }: { modules: readonly YuriModule[] }) {
  const modulesById = new Map(modules.map((module) => [module.id, module]));

  return (
    <section className="module-index-section" id="modulos" aria-labelledby="modules-title">
      <div className="container">
        <SectionHeading
          id="modules-title"
          eyebrow="Índice de módulos"
          title="Todo lo que tu operación necesita."
          description="Explora Yuri POS, cada módulo tiene un propósito concreto y te ayudará a crecer según la forma en que trabajes. Descubre que con este sistema puedes:"
        />
        <p className="module-index-note">Algunas capacidades pueden depender del plan, la configuración y la operación de cada negocio.</p>
        <div className="module-plans-legend" aria-label="Planes disponibles en los módulos">
          {planLegend.map((plan) => (
            <span className={`module-plan-chip module-plan-chip-${plan.toLowerCase()}`} key={plan}>{plan}</span>
          ))}
        </div>
        <div className="module-groups">
          {moduleGroups.map((group) => {
            const groupModules = group.moduleIds
              .map((moduleId) => modulesById.get(moduleId))
              .filter((module): module is YuriModule => Boolean(module));
            const groupTitleId = `module-group-${group.id}-title`;

            return (
              <section className="module-group" id={`modulos-${group.id}`} aria-labelledby={groupTitleId} key={group.id}>
                <div className="module-group-heading">
                  <p className="eyebrow">{group.eyebrow}</p>
                  <h3 id={groupTitleId}>{group.title}</h3>
                  <p className="module-group-description">{group.description}</p>
                </div>
                <div className="module-grid">
                  {groupModules.map((module) => <ModuleCard key={module.id} module={module} />)}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

