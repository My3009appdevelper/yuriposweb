import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const component = readFileSync(resolve(root, "components/module-index.tsx"), "utf8");
const styles = readFileSync(resolve(root, "app/globals.css"), "utf8");

const failures = [];

if (component.includes('useState<Filter>("Todas")')) {
  failures.push('el índice todavía inicia con el filtro "Todas"');
}

if (component.includes("Mostrando")) {
  failures.push('el índice todavía muestra el contador "Mostrando"');
}

if (styles.includes(".module-index-count")) {
  failures.push("quedaron estilos para el contador eliminado");
}

if (styles.includes(".module-filters {\n  display: flex;\n  gap: 7px;\n  max-width: 100%;\n  overflow-x: auto;")) {
  failures.push("los filtros todavía usan scroll horizontal");
}

if (!styles.includes("  flex-wrap: wrap;")) {
  failures.push("los filtros no están configurados para envolver en varias filas");
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`[module-index] ${failure}`);
  process.exitCode = 1;
}

