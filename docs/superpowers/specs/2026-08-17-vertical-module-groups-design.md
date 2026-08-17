# Yuri POS: índice de módulos por propósito

## Objetivo

Convertir el índice de módulos de Yuri POS en una narrativa vertical: una introducción comercial de ancho completo, una guía de planes y seis bloques que expliquen qué problema resuelve cada grupo antes de mostrar sus módulos.

## Experiencia propuesta

- El encabezado del índice será `Todo lo que tu operación necesita.` y ocupará todo el ancho disponible.
- El subtítulo será una sola línea fluida siempre que el viewport lo permita: `Explora Yuri POS, cada módulo tiene un propósito concreto y te ayudará a crecer según la forma en que trabajes. Descubre que con este sistema puedes:`.
- La nota `Algunas capacidades pueden depender del plan, la configuración y la operación de cada negocio.` aparecerá inmediatamente después del subtítulo.
- Debajo habrá chips informativos para `Esencial`, `Profesional` y `Escala`; serán visuales, no filtros.
- Los módulos dejarán de tener pestañas, botones de categoría y estado local. Se mostrarán en seis bloques verticales, cada uno con eyebrow, título padre, descripción comercial y una cuadrícula responsive de módulos sin cards.

## Orden y contenido

1. **Administrar tu negocio** — Sucursales, Usuarios, Cajas, Roles y permisos, Personal, Vacaciones, Comisiones y Anuncios.
2. **Vender sin problemas en cualquier momento** — Ventas, Historial de ventas, Promociones, Impulso de venta, Clientes y Fidelidad.
3. **Controlar tus productos e inventarios** — Productos, Departamentos e Inventario por sucursal. Se elimina Movimientos de inventario del catálogo visible.
4. **Abastecer tus sucursales y manejar proveedores** — Compras, Historial de compras, Órdenes de compra y Proveedores.
5. **Mantener la operación bajo control** — Cortes de caja, Movimientos de caja, Ticket, Control ambiental, Recetas y Médicos.
6. **Decidir con información clara** — Facturación, Exportaciones, Gráficas y KPIs operativos.

Cada bloque tendrá copy orientado al beneficio del negocio, no a describir únicamente una pantalla. Los nombres de los módulos conservarán sus etiquetas de plan y descripciones individuales.

## Arquitectura y límites

- `lib/yuri-content.ts` será la fuente de verdad de los grupos mediante `moduleGroups`, con título, descripción y `moduleIds` ordenados.
- `components/module-index.tsx` renderizará los grupos y resolverá sus módulos desde la lista recibida; no habrá estado de filtros.
- `components/module-card.tsx` conservará el orden visual plan → título azul → imagen → descripción.
- `app/globals.css` añadirá estilos de encabezado y separación para grupos verticales y chips informativos; conservará la cuadrícula responsive de seis columnas en pantallas grandes.
- No se tocarán el bundle Flutter, Supabase, rutas de Demo ni módulos ajenos al índice.

## Validación

- La verificación estática comprobará que no haya estado/filtros, que la nota y los chips estén antes de los grupos, que los seis grupos y sus órdenes existan, y que Movimientos de inventario no se muestre.
- Ejecutar `node scripts/verify-module-index.mjs`, `npm run lint`, `npm run typecheck` y `npm run build`.
- Verificar el HTML de producción y revisar manualmente que la sección se lea como una página vertical, sin overflow horizontal.
