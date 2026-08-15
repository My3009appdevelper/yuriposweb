import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const checks = [
  ["build index", resolve(root, "public/demo-app/index.html"), null],
  ["Flutter bootstrap", resolve(root, "public/demo-app/flutter_bootstrap.js"), null],
  ["Flutter application bundle", resolve(root, "public/demo-app/main.dart.js"), null],
  ["Flutter assets", resolve(root, "public/demo-app/assets"), null],
  ["demo iframe", resolve(root, "app/demo/page.tsx"), "/demo-app/index.html"],
  ["embed css", resolve(root, "app/globals.css"), ".demo-embed-shell"],
];

let failed = false;

for (const [name, file, expected] of checks) {
  if (!existsSync(file)) {
    console.error(`[demo] falta ${name}: ${file}`);
    failed = true;
    continue;
  }

  if (expected && !readFileSync(file, "utf8").includes(expected)) {
    console.error(`[demo] ${name} no contiene ${expected}`);
    failed = true;
  }
}

const indexPath = resolve(root, "public/demo-app/index.html");
if (existsSync(indexPath)) {
  const index = readFileSync(indexPath, "utf8");

  if (!index.includes('<base href="/demo-app/">')) {
    console.error('[demo] index.html no usa base href /demo-app/');
    failed = true;
  }

  if (index.includes(".map")) {
    console.error("[demo] no se deben publicar source maps");
    failed = true;
  }
}

const dataPath = resolve(root, "public/demo-app/demo-data.json");
const manifestPath = resolve(root, "public/demo-app/demo-manifest.json");
const hasData = existsSync(dataPath);
const hasManifest = existsSync(manifestPath);

if (hasData !== hasManifest) {
  console.error("[demo] demo-data.json y demo-manifest.json deben publicarse juntos");
  failed = true;
} else if (hasData && hasManifest) {
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const data = JSON.parse(readFileSync(dataPath, "utf8"));

    if (manifest.dataFile !== "demo-data.json") {
      console.error("[demo] el manifiesto no apunta a demo-data.json");
      failed = true;
    }
    if (manifest.uuidEmpresa !== "demo-farmacia-yuri") {
      console.error("[demo] el manifiesto usa un tenant Demo inesperado");
      failed = true;
    }
    if (data.uuidEmpresa !== "demo-farmacia-yuri") {
      console.error("[demo] los datos usan un tenant Demo inesperado");
      failed = true;
    }
    if (/[A-Za-z]:[\\/]/.test(readFileSync(dataPath, "utf8"))) {
      console.error("[demo] demo-data.json contiene una ruta absoluta local");
      failed = true;
    }

    for (const asset of manifest.assets ?? []) {
      const assetPath = resolve(root, "public", "demo-app", asset.relativePath);
      if (!existsSync(assetPath)) {
        console.error(`[demo] falta el asset publicado ${asset.relativePath}`);
        failed = true;
      }
    }
  } catch (error) {
    console.error(`[demo] paquete de contenido inválido: ${error}`);
    failed = true;
  }
}

process.exitCode = failed ? 1 : 0;
