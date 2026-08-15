# Alineación de color `primaryContainer` para Yuri POS web

## Objetivo

Alinear la identidad visual de MauKunweb con el tema claro de Yuri POS Flutter usando el color `primaryContainer` en botones, chips, estados seleccionados y fondos de apoyo.

## Tokens

- `primaryContainer`: `#CBEFFF`.
- `onPrimaryContainer`: `#00131C`.
- `primary` de marca: `#00B1FF`, conservado para acentos, indicadores, enlaces y foco.

## Aplicación visual

- Los botones principales y CTA usarán `primaryContainer` con texto oscuro.
- Los filtros de módulos, chips, badges y estados activos usarán el mismo fondo claro.
- Los fondos suaves relacionados con la marca se aproximarán al nuevo token en lugar de usar azules arbitrarios.
- Bordes activos y estados de foco conservarán el azul `primary` para mantener contraste y señalización.
- Los fondos oscuros, el rojo semántico y los neutros no se modificarán.

## Alcance técnico

El cambio se limitará a tokens CSS y reglas de componentes existentes en `app/globals.css`. No se introducirán nuevos componentes ni se tocará el bundle Flutter de `public/demo-app`.

## Verificación

Se comprobarán lint, typecheck, build de Next.js y una revisión visual de inicio, índice de módulos, precios, contacto y demo en viewport móvil y de escritorio.
