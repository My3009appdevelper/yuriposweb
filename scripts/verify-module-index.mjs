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

if (!component.includes("useState") || !component.includes("module-group-tabs") || !component.includes('role="tablist"')) {
  failures.push("el índice no contiene pestañas interactivas para las áreas principales");
}

if (!component.includes("SectionHeading") || !component.includes("Todo lo que tu operación necesita.") || !component.includes("Explora Yuri POS")) {
  failures.push("el índice no recupera el título y subtítulo generales solicitados");
}

if (!component.includes('role="tab"') || !component.includes("aria-selected") || !component.includes("role=\"tabpanel\"")) {
  failures.push("las pestañas no exponen una relación accesible con su panel");
}

if (component.includes("módulos</small>") || component.includes("module-group-tab-count")) {
  failures.push("las pestañas todavía muestran el número de módulos");
}

if (!component.includes("module-group-title") || component.includes("activeGroup.title") || component.includes("activeGroup.description") || component.includes("module-group-description")) {
  failures.push("el panel activo todavía muestra título largo y subtítulo del bloque");
}

if (component.includes("module-plans-legend") || component.includes("module-index-note")) {
  failures.push("el índice todavía muestra la leyenda superior de planes y su nota");
}

for (const groupId of ["administracion", "venta", "inventario", "compras", "operacion", "reportes"]) {
  if (!content.includes(`id: \"${groupId}\"`)) {
    failures.push(`falta el grupo vertical ${groupId}`);
  }
}

if (component.includes("Mostrando")) {
  failures.push('el índice todavía muestra el contador "Mostrando"');
}

if (styles.includes(".module-index-count")) {
  failures.push("quedaron estilos para el contador eliminado");
}

if (styles.includes(".module-index-toolbar") || styles.includes(".module-filters") || styles.includes(".module-filter")) {
  failures.push("quedaron estilos del filtro anterior que ya no se utilizan");
}

for (const selector of [".module-group-tabs", ".module-group-tab", ".module-group-tab-active", ".module-group-tab-icon", ".module-group-tab-copy", ".module-group", ".module-group-heading", ".module-group-title"]) {
  if (!styles.includes(`${selector} {`)) {
    failures.push(`falta el estilo ${selector} para las pestañas de áreas`);
  }
}

if (styles.includes(".module-plans-legend") || styles.includes(".module-plan-chip")) {
  failures.push("quedaron estilos para la leyenda superior de planes eliminada");
}

