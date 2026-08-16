import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const component = readFileSync(resolve(root, "components/module-index.tsx"), "utf8");
const card = readFileSync(resolve(root, "components/module-card.tsx"), "utf8");
const content = readFileSync(resolve(root, "lib/yuri-content.ts"), "utf8");
const capability = readFileSync(resolve(root, "components/capability-3d-section.tsx"), "utf8");
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

if (!card.includes("module.visualAsset")) {
  failures.push("las tarjetas no contemplan presentaciones visuales por módulo");
}

if (capability.includes("Visualiza cómo Yuri conecta cada decisión del negocio")) {
  failures.push("el bloque de beneficios todavía muestra el texto introductorio eliminado");
}

const expectedVisualAssets = [
  "ventas.webp",
  "historial-ventas.webp",
  "promociones.webp",
  "impulso-venta.webp",
  "clientes.webp",
  "fidelidad.webp",
  "productos.webp",
  "departamentos-categorias.webp",
  "inventario-sucursal.webp",
  "movimientos-inventario.webp",
];

for (const asset of expectedVisualAssets) {
  if (!content.includes(`/assets/modulos-3d/${asset}`)) {
    failures.push(`falta la ruta visual del módulo ${asset}`);
  }
  if (!existsSync(resolve(root, "public/assets/modulos-3d", asset))) {
    failures.push(`no existe el archivo visual ${asset}`);
  }
}

const ventaOrder = ["id: \"ventas\"", "id: \"historial-ventas\"", "id: \"promociones\"", "id: \"impulso-venta\"", "id: \"clientes\"", "id: \"fidelidad\""];
const ventaPositions = ventaOrder.map((marker) => content.indexOf(marker));
if (ventaPositions.some((position) => position === -1) || ventaPositions.some((position, index) => index > 0 && position < ventaPositions[index - 1])) {
  failures.push("los módulos de Venta no están en el orden comercial solicitado");
}

const inventoryOrder = ["id: \"productos\"", "id: \"departamentos-categorias\"", "id: \"inventario-sucursal\"", "id: \"movimientos-inventario\""];
const inventoryPositions = inventoryOrder.map((marker) => content.indexOf(marker));
if (inventoryPositions.some((position) => position === -1) || inventoryPositions.some((position, index) => index > 0 && position < inventoryPositions[index - 1])) {
  failures.push("los módulos de Inventario no están en el orden solicitado");
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`[module-index] ${failure}`);
  process.exitCode = 1;
}

