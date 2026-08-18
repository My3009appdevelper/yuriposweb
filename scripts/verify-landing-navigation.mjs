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
const heroParallax = readProjectFile("components/hero-parallax-scene.tsx");
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

const requiredHrefs = ["/#inicio", "/#beneficios", "/#modulos", "/#precios", "/#contacto", "/demo"];
for (const href of requiredHrefs) {
  if (!navigation.includes(href)) failures.push(`falta el enlace ${href}`);
}

if (navigation.includes('status: "soon"') || navbar.includes("Próximamente")) {
  failures.push("Demo todavía está marcada como próximamente");
}

if (!navigation.includes('label: "Beneficios"')) {
  failures.push("falta el enlace de Beneficios en la navegación");
}

for (const required of ["maufuku3009@gmail.com", "tel:+525570757594", "mailto:maufuku3009@gmail.com"]) {
  if (!contact.includes(required)) failures.push(`falta el canal ${required}`);
}

for (const anchor of ["id=\"inicio\"", "id=\"beneficios\"", "id=\"modulos\"", "id=\"precios\"", "id=\"contacto\""]) {
  const source = anchor === 'id="inicio"'
    ? hero
    : anchor === 'id="modulos"'
      ? moduleIndex
      : anchor === 'id="beneficios"'
        ? capability3d
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

if (!hero.includes("hero-parallax-section") || !hero.includes("HeroParallaxScene") || !heroParallax.includes("/assets/hero/yuri-pos-parallax.png")) {
  failures.push("el hero no contiene la escena parallax 3D ni su asset transparente");
}

if (hero.includes("HeroMap") || hero.includes("Explorar módulos")) {
  failures.push("el hero todavía muestra el mapa operativo o el CTA de módulos eliminado");
}

if (!styles.includes(".hero-parallax-section") || !styles.includes(".hero-parallax-layer") || !styles.includes("@media (prefers-reduced-motion: reduce)")) {
  failures.push("faltan los estilos de profundidad y accesibilidad del parallax");
}

if (!styles.includes("width: min(calc(100% - 32px), calc(var(--content-width) + 32px));") || !styles.includes("justify-content: center;")) {
  failures.push("el hero no está limitado y centrado dentro del ancho de contenido");
}

if (!styles.includes(".hero-parallax-content .hero-copy h1") || !styles.includes(".hero-parallax-content .hero-description")) {
  failures.push("el copy del hero no tiene escala y ancho responsivos propios");
}

if (!styles.includes(".hero-parallax-backdrop::after") || !styles.includes("linear-gradient(90deg, rgb(247 251 255 / 100%)")) {
  failures.push("el hero no tiene fade perimetral para integrar la imagen con el fondo");
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
  if (!existsSync(resolve(root, "public", "assets", "difference-yuri", "optimized", asset))) {
    failures.push(`falta el asset 3D ${asset}`);
  }
}

for (const failure of failures) console.error(`[landing] ${failure}`);
process.exitCode = failures.length ? 1 : 0;

