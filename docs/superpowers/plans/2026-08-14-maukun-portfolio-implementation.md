# MauKun Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first production-quality MauKun portfolio in Next.js with the approved Luminous Lab visual direction, Editorial index structure, and four-route navigation.

**Architecture:** Use the Next.js App Router with server-rendered pages, a small data layer for navigation and future products, and focused presentational components. Keep all copy and palette tokens centralized so the initial empty catalog can later accept real products without changing the shell.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules/global CSS, ESLint, and the browser for manual responsive QA.

## Global Constraints

- Routes are `/`, `/catalogo`, `/sobre-mi`, and `/contacto`.
- The navigation label is exactly `Catálogo`.
- The initial product list is empty; do not invent published applications.
- The visual direction is Luminous Lab with an Editorial index layout.
- Reuse Pharma POS colors as reference tokens: `#00B1FF`, `#F31322`, `#FDFFFF`, `#F7FBFF`, `#10212B`, `#516977`, `#08131B`, `#0E1A23`, `#132330`.
- Do not add Supabase, authentication, CMS, analytics, payments, or embedded Flutter apps.
- Respect `prefers-reduced-motion`, keyboard navigation, visible focus, semantic landmarks, and Spanish accents.
- Keep the temporary `.superpowers/` visual-companion directory out of commits.

---

### Task 1: Scaffold the Next.js application and global design tokens

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Create: `.eslintrc.json`
- Create: `.gitignore`
- Create: `app/globals.css`
- Create: `app/layout.tsx`

**Interfaces:**
- Produces the App Router root layout and CSS variables consumed by every later component.

- [ ] **Step 1: Write the package manifest and scripts**

Create scripts for `dev`, `build`, `start`, `lint`, and `typecheck`; pin Next.js/React/TypeScript major versions and keep the generated lockfile committed.

- [ ] **Step 2: Add the root layout**

Export metadata with the title `MauKun — Productos digitales con intención`, description in Spanish, and the `lang="es"` document attribute. Render `children` inside the global `SiteShell` slot without adding a client provider.

- [ ] **Step 3: Define global CSS tokens and responsive primitives**

Implement `:root` variables for the approved palette, typography stack, spacing, radii, shadows, container width, and focus ring. Add reset styles, body background, selection color, `:focus-visible`, reduced-motion overrides, and breakpoints at 720px and 1024px.

- [ ] **Step 4: Verify the scaffold**

Run `npm install`, `npm run lint`, `npm run typecheck`, and `npm run build`. Expected result: all commands pass with only the root route present at this checkpoint.

- [ ] **Step 5: Commit the scaffold**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts next-env.d.ts .eslintrc.json .gitignore app/globals.css app/layout.tsx
git commit -m "chore: scaffold MauKun Next app"
```

### Task 2: Implement the shared shell and navigation

**Files:**
- Create: `components/site-shell.tsx`
- Create: `components/navbar.tsx`
- Create: `components/footer.tsx`
- Create: `lib/navigation.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `lib/navigation.ts` exports `siteNavigation: readonly { href: string; label: string }[]` containing `/`, `/catalogo`, `/sobre-mi`, and `/contacto`.
- `Navbar` consumes the navigation list and the current pathname through a small client boundary; it exposes `aria-expanded` and a keyboard-operable mobile menu.
- `SiteShell` renders `<header>`, `<main>`, and `<footer>` landmarks.

- [ ] **Step 1: Add the navigation data contract**

Define the four links once and export a type-safe list. Do not repeat labels inside pages.

- [ ] **Step 2: Build the desktop/mobile navbar**

Create the MauKun wordmark as text plus a small geometric mark. Desktop shows links inline with an active cyan indicator; mobile uses a button labeled `Abrir menú`/`Cerrar menú`, a disclosure state, and a focusable vertical link list. Close the menu after route selection.

- [ ] **Step 3: Build the shell/footer**

Use a centered `max-width` container, a thin top border on the footer, and a secondary line explaining that MauKun is an independent digital product studio. Keep social/contact destinations optional until the user supplies them.

- [ ] **Step 4: Test navigation behavior**

Run the dev server and manually verify active states, keyboard opening/closing, Escape handling, focus visibility, and mobile layout at 390px and 768px widths.

- [ ] **Step 5: Commit the shell**

```bash
git add app/layout.tsx app/globals.css components/site-shell.tsx components/navbar.tsx components/footer.tsx lib/navigation.ts
git commit -m "feat: add MauKun navigation shell"
```

### Task 3: Build the editorial home and empty catalog

