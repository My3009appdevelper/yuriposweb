# Yuri Difference Visual Variants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Mostrar las cuatro ventajas de Yuri POS en tres presentaciones visuales consecutivas: editorial, 3D y contextual.

**Architecture:** Mantener `capabilityHighlights` como fuente única del contenido y crear una presentación de datos derivada para que las tres variantes compartan títulos, descripciones y orden. La sección actual seguirá siendo el bloque editorial; dos componentes nuevos consumirán la misma configuración para la variante 3D y la variante contextual. Los cuatro assets 3D transparentes vivirán en `public/assets/difference-yuri/`; la variante contextual usará CSS y solo añadirá imágenes si la validación demuestra que aportan valor.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS global existente, lucide-react, `imagegen` integrado.

## Global Constraints

- Trabajar únicamente sobre `main`.
- No modificar navegación, demo Flutter, Supabase, Drift ni el bundle salvo los assets visuales solicitados.
- Conservar `capabilityHighlights` como fuente única; no duplicar copy comercial entre componentes.
- Los assets 3D deben ser transparentes, sin texto, logos, watermark ni marcas inventadas.
- Mantener la paleta Yuri: navy `#08131B`, azul `#00B1FF`, cyan suave, blanco y acento rojo discreto.
- Desktop: cuatro tarjetas; tablet: dos; móvil: una, sin overflow horizontal.
- Respetar `prefers-reduced-motion` y preservar accesibilidad cuando el hover no esté disponible.

---

### Task 1: Crear el contrato de regresión para las tres presentaciones

**Files:**
- Modify: `scripts/verify-landing-navigation.mjs`
- Test target: `components/capability-strip.tsx`, `components/capability-3d-section.tsx`, `components/capability-context-section.tsx`

**Interfaces:**
- Consumes: source strings from the three capability components and the asset directory.
- Produces: a deterministic Node check that fails until all three sections and four 3D asset paths exist.

- [ ] **Step 1: Write the failing assertions**

Add these checks before the failure loop:

```js
const capabilityEditorial = readProjectFile("components/capability-strip.tsx");
const capability3d = readProjectFile("components/capability-3d-section.tsx");
const capabilityContext = readProjectFile("components/capability-context-section.tsx");

for (const marker of [
  "capability-section-3d",
  "capability-section-context",
]) {
  if (!capability3d.includes(marker) && !capabilityContext.includes(marker)) {
    failures.push(`falta la presentación ${marker}`);
  }
}

for (const asset of [
  "offline-first.webp",
  "multisucursal.webp",
  "roles-permisos.webp",
  "reportes-operativos.webp",
]) {
  if (!existsSync(resolve(root, "public", "assets", "difference-yuri", asset))) {
    failures.push(`falta el asset 3D ${asset}`);
  }
}

if (!capabilityEditorial.includes("capability-section-editorial")) {
  failures.push("falta la presentación editorial");
}
```

- [ ] **Step 2: Run the regression check and verify RED**

Run:

```bash
node scripts/verify-landing-navigation.mjs
```

Expected: FAIL because the two new components and the four assets todavía no existen.

- [ ] **Step 3: Commit the red test**

```bash
git add scripts/verify-landing-navigation.mjs
git commit -m "test: define Yuri difference visual variants"
```

---

### Task 2: Crear la configuración compartida y la presentación editorial

**Files:**
- Modify: `lib/yuri-content.ts`
- Modify: `components/capability-strip.tsx`
- Modify: `app/page.tsx`
- Test: `scripts/verify-landing-navigation.mjs`

**Interfaces:**
- Consumes: `capabilityHighlights` and its existing item fields.
- Produces: `<CapabilityStrip />` with `id="diferencia-editorial"` and a stable section class for the regression check; `capabilityHighlights` remains unchanged as the source of title/description/copy.

- [ ] **Step 1: Define only the visual metadata needed by later components**

Extend the existing capability item type/data with stable fields for the four assets:

```ts
type CapabilityVisual = {
  id: "offline-first" | "multisucursal" | "roles-permisos" | "reportes-operativos";
  asset: string;
  context: string;
};
```

Keep the existing Spanish title, eyebrow, description and icon values intact; add the visual metadata beside each matching item rather than creating a second copy array.

- [ ] **Step 2: Add the editorial marker without changing its current appearance**

Render the existing `CapabilityStrip` section with `id="diferencia-editorial"` and class `capability-section capability-section-editorial`. Keep the current cards and `YuriIcon` implementation intact.

- [ ] **Step 3: Place the new sections after the editorial block**

In `app/page.tsx`, render the sections in this order immediately after `<CapabilityStrip />`:

```tsx
<Capability3DSection />
<CapabilityContextSection />
```

Do not move the module index, audience sections, pricing or contact blocks.

- [ ] **Step 4: Run the check and verify GREEN for the editorial marker**

Run:

```bash
node scripts/verify-landing-navigation.mjs
```

Expected: only the new section and asset assertions remain failing.

- [ ] **Step 5: Commit the shared/editorial slice**

```bash
git add lib/yuri-content.ts components/capability-strip.tsx app/page.tsx
git commit -m "refactor: prepare shared Yuri difference content"
```

---

### Task 3: Generate and validate the four transparent 3D assets

**Files:**
- Create: `public/assets/difference-yuri/offline-first.webp`
- Create: `public/assets/difference-yuri/multisucursal.webp`
- Create: `public/assets/difference-yuri/roles-permisos.webp`
- Create: `public/assets/difference-yuri/reportes-operativos.webp`

