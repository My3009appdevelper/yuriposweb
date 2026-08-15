# Yuri POS: vertical landing navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Yuri POS into a vertical landing page with contextual anchor navigation, an integrated contact section, and a highlighted live Demo link.

**Architecture:** Keep the existing App Router composition and global CSS architecture. Make `lib/navigation.ts` the single source of truth for route and landing-only links, add a focused `ContactSection` component, redirect the legacy contact route to the new anchor, and keep the Flutter iframe route unchanged.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, lucide-react, global CSS, existing Node verification scripts.

## Global Constraints

- Preserve the existing Spanish copy, UTF-8 encoding, accents and ñ.
- Keep the provided public contact channels exactly: `maufuku3009@gmail.com` and `+52 55 7075 7594`.
- Do not add a backend, form submission, database, Supabase migration or schema change.
- Do not modify the Flutter demo bundle, iframe sandbox, or the existing `next.config.ts` change.
- Keep Demo available at `/demo` and style it with `--color-primary-container: #cbefff` and `--color-on-primary-container: #00131c`.
- On non-landing routes show only Inicio and Demo; on `/` show Inicio, Módulos, Negocios, Planes, Contacto and Demo.
- Mobile navigation must remain icon-based and must not introduce a dropdown menu or horizontal page overflow.

---

### Task 1: Add a failing landing-navigation regression test

**Files:**
- Create: `scripts/verify-landing-navigation.mjs`

**Interfaces:**
- Reads `lib/navigation.ts`, `components/navbar.tsx`, `components/contact-section.tsx`, `app/page.tsx`, `app/contacto/page.tsx`, `app/globals.css`.
- Exits with code 1 and descriptive `[landing]` messages when the new navigation contract is missing.

- [ ] **Step 1: Write the failing test**

Create a Node script that asserts:

```js
const requiredHrefs = ["/#inicio", "/#modulos", "/#publico", "/#precios", "/#contacto", "/demo"];
for (const href of requiredHrefs) {
  if (!navigation.includes(href)) failures.push(`falta el enlace ${href}`);
}
if (navigation.includes('status: "soon"') || navbar.includes("Próximamente")) {
  failures.push("Demo todavía está marcada como próximamente");
}
for (const required of ["maufuku3009@gmail.com", "tel:+525570757594", "mailto:maufuku3009@gmail.com"]) {
  if (!contact.includes(required)) failures.push(`falta el canal ${required}`);
}
for (const anchor of ["id=\"inicio\"", "id=\"modulos\"", "id=\"publico\"", "id=\"precios\"", "id=\"contacto\""]) {
  if (!home.includes(anchor)) failures.push(`falta el ancla ${anchor}`);
}
if (!contactPage.includes('redirect("/#contacto")')) failures.push("/contacto no redirige a la sección integrada");
if (!styles.includes(".nav-link-demo") || !styles.includes("var(--color-primary-container)")) {
  failures.push("Demo no tiene la variante visual primaryContainer");
}
process.exitCode = failures.length ? 1 : 0;
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/verify-landing-navigation.mjs`

Expected: FAIL because the navigation still contains the old `/contacto` route, Demo still has `soon`, the contact section does not exist, and the new anchors are incomplete.

- [ ] **Step 3: Commit the failing contract**

```bash
git add scripts/verify-landing-navigation.mjs
git commit -m "test: define landing navigation contract"
```

### Task 2: Model contextual navigation and Demo styling hook

**Files:**
- Modify: `lib/navigation.ts`
- Modify: `components/navbar.tsx`

**Interfaces:**
- `NavigationItem` gains `landingOnly?: boolean` and `variant?: "demo"`.
- `siteNavigation` exposes `/#inicio`, `/#modulos`, `/#publico`, `/#precios`, `/#contacto` with `landingOnly: true` where appropriate, plus `/demo` with `variant: "demo"`.
- `Navbar` filters landing-only items when `pathname !== "/"` and resolves route activity from the path portion before any `#` anchor.

- [ ] **Step 1: Implement the data contract**

Use this navigation shape:

```ts
export type NavigationItem = {
  href: string;
  label: string;
  landingOnly?: boolean;
  variant?: "demo";
};

export const siteNavigation = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#modulos", label: "Módulos", landingOnly: true },
  { href: "/#publico", label: "Negocios", landingOnly: true },
  { href: "/#precios", label: "Planes", landingOnly: true },
  { href: "/#contacto", label: "Contacto", landingOnly: true },
  { href: "/demo", label: "Demo", variant: "demo" },
] as const;
```

- [ ] **Step 2: Render only the relevant items and icons**

In `Navbar`, derive `isLanding = pathname === "/"`, filter `siteNavigation`, map icons by item label, and add `nav-link-demo` when `item.variant === "demo"`. Remove `NavigationStatus`, `isSoon`, the `nav-soon-badge`, and all “Próximamente” aria text. `isNavigationItemActive` must compare `href.split("#")[0] || "/"` to the current pathname.

- [ ] **Step 3: Run the regression test**

Run: `node scripts/verify-landing-navigation.mjs`

Expected: FAIL only for missing anchors/contact section and the legacy contact route; contextual navigation and Demo status assertions should now pass.

- [ ] **Step 4: Commit the navigation slice**

