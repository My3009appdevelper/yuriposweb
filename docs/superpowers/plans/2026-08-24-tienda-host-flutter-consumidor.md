# Tienda Host Flutter Consumidor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar el flavor web `consumidor` dentro de MauKun Web, agregar la pestaña `Tienda` después de `Demo` y conservar el flujo existente de tienda sin duplicarlo en React.

**Architecture:** Next.js será el host público y expondrá `/tienda`; esa ruta propagará el token QR al build estático Flutter alojado en `public/tienda-app`. Flutter consumidor seguirá siendo responsable del catálogo, carrito, checkout y conexión con la Edge Function `storefront` de Supabase. El host no tendrá acceso directo a tablas ni secretos privados.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS existente, scripts Node ESM, Flutter web build del flavor `consumidor`, Supabase Edge Function `storefront` ya desplegada.

**Spec:** `docs/superpowers/specs/2026-08-24-tienda-host-flutter-consumidor-design.md`

## Global Constraints

- Mantener la única implementación funcional de tienda en `C:\Apps\pharma-pos` flavor `consumidor`.
- La URL pública será `/tienda?tienda=TOKEN` y el build Flutter se servirá bajo `/tienda-app/`.
- No agregar `service_role`, consultas directas a tablas de pedidos ni otro backend en `maukunweb`.
- No modificar la Demo existente ni sus artefactos `public/demo-app`.
- Conservar textos en español con acentos correctos y el branding actual de Yuri POS.
- Mantener el orden de navegación: `Demo` y después `Tienda`.
- No crear una PWA independiente en esta iteración.
- Preservar cambios no relacionados y dejar el worktree sin staging ni commit salvo autorización explícita.

---

### Task 1: Add failing contracts for navigation, wrapper, and static package

**Files:**
- Modify: `scripts/verify-landing-navigation.mjs`
- Create: `scripts/verify-store-embed.mjs`
- Modify: `package.json`
- Test input: existing source files under `lib/navigation.ts`, `components/navbar.tsx`, `app/tienda/page.tsx`

**Interfaces:**
- Produces the commands `npm run test:store` and the navigation contract requiring `/demo` immediately before `/tienda`.
- The store verifier will inspect `public/tienda-app` and `app/tienda/page.tsx` without importing React or running a browser.

- [ ] **Step 1: Extend the landing navigation contract with the required order**

In `scripts/verify-landing-navigation.mjs`, retain the existing required links and add an adjacent-order check:

```js
const requiredHrefs = [
  "/#inicio",
  "/#beneficios",
  "/#modulos",
  "/#precios",
  "/#contacto",
  "/demo",
  "/tienda",
];

const demoIndex = navigation.indexOf('{ href: "/demo"');
const storeIndex = navigation.indexOf('{ href: "/tienda"');
if (demoIndex < 0 || storeIndex < 0 || storeIndex < demoIndex) {
  failures.push("Tienda debe aparecer después de Demo en la navegación");
}
```

- [ ] **Step 2: Write the store package verifier**

Create `scripts/verify-store-embed.mjs` with the same filesystem-only style as `scripts/verify-demo-embed.mjs`. It must fail when any of these checks fail:

```js
const requiredFiles = [
  "public/tienda-app/index.html",
  "public/tienda-app/flutter_bootstrap.js",
  "public/tienda-app/main.dart.js",
  "public/tienda-app/assets",
];
```

The verifier must also assert:

- `index.html` contains `<base href="/tienda-app/">`;
- `index.html` does not contain `.map` or `.env` references;
- `app/tienda/page.tsx` contains `/tienda-app/index.html`, `searchParams`, `tienda` and `allow="camera"`;
- `app/tienda/page.tsx` does not contain `service_role`.

Use `process.exitCode = failed ? 1 : 0` and print each failure with the `[tienda]` prefix.

- [ ] **Step 3: Register the verification script**

Add only this package script:

```json
"test:store": "node scripts/verify-store-embed.mjs"
```

- [ ] **Step 4: Run the new contracts before implementation**

Run:

```text
npm run test:store
```

Expected: FAIL because the route and `public/tienda-app` do not exist yet. This confirms the contract is testing the requested feature rather than passing accidentally.

### Task 2: Add the Next navigation item and shared visual treatment

**Files:**
- Modify: `lib/navigation.ts`
- Modify: `components/navbar.tsx`
- Modify: `app/globals.css`
- Test: `scripts/verify-landing-navigation.mjs`

**Interfaces:**
- `siteNavigation` will expose `{ href: "/tienda", label: "Tienda", variant: "store" }` immediately after the existing Demo entry.
- `getNavigationIcon` will map `Tienda` to a Lucide store icon without changing active-section behavior for landing anchors.