if (!/\.module-group-tab \{[\s\S]*?align-items: center;[\s\S]*?text-align: center;/.test(styles)) {
  failures.push("el texto de las pestañas no está centrado");
}

if (!/\.module-group-tab-icon \{[\s\S]*?position: absolute;[\s\S]*?top: 14px;[\s\S]*?right: 14px;/.test(styles)) {
  failures.push("el icono de las pestañas no está en la esquina superior derecha");
}

if (styles.includes(".module-filters {\n  display: flex;\n  gap: 7px;\n  max-width: 100%;\n  overflow-x: auto;")) {
  failures.push("los filtros anteriores todavía usan scroll horizontal");
}

if (!/\.module-group-tabs \{[\s\S]*?grid-template-columns: repeat\(6, minmax\(0, 1fr\)\);/.test(styles)) {
  failures.push("las pestañas no contemplan seis áreas en pantallas grandes");
}

if (!/\.module-group-tabs \{[\s\S]*?margin-bottom: 42px;/.test(styles)) {
  failures.push("las pestañas no separan el panel activo con un espacio compacto");
}

if (!card.includes("module.visualAsset")) {
  failures.push("las tarjetas no contemplan presentaciones visuales por módulo");
}

if (!card.includes("module-visual-title")) {
  failures.push("las tarjetas visuales no muestran el título azul de cada módulo");
}

if (card.includes("module-visual-category")) {
  failures.push("las tarjetas visuales todavía muestran la categoría general en lugar del título del módulo");
}

if (card.indexOf("module-plan") > card.indexOf("module-visual-title")) {
  failures.push("la etiqueta de plan no está antes del título azul del módulo");
}

if (card.includes('<div className="module-visual-copy">\n          <h3>')) {
  failures.push("el título del módulo todavía se repite debajo de la imagen");
}

if (!styles.includes(".module-visual-meta {\n  display: flex;\n  flex-direction: column;")) {
  failures.push("la cabecera de módulos no está apilada con el plan arriba");
}

if (!styles.includes(".module-grid {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;")) {
  failures.push("la cuadrícula de módulos no centra sus filas con distribución uniforme");
}

if (!/\.module-visual-item \{[\s\S]*?flex: 0 1 clamp\(150px, calc\(\(100% - 60px\) \/ 6\), 190px\);/.test(styles)) {
  failures.push("los módulos no conservan un ancho controlado para centrar grupos de 3 o 6");
}

if (!styles.includes(".capability-3d-grid {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;")) {
  failures.push("la cuadrícula de beneficios no centra sus elementos");
}

if (!styles.includes(".module-group-title {\n  margin: 0;\n  color: var(--color-brand-deep);") || !styles.includes(".module-visual-title {\n  margin: 0;\n  color: var(--color-brand-deep);")) {
  failures.push("los rótulos y títulos pequeños de módulos no usan azul profundo");
}

if (!styles.includes(".capability-3d-intro .eyebrow,\n.capability-context-intro .eyebrow {\n  color: var(--color-brand-deep);") || !styles.includes(".capability-3d-eyebrow,\n.capability-context-eyebrow {\n  margin: 0 0 7px;\n  color: var(--color-brand-deep);")) {
  failures.push("los rótulos pequeños de beneficios no usan azul profundo");
}

if (!/\.module-visual-art \{[\s\S]*?min-height: 176px;/.test(styles)) {
  failures.push("el arte de módulos no está dimensionado para la cuadrícula compacta");
}

if (!/\.module-visual-art \{[\s\S]*?margin-top: 10px;/.test(styles)) {
  failures.push("el arte de módulos no conserva la separación actualizada respecto a su etiqueta");
}

if (!styles.includes(".capability-3d-section {\n  position: relative;\n  overflow: clip;\n  padding: 76px 0 84px;")) {
  failures.push("el bloque de beneficios conserva demasiado espacio vertical");
}

if (!/\.capability-3d-intro h2 \{[\s\S]*?max-width: none;/.test(styles)) {
  failures.push("el título de beneficios todavía limita su ancho horizontal");
}

if (!styles.includes(".module-index-section {\n  padding: 64px 0 76px;")) {
  failures.push("el índice no conserva una altura compacta para la navegación por pestañas");
}

if (!styles.includes(".module-index-section .section-heading,\n.module-index-section .section-heading h2,\n.module-index-section .section-heading-description {\n  max-width: none;")) {
  failures.push("el título y subtítulo generales todavía limitan su ancho horizontal");
}

if (!styles.includes(".module-visual-copy {\n  min-height: 96px;")) {
  failures.push("los módulos visuales no reservan una altura compacta para la descripción");
}

if (!/@media \(max-width: 800px\) \{[\s\S]*?\.module-visual-item \{\n    flex-basis: calc\(\(100% - 10px\) \/ 2\);/.test(styles)) {
  failures.push("la cuadrícula de módulos no conserva dos columnas en móvil");
}

if (!/@media \(max-width: 520px\) \{[\s\S]*?\.capability-3d-art \{\n    min-height: 150px;/.test(styles)) {
  failures.push("las imágenes de beneficios no se reducen para mostrar dos por fila en móvil");
}

if (styles.includes(".capability-3d-bleed .capability-3d-card + .capability-3d-card {\n    border: 0;\n    padding-top: 28px;")) {
  failures.push("los beneficios conservan un espacio vertical excesivo entre filas móviles");
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

const inventoryOrder = ["id: \"productos\"", "id: \"departamentos-categorias\"", "id: \"inventario-sucursal\""];
const inventoryPositions = inventoryOrder.map((marker) => content.indexOf(marker));
if (inventoryPositions.some((position) => position === -1) || inventoryPositions.some((position, index) => index > 0 && position < inventoryPositions[index - 1])) {
  failures.push("los módulos de Inventario no están en el orden solicitado");
}

if (content.includes('id: "movimientos-inventario"')) {
  failures.push("Movimientos de inventario todavía está visible");
}

if (!content.includes('name: "Departamentos"')) {
  failures.push("Inventario no muestra Departamentos como módulo independiente");
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

const administrationOrder = ["id: \"sucursales\"", "id: \"usuarios\"", "id: \"cajas\"", "id: \"roles-permisos\"", "id: \"personal\"", "id: \"vacaciones\"", "id: \"comisiones\"", "id: \"anuncios\""];
const administrationPositions = administrationOrder.map((marker) => content.indexOf(marker));
if (administrationPositions.some((position) => position === -1) || administrationPositions.some((position, index) => index > 0 && position < administrationPositions[index - 1])) {
  failures.push("los módulos de Administración no están en el orden solicitado");
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`[module-index] ${failure}`);
  process.exitCode = 1;
}