```bash
git add lib/navigation.ts components/navbar.tsx
git commit -m "feat: add contextual landing navigation"
```

### Task 3: Add integrated contact section and landing anchors

**Files:**
- Create: `components/contact-section.tsx`
- Modify: `app/page.tsx`
- Modify: `app/contacto/page.tsx`
- Modify: `components/yuri-hero.tsx`
- Modify: `components/pricing-table.tsx`
- Modify: `components/footer.tsx`

**Interfaces:**
- `ContactSection` is a presentational component with no props and renders `section#contacto`.
- `HomePage` renders the component after pricing and wraps both audience sections in a `div#publico` anchor container.
- `ContactPage` redirects to `/#contacto` using `redirect` from `next/navigation`.

- [ ] **Step 1: Add the component with real contact links**

Create `ContactSection` with a commercial headline, a short truthful description, and two contact cards:

```tsx
<a href="mailto:maufuku3009@gmail.com">maufuku3009@gmail.com</a>
<a href="tel:+525570757594">+52 55 7075 7594</a>
```

Include primary actions “Escribirme por correo” and “Llamar ahora”, plus a secondary link to `#precios`. Use lucide icons and explicit aria labels.

- [ ] **Step 2: Add the anchors and update CTA destinations**

Add `id="inicio"` to `YuriHero`, wrap the two `AudienceSection` instances in `<div id="publico" className="audience-sections-anchor">`, render `<ContactSection />` in `HomePage`, and update plan/footer/hero CTA links that currently use `/contacto` to `/#contacto`.

- [ ] **Step 3: Replace the legacy contact page with a redirect**

```tsx
import { redirect } from "next/navigation";

export default function ContactPage() {
  redirect("/#contacto");
}
```

Keep page metadata only if it remains valid for the redirect route.

- [ ] **Step 4: Run the regression test**

Run: `node scripts/verify-landing-navigation.mjs`

Expected: FAIL only for missing CSS selectors; all anchors, contact links, redirect and content checks should pass.

- [ ] **Step 5: Commit the landing composition**

```bash
git add components/contact-section.tsx app/page.tsx app/contacto/page.tsx components/yuri-hero.tsx components/pricing-table.tsx components/footer.tsx
git commit -m "feat: integrate contact section into landing"
```

### Task 4: Style the landing contact block and responsive navbar

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Adds `.nav-link-demo`, `.audience-sections-anchor`, `.contact-section`, `.contact-card`, and supporting responsive selectors.
- Removes `.nav-link-soon` and `.nav-soon-badge` styles and any mobile references to the removed badge.

- [ ] **Step 1: Add the Demo variant**

Use `var(--color-primary-container)` and `var(--color-on-primary-container)` for `.nav-link-demo`, with a slightly stronger border/shadow on hover and a visible active underline.

- [ ] **Step 2: Add contact layout styles**

Create a two-column desktop block using the existing radii and spacing tokens. Use the primary-container as the visual surface for the contact section, dark text for contrast, and keep contact cards legible on mobile with one-column stacking.

- [ ] **Step 3: Preserve anchors under the sticky header**

Set `scroll-margin-top: 82px` for `.audience-sections-anchor` and `.contact-section`; preserve the existing scroll margins for modules and pricing.

- [ ] **Step 4: Fit six icon links on narrow screens**

At `max-width: 520px`, keep labels visually hidden but accessible, reduce only navbar logo/control dimensions, set `gap: 0`, and confirm the page itself has no horizontal overflow. Do not add a dropdown or horizontal scroller.

- [ ] **Step 5: Run the regression test and full checks**

Run:

```bash
node scripts/verify-landing-navigation.mjs
npm run test:demo
npm run lint
npm run typecheck
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 6: Commit the visual slice**

```bash
git add app/globals.css
git commit -m "style: finish vertical landing experience"
```

### Task 5: Verify production and publish

**Files:**
- No source changes expected; inspect the committed diff and deployment state.

**Interfaces:**
- Production URL remains `https://yuri-pos.vercel.app/`.
- `/demo` continues to expose the iframe at `/demo-app/index.html`.

- [ ] **Step 1: Inspect scope before publishing**

Run: `git status --short` and `git diff --cached --name-only`.

Expected: only the intended landing files are committed; the pre-existing `next.config.ts` worktree change remains unstaged.

- [ ] **Step 2: Publish the intended files to GitHub `main`**

Use the GitHub contents connector sequentially for changed files, preserving current blob SHAs and committing with the task messages. Do not overwrite unrelated files.

- [ ] **Step 3: Wait for Vercel**

Poll project `prj_LnQLosSpwIt0aGQHpiRkXyP2ij7l` until the deployment for the latest GitHub commit reaches `READY`.

- [ ] **Step 4: Browser verification**

At desktop and a 390×844 viewport, verify:

- home navbar contains six links and Demo has the pale-blue variant;
- `/demo` navbar contains only Inicio and Demo, with the Flutter iframe present;
- `#modulos`, `#publico`, `#precios`, and `#contacto` exist;
- contact email and phone have correct `mailto:` and `tel:` hrefs;
- `/contacto` resolves to `/#contacto`;
- there is no horizontal page overflow and no console error.

- [ ] **Step 5: Report deployment**

Provide the production URL, Vercel status, commit SHA, validation commands, and note that the provided contact information is now public by design.