**Files:**
- Create: `lib/products.ts`
- Create: `components/editorial-hero.tsx`
- Create: `components/product-index.tsx`
- Create: `components/catalog-empty-state.tsx`
- Create: `components/contact-cta.tsx`
- Create: `app/page.tsx`
- Create: `app/catalogo/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `lib/products.ts` exports `ProductStatus`, `Product`, and `products: readonly Product[]`, initially `[]`.
- `ProductIndex` accepts `products: readonly Product[]` and renders either indexed items or `CatalogEmptyState`.
- `ProductIndexItem` uses `index`, `name`, `summary`, `status`, and optional `href` without assuming an external demo.

- [ ] **Step 1: Add the empty product data model**

Define the future-safe product type and export an empty array. Keep all product status labels mapped in one place for later localization.

- [ ] **Step 2: Implement the editorial hero**

Render the approved tone: a small uppercase eyebrow, a strong Spanish headline, a short paragraph, a primary `Ver catálogo` link, and a secondary `Conocer MauKun` link. Add a lightweight abstract visual made from CSS gradients and outlined cards; do not use fake app screenshots.

- [ ] **Step 3: Implement the product index and empty state**

Create numbered rows with a status pill and hover/focus affordance. With zero products, render a deliberate message that says MauKun está preparando sus primeros productos and points to `Sobre mí` and `Contacto`; it must not look like an error or loading state.

- [ ] **Step 4: Compose `/` and `/catalogo`**

`/` renders the hero, a short manifesto, the product index preview, and a contact CTA. `/catalogo` renders a page intro and the complete product index using the same data source.

- [ ] **Step 5: Verify home/catalog**

Run lint/typecheck/build, then manually inspect both routes at desktop and mobile widths. Confirm zero products produces stable layout and no broken links.

- [ ] **Step 6: Commit the catalog slice**

```bash
git add app/page.tsx app/catalogo/page.tsx components/editorial-hero.tsx components/product-index.tsx components/catalog-empty-state.tsx components/contact-cta.tsx lib/products.ts app/globals.css
git commit -m "feat: add editorial home and empty catalog"
```

### Task 4: Add Sobre mí and Contacto pages

**Files:**
- Create: `components/page-intro.tsx`
- Create: `app/sobre-mi/page.tsx`
- Create: `app/contacto/page.tsx`
- Create: `app/not-found.tsx`
- Modify: `components/footer.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `PageIntro` accepts `eyebrow`, `title`, and `description` strings.
- `Contacto` must not persist or submit data; it only renders configured contact affordances and an honest unavailable state until real contact details exist.

- [ ] **Step 1: Build the shared page intro**

Create a reusable semantic heading block with consistent spacing and responsive typography.

- [ ] **Step 2: Compose `/sobre-mi`**

Render a concise, honest studio/about narrative without claiming credentials or clients that have not been supplied. Include a structured “Cómo pienso” list and a link back to the catalog.

- [ ] **Step 3: Compose `/contacto`**

Render a clear invitation to contact MauKun and a non-error message that direct contact details will be added when configured. Avoid a form that appears to send successfully without a backend.

- [ ] **Step 4: Verify internal links and semantics**

Check heading order, landmark structure, link destinations, focus states, and the 404 fallback after adding `app/not-found.tsx` with the same visual language.

- [ ] **Step 5: Commit the internal pages**

```bash
git add app/sobre-mi/page.tsx app/contacto/page.tsx app/not-found.tsx components/page-intro.tsx components/footer.tsx app/globals.css
git commit -m "feat: add MauKun about and contact pages"
```

### Task 5: Production validation and handoff

**Files:**
- Modify: `app/layout.tsx` (only if metadata needs correction)
- Create: `README.md`

**Interfaces:**
- README documents local development, build, typecheck, and route map.

- [ ] **Step 1: Add project documentation**

Document `npm install`, `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`, the four routes, and the future product data entry point `lib/products.ts`.

- [ ] **Step 2: Run static validation**

Run `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check`. Record exact pass/fail output before handoff.

- [ ] **Step 3: Run manual visual validation**

Open the production build and inspect desktop (1440px), tablet (768px), and mobile (390px), including menu behavior, empty catalog, 404, keyboard focus, and reduced motion. Treat this as separate from static checks.

- [ ] **Step 4: Inspect final scope**

Run `git status --short` and `git diff --stat HEAD~5..HEAD` to confirm only the planned MauKun files are committed; leave `.superpowers/` untracked and unstaged.

- [ ] **Step 5: Commit documentation and verification notes**

```bash
git add README.md
git commit -m "docs: document MauKun development workflow"
```
