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
const failures = [];

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

for (const failure of failures) console.error(`[landing] ${failure}`);
process.exitCode = failures.length ? 1 : 0;

