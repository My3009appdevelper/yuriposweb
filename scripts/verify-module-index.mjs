import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const component = readFileSync(resolve(root, "components/module-index.tsx"), "utf8");
const card = readFileSync(resolve(root, "components/module-card.tsx"), "utf8");
const content = readFileSync(resolve(root, "lib/yuri-content.ts"), "utf8");
const capability = readFileSync(resolve(root, "components/capability-3d-section.tsx"), "utf8");
const styles = readFileSync(resolve(root, "app/globals.css"), "utf8");
const moduleAssetsDir = resolve(root, "public/assets/modulos-webp");

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

if (card.indexOf("module-plan") > card.indexOf("module-visual-category")) {
  failures.push("la etiqueta de plan no está antes de la categoría azul");
}

if (!styles.includes(".module-visual-meta {\n  display: flex;\n  flex-direction: column;")) {
  failures.push("la cabecera de módulos no está apilada con el plan arriba");
}

if (!/\.module-visual-art \{[\s\S]*?margin-top: 6px;/.test(styles)) {
  failures.push("el arte de módulos no conserva la separación actualizada respecto a su etiqueta");
}

if (!styles.includes(".capability-3d-section {\n  position: relative;\n  overflow: clip;\n  padding: 76px 0 84px;")) {
  failures.push("el bloque de beneficios conserva demasiado espacio vertical");
}

if (!/\.capability-3d-intro h2 \{[\s\S]*?max-width: none;/.test(styles)) {
  failures.push("el título de beneficios todavía limita su ancho horizontal");
}

if (!styles.includes(".module-index-section {\n  padding: 80px 0 88px;")) {
  failures.push("el índice de módulos conserva demasiado espacio vertical");
}

if (!/\.module-index-section \.section-heading,[\s\S]*?\.module-index-section \.section-heading h2 \{\n  max-width: none;/.test(styles)) {
  failures.push("el título del índice de módulos todavía limita su ancho horizontal");
}

if (!styles.includes(".module-visual-copy {\n  min-height: 108px;")) {
  failures.push("los módulos visuales conservan una altura mínima innecesaria");
}

if (!styles.includes(".capability-3d-bleed .capability-3d-card-eyebrow {\n  margin: 0;\n  padding: 4px 0 0;")) {
  failures.push("la etiqueta azul del bloque de beneficios no conserva su espaciado base");
}

if (!/\.capability-3d-bleed \.capability-3d-art \{[\s\S]*?margin-top: 6px;/.test(styles)) {
  failures.push("el bloque de beneficios no conserva la separación actualizada respecto a su etiqueta");
}

if (capability.includes("Visualiza cómo Yuri conecta cada decisión del negocio")) {
  failures.push("el bloque de beneficios todavía muestra el texto introductorio eliminado");
}

if (content.includes("/assets/modulos-3d/")) {
  failures.push("la aplicación todavía referencia la carpeta antigua modulos-3d");
}

if (existsSync(resolve(root, "public/assets/modulos-3d"))) {
  failures.push("la carpeta antigua modulos-3d todavía existe");
}

const expectedVisualAssets = [
  "facturacion.webp",
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
  "compras.webp",
  "historial-compras.webp",
  "ordenes-compra.webp",
  "proveedores.webp",
  "sucursales.webp",
  "usuarios.webp",
  "cajas.webp",
  "personal.webp",
  "vacaciones.webp",
  "comisiones.webp",
  "anuncios.webp",
  "movimientos-caja.webp",
  "ticket.webp",
  "recetas.webp",
  "medicos.webp",
  "cortes-caja.webp",
  "control-ambiental.webp",
  "exportacion.webp",
  "graficas.webp",
  "kpis.webp",
];

for (const asset of expectedVisualAssets) {
  if (!content.includes(`/assets/modulos-webp/${asset}`)) {
    failures.push(`falta la ruta visual del módulo ${asset}`);
  }
  if (!existsSync(resolve(moduleAssetsDir, asset))) {
    failures.push(`no existe el archivo visual ${asset}`);
  }
}

if (!content.includes('/assets/difference-yuri/optimized/roles-permisos.webp')) {
  failures.push("Roles y permisos no reutiliza la ilustración 3D existente");
}
if (!existsSync(resolve(root, "public/assets/difference-yuri/optimized/roles-permisos.webp"))) {
  failures.push("no existe la ilustración 3D existente de Roles y permisos");
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

const purchaseOrder = ["id: \"compras\"", "id: \"historial-compras\"", "id: \"ordenes-compra\"", "id: \"proveedores\""];
const purchasePositions = purchaseOrder.map((marker) => content.indexOf(marker));
if (purchasePositions.some((position) => position === -1) || purchasePositions.some((position, index) => index > 0 && position < purchasePositions[index - 1])) {
  failures.push("los módulos de Compras no están en el orden solicitado");
}

if (content.includes('  | "Fiscal"') || content.includes('  "Fiscal",')) {
  failures.push("la categoría Fiscal todavía aparece aunque sus módulos deben integrarse a Reportes");
}

for (const legacyFiscalId of [
  "categorias-fiscales",
  "regimen-fiscal",
  "uso-cfdi",
  "claves-prod-serv-sat",
  "claves-unidad-sat",
  "monedas-sat",
  "metodos-pago-sat",
  "formas-pago-sat",
  "impuestos-sat",
]) {
  if (content.includes(`id: "${legacyFiscalId}"`)) {
    failures.push(`el módulo fiscal no solicitado ${legacyFiscalId} todavía aparece`);
  }
}

if (!/id: "facturas"[\s\S]*?category: "Reportes"/.test(content)) {
  failures.push("Facturación todavía no está integrada al bloque de Reportes");
}

const reportOrder = ["id: \"facturas\"", "id: \"exportaciones\"", "id: \"graficas\"", "id: \"kpis\""];
const reportPositions = reportOrder.map((marker) => content.indexOf(marker));
if (reportPositions.some((position) => position === -1) || reportPositions.some((position, index) => index > 0 && position < reportPositions[index - 1])) {
  failures.push("los módulos de Reportes no están en el orden solicitado");
}

if (content.includes('id: "reportes-historial"')) {
  failures.push("el módulo Historial y reportes todavía aparece dentro de Reportes");
}

const administrationOrder = ["id: \"sucursales\"", "id: \"cajas\"", "id: \"personal\"", "id: \"vacaciones\"", "id: \"comisiones\"", "id: \"anuncios\"", "id: \"roles-permisos\""];
const administrationPositions = administrationOrder.map((marker) => content.indexOf(marker));
if (administrationPositions.some((position) => position === -1) || administrationPositions.some((position, index) => index > 0 && position < administrationPositions[index - 1])) {
  failures.push("los módulos de Administración no están en el orden solicitado");
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`[module-index] ${failure}`);
  process.exitCode = 1;
}

