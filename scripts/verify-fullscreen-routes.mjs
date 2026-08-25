import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const failures = [];

function readProjectFile(relativePath) {
  const path = resolve(root, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

const rootLayout = readProjectFile("app/layout.tsx");
const marketingLayout = readProjectFile("app/(marketing)/layout.tsx");
const demoPage = readProjectFile("app/demo/page.tsx");
const storePage = readProjectFile("app/tienda/page.tsx");
const styles = readProjectFile("app/globals.css");

if (rootLayout.includes("SiteShell")) {
  failures.push("app/layout.tsx no debe envolver las rutas inmersivas con SiteShell");
}

if (!marketingLayout.includes("SiteShell")) {
  failures.push("falta el layout de marketing con SiteShell");
}

for (const [name, source, iframePath] of [
  ["demo", demoPage, "/demo-app/index.html"],
  ["tienda", storePage, "/tienda-app/index.html"],
]) {
  if (!source) {
    failures.push(`falta la página de ${name}`);
    continue;
  }
  if (!source.includes("immersive-app-page")) {
    failures.push(`${name} no usa la página inmersiva`);
  }
  if (!source.includes("immersive-app-frame")) {
    failures.push(`${name} no usa el iframe de pantalla completa`);
  }
  if (!source.includes(iframePath)) {
    failures.push(`${name} no conserva ${iframePath}`);
  }
  if (source.includes("PageIntro")) {
    failures.push(`${name} no debe mostrar PageIntro`);
  }
}

for (const required of [
  ".immersive-app-page",
  ".immersive-app-frame",
  "height: 100dvh",
  "width: 100%;",
]) {
  if (!styles.includes(required)) {
    failures.push(`faltan estilos fullscreen: ${required}`);
  }
}

for (const failure of failures) console.error(`[fullscreen] ${failure}`);
process.exitCode = failures.length ? 1 : 0;