- [ ] **Step 1: Add the navigation data contract**

Change the `NavigationItem` variant type and append the store item after Demo:

```ts
variant?: "demo" | "store";

export const siteNavigation: readonly NavigationItem[] = [
  // existing entries unchanged
  { href: "/demo", label: "Demo", variant: "demo" },
  { href: "/tienda", label: "Tienda", variant: "store" },
];
```

- [ ] **Step 2: Add the store icon and class**

Import `Store` from `lucide-react`, return it for the `Tienda` label, and add the `nav-link-store` class alongside the existing Demo class:

```tsx
const variantClass = item.variant === "demo"
  ? " nav-link-demo"
  : item.variant === "store"
    ? " nav-link-store"
    : "";
```

Keep `aria-label`, `aria-current`, keyboard focus and the mobile icon-only behavior unchanged.

- [ ] **Step 3: Add a restrained store style**

Add `.nav-link-store` next to `.nav-link-demo`, using the existing Yuri blue tokens and a distinct but compatible treatment:

```css
.nav-link-store {
  border: 1px solid rgb(0 119 182 / 18%);
  color: var(--color-brand-deep);
}

.nav-link-store:hover,
.nav-link-store.nav-link-active {
  border-color: rgb(0 119 182 / 32%);
  background: var(--color-surface-tint);
  color: var(--color-ink);
}
```

Do not change the existing Demo colors.

- [ ] **Step 4: Run the navigation contract**

Run:

```text
node scripts/verify-landing-navigation.mjs
```

Expected: PASS, with `/tienda` after `/demo` and all previous landing checks intact.

### Task 3: Create the `/tienda` Next wrapper

**Files:**
- Create: `app/tienda/page.tsx`
- Modify: `app/globals.css`
- Test: `scripts/verify-store-embed.mjs`

**Interfaces:**
- The page accepts Next App Router `searchParams` as an async value and renders an iframe source under `/tienda-app/index.html`.
- The only forwarded query is a validated `tienda` token matching `[A-Za-z0-9._~-]{1,128}`.

- [ ] **Step 1: Read the local Next.js App Router references before implementation**

Read the repository-local Next documentation required by `AGENTS.md`, specifically the file-convention, async-pattern, metadata, and image guidance under `node_modules/next/dist/docs/`. Confirm the installed Next 16 `searchParams` type before writing the page.

- [ ] **Step 2: Add route metadata and safe token extraction**

Create `app/tienda/page.tsx` with this shape:

```tsx
import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Tienda — Yuri POS",
  description: "Consulta el catálogo de tu tienda y prepara tu pedido.",
};

const storeTokenPattern = /^[A-Za-z0-9._~-]{1,128}$/;

type StorePageProps = {
  searchParams: Promise<{ tienda?: string | string[] }>;
};

function getStoreToken(value: string | string[] | undefined) {
  const token = Array.isArray(value) ? value[0] : value;
  return token && storeTokenPattern.test(token) ? token : null;
}
```

- [ ] **Step 3: Render the wrapper with camera permission**

Build the iframe URL only from the validated token and render the existing `PageIntro` plus a dedicated storefront shell:

```tsx
export default async function StorePage({ searchParams }: StorePageProps) {
  const params = await searchParams;
  const token = getStoreToken(params.tienda);
  const query = token ? `?tienda=${encodeURIComponent(token)}` : "";

  return (
    <>
      <PageIntro
        eyebrow="Tienda · Yuri POS"
        title="Compra desde tu tienda cercana."
        description="Consulta el inventario disponible, arma tu pedido y elige cómo recibirlo."
      />
      <section className="storefront-launch-section">
        <div className="container storefront-embed-shell">
          <iframe
            className="storefront-embed-frame"
            src={`/tienda-app/index.html${query}`}
            title="Tienda en línea de Yuri POS"
            allow="camera"
            loading="eager"
            referrerPolicy="same-origin"
          />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Add responsive host styles**

Add focused CSS without changing Demo selectors:

```css
.storefront-launch-section {
  padding: 0 0 120px;
  background: var(--color-surface-soft);
}

.storefront-embed-shell {
  min-height: min(900px, 82svh);
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-highlight);
  background: #fff;
  box-shadow: 0 24px 70px rgb(26 76 115 / 12%);
}

