# Diseño: demo web embebida de Yuri POS

**Fecha:** 2026-08-15  
**Estado:** Propuesta aprobada para revisión antes de implementar

## Objetivo

Mostrar la build web del flavor demo de Pharma POS dentro de la ruta `/demo` de Yuri POS. La demo no será una página completa independiente desde la experiencia del visitante: se presentará como una ventana integrada dentro de la página de Demo.

La ventana debe:

- usar la build real que ya compila en Chrome;
- ocupar todo el ancho disponible cuando se presente como aplicación web de escritorio;
- usar un marco con proporción de teléfono y desplazamiento vertical cuando la build se presente en formato móvil;
- conservar los datos precargados y el aislamiento local de la demo;
- no conectarse a datos operativos ni exponer credenciales del entorno productivo.

## Contexto confirmado

- La ruta existente es `app/demo/page.tsx`.
- La build release completa del flavor demo está en `C:\Apps\pharma-pos-worktrees\codex-flavors-demo\build\web`.
- La carpeta `C:\Apps\pharma-pos\build\web` disponible inicialmente solo tenía el runtime de Flutter; no se considera válida si faltan `main.dart.js` y `assets/`.
- La build completa pesa aproximadamente 54 MB en sus archivos generados.
- Su `index.html` todavía usa `<base href="/">`; para servirla bajo una subruta debe cambiarse a `/demo-app/` mediante una recompilación con `--base-href=/demo-app/` o un ajuste equivalente del artefacto.
- Next.js sirve los archivos de `public` como recursos estáticos.

## Decisión

### Ubicación del artefacto

La primera integración copiará la build a `public/demo-app`. Así la demo queda en el mismo origen que la página de marketing y puede cargarse con una ruta relativa (`/demo-app/`). Esto evita depender de un segundo proyecto de Vercel durante la validación inicial.

La copia debe conservar la estructura completa generada por Flutter (`index.html`, `flutter_bootstrap.js`, `assets/`, `canvaskit/`, iconos y demás archivos). No se copiarán archivos fuente de Flutter ni secretos.

### Presentación en `/demo`

`app/demo/page.tsx` dejará de mostrar el estado “Próximamente” como contenido principal y mostrará:

1. un encabezado breve que explique que es una demo con datos ficticios y sesión aislada;
2. un contenedor de aplicación embebida;
3. el `iframe` apuntando a `/demo-app/index.html`;
4. una nota de seguridad que indique que los cambios pertenecen solo a la sesión del visitante.

El `iframe` tendrá `title` descriptivo, `loading="lazy"`, `allow="clipboard-read; clipboard-write"` únicamente si la build lo necesita y una política `sandbox` lo más restrictiva posible sin romper la interacción de Flutter. Primero se probará sin permisos innecesarios; se añadirán solo los que una funcionalidad concreta requiera.

### Responsive

Se implementarán dos estilos de presentación en CSS:

- **Web:** ancho `100%`, altura mínima basada en el viewport y borde redondeado, para que la aplicación llene horizontalmente la sección.
- **Phone:** ancho limitado a una medida de teléfono, relación vertical aproximada a 9:19.5, altura disponible del viewport y desplazamiento interno. En pantallas angostas el marco usará casi todo el ancho sin provocar overflow horizontal.

La primera versión seleccionará el modo que corresponda a la build demo actual. La estructura permitirá cambiar a un selector web/phone posteriormente sin rehacer la ruta ni la integración.

### Base path y despliegue

La build se generará o ajustará con `base href="/demo-app/"`. Se verificará que los recursos críticos (`flutter_bootstrap.js`, `main.dart.js`, `assets/`, `sqlite3.wasm` y `canvaskit/`) respondan bajo esa ruta. Si se usa el artefacto ya generado, el ajuste será únicamente del `index.html` y se documentará como paso temporal; la solución preferida es recompilar el flavor con `flutter build web --base-href=/demo-app/`.

## Criterios de aceptación

- `/demo` responde con la página de Yuri POS y el visor embebido visible.
- La navegación del sitio permanece fuera del `iframe` y sigue funcionando.
- En escritorio, la demo ocupa horizontalmente el contenedor sin quedar reducida a una miniatura.
- En formato phone, la demo se ve como un dispositivo vertical y permite recorrer toda la interfaz con scroll.
- No aparece scroll horizontal en la página anfitriona por causa del iframe.
- La URL `/demo-app/` carga el bootstrap y los recursos Flutter sin errores 404.
- `npm run lint`, `npm run typecheck` y `npm run build` terminan correctamente.
- No se incorporan claves, archivos `.env`, bases de datos ni configuraciones de producción al artefacto público.

## Riesgos y trade-offs

- Copiar una build de aproximadamente 33 MB aumenta el tamaño del repositorio y del despliegue. Es apropiado para validar la demo, pero a medio plazo conviene publicar Flutter como artefacto separado o automatizar su generación en CI/CD.
- Un `iframe` no permite que la página anfitriona controle directamente el estado interno de Flutter; la sesión aislada debe seguir resolviéndose dentro de la propia demo.
- Si una futura función requiere permisos especiales del `iframe` o almacenamiento persistente, se deberá revisar explícitamente su impacto antes de abrirlos.
- La revisión visual real en Chrome seguirá siendo necesaria; las comprobaciones de build y HTTP no sustituyen esa validación.

## Fuera de alcance de esta iteración

- Crear autenticación para la demo.
- Conectar la demo con Supabase o datos reales.
- Implementar un pipeline de compilación automática de Flutter.
- Convertir toda la aplicación Flutter a componentes nativos de Next.js.
