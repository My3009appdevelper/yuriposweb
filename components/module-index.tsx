"use client";

import { useState } from "react";
import { YuriIcon } from "@/components/icons";
import { ModuleCard } from "@/components/module-card";
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

export function ModuleIndex({ modules }: { modules: readonly YuriModule[] }) {
  const [activeGroupId, setActiveGroupId] = useState(moduleGroups[0].id);
  const modulesById = new Map(modules.map((module) => [module.id, module]));
  const activeGroup = moduleGroups.find((group) => group.id === activeGroupId) ?? moduleGroups[0];
  const activeModules = activeGroup.moduleIds
    .map((moduleId) => modulesById.get(moduleId))
    .filter((module): module is YuriModule => Boolean(module));
  const activeGroupTitleId = `module-group-${activeGroup.id}-title`;

  return (
    <section className="module-index-section" id="modulos" aria-labelledby={activeGroupTitleId}>
      <div className="container">
        <div className="module-group-tabs" role="tablist" aria-label="Áreas principales de Yuri POS">
          {moduleGroups.map((group) => {
            const isActive = group.id === activeGroup.id;
            const groupModules = group.moduleIds.filter((moduleId) => modulesById.has(moduleId));
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
                  <small>{groupModules.length} módulos</small>
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
            <p className="eyebrow">{activeGroup.eyebrow}</p>
            <h2 id={activeGroupTitleId}>{activeGroup.title}</h2>
            <p className="module-group-description">{activeGroup.description}</p>
          </div>
          <div className="module-grid">
            {activeModules.map((module) => <ModuleCard key={module.id} module={module} />)}
          </div>
        </section>
      </div>
    </section>
  );
}