**Interfaces:**
- Consumes: approved Yuri palette and the four visual briefs from the spec.
- Produces: four transparent raster assets, each centered for a card and free of text/logos/watermarks.

- [ ] **Step 1: Generate one asset per prompt with built-in `image_gen`**

Use one generation call per asset. Each prompt must include:

```text
Use case: Yuri POS landing page card illustration.
Style: premium 3D product visualization, soft studio lighting, clean isometric perspective.
Palette: #08131B navy, #00B1FF Yuri blue, cyan highlights, white surfaces, restrained red accent.
Composition: single centered object/group with generous transparent padding; readable at 180px wide.
Constraints: transparent background, no words, no letters, no logo, no watermark, no UI text, no extra brands.
```

Use these subjects:

- `offline-first.webp`: compact checkout terminal, local network ring and a disconnected signal symbol that still has a glowing local path.
- `multisucursal.webp`: three small storefront nodes connected to a central Yuri-like operational hub, no logo text.
- `roles-permisos.webp`: layered security shield, access key and permission rings, polished but friendly.
- `reportes-operativos.webp`: floating analytics panel, chart bars, trend line and three light indicator dots, no text.

- [ ] **Step 2: Inspect each generated output**

Verify visually that the subject is centered, the background is actually transparent, the palette is coherent, and no generated text or watermark appears.

- [ ] **Step 3: Move the selected assets into the workspace**

Copy the validated files into `public/assets/difference-yuri/` using the stable names above. Do not overwrite an existing asset without explicit approval.

- [ ] **Step 4: Validate asset metadata**

Run a local image inspection that confirms all four files exist and report their dimensions/alpha information before wiring them into JSX.

- [ ] **Step 5: Commit the assets**

```bash
git add public/assets/difference-yuri
git commit -m "feat: add Yuri difference 3D assets"
```

---

### Task 4: Implement the 3D and contextual sections

**Files:**
- Create: `components/capability-3d-section.tsx`
- Create: `components/capability-context-section.tsx`
- Modify: `app/globals.css`
- Modify: `scripts/verify-landing-navigation.mjs`

**Interfaces:**
- Consumes: shared capability metadata from `lib/yuri-content.ts` and the four `/assets/difference-yuri/*.webp` files.
- Produces: accessible sections with classes `capability-section-3d` and `capability-section-context`, four cards per section, lazy-loaded images and no new runtime dependency.

- [ ] **Step 1: Write the failing component contract assertions**

Require each new component source to contain the section class, all four stable asset paths, and an `alt` attribute. Run the regression script and confirm it fails until the implementation is present.

- [ ] **Step 2: Implement `Capability3DSection`**

Render a section with navy background, eyebrow `La diferencia Yuri · 3D`, title `La operación, convertida en sistema.` and a four-card grid. Use `next/image` with `loading="lazy"` for the generated asset, descriptive Spanish alt text, the shared eyebrow/title/description copy, and a subtle visual caption derived from the context metadata.

- [ ] **Step 3: Implement `CapabilityContextSection`**

Render a light section with eyebrow `La diferencia Yuri · En contexto`, title `Lo que cambia en tu día.` and four cards whose background treatment comes from CSS custom properties/classes. Keep the copy above the background layer and use a decorative pseudo-element or gradient so the content remains readable.

- [ ] **Step 4: Add focused CSS**

Add styles for the two sections, their grids, cards, 3D image frame, context backgrounds, hover lift and focus states. Add breakpoints so the grid becomes 2 columns at tablet width and 1 column at mobile width. Under `prefers-reduced-motion`, remove transforms/transitions.

- [ ] **Step 5: Run the regression check and verify GREEN**

Run:

```bash
node scripts/verify-landing-navigation.mjs
```

Expected: PASS with all three section markers and four asset paths present.

- [ ] **Step 6: Commit the sections and styles**

```bash
git add components/capability-3d-section.tsx components/capability-context-section.tsx app/globals.css scripts/verify-landing-navigation.mjs
git commit -m "feat: add Yuri difference visual sections"
```

---

### Task 5: Validate the complete landing and production handoff

**Files:**
- Test: `scripts/verify-landing-navigation.mjs`, `scripts/verify-demo-embed.mjs`

- [ ] **Step 1: Run focused checks**

```bash
node scripts/verify-landing-navigation.mjs
npm run test:demo
npm run lint
npm run typecheck
```

- [ ] **Step 2: Run the production build**

```bash
npm run build
```

Expected: Next.js build succeeds and routes `/`, `/demo`, and `/contacto` remain available.

- [ ] **Step 3: Verify desktop and mobile browser states**

On `/`, verify the three sections appear in order, the four 3D images load, the contextual cards remain readable, and `document.documentElement.scrollWidth <= document.documentElement.clientWidth` at desktop and 390px mobile widths.

On `/demo`, verify the iframe source remains `/demo-app/index.html` and the contextual landing-only links remain hidden.

- [ ] **Step 4: Publish `main` and inspect Vercel**

Push the committed changes to `main`, wait for the production deployment to reach `READY`, and confirm the public URL renders the three sections without console errors.

- [ ] **Step 5: Commit validation notes only if required**

Do not add generated logs or screenshots to the repository. Report the verified URL, deployment status and any manual visual limitation in the handoff.
