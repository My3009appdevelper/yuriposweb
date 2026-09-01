import {
  cpSync,
  existsSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, resolve } from "node:path";

const root = process.cwd();
const sourceCandidates = process.env.PHARMA_POS_CONSUMER_WEB_DIR
  ? [resolve(process.env.PHARMA_POS_CONSUMER_WEB_DIR)]
  : [
      resolve(root, "..", "pharma-pos", "build", "web"),
      resolve(root, "..", "pharma-pos-worktrees", "build", "web"),
    ];
const source = sourceCandidates.find(
  (candidate) =>
    existsSync(resolve(candidate, "index.html")) &&
    existsSync(resolve(candidate, "flutter_bootstrap.js")) &&
    existsSync(resolve(candidate, "main.dart.js")),
);
const destination = resolve(root, "public", "tienda-app");

if (!source) {
  throw new Error(
    "No se encontró una build Flutter web del flavor consumidor. " +
      "Genera primero la build o define PHARMA_POS_CONSUMER_WEB_DIR.",
  );
}

const sourceIndex = resolve(source, "index.html");
const index = readFileSync(sourceIndex, "utf8");
const baseHrefPattern = /<base\s+href="[^"]*"\s*\/?\s*>/i;

if (!baseHrefPattern.test(index)) {
  throw new Error("La build de tienda no contiene una etiqueta base href.");
}

const patchedIndex = index
  .replace(baseHrefPattern, '<base href="/tienda-app/">')
  .replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/i,
    '<meta name="description" content="Tienda en línea de Saruki POS.">',
  )
  .replace(/<title>[^<]*<\/title>/i, "<title>Saruki POS · Tienda</title>");

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, {
  recursive: true,
  filter: (entry) => {
    const name = basename(entry);
    return !name.endsWith(".map") && !name.startsWith(".env");
  },
});
writeFileSync(resolve(destination, "index.html"), patchedIndex, "utf8");

console.log(`[tienda] build sincronizada desde ${source}`);
console.log(`[tienda] destino: ${destination}`);
console.log('[tienda] base href configurado en /tienda-app/');
