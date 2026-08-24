import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "public/tienda-app/index.html",
  "public/tienda-app/flutter_bootstrap.js",
  "public/tienda-app/main.dart.js",
  "public/tienda-app/assets",
];
const failures = [];

for (const relativePath of requiredFiles) {
  if (!existsSync(resolve(root, relativePath))) {
    failures.push(`falta ${relativePath}`);
  }
}

const indexPath = resolve(root, "public/tienda-app/index.html");
if (existsSync(indexPath)) {
  const index = readFileSync(indexPath, "utf8");

  if (!index.includes('<base href="/tienda-app/">')) {
    failures.push('index.html no usa base href /tienda-app/');
  }
  if (index.includes(".map")) {
    failures.push("el paquete de tienda no debe publicar source maps");
  }
  if (index.includes(".env")) {
    failures.push("el paquete de tienda no debe publicar archivos .env");
  }
}

const pagePath = resolve(root, "app/tienda/page.tsx");
if (existsSync(pagePath)) {
  const page = readFileSync(pagePath, "utf8");
  for (const required of [
    "/tienda-app/index.html",
    "searchParams",
    "tienda",
    'allow="camera"',
  ]) {
    if (!page.includes(required)) {
      failures.push(`app/tienda/page.tsx no contiene ${required}`);
    }
  }
  if (page.includes("service_role")) {
    failures.push("la ruta pública no debe contener service_role");
  }
} else {
  failures.push("falta app/tienda/page.tsx");
}

for (const failure of failures) console.error(`[tienda] ${failure}`);
process.exitCode = failures.length ? 1 : 0;
