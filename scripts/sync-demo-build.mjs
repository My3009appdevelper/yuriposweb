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
        "codex-flavors-demo",
        "build",
        "web",
      ),
      resolve(root, "..", "pharma-pos", "build", "web"),
    ];
const source = sourceCandidates.find(
  (candidate) =>
    existsSync(resolve(candidate, "index.html")) &&
    existsSync(resolve(candidate, "main.dart.js")),
);
const destination = resolve(root, "public", "demo-app");
const sourceIndex = source ? resolve(source, "index.html") : "";

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

console.log(`[demo] build sincronizada desde ${source}`);
console.log(`[demo] destino: ${destination}`);
console.log('[demo] base href configurado en /demo-app/');
