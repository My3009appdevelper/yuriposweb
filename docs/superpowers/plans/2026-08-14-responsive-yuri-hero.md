# Responsive Yuri Hero Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify the Yuri POS hero and make its connected-system diagram readable on small screens without horizontal overflow.

**Architecture:** Keep the existing desktop SVG map and add a dedicated portrait SVG variant for mobile, selected only through CSS media queries. Remove the secondary audience link and proof row from the hero component, then delete their now-unused styles. No content model, route, or dependency changes are needed.

**Tech Stack:** Next.js App Router, React, TypeScript, inline SVG, CSS media queries.

## Global Constraints

- Preserve the Yuri POS visual language and existing blue/red palette.
- Keep the primary “Explorar módulos” action and all sections below the hero unchanged.
- Mobile layout must not require horizontal scrolling.
- Preserve accessible SVG titles/descriptions and avoid duplicate announcements from the hidden map variant.
- Validate with `npm test` and `git diff --check`.

---

### Task 1: Simplify hero copy and add a portrait map variant

**Files:**
- Modify: `components/yuri-hero.tsx`
- Modify: `components/hero-map.tsx`

**Interfaces:**
- `YuriHero` continues to render the same `hero-section` and `HeroMap` public structure.
- `HeroMap` continues to be a zero-prop component; it produces one desktop map and one mobile map, with CSS controlling visibility.

- [x] **Step 1: Remove the requested hero-only copy**

  Remove the `Check` import, the `Ver para quién está hecho` secondary link, and the `hero-proof-row` block. Keep the primary `Link` to `#modulos` and the existing description unchanged.

- [x] **Step 2: Add an accessible portrait SVG for mobile**

  Keep the existing 620×500 SVG as the desktop map. Add a second inline SVG with a portrait `viewBox` (for example `0 0 360 540`), larger relative text and vertically distributed Caja, Venta, Inventario, Compras and Reportes nodes around Yuri POS. Give it its own `title`/`desc`, mark the desktop SVG `aria-hidden` when hidden by CSS, and mark the mobile SVG `aria-hidden` when hidden on larger screens so assistive technology announces only one diagram.

- [x] **Step 3: Run the type/lint checks for the component edit**

  Run `npm run lint && npm run typecheck`.
  Expected: both commands pass with no JSX or accessibility-related TypeScript errors.

### Task 2: Make desktop/mobile map presentation responsive

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Existing desktop classes remain visually compatible at widths above 700px.
- New `.hero-map-mobile` and `.hero-map-desktop` selectors provide an explicit visibility boundary; no JavaScript viewport detection is introduced.

- [x] **Step 1: Hide the portrait map by default and keep desktop sizing**

  Add `.hero-map-mobile { display: none; }` and `.hero-map-desktop { display: block; }`. Keep the desktop map width fluid and remove only styles that belonged to the deleted proof row/link.

- [x] **Step 2: Switch to the portrait map on small screens**

  In the existing mobile media query, set `.hero-map-desktop { display: none; }`, `.hero-map-mobile { display: block; width: 100%; }`, increase the shell’s mobile breathing room as needed, and preserve `overflow-x: hidden` at the hero boundary so the page cannot scroll sideways.

- [x] **Step 3: Run the production build and whitespace validation**

  Run `npm test` and `git diff --check`.
  Expected: lint, typecheck, and Next production build pass; whitespace validation reports no errors.

### Task 3: Verify the responsive result and hand off

**Files:**
- No additional source files.

**Interfaces:**
- Production route `/` renders the simplified hero at desktop and mobile widths.

- [x] **Step 1: Inspect the changed diff**

  Run `git diff -- components/yuri-hero.tsx components/hero-map.tsx app/globals.css` and confirm no unrelated sections or copy changed.

- [x] **Step 2: Verify mobile geometry**

  Use a browser/dev-server or equivalent viewport check at approximately 390px wide. Confirm the hero has no horizontal scrollbar, the portrait map fills the available width, and node labels remain readable.

- [x] **Step 3: Commit the focused implementation**

  Stage only the three implementation files and commit with:

  ```bash
  git add components/yuri-hero.tsx components/hero-map.tsx app/globals.css
  git commit -m "fix: improve Yuri hero mobile layout"
  ```
