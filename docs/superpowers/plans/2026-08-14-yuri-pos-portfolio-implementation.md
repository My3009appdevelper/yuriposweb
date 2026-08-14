# Yuri POS Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the approved MauKun scaffold into a truthful, polished Yuri POS sales portfolio with a module index, audience-specific sections, reference pricing, contact and demo-standby routes.

**Architecture:** Keep Next.js App Router with server-rendered content and small client boundaries only for pathname-aware navigation, module filtering and monthly/annual pricing. Store all product/module/plan copy in typed data files, and render focused presentational components from those data structures. Use global CSS tokens and a hand-authored SVG map for the hero instead of external images or fake app screenshots.

**Tech Stack:** Next.js 16, React 19, TypeScript, `lucide-react`, App Router, ESLint flat config, CSS in `app/globals.css`.

## Global Constraints

- Brand name shown to users is **Yuri POS**; do not leave MauKun copy in the active UI.
- Navbar labels are exactly **Inicio**, **Contacto**, **Demo**.
- Routes are `/`, `/contacto`, `/demo`, and `app/not-found.tsx`.
- Initial content is based only on the inspected `C:\Apps\pharma-pos` modules and the approved design spec.
- Prices are marked as reference values during development: Esencial 499/4,990, Profesional 899/8,990, Escala 1,499/14,990 MXN.
- Use brand colors `#00B1FF`, `#F31322`, `#FDFFFF`, `#F7FBFF`, `#10212B`, `#516977`, `#08131B`, `#0E1A23`, `#132330`.
- No Supabase, auth, CMS, analytics, payments, backend form handling, migrations, embedded Flutter demo, or push to GitHub.
- Preserve UTF-8 Spanish copy, accents, ñ, and honest capability boundaries.
- Keep `.superpowers/` ignored and out of commits.

---

### Task 1: Rebrand the shared scaffold for Yuri POS

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`
- Modify: `package-lock.json` via `npm install`

**Interfaces:**
- Produces global metadata and CSS primitives used by every later component.
- Adds `lucide-react` for the approved line icon language.

- [ ] **Step 1: Replace metadata and global brand tokens**

Set the root title to `Yuri POS — Más que un punto de venta` and use a Spanish description describing business management for pharmacies and grocery stores. Keep `<html lang="es">`. Extend global CSS with the approved tokens, typography, buttons, sections, card states, responsive container, and reduced-motion rules. Remove active MauKun copy from metadata.

- [ ] **Step 2: Install the icon dependency**

Run:

```powershell
npm install lucide-react
```

Expected: `package.json` and `package-lock.json` include `lucide-react` with no audit vulnerabilities introduced.

- [ ] **Step 3: Verify the shared scaffold**

Run:

```powershell
npm run lint
npm run typecheck
npm run build
```

Expected: all commands pass with the root page still renderable.

- [ ] **Step 4: Commit the scaffold rebrand**

```powershell
git add app/layout.tsx app/globals.css package.json package-lock.json
git commit -m "chore: rebrand portfolio scaffold for Yuri POS"
```

### Task 2: Implement the Yuri POS shell and exact navbar

**Files:**
- Create: `lib/navigation.ts`
- Create: `components/navbar.tsx`
- Create: `components/site-shell.tsx`
- Create: `components/footer.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `siteNavigation: readonly { href: string; label: string; status?: "active" | "soon" }[]` contains `/`, `/contacto`, `/demo`.
- `SiteShell({ children }: { children: React.ReactNode })` wraps all routes.

- [ ] **Step 1: Define the navigation data**

Create `siteNavigation` with labels exactly `Inicio`, `Contacto`, and `Demo`; mark only Demo as `soon`.

- [ ] **Step 2: Build the accessible client navbar**

Use `usePathname` only in `components/navbar.tsx`. Render a text logo `YURI POS`, desktop links, a mobile toggle with `aria-expanded`/`aria-controls`, Escape handling, and close-on-route-change. Demo remains a real link to `/demo`, with a visible “Próximamente” treatment.

- [ ] **Step 3: Add the shell and footer**

Create `SiteShell` with `header`, `main`, and `Footer` landmarks. Footer must reiterate the honest product category and provide internal links without inventing contact destinations.

- [ ] **Step 4: Verify the shell**

Run lint/typecheck/build. Start the dev server and manually check 390 px, 768 px and desktop widths, keyboard focus, Escape, active links and Demo state.

- [ ] **Step 5: Commit the shell**

```powershell
git add app/layout.tsx app/globals.css lib/navigation.ts components
git commit -m "feat: add Yuri POS navigation shell"
```

### Task 3: Add typed modules, hero map and general landing page

