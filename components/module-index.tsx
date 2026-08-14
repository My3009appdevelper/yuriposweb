"use client";

import { useState } from "react";
import { ModuleCard } from "@/components/module-card";
import { SectionHeading } from "@/components/section-heading";
import { moduleCategories, type ModuleCategory, type YuriModule } from "@/lib/yuri-content";

type Filter = "Todas" | ModuleCategory;

export function ModuleIndex({ modules }: { modules: readonly YuriModule[] }) {
  const [filter, setFilter] = useState<Filter>("Todas");
  const visibleModules = filter === "Todas" ? modules : modules.filter((module) => module.category === filter);

  return (
    <section className="module-index-section" id="modulos" aria-labelledby="modules-title">
      <div className="container">
        <SectionHeading
          id="modules-title"
          eyebrow="Índice de módulos"
          title="Todo lo que tu operación necesita, en un mismo sistema."
          description="Explora Yuri POS por áreas. Cada módulo tiene un propósito concreto y puede crecer contigo según la forma en que trabajas."
        />
        <div className="module-index-toolbar">
          <div className="module-filters" role="group" aria-label="Filtrar módulos por categoría">
            <button
              className={`module-filter${filter === "Todas" ? " module-filter-active" : ""}`}
              type="button"
              aria-pressed={filter === "Todas"}
              onClick={() => setFilter("Todas")}
            >
              Todas <span>{modules.length}</span>
            </button>
            {moduleCategories.map((category) => {
              const count = modules.filter((module) => module.category === category).length;
              return (
                <button
                  className={`module-filter${filter === category ? " module-filter-active" : ""}`}
                  type="button"
                  aria-pressed={filter === category}
                  key={category}
                  onClick={() => setFilter(category)}
                >
                  {category} <span>{count}</span>
                </button>
              );
            })}
          </div>
          <p className="module-index-count" aria-live="polite">
            Mostrando <strong>{visibleModules.length}</strong> módulos
          </p>
        </div>
        <div className="module-grid">
          {visibleModules.map((module) => <ModuleCard key={module.id} module={module} />)}
        </div>
        <p className="module-index-note">Algunas capacidades pueden depender del plan, la configuración y la operación de cada negocio.</p>
      </div>
    </section>
  );
}
