# Yuri POS: vertical module groups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the tabbed module index with six commercial, vertically stacked module groups and a static plan legend.

**Architecture:** Keep `ModuleCard` as the visual module renderer. Add `moduleGroups` to the content model and let `ModuleIndex` resolve each group’s ordered IDs into grids. Use focused CSS for full-width group headings, wrapped plan chips, and responsive spacing.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, global CSS, Node verification scripts.

## Global Constraints

- Preserve Spanish accents, UTF-8 text and the existing visual module order inside each requested group.
- Remove visible tabs, filter state, category count badges and the old “Mostrando”/filter interaction.
- Keep the module visual order plan → blue module title → image → description.
- Keep six columns on large screens and responsive fallbacks at existing breakpoints.
- Do not modify Flutter, Supabase, Demo, migrations or unrelated landing sections.

### Task 1: Define the vertical-group regression contract

**Files:**
- Modify: `scripts/verify-module-index.mjs`

**Interfaces:**
- The script reads `components/module-index.tsx`, `lib/yuri-content.ts`, `app/globals.css` and `components/module-card.tsx`.
- It exits non-zero with descriptive messages when filters remain, the group order is wrong, or a removed module is visible.

- [ ] **Step 1: Assert the new contract**

Add checks for:

```js
if (component.includes("useState") || component.includes("module-filters")) failures.push("el índice todavía usa pestañas o estado de filtros");
if (!component.includes("module-plans-legend") || component.indexOf("module-index-note") > component.indexOf("module-plans-legend")) failures.push("la nota y la guía de planes no preceden a los grupos");
for (const id of ["administracion", "venta", "inventario", "compras", "operacion", "reportes"]) {
  if (!content.includes(`id: \"${id}\"`)) failures.push(`falta el grupo vertical ${id}`);
}
if (content.includes('id: "movimientos-inventario"')) failures.push("Movimientos de inventario todavía está visible");
if (!content.includes('name: "Departamentos"')) failures.push("Inventario no muestra Departamentos como módulo independiente");
```

Assert the requested module ID order by comparing `indexOf` positions for each group list in `moduleGroups`.

- [ ] **Step 2: Run the script and confirm RED**

Run `node scripts/verify-module-index.mjs`. It must fail because the current component still has `useState` and the content has no `moduleGroups` contract.

### Task 2: Model group narratives and requested module membership

**Files:**
- Modify: `lib/yuri-content.ts`

**Interfaces:**
- Add `ModuleGroup` with `id`, `eyebrow`, `title`, `description` and `moduleIds`.
- Export `moduleGroups` in the exact order used by the landing page.

- [ ] **Step 1: Add the group type and six narrative records**

Use the requested IDs and persuasive descriptions from the design spec; preserve each module’s plan, asset and summary.

- [ ] **Step 2: Remove the visible inventory-movement module and rename Departments**

Delete the `movimientos-inventario` record from `yuriModules`. Change `departamentos-categorias` to `name: "Departamentos"` and update its summary to describe organizing the catalog by departments.

- [ ] **Step 3: Reorder Administration records**

Keep all requested administration records but make `roles-permisos` follow `cajas`, before `personal`, `vacaciones`, `comisiones` and `anuncios`.

- [ ] **Step 4: Run the script and confirm only component/style failures remain**

Run `node scripts/verify-module-index.mjs` and confirm the data-order assertions pass while component/style assertions still fail.

### Task 3: Replace tabs with vertical group rendering

**Files:**
- Modify: `components/module-index.tsx`

**Interfaces:**
- `ModuleIndex` continues accepting `modules: readonly YuriModule[]`.
- It imports `moduleGroups`, maps IDs to modules, and renders one `section.module-group` per group.

- [ ] **Step 1: Remove filter state and buttons**

Remove `useState`, `moduleCategories`, `Filter`, `visibleModules`, toolbar buttons and counts.

- [ ] **Step 2: Render the full-width intro and static plan legend**

Use title `Todo lo que tu operación necesita.` and the specified subtitle. Render the note immediately after the heading description, followed by chips for `Esencial`, `Profesional` and `Escala`.

- [ ] **Step 3: Render six ordered groups**

Each group renders an eyebrow, `h3` title, full-width description and a `module-grid` of resolved `ModuleCard`s. Skip unknown IDs defensively without changing known ordering.

- [ ] **Step 4: Run the script and confirm GREEN for structure**

Run `node scripts/verify-module-index.mjs`; only CSS assertions may remain.

### Task 4: Style the vertical hierarchy and responsive spacing

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Style the static plan legend**

Add `.module-plans-legend` as a wrapped flex row with `.module-plan-chip` variants using existing primary-container tokens.

- [ ] **Step 2: Style group intros and vertical rhythm**

Add `.module-group`, `.module-group-heading`, `.module-group-heading h3` and `.module-group-description` with full-width headings, controlled spacing and no card borders.

- [ ] **Step 3: Remove obsolete filter styles**

Delete only `.module-index-toolbar`, `.module-filters`, `.module-filter` selectors and their responsive overrides; leave reusable module card styles intact.

- [ ] **Step 4: Run all checks**

Run `node scripts/verify-module-index.mjs`, `npm run lint`, `npm run typecheck` and `npm run build`. All must exit 0.

### Task 5: Publish and verify production

**Files:**
- No source changes expected after validation.

- [ ] **Step 1: Inspect scope**

Run `git diff --check`, `git status --short` and inspect staged names. Stage only the spec/plan, content, component, CSS and verification script files from this task.

- [ ] **Step 2: Commit and push `main`**

Commit with `feat: organize modules by business purpose` and push to `origin main`.

- [ ] **Step 3: Verify Vercel**

Poll the Yuri POS project until the deployment for the new commit is `READY`, fetch `https://yuri-pos.vercel.app`, and confirm no runtime errors in the last hour.

- [ ] **Step 4: Report evidence**

Provide the production URL, deployment inspector, commit SHA, checks run, and note that visual screenshot review remains a manual browser step if not available in this environment.
