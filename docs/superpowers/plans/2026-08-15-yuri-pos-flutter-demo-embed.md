# Yuri POS Flutter Demo Embed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with verification checkpoints.

**Goal:** Publicar la build web del flavor demo de Pharma POS dentro de la ruta `/demo` de Yuri POS como un visor interactivo responsive.

**Architecture:** Next.js mantiene la página de marketing y sirve la build estática de Flutter desde `public/demo-app`. La ruta `/demo` renderiza un contenedor accesible y un `iframe` same-origin; CSS controla el modo web de ancho completo y el modo phone vertical sin mezclar lógica Flutter con la UI de Next.

**Tech Stack:** Next.js App Router 16, React 19, TypeScript, CSS global existente, Flutter Web release bundle, Node.js scripts para sincronización y verificación.

## Global Constraints

- Mantener la separación entre la página Next.js y la aplicación Flutter embebida.
- Servir los archivos Flutter desde `public/demo-app` con `base href="/demo-app/"`.
- Excluir mapas fuente (`*.map`) del artefacto público.
- No incluir secretos, `.env`, bases de datos ni datos operativos.
- Preservar los textos existentes en español y sus acentos.
- No modificar Supabase, migraciones ni código del proyecto Flutter en esta iteración.
- Validar con `npm run lint`, `npm run typecheck`, `npm run build` y comprobaciones HTTP del artefacto.

---

### Task 1: Crear la comprobación de integración (TDD)

**Files:**
- Create: `scripts/verify-demo-embed.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: archivos esperados de `app/demo/page.tsx`, `app/globals.css` y `public/demo-app/index.html`.
- Produces: salida de proceso `0` si la integración está completa; proceso `1` con diagnóstico si falta una condición.

- [ ] **Step 1: Write the failing test**

Crear `scripts/verify-demo-embed.mjs` con comprobaciones deterministas, sin dependencias externas:

```js
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const checks = [
  ['build index', resolve(root, 'public/demo-app/index.html'), null],
  ['demo iframe', resolve(root, 'app/demo/page.tsx'), '/demo-app/index.html'],
  ['embed css', resolve(root, 'app/globals.css'), '.demo-embed-shell'],
];

let failed = false;
for (const [name, file, expected] of checks) {
  if (!existsSync(file)) {
    console.error(`[demo] falta ${name}: ${file}`);
    failed = true;
    continue;
  }
  if (expected && !readFileSync(file, 'utf8').includes(expected)) {
    console.error(`[demo] ${name} no contiene ${expected}`);
    failed = true;
  }
}

const indexPath = resolve(root, 'public/demo-app/index.html');
if (existsSync(indexPath)) {
  const index = readFileSync(indexPath, 'utf8');
  if (!index.includes('<base href="/demo-app/">')) {
    console.error('[demo] index.html no usa base href /demo-app/');
    failed = true;
  }
  if (index.includes('.map')) {
    console.error('[demo] no se deben publicar source maps');
    failed = true;
  }
}

process.exitCode = failed ? 1 : 0;
```

Agregar a `package.json`:

```json
"test:demo": "node scripts/verify-demo-embed.mjs"
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:demo`

Expected: FAIL porque todavía no existe `public/demo-app`, la página no contiene el iframe y no hay estilos de embed.

- [ ] **Step 3: Commit**

```powershell
git add scripts/verify-demo-embed.mjs package.json package-lock.json
git commit -m "test: add checks for embedded Flutter demo"
```

### Task 2: Preparar un sincronizador seguro para la build Flutter

**Files:**
- Create: `scripts/sync-demo-build.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `PHARMA_POS_WEB_DIR` opcional; por defecto `../pharma-pos/build/web` respecto al repositorio de marketing.
- Produces: `public/demo-app` con el bundle estático, `base href="/demo-app/"` y sin archivos `.map`.

- [ ] **Step 1: Write the failing test**

