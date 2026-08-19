"use client";

import { useState } from "react";
import { YuriIcon } from "@/components/icons";
import { ModuleCard } from "@/components/module-card";
import { SectionHeading } from "@/components/section-heading";
import { moduleGroups, type YuriModule } from "@/lib/yuri-content";

const groupIcons: Record<string, string> = {
  administracion: "building-2",
  venta: "shopping-cart",
  inventario: "warehouse",
  compras: "shopping-basket",
  operacion: "receipt-text",
  reportes: "chart-no-axes-combined",
};

function getGroupLabel(eyebrow: string) {
  return eyebrow.replace(/^\d+\s*·\s*/, "");
}

function getGroupTitle(group: (typeof moduleGroups)[number]) {
  return `${getGroupLabel(group.eyebrow).toUpperCase()} · ${group.title}`;
}

export function ModuleIndex({ modules }: { modules: readonly YuriModule[] }) {
  const [activeGroupId, setActiveGroupId] = useState(moduleGroups[0].id);
  const modulesById = new Map(modules.map((module) => [module.id, module]));
  const activeGroup = moduleGroups.find((group) => group.id === activeGroupId) ?? moduleGroups[0];
  const activeModules = activeGroup.moduleIds
    .map((moduleId) => modulesById.get(moduleId))
    .filter((module): module is YuriModule => Boolean(module));
  const activeGroupTitleId = `module-group-${activeGroup.id}-title`;

  return (
    <section className="module-index-section" id="modulos" aria-labelledby="modules-title">
      <div className="container">
        <SectionHeading
          id="modules-title"
          eyebrow="Índice de módulos"
          title="Todo lo que tu operación necesita."
          description="Explora Yuri POS, cada módulo tiene un propósito concreto y te ayudará a crecer según la forma en que trabajes. Descubre que con este sistema puedes:"
        />

        <div className="module-group-tabs" role="tablist" aria-label="Áreas principales de Yuri POS">
          {moduleGroups.map((group) => {
            const isActive = group.id === activeGroup.id;
            const groupLabel = getGroupLabel(group.eyebrow);

            return (
              <button
                aria-controls={`module-panel-${group.id}`}
                aria-selected={isActive}
                className={`module-group-tab${isActive ? " module-group-tab-active" : ""}`}
                id={`module-tab-${group.id}`}
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                <span className="module-group-tab-icon">
                  <YuriIcon name={groupIcons[group.id] ?? "boxes"} size={21} />
                </span>
                <span className="module-group-tab-copy">
                  <strong>{groupLabel}</strong>
                </span>
              </button>
            );
          })}
        </div>

        <section
          aria-labelledby={activeGroupTitleId}
          aria-live="polite"
          className="module-group"
          id={`module-panel-${activeGroup.id}`}
          role="tabpanel"
          tabIndex={0}
        >
          <div className="module-group-heading">
            <h2 className="module-group-title" id={activeGroupTitleId}>{getGroupTitle(activeGroup)}</h2>
          </div>
          <div className="module-grid">
            {activeModules.map((module) => <ModuleCard key={module.id} module={module} />)}
          </div>
        </section>
      </div>
    </section>
  );
}

