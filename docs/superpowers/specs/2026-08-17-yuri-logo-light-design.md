# Especificación: corrección del logo light de Yuri

**Fecha:** 2026-08-17

**Estado:** Diseño aprobado para revisión escrita

**Alcance:** Únicamente `public/assets/brand/yuri-logo-light.png`

## Objetivo

Recrear el logo light de Yuri a partir de `yuri-logo-dark.png` para que tenga contraste limpio sobre el footer `#08131B`, sin los bordes, puntos o irregularidades del archivo light actual y sin alterar la identidad ni la geometría del logo.

La dirección elegida por el usuario es **A: blanco suave + cyan**.

## Tratamiento visual aprobado

- Las áreas navy del logo dark se convertirán a blanco suave `#F1F7FB`.
- El gesto diagonal y sus detalles conservarán un degradado cyan limpio entre `#008BD3` y `#5BD8FF`.
- La transición entre blanco y cyan será continua; no se aplicarán cortes duros que produzcan puntos o fragmentos.
- No se agregarán sombras, brillos exteriores, contornos, fondos, texturas ni efectos nuevos.
- El resultado debe mantener el mismo lenguaje visual del logo dark y diferenciarse únicamente por su tratamiento para superficies oscuras.

## Geometría y transparencia

- El archivo final seguirá siendo PNG RGBA de `1536×1536`.
- Se conservarán exactamente la escala, posición, proporciones y orientación del logo dark dentro del lienzo.
- El lienzo cuadrado no se recortará a 3 px, porque el navbar y el footer ya dependen de la misma alineación espacial entre las variantes dark y light.
- El canal alfa del logo dark será la fuente de la silueta. Los píxeles con alfa menor que `2` pasarán a `0`; los valores entre `250` y `255` pasarán a `255`; el antialiasing parcial de los bordes se conservará.
- Los píxeles completamente transparentes tendrán RGB en cero para evitar halos en otros fondos.

## Integración

- Solo se reemplazará `public/assets/brand/yuri-logo-light.png`.
- No se modificará `yuri-logo-dark.png` ni `yuri-logo.png`.
- No se cambiarán el navbar, el footer, sus dimensiones, el texto `POS`, el CSS ni los componentes React.
- El PNG se guardará sin pérdida y optimizado.

## Verificación

1. Confirmar formato PNG, modo RGBA y dimensiones `1536×1536`.
2. Comparar la silueta y posición del canal alfa contra el logo dark después de la normalización aprobada.
3. Confirmar alfa real con extremos `0` y `255`, esquinas transparentes y RGB cero donde alfa sea cero.
4. Inspeccionar el logo ampliado sobre fondo oscuro `#08131B`, blanco, magenta y cuadriculado para detectar residuos o halos.
5. Inspeccionarlo al tamaño real usado por el footer para validar contraste, legibilidad y alineación.
6. Ejecutar las verificaciones existentes del proyecto únicamente si el reemplazo del asset afecta sus comprobaciones.

## Respaldo y reversión

Antes de reemplazar el archivo se guardará una copia externa verificable del light actual. Si la auditoría final falla, no se conservará el reemplazo y se restaurará desde ese respaldo.

## Criterios de aceptación

1. El footer muestra la opción A aprobada: blanco suave con gesto cyan.
2. No existen fondo cuadriculado, fondo sólido, puntos, halos ni fragmentos alrededor del logo.
3. La forma, proporción, posición y tamaño coinciden con el logo dark.
4. El logo conserva contraste claro y profesional sobre `#08131B`.
5. Ningún archivo del sitio fuera de `yuri-logo-light.png` cambia durante la implementación.
