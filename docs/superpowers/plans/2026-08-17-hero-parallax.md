# Hero Parallax 3D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the Yuri POS hero into a responsive 3D parallax scene using the supplied transparent RGBA illustration, preserving the approved copy and removing the module CTA.

**Architecture:** Keep `YuriHero` as a server component for static copy and structure. Isolate scroll-driven motion in a small client component that updates a CSS custom property via `requestAnimationFrame`, with a static fallback and reduced-motion mode. Use `next/image` for the above-the-fold transparent asset with explicit dimensions, responsive `sizes`, and `preload`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS custom properties/media queries, `next/image`.

## Global Constraints

- Preserve the Spanish hero copy exactly, including accents and punctuation.
- Do not change navigation, sections after the hero, data models, Supabase, or demo behavior.
- Do not ship the previous SVG hero map in the hero markup.
- Respect `prefers-reduced-motion` and keep the scene usable without JavaScript motion.
- Keep the supplied image in `public/assets/hero/` and let Next.js optimize delivery.

### Task 1: Add the supplied hero asset

**Files:**
- Create: `public/assets/hero/yuri-pos-parallax.png`

- [ ] Copy `C:\Users\maufu\Downloads\hero_parallax_05_constelacion_rgba.png` to the public hero asset path without recompressing its alpha channel.
- [ ] Confirm the copied file is readable and has the expected RGBA dimensions before wiring it into JSX.

### Task 2: Add the failing hero contract checks

**Files:**
- Modify: `scripts/verify-landing-navigation.mjs`

- [ ] Assert that the hero contains `hero-parallax-section`, `HeroParallaxScene`, and `/assets/hero/yuri-pos-parallax.png`.
- [ ] Assert that the old `HeroMap` reference and `Explorar módulos` CTA are absent from `components/yuri-hero.tsx`.
- [ ] Assert that reduced-motion and parallax selectors exist in `app/globals.css`.
- [ ] Run `node scripts/verify-landing-navigation.mjs` and confirm it fails because the new contract is not implemented yet.

### Task 3: Implement the client parallax layer

**Files:**
- Create: `components/hero-parallax-scene.tsx`

- [ ] Render the transparent asset with `next/image`, `fill`, `preload`, `sizes="(max-width: 800px) 110vw, 72vw"`, `alt=""`, and a decorative wrapper.
- [ ] On mount, listen to passive window scroll events and update one CSS custom property in a `requestAnimationFrame` loop, clamped to a small range.
- [ ] Exit without installing motion listeners when `prefers-reduced-motion: reduce` is active.
- [ ] Remove the listener and pending animation frame on unmount.

### Task 4: Replace the hero composition and style the scene

**Files:**
- Modify: `components/yuri-hero.tsx`
- Modify: `app/globals.css`

- [ ] Keep the existing eyebrow, heading, highlighted heading span, and description text exactly.
- [ ] Remove the hero map and module CTA.
- [ ] Add a full-bleed scene layer behind the copy with a soft gradient scrim, depth shadow, and overflow clipping.
- [ ] Keep the text above the scene with a readable max width on desktop and a compact stacked layout on mobile.
- [ ] Add a reduced-motion rule that removes transforms and transitions from the parallax layer.

### Task 5: Verify and commit

**Files:**
- Test: `scripts/verify-landing-navigation.mjs`

- [ ] Run the focused landing verifier and confirm it passes.
- [ ] Run `npm test` and `npm run test:demo`.
- [ ] Run `git diff --check` and inspect the staged file list.
- [ ] Commit the focused implementation with `feat: add accessible 3d hero parallax`.
