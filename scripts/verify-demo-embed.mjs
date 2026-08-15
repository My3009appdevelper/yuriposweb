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

process.exitCode = failed ? 1 : 0;
