# Especificación: tres formas de mostrar “La diferencia Yuri”

**Fecha:** 2026-08-15  
**Estado:** Diseño aprobado para revisión escrita  
**Alcance:** Landing de Yuri POS, únicamente en `main`

## Objetivo

Ampliar el bloque actual de “La diferencia Yuri” para mostrar las mismas cuatro ventajas de Yuri POS desde tres lenguajes visuales complementarios, sin perder claridad ni duplicar la fuente de contenido.

Las cuatro ventajas son:

1. Operación offline-first.
2. Multisucursal.
3. Roles y permisos.
4. Reportes operativos.

La primera lectura debe seguir siendo rápida y comercial. Las dos nuevas presentaciones deben añadir profundidad visual, no competir con el mensaje principal.

## Experiencia propuesta

La landing mostrará tres secciones consecutivas:

### 1. Editorial — “La diferencia Yuri”

Es la versión actual y funciona como explicación directa. Conserva el fondo claro, el grid de cuatro tarjetas, los iconos lineales, el `primaryContainer` azul claro y la jerarquía de eyebrow, título y descripción.

No se cambia el contenido ni se agregan fondos fotográficos. Esta sección es la referencia de legibilidad y debe quedar visible sin interacción previa.

### 2. 3D — “La operación, convertida en sistema”

Se añadirá una sección de fondo navy con cuatro tarjetas de aspecto tecnológico. Cada tarjeta tendrá una ilustración 3D propia, sin texto ni logotipos generados:

- **Offline-first:** terminal POS, red local y una señal de conexión interrumpida que no detiene la operación.
- **Multisucursal:** varias tiendas o puntos conectados mediante nodos luminosos.
- **Roles y permisos:** escudo, capas de acceso y un cursor o llave como metáfora de control.
- **Reportes operativos:** panel flotante con gráfica, indicadores y señales de decisión.

Los assets usarán transparencias y una paleta Yuri: navy `#08131B`, azul `#00B1FF`, cyan suave, blanco y acentos rojos discretos. Las tarjetas mostrarán profundidad con iluminación, sombras y un movimiento hover mínimo. No se dependerá de texto dibujado dentro de la imagen.

### 3. Contexto — “Lo que cambia en tu día”

Se añadirá una presentación más atmosférica y comercial con cuatro tarjetas grandes, cada una con una composición abstracta diferente:

- una caja que mantiene el flujo cuando falla la conexión;
- una red de sucursales que comparte una misma lógica;
- niveles de usuarios y permisos que mantienen cada acceso en su lugar;
- un tablero operativo iluminado con señales útiles.

Los fondos serán abstractos y propios: degradados, vidrio, líneas de conexión, luces y formas suaves. No se usarán fotografías genéricas ni composiciones con texto incrustado. El fondo tendrá una capa de contraste para preservar la lectura del contenido.

## Modelo de contenido

`lib/yuri-content.ts` seguirá siendo la fuente única de las cuatro ventajas. Se añadirá únicamente la información visual que el componente necesite, sin copiar títulos o descripciones en tres archivos diferentes.

La estructura recomendada será un arreglo de presentaciones derivado de `capabilityHighlights`, con referencias por `id` o `title` estable. Cada presentación podrá definir:

- etiqueta de sección;
- clase visual;
- ruta del asset 3D cuando aplique;
- tratamiento de fondo para la variante contextual;
- texto corto adicional solo cuando aporte una lectura diferente.

El contenido comercial principal no se duplicará.

## Assets e imagen generativa

Los cuatro assets 3D se generarán con `imagegen` como imágenes rasterizadas transparentes, una por ventaja. Se inspeccionará cada resultado antes de incorporarlo. El prompt exigirá:

- objeto centrado y legible a tamaño de tarjeta;
- fondo completamente transparente;
- paleta y luces coherentes con Yuri POS;
- ningún texto, logo, watermark ni marca inventada;
- composición que conserve espacio alrededor del objeto.

Los fondos atmosféricos podrán resolverse primero con CSS y gradientes. Solo se generarán imágenes adicionales si una composición concreta aporta valor real y no puede lograrse de forma más ligera con CSS. Esto reduce peso, evita repetición y mantiene la landing rápida.

Los assets finales vivirán dentro de `public/assets/difference-yuri/`, con nombres estables y descriptivos. Se usarán formatos optimizados y carga diferida para las variantes que quedan debajo del primer viewport.

## Responsive y accesibilidad

- Desktop: cuatro tarjetas por fila cuando el ancho lo permita.
- Tablet: dos tarjetas por fila.
- Móvil: una tarjeta por fila, sin overflow horizontal.
- Las ilustraciones tendrán `alt` descriptivo; los fondos puramente decorativos usarán `alt=""`.
- El significado nunca dependerá únicamente del color o del hover.
- Se respetará `prefers-reduced-motion`; el contenido seguirá siendo completo sin animación.
- El contraste de la sección navy y de los fondos atmosféricos se validará sobre texto real.

## Límites de implementación

- No se cambia la navegación ni el comportamiento de la demo.
- No se agregan dependencias nuevas para 3D, canvas o video.
- No se convierten los assets generados en logos ni iconos del sistema.
- No se modifica Supabase, Drift, Flutter ni el bundle de la demo.
- Se trabaja únicamente sobre `main`.

## Criterios de aceptación

1. La landing muestra las tres presentaciones en orden: editorial, 3D y contextual.
2. Las cuatro ventajas aparecen en cada presentación sin contradicciones de copy.
3. Los assets 3D tienen transparencia real, no contienen texto inventado y respetan la paleta Yuri.
4. La versión contextual mantiene legibilidad sobre sus fondos.
5. La sección funciona en desktop, tablet y móvil sin scroll horizontal.
6. `npm run lint`, `npm run typecheck`, `npm run build` y las verificaciones existentes pasan.
7. La producción en Vercel conserva la navegación, el iframe de Demo y el resto de la landing.