Extender `scripts/verify-demo-embed.mjs` para comprobar que `public/demo-app/flutter_bootstrap.js` existe además de `index.html`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:demo`

Expected: FAIL porque aún no se ha sincronizado la build.

- [ ] **Step 3: Write minimal implementation**

Implementar `scripts/sync-demo-build.mjs` con `fs.cpSync` recursivo, filtro para ignorar `.map`, validación de que el origen contiene `index.html`, `main.dart.js` y `assets/`, reemplazo de `<base href="/">` por `<base href="/demo-app/">` y error explícito si el patrón no existe. El script debe preferir el worktree `../pharma-pos-worktrees/codex-flavors-demo/build/web` y aceptar `PHARMA_POS_WEB_DIR` para otros entornos. Añadir:

```json
"sync:demo": "node scripts/sync-demo-build.mjs"
```

El script no debe copiar `.env`, `.git`, archivos fuente ni nada fuera de la carpeta `build/web`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run sync:demo` y después `npm run test:demo`.

Expected: la build queda disponible, `index.html` apunta a `/demo-app/`, `flutter_bootstrap.js` existe y no hay `.map` públicos.

- [ ] **Step 5: Commit**

```powershell
git add scripts/sync-demo-build.mjs package.json package-lock.json public/demo-app
git commit -m "feat: sync Flutter demo web bundle"
```

### Task 3: Renderizar el visor en la ruta Demo

**Files:**
- Modify: `app/demo/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `/demo-app/index.html` producido por Task 2.
- Produces: página `/demo` con encabezado de contexto, aviso de sesión aislada y visor interactivo responsive.

- [ ] **Step 1: Write the failing test**

Mantener las aserciones de `scripts/verify-demo-embed.mjs` para exigir `/demo-app/index.html` y `.demo-embed-shell` antes de cambiar la página.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:demo` sobre el estado previo a la implementación de la página.

Expected: FAIL por ausencia de los selectores de la página anfitriona.

- [ ] **Step 3: Write minimal implementation**

Actualizar `app/demo/page.tsx` para usar `PageIntro` con estado disponible y renderizar un `<iframe>` same-origin con:

```tsx
<iframe
  className="demo-embed-frame"
  src="/demo-app/index.html"
  title="Demo interactiva de Yuri POS"
  loading="lazy"
  referrerPolicy="same-origin"
  sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
/>
```

El contenedor tendrá una variante de modo phone fácil de cambiar (`demo-embed-shell--phone`) y una variante web (`demo-embed-shell--web`). La primera versión usará el modo phone cuando la build corresponda a la experiencia móvil; la variante web quedará disponible para una build de escritorio sin duplicar la ruta.

Añadir a `app/globals.css` estilos con `min-width: 0`, `overflow: hidden`, alturas basadas en `svh`, `max-width: 430px`, `aspect-ratio: 9 / 19.5` y una regla para pantallas estrechas que mantenga el phone dentro del viewport. La variante web usará `width: 100%` y altura mínima de aplicación.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:demo`, `npm run lint` y `npm run typecheck`.

Expected: todas las comprobaciones pasan sin errores de TypeScript ni ESLint.

- [ ] **Step 5: Commit**

```powershell
git add app/demo/page.tsx app/globals.css
git commit -m "feat: embed Flutter demo in Yuri POS"
```

### Task 4: Validar build, rutas estáticas y entrega

**Files:**
- Modify: `docs/superpowers/specs/2026-08-15-yuri-pos-flutter-demo-embed-design.md` solo si la evidencia exige actualizar una decisión.

**Interfaces:**
- Consumes: integración completa de Tasks 1–3.
- Produces: evidencia de compilación y recursos estáticos listos para Vercel.

- [ ] **Step 1: Run the complete verification**

Run: `npm run test:demo`, `npm run lint`, `npm run typecheck` y `npm run build`.

- [ ] **Step 2: Verify static resources locally**

Iniciar `npm run start` en un puerto local y comprobar con `Invoke-WebRequest` que `/demo`, `/demo-app/`, `/demo-app/flutter_bootstrap.js` y al menos un recurso dentro de `/demo-app/assets/` respondan `200`.

- [ ] **Step 3: Inspect generated artifact**

Confirmar que el artefacto no contiene `.map`, `.env` o credenciales añadidas por el sincronizador y que `git status --short` solo muestra los archivos de esta integración.

- [ ] **Step 4: Commit verification notes if needed**

Si todos los checks pasan, no modificar código adicional; documentar en la entrega qué validación fue estática/HTTP y qué revisión visual manual en Chrome queda pendiente.