.storefront-embed-frame {
  display: block;
  width: 100%;
  height: min(900px, 82svh);
  min-height: 700px;
  border: 0;
  background: #fff;
}
```

At the existing mobile breakpoint, reduce the frame to `min-height: 620px`, remove the outer radius where necessary, and keep the page usable without relying on horizontal scrolling.

- [ ] **Step 5: Run the route/package contract before the static build exists**

Run:

```text
npm run test:store
```

Expected: the route assertions pass, while only the expected missing-package checks remain until Task 4 synchronizes the Flutter build.

### Task 4: Synchronize the Flutter consumer web build

**Files:**
- Create: `scripts/sync-store-build.mjs`
- Modify: `package.json`
- Create/replace: `public/tienda-app/**` from the release build artifact
- Test: `scripts/verify-store-embed.mjs`

**Interfaces:**
- `npm run sync:store` copies a valid Flutter web build into `public/tienda-app`.
- Source selection uses `PHARMA_POS_CONSUMER_WEB_DIR` first, then `../pharma-pos/build/web` relative to this repository.
- The resulting static app always uses `<base href="/tienda-app/">`.

- [ ] **Step 1: Add the sync command**

Register:

```json
"sync:store": "node scripts/sync-store-build.mjs"
```

- [ ] **Step 2: Implement source discovery and artifact filtering**

Follow `scripts/sync-demo-build.mjs` but keep this script independent. It must:

- find `index.html`, `flutter_bootstrap.js` and `main.dart.js`;
- throw a Spanish/English-neutral actionable error when no valid source exists;
- delete only `public/tienda-app` before copying;
- exclude `.map` and files beginning with `.env`;
- patch the base href to `/tienda-app/`;
- patch the title to `Yuri POS · Tienda`;
- patch the description to `Tienda en línea de Yuri POS`;
- print source and destination paths.

The core copy shape is:

```js
rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, {
  recursive: true,
  filter: (entry) => {
    const name = basename(entry);
    return !name.endsWith(".map") && !name.startsWith(".env");
  },
});
```

- [ ] **Step 3: Build the source flavor with the required base path**

From `C:\Apps\pharma-pos`, run:

```text
flutter build web --release --base-href=/tienda-app/ --dart-define=APP_FLAVOR=consumidor
```

If a separate public deployment URL is needed for POS-generated QR values, pass:

```text
--dart-define=CONSUMIDOR_WEB_URL=https://yuri-pos.vercel.app/tienda
```

- [ ] **Step 4: Synchronize the build**

From `C:\Apps\maukunweb`, run:

```text
npm run sync:store
```

Expected: `public/tienda-app` contains the Flutter web package, without source maps or environment files.

- [ ] **Step 5: Run the package verifier**

Run:

```text
npm run test:store
```

Expected: PASS, including the base href, static bundle, route propagation and camera permission checks.

### Task 5: Document the host workflow and run full verification

**Files:**
- Modify: `README.md`
- Verify: `scripts/verify-landing-navigation.mjs`
- Verify: `scripts/verify-demo-embed.mjs`
- Verify: `scripts/verify-store-embed.mjs`
- Verify: `app/tienda/page.tsx`
- Verify: `lib/navigation.ts`

**Interfaces:**
- README documents the relationship: MauKun Web is the host, Flutter consumer is the storefront, POS is the operational panel and Supabase is the backend.
- All existing Demo checks remain unchanged.

- [ ] **Step 1: Add concise local/deployment instructions**

Document these commands and URL forms in `README.md`:

```text
cd C:\Apps\pharma-pos
flutter build web --release --base-href=/tienda-app/ --dart-define=APP_FLAVOR=consumidor

cd C:\Apps\maukunweb
npm run sync:store
npm run dev
```

Also document `/tienda` and `/tienda?tienda=TOKEN`, the `PHARMA_POS_CONSUMER_WEB_DIR` override, and `CONSUMIDOR_WEB_URL` for the POS build.

- [ ] **Step 2: Run focused static checks**

Run:

```text
npm run test:demo
npm run test:store
node scripts/verify-landing-navigation.mjs
```

Expected: all exit with code 0.

- [ ] **Step 3: Run the full project gate**

Run:

```text
npm test
```

Expected: ESLint, TypeScript and `next build` pass, with routes including `/tienda`, `/demo` and `/manifest.webmanifest`.

- [ ] **Step 4: Perform manual route checks**

Start the site with `npm run dev` and inspect:

1. `/` shows `Demo` followed immediately by `Tienda`.
2. `/tienda` opens the consumer entry screen.
3. `/tienda?tienda=TOKEN` preserves the token inside the Flutter app.
4. Mobile navigation remains icon-only and keyboard/focus behavior remains available.
5. A browser with HTTPS and camera permission can use the QR scanner; direct links remain usable when camera access is unavailable.

- [ ] **Step 5: Review the final diff without staging**

Run:

```text
git diff --check
git status --short
```

Confirm only the intended navigation, wrapper, scripts, documentation and `public/tienda-app` artifact changes are present. Do not reset, stage, commit or push unrelated work.
