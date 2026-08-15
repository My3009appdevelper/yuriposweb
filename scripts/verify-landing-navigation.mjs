import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function readProjectFile(relativePath) {
  const path = resolve(root, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

const navigation = readProjectFile("lib/navigation.ts");
const navbar = readProjectFile("components/navbar.tsx");
const contact = readProjectFile("components/contact-section.tsx");
const moduleIndex = readProjectFile("components/module-index.tsx");
const hero = readProjectFile("components/yuri-hero.tsx");
const home = readProjectFile("app/page.tsx");

const contactPage = readProjectFile("app/contacto/page.tsx");
const styles = readProjectFile("app/globals.css");
const capabilityEditorial = readProjectFile("components/capability-strip.tsx");
const capability3d = readProjectFile("components/capability-3d-section.tsx");
const capabilityContext = readProjectFile("components/capability-context-section.tsx");
const failures = [];

if (home.includes("CapabilityStrip") || home.includes("CapabilityContextSection")) {
  failures.push("la landing debe mostrar únicamente la presentación 3D de la diferencia Yuri");
}

const requiredHrefs = ["/#inicio", "/#modulos", "/#publico", "/#precios", "/#contacto", "/demo"];
for (const href of requiredHrefs) {
  if (!navigation.includes(href)) failures.push(`falta el enlace ${href}`);
}

if (navigation.includes('status: "soon"') || navbar.includes("Próximamente")) {
  failures.push("Demo todavía está marcada como próximamente");
}

for (const required of ["maufuku3009@gmail.com", "tel:+525570757594", "mailto:maufuku3009@gmail.com"]) {
  if (!contact.includes(required)) failures.push(`falta el canal ${required}`);
}

for (const anchor of ["id=\"inicio\"", "id=\"modulos\"", "id=\"publico\"", "id=\"precios\"", "id=\"contacto\""]) {
  const source = anchor === 'id="inicio"'
    ? hero
    : anchor === 'id="modulos"'
      ? moduleIndex
      : anchor === 'id="contacto"'
        ? contact
        : home;
  if (!source.includes(anchor)) failures.push(`falta el ancla ${anchor}`);
}

if (!contactPage.includes('redirect("/#contacto")')) {
  failures.push("/contacto no redirige a la sección integrada");
}

if (!styles.includes(".nav-link-demo") || !styles.includes("var(--color-primary-container)")) {
  failures.push("Demo no tiene la variante visual primaryContainer");
}

if (!navbar.includes("activeLandingSection") || !navbar.includes('addEventListener("scroll"')) {
  failures.push("El navbar no sigue la sección visible durante el scroll");
}

if (!capabilityEditorial.includes("capability-section-editorial")) {
  failures.push("falta la presentación editorial");
}

if (!capability3d.includes("capability-section-3d")) {
  failures.push("falta la presentación capability-section-3d");
}

if (!capability3d.includes("capability-3d-light")) {
  failures.push("la presentación 3D no conserva el tratamiento claro");
}

if (!capability3d.includes("capability-3d-bleed")) {
  failures.push("la presentación 3D todavía está contenida en cards");
}

if (!capabilityContext.includes("capability-section-context")) {
  failures.push("falta la presentación capability-section-context");
}

if (!capabilityContext.includes("capability-context-image")) {
  failures.push("la presentación contextual no muestra ilustraciones");
}

for (const asset of [
  "offline-first.webp",
  "multisucursal.webp",
  "roles-permisos.webp",
  "reportes-operativos.webp",
]) {
  if (!existsSync(resolve(root, "public", "assets", "difference-yuri", asset))) {
    failures.push(`falta el asset 3D ${asset}`);
  }
}

for (const failure of failures) console.error(`[landing] ${failure}`);
process.exitCode = failures.length ? 1 : 0;

