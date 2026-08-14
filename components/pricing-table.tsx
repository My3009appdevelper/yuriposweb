"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { pricingPlans, type PricingPlan } from "@/lib/yuri-content";

type BillingPeriod = "monthly" | "annual";

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-MX").format(value);
}

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
          const monthlyEquivalent = Math.round(plan.annual / 12);
          return (
            <article className={`pricing-card${plan.featured ? " pricing-card-featured" : ""}`} key={plan.id}>
              {plan.featured ? <div className="pricing-featured-badge"><Sparkles size={13} aria-hidden="true" /> Más elegido</div> : null}
              <p className="pricing-kicker">{plan.name === "Esencial" ? "Para comenzar" : plan.name === "Profesional" ? "Para crecer" : "A tu medida"}</p>
              <h3>{plan.name}</h3>
              <p className="pricing-summary">{plan.summary}</p>
              <div className="pricing-amount"><strong>${formatPrice(price)}</strong><span>MXN {cadence}</span></div>
              {period === "annual" ? <p className="pricing-equivalent">Equivale a ${formatPrice(monthlyEquivalent)} MXN al mes.</p> : null}
              <ul className="pricing-features">
                {plan.features.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>)}
              </ul>
              <Link className={`button ${plan.featured ? "button-primary" : "button-quiet"}`} href="/contacto">
                Conocer este plan <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
      <p className="pricing-disclaimer">Precios de referencia durante el desarrollo. El alcance, los límites y la contratación final se definirán antes de publicar.</p>
    </div>
  );
}
