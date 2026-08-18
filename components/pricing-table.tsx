"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { pricingPlans, type PricingPlan } from "@/lib/yuri-content";

type BillingPeriod = "monthly" | "annual";

export function PricingTable({ plans = pricingPlans }: { plans?: readonly PricingPlan[] }) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <div className="pricing-table-wrap">
      <div className="pricing-toggle" role="group" aria-label="Seleccionar periodicidad de pago">
        <button className={period === "monthly" ? "pricing-toggle-active" : ""} type="button" aria-pressed={period === "monthly"} onClick={() => setPeriod("monthly")}>
          Mensual
        </button>
        <button className={period === "annual" ? "pricing-toggle-active" : ""} type="button" aria-pressed={period === "annual"} onClick={() => setPeriod("annual")}>
          Anual <span>Ahorra 2 meses</span>
        </button>
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => {
          const price = period === "monthly" ? plan.monthly : plan.annual;
          const cadence = period === "monthly" ? "/ mes" : "/ año";
          return (
            <article className={`pricing-card${plan.featured ? " pricing-card-featured" : ""}`} key={plan.id}>
              {plan.featured ? <div className="pricing-featured-badge"><Sparkles size={13} aria-hidden="true" /> Más elegido</div> : null}
              <p className="pricing-kicker">{plan.name === "Esencial" ? "Para comenzar" : plan.name === "Profesional" ? "Para crecer" : "A tu medida"}</p>
              <h3>{plan.name}</h3>
              <p className="pricing-summary">{plan.summary}</p>
              <div className="pricing-amount"><strong>{price}</strong><span>MXN {cadence}</span></div>
              <p className="pricing-inclusion">{plan.inclusionLabel}</p>
              <ul className="pricing-limits">
                {plan.limits.map((limit) => <li key={limit}>{limit}</li>)}
              </ul>
              <ul className="pricing-features">
                {plan.features.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>)}
              </ul>
              <p className="pricing-extra-note">{plan.extraNote}</p>
            </article>
          );
        })}
      </div>
      <p className="pricing-maintenance">Todos los planes incluyen mantenimiento y actualizaciones recurrentes para mejorar continuamente la calidad, seguridad y estabilidad del sistema.</p>
      <p className="pricing-sales-note">¿Necesitas una combinación distinta? <Link href="/#contacto">Platicar con el equipo de ventas para encontrar una cotización perfecta según tus necesidades <ArrowRight size={15} aria-hidden="true" /></Link></p>
      <p className="pricing-disclaimer">Precios de referencia durante el desarrollo. El alcance, los límites y la contratación final se definirán antes de publicar.</p>
    </div>
  );
}

