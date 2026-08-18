import { createHash } from "node:crypto";
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
    if (manifest.contentVersion !== data.contentVersion) {
      console.error("[demo] manifest y snapshot tienen versiones distintas");
      failed = true;
    }
    if (
      manifest.sourceUuidEmpresa &&
      manifest.sourceUuidEmpresa !== data.sourceUuidEmpresa
    ) {
      console.error("[demo] manifest y snapshot tienen empresas fuente distintas");
      failed = true;
    }
    const requiredTables = [
      "empresas",
      "sucursales",
      "cajas",
      "usuarios",
      "caja_cortes",
      "departamentos",
      "categorias",
      "productos",
      "inventario_sucursales",
      "clientes",
      "proveedores",
      "medicos",
      "promociones",
      "compras",
      "compra_detalles",
      "ventas",
      "venta_detalles",
      "venta_impulso_eventos",
      "heroes",
    ];
    for (const table of requiredTables) {
      if (!Array.isArray(data.tables?.[table])) {
        console.error(`[demo] falta la tabla de negocio ${table}`);
        failed = true;
      }
    }
    for (const user of data.tables?.usuarios ?? []) {
      if (Object.hasOwn(user, "auth_user_id")) {
        console.error("[demo] los usuarios publicados no deben incluir identificadores de Auth");
        failed = true;
      }
    }
    if ((data.tables?.usuarios ?? []).every((user) => user.username !== "yuridemo")) {
      console.error("[demo] el paquete debe conservar a yuridemo como usuario principal");
      failed = true;
    }
    if ((data.tables?.caja_cortes ?? []).some((corte) => corte.estado === "abierto")) {
      console.error("[demo] el paquete no debe publicar cortes abiertos");
      failed = true;
    }
    const forbiddenTables = [
      "usuario_sesiones",
      "sync_checkpoints",
      "local_printers",
      "local_shortcuts",
      "simulacion_corridas",
    ];
    for (const table of forbiddenTables) {
      if (Object.hasOwn(data.tables ?? {}, table)) {
        console.error(`[demo] el paquete no debe publicar la tabla técnica ${table}`);
        failed = true;
      }
    }
    for (const [table, count] of Object.entries(data.rowCounts ?? {})) {
      if (!Array.isArray(data.tables?.[table]) || data.tables[table].length !== count) {
        console.error(`[demo] rowCounts no coincide para ${table}`);
        failed = true;
      }
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

const packageSource = process.env.PHARMA_POS_DEMO_PACKAGE_DIR
  ? resolve(process.env.PHARMA_POS_DEMO_PACKAGE_DIR)
  : null;
if (packageSource && hasData && hasManifest) {
  const sourceDataPath = resolve(packageSource, "demo-data.json");
  const sourceManifestPath = resolve(packageSource, "demo-manifest.json");
  if (!existsSync(sourceDataPath) || !existsSync(sourceManifestPath)) {
    console.error(`[demo] el paquete fuente no está completo: ${packageSource}`);
    failed = true;
  } else {
    const digest = (file) =>
      createHash("sha256").update(readFileSync(file)).digest("hex");
    if (digest(sourceDataPath) !== digest(dataPath)) {
      console.error("[demo] demo-data.json publicado no coincide con el paquete fuente");
      failed = true;
    }
    if (digest(sourceManifestPath) !== digest(manifestPath)) {
      console.error("[demo] demo-manifest.json publicado no coincide con el paquete fuente");
      failed = true;
    }
  }
}

process.exitCode = failed ? 1 : 0;
