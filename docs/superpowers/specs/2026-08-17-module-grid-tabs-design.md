# Diseño: distribución de módulos y pestañas compactas

## Objetivo

Mejorar la densidad visual del índice de módulos de Yuri POS sin cambiar su
contenido ni su navegación: mostrar como máximo cuatro módulos por fila en
escritorio, centrar las filas incompletas y hacer más compactas las pestañas de
áreas.

## Diseño aprobado

- La cuadrícula de módulos usará un layout flexible con ajuste de línea,
  separación horizontal responsiva y `justify-content: center`.
- Cada módulo tendrá un ancho controlado para que entren hasta cuatro en
  pantallas grandes. Si una fila tiene menos elementos, se mantendrá centrada.
- En móvil se conservarán dos columnas para limitar el desplazamiento vertical.
- Las pestañas conservarán seis áreas y su semántica accesible (`tablist`,
  `tab` y `tabpanel`). Reducirán su altura al contenido, mantendrán el texto
  centrado y posicionarán el icono de forma absoluta en la esquina superior
  derecha.
- Los cambios serán únicamente de presentación en `app/globals.css` y de sus
  comprobaciones en `scripts/verify-module-index.mjs`.

## Criterios de aceptación

1. En un viewport grande no aparecen más de cuatro módulos por fila.
2. Las filas con uno, dos o tres módulos quedan centradas y conservan una
   separación visible entre elementos.
3. En viewport móvil se muestran dos módulos por fila.
4. Las pestañas no reservan espacio vertical excesivo y el texto queda
   centrado.
5. El icono de cada pestaña se ubica en la esquina superior derecha sin
   modificar el flujo del texto.
6. Las validaciones existentes, lint, typecheck y build continúan pasando.

## Riesgos y mitigaciones

- El ancho disponible varía entre grupos; se mitigará con anchos flexibles y
  `gap` responsivo en vez de valores fijos.
- Las pestañas pueden necesitar un ajuste adicional en móviles muy estrechos;
  se conservará un breakpoint específico para dos columnas y tamaños de texto
  legibles.
