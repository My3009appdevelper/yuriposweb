# Primary Container Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align the Yuri POS marketing site with Flutter's light theme by applying `primaryContainer` consistently to primary actions, chips, selected states, badges, and supportive surfaces.

**Architecture:** Keep the existing CSS-only design system in `app/globals.css`. Add centralized semantic tokens, then update existing component selectors to consume those tokens without changing React structure or the embedded Flutter bundle.

**Tech Stack:** Next.js 16, React 19, TypeScript, global CSS, ESLint.

## Global Constraints

- `primaryContainer` is `#CBEFFF`.
- `onPrimaryContainer` is `#00131C`.
- Brand `primary` remains `#00B1FF` for accents, indicators, links, borders, and focus.
- Do not modify `public/demo-app` or introduce new components.
- Preserve existing Spanish copy and UTF-8 text.

---

### Task 1: Apply the centralized palette to existing web components

**Files:**
- Modify: `app/globals.css` (tokens and existing button, filter, badge, pricing, CTA, and surface selectors)
- Test: `scripts/verify-demo-embed.mjs` (existing embed regression check)

**Interfaces:**
- Consumes: existing `--color-brand`, surface, line, and dark tokens.
- Produces: `--color-primary-container` and `--color-on-primary-container` used by current selectors.

- [ ] **Step 1: Add semantic tokens**

Add these declarations to `:root` without removing the existing brand token:

```css
--color-primary-container: #cbefff;
--color-on-primary-container: #00131c;
```

- [ ] **Step 2: Update primary and quiet action states**

Use `var(--color-primary-container)` as the background and `var(--color-on-primary-container)` as the foreground for `.button-primary`, its hover state, selected pricing toggle, and featured pricing CTA. Keep focus rings and active borders on `var(--color-brand)`.

- [ ] **Step 3: Update chips, filters, badges, and soft surfaces**

Use the new container token for `.module-filter-active`, `.module-filter span`, `.pricing-featured-badge`, `.icon-badge`, selected pricing controls, and other existing light-blue state surfaces. Use the new foreground token wherever text sits directly on the container color.

- [ ] **Step 4: Preserve dark contrast and semantic colors**

Leave `.site-footer`, dark CTA buttons, red accent/error states, and the brand blue focus/outline rules unchanged except where a selector explicitly uses the new light container fill.

- [ ] **Step 5: Run focused checks**

Run:

```powershell
npm run test:demo
npm run lint
npm run typecheck
npm run build
```

Expected: all commands exit with code 0; the demo embed check still finds `/demo-app/index.html` and no source maps.

- [ ] **Step 6: Review the diff and commit only the palette change**

Run:

```powershell
git diff --check
git diff --stat
git status --short
```

Stage only `app/globals.css` and commit with:

```powershell
git add -- app/globals.css
git commit -m "style: align web palette with Flutter primary container"
```