**Files:**
- Create: `lib/yuri-content.ts`
- Create: `components/icons.tsx`
- Create: `components/hero-map.tsx`
- Create: `components/yuri-hero.tsx`
- Create: `components/capability-strip.tsx`
- Create: `components/module-index.tsx`
- Create: `components/module-card.tsx`
- Create: `components/section-heading.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `type Audience = "general" | "farmacias" | "abarrotes"`.
- `type ModuleCategory = "Venta" | "Inventario" | "Compras" | "Administración" | "Operación" | "Recetas" | "Fiscal" | "Reportes"`.
- `type YuriModule = { id: string; category: ModuleCategory; name: string; summary: string; audiences: readonly Audience[]; plan: "Esencial" | "Profesional" | "Escala"; icon: string }`.
- `yuriModules: readonly YuriModule[]` contains the full approved module catalog.
- `ModuleIndex({ modules }: { modules: readonly YuriModule[] })` renders category navigation and accessible cards.

- [ ] **Step 1: Add the typed content catalog**

Encode all approved module names and concise Spanish sales descriptions in `lib/yuri-content.ts`. Include audience tags and plan labels. Add general differentiators and two audience section copy blocks. Do not include claims about COFEPRIS, billing or production validation.

- [ ] **Step 2: Create reusable line icons**

Map the content icon keys to `lucide-react` components in `components/icons.tsx`. Keep the icon map typed and provide a stable fallback icon.

- [ ] **Step 3: Build the SVG hero map**

Create a server component with accessible `aria-label`/`role="img"`, five connected nodes and responsive layout. Use only approved colors and CSS variables; no fake dashboard screenshot.

- [ ] **Step 4: Build the general landing composition**

Compose Hero, capability strip, `#modulos` module index and a CTA toward `#farmacias`, `#abarrotes` and `#precios`. Use semantic headings and internal links.

- [ ] **Step 5: Verify landing behavior**

Run lint/typecheck/build. Manually verify all module categories render, no cards have invented features, the SVG does not overflow on mobile, and anchors scroll to the correct sections.

- [ ] **Step 6: Commit the landing**

```powershell
git add app/page.tsx app/globals.css lib/yuri-content.ts components
git commit -m "feat: add Yuri POS landing and module index"
```

### Task 4: Add audience sections, pricing and honest standby pages

**Files:**
- Create: `components/audience-section.tsx`
- Create: `components/pricing-table.tsx`
- Create: `components/page-intro.tsx`
- Create: `app/contacto/page.tsx`
- Create: `app/demo/page.tsx`
- Create: `app/not-found.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `AudienceSection({ id, title, description, bullets, tone }: ...)` is reusable for Farmacias/Abarrotes.
- `PricingTable({ plans }: { plans: readonly PricingPlan[] })` is a client boundary with monthly/annual toggle.
- `type PricingPlan = { id: string; name: string; monthly: number; annual: number; summary: string; features: readonly string[]; featured?: boolean }`.

- [ ] **Step 1: Add the two audience sections**

Use real differentiators: pharmacy cards emphasize lots/caducidad, recipes/medical data, environmental control and fiscal; grocery cards emphasize checkout, catalog, suppliers, promotions, customers and reports. Keep copy direct and avoid regulatory overclaims.

- [ ] **Step 2: Add the pricing selector**

Render Esencial, Profesional and Escala. Toggle values without hydration mismatch, show annual savings, highlight Profesional, and label prices as reference during development.

- [ ] **Step 3: Add contact and demo routes**

Contact explains that the direct channel is being configured and offers internal navigation to capabilities/pricing; it must not show a fake successful submission. Demo explains that an isolated, ephemeral web demo is planned and currently unavailable.

- [ ] **Step 4: Add the 404 route**

Use Yuri POS copy, a link to Inicio and a link to Contacto.

- [ ] **Step 5: Verify routes and semantics**

Run lint/typecheck/build. Check `/`, `/contacto`, `/demo`, an unknown path, monthly/annual toggle, anchors, focus states and mobile layout.

- [ ] **Step 6: Commit audience, pricing and routes**

```powershell
git add app/page.tsx app/contacto app/demo app/not-found.tsx app/globals.css components
git commit -m "feat: add Yuri POS audiences pricing and standby routes"
```

### Task 5: Document deployment handoff and perform final validation

**Files:**
- Create: `README.md`
- Modify: `app/layout.tsx` if metadata needs final refinement

- [ ] **Step 1: Document local and Vercel workflow**

README must list Node/npm prerequisites, `npm install`, `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`, routes, content entry points, pricing-reference warning, and the fact that no GitHub push or Vercel deployment was performed.

- [ ] **Step 2: Run production checks**

Run:

```powershell
npm run lint
npm run typecheck
npm run build
git diff --check
git status --short
```

Expected: all checks pass; `.superpowers/` remains ignored and no unrelated source is staged.

- [ ] **Step 3: Perform manual acceptance review**

Review desktop, tablet and 390 px mobile widths; navbar keyboard flow; Demo standby state; module category navigation; Farmacias/Abarrotes copy; pricing toggle; contact honesty; 404; reduced motion.

- [ ] **Step 4: Commit the handoff docs**

```powershell
git add README.md
git commit -m "docs: document Yuri POS portfolio handoff"
```
