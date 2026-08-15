import {
  cpSync,
  existsSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, resolve } from "node:path";

const root = process.cwd();
const sourceCandidates = process.env.PHARMA_POS_WEB_DIR
  ? [resolve(process.env.PHARMA_POS_WEB_DIR)]
  : [
      resolve(
        root,
        "..",
        "pharma-pos-worktrees",
        "build",
        "web",
      ),
    ];
const source = sourceCandidates.find(
  (candidate) =>
    existsSync(resolve(candidate, "index.html")) &&
    existsSync(resolve(candidate, "main.dart.js")),
);
const destination = resolve(root, "public", "demo-app");
const sourceIndex = source ? resolve(source, "index.html") : "";
const packageSource = process.env.PHARMA_POS_DEMO_PACKAGE_DIR
  ? resolve(process.env.PHARMA_POS_DEMO_PACKAGE_DIR)
  : resolve(root, "..", "pharma-pos-worktrees", "artifacts", "demo-package");
const packageData = resolve(packageSource, "demo-data.json");
const packageManifest = resolve(packageSource, "demo-manifest.json");

if (!source || !existsSync(sourceIndex)) {
  throw new Error(
    `[demo] No se encontró una build Flutter release válida. ` +
      "Genera primero la build web o define PHARMA_POS_WEB_DIR.",
  );
}

const index = readFileSync(sourceIndex, "utf8");
const baseHrefPattern = /<base\s+href="[^"]*"\s*\/?\s*>/i;

if (!baseHrefPattern.test(index)) {
  throw new Error("[demo] build index.html no contiene una etiqueta base href.");
}

const patchedIndex = index
  .replace(baseHrefPattern, '<base href="/demo-app/">')
  .replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/i,
    '<meta name="description" content="Demo interactiva de Yuri POS con datos de ejemplo.">',
  )
  .replace(/<title>[^<]*<\/title>/i, "<title>Yuri POS · Demo</title>");

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, {
  recursive: true,
  filter: (entry) => {
    const name = basename(entry);
    return !name.endsWith(".map") && !name.startsWith(".env");
  },
});
writeFileSync(resolve(destination, "index.html"), patchedIndex, "utf8");

if (existsSync(packageData) && existsSync(packageManifest)) {
  cpSync(packageData, resolve(destination, "demo-data.json"));
  cpSync(packageManifest, resolve(destination, "demo-manifest.json"));

  const packageAssets = resolve(packageSource, "demo-assets");
  if (existsSync(packageAssets)) {
    cpSync(packageAssets, resolve(destination, "demo-assets"), {
      recursive: true,
    });
  }
  console.log(`[demo] paquete de contenido sincronizado desde ${packageSource}`);
} else {
  console.warn(
    `[demo] paquete de contenido no encontrado o incompleto en ${packageSource}. ` +
      "La Demo usará el seed local de respaldo.",
  );
}

console.log(`[demo] build sincronizada desde ${source}`);
console.log(`[demo] destino: ${destination}`);
console.log('[demo] base href configurado en /demo-app/');
