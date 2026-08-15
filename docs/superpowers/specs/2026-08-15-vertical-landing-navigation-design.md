# Yuri POS: landing vertical y navegación contextual

## Objetivo

Convertir la página principal de Yuri POS en una landing vertical comercial, con navegación por anclas para sus bloques principales, un contacto integrado y un acceso a Demo visualmente destacado.

## Contexto actual

- `components/navbar.tsx` consume `lib/navigation.ts` y actualmente muestra Inicio, Contacto y Demo como rutas independientes.
- `app/page.tsx` ya compone el hero, capacidades, índice de módulos, audiencias y planes, pero no tiene una sección de contacto propia.
- `app/contacto/page.tsx` es una página de espera sin canales reales.
- `app/demo/page.tsx` ya contiene la aplicación Flutter embebida en `/demo-app/index.html`.
- `app/globals.css` concentra los estilos globales y los tokens de marca, incluido `--color-primary-container: #cbefff` y `--color-on-primary-container: #00131c`.

## Experiencia propuesta

### Navegación en la landing (`/`)

El navbar mostrará, en este orden:

1. Inicio → `/#inicio`.
2. Módulos → `/#modulos`.
3. Negocios → `/#publico`, agrupando las secciones de farmacias y abarrotes.
4. Planes → `/#precios`.
5. Contacto → `/#contacto`.
6. Demo → `/demo`.

“Negocios” se usa en lugar de “Público” porque comunica de forma más natural que el bloque explica para qué tipos de negocio está pensado Yuri POS.

### Navegación fuera de la landing

En `/demo` y cualquier otra ruta que no sea `/`, solo se mostrarán Inicio y Demo. Inicio regresará a `/#inicio`; Demo conservará el acceso a la experiencia Flutter.

Los enlaces de ancla no tendrán estado activo basado en scroll. Inicio se marcará como activo en la landing y Demo como activo en `/demo`; así se evita añadir un observador de scroll innecesario a una navegación principalmente informativa.

### Tratamiento visual de Demo

Demo será un enlace disponible, no una función futura:

- se elimina el estado `soon` y el texto “Próximamente”;
- se añade una variante visual `nav-link-demo`;
- el fondo será `--color-primary-container` (`#cbefff`);
- el texto e icono usarán `--color-on-primary-container` (`#00131c`);
- en `/demo` conservará además el indicador de enlace activo.

### Estructura vertical de Inicio

La página conservará sus bloques actuales y añadirá identificadores de ancla consistentes:

- `#inicio` en el hero;
- `#modulos` en el índice de módulos;
- `#publico` en un contenedor que agrupe Farmacias y Abarrotes;
- `#precios` en Planes;
- `#contacto` en el nuevo bloque de contacto.

El orden será: Hero, capacidades, módulos, negocios, planes, contacto y el cierre comercial existente.

### Contacto integrado

Se creará un componente de sección dedicado, reutilizable desde `app/page.tsx`, con:

- una tarjeta principal de mensaje comercial y llamada a la acción;
- correo visible `maufuku3009@gmail.com` con enlace `mailto:`;
- teléfono visible `+52 55 7075 7594` con enlace `tel:+525570757594`;
- botones para escribir y llamar;
- copy breve que invite a conversar sobre el negocio, sin afirmar disponibilidad de soporte que aún no existe.

La antigua ruta `/contacto` dejará de ser una página de contenido y redirigirá a `/#contacto`. Los CTA existentes de planes y cierre de landing apuntarán directamente a esa ancla.

### Responsive y accesibilidad

- En escritorio se mostrarán etiquetas e iconos.
- En móvil se conservarán iconos visibles sin menú desplegable, ajustando el ancho del lockup y de los controles para que los seis accesos no provoquen overflow.
- Las anclas usarán `scroll-margin-top` para respetar el header sticky.
- Los enlaces de correo y teléfono tendrán nombres accesibles y estados de foco visibles.
- Demo mantendrá su iframe aislado y no se tocará la lógica de la aplicación Flutter.

## Arquitectura y límites

- `lib/navigation.ts` será la fuente de verdad de los elementos del navbar, incluyendo si un elemento solo aparece en la landing y su variante visual.
- `components/navbar.tsx` filtrará los elementos según la ruta actual y resolverá el estado activo por ruta base.
- `components/contact-section.tsx` encapsulará la presentación del contacto; no habrá backend, formulario ni almacenamiento nuevo.
- `app/contacto/page.tsx` usará la redirección de App Router para compatibilidad con enlaces anteriores.
- No se modificarán Drift, Supabase, migraciones, el bundle Flutter ni la configuración de sesión de la Demo.

## Validación

1. Prueba estática de navegación: todos los anchors, ausencia de “Próximamente”, contacto `mailto:`/`tel:` y filtro contextual.
2. `npm run test:demo`.
3. `npm run lint`.
4. `npm run typecheck`.
5. `npm run build`.
6. Verificación visual en producción en escritorio y una viewport móvil: navbar contextual, anclas, bloque de contacto y Demo destacada.
7. Comprobación de que `/contacto` redirige a `/#contacto` y que `/demo` sigue mostrando el iframe.

## Riesgos y decisiones

- El correo y teléfono se volverán públicos en la landing, porque fueron proporcionados explícitamente para este uso.
- En páginas que no son la landing ya no se mostrarán los enlaces internos; el usuario volverá a Inicio para explorar esas secciones.
- No se implementará un formulario ni envío de mensajes todavía, evitando almacenar datos personales antes de definir un backend de contacto.
