# Yuri POS — diseño de portfolio comercial

Fecha: 14 de agosto de 2026  
Proyecto: `C:\Apps\maukunweb`  
Fuente funcional revisada: `C:\Apps\pharma-pos`

## Objetivo

Construir una landing comercial para **Yuri POS**, preparada para desplegarse en Next.js/Vercel y explicar el producto a público general, farmacias y abarrotes. La página debe vender el sistema como una plataforma de gestión operativa, no como una simple caja registradora, sin presentar como validadas capacidades que el repositorio no demuestra en producción.

## Decisiones aprobadas

- Narrativa general de Yuri POS y después secciones específicas para **Farmacias** y **Abarrotes**.
- Dirección visual **A · Operación clara**.
- Presentación de módulos **B · Índice de módulos**.
- Precios **B · Esencial / Profesional / Escala**.
- Visual principal **A · Mapa operativo**.
- Navbar exacto: **Inicio**, **Contacto**, **Demo**.
- Demo visible pero en espera; no se implementa demo Flutter/web en esta versión.

## Posicionamiento honesto

Yuri POS se presenta como una plataforma B2B de gestión operativa y punto de venta para negocios de mostrador, con especial profundidad en farmacias. La frase “más que un punto de venta” comunica el alcance sin afirmar que sea un ERP contable completo, un sistema COFEPRIS integral o un SaaS productivo con billing ya validado.

Capacidades diferenciales comunicables, respaldadas por el código revisado:

- ventas, pagos, caja y tickets;
- catálogo, inventario por sucursal, lotes, caducidades y movimientos;
- compras, órdenes, historial y proveedores;
- clientes, promociones, impulso de venta y fidelidad;
- recetas y médicos;
- control ambiental de temperatura y humedad;
- CFDI, facturas y catálogos SAT;
- empresas, sucursales, usuarios, roles, permisos, personal, vacaciones y comisiones;
- reportes, KPIs, gráficas e historial;
- persistencia local offline-first y sincronización preparada.

Se aclarará que algunas funciones dependen del plan/configuración. No se afirmará cobro recurrente, cumplimiento regulatorio completo, contabilidad general, nómina integral ni operación productiva contra Supabase.

## Arquitectura de la información

### Navegación y rutas

- `/` — landing completa: hero, capacidades, índice de módulos, Farmacias, Abarrotes, precios y CTA.
- `/contacto` — página de contacto preparada para conectar el canal real; no inventa correo, teléfono ni envío exitoso.
- `/demo` — estado “Demo interactiva en preparación”, con explicación de la futura sesión aislada y enlaces de regreso.
- `not-found.tsx` — 404 coherente con la marca.

El índice de módulos vive dentro de la portada para respetar el navbar de tres elementos. Se puede enlazar con `#modulos`, `#farmacias`, `#abarrotes` y `#precios`.

### Secciones de inicio

1. Hero: “Más que un punto de venta. El sistema que mantiene tu negocio en movimiento.” Muestra mapa SVG de Venta, Inventario, Compras, Caja y Reportes.
2. Diferenciadores: operación offline-first, control por sucursal, roles/permisos, sincronización y crecimiento modular.
3. Índice de módulos navegable por categorías con tarjeta individual.
4. Farmacias: lotes/caducidad, recetas, médicos, pacientes/dosis, control ambiental, fiscal y compras.
5. Abarrotes: cobro ágil, catálogo, existencias, proveedores, promociones, clientes y reportes.
6. Precios: selector mensual/anual y tres planes de referencia durante desarrollo.
7. CTA de contacto y footer.

### Grupos del índice de módulos

Cada módulo se modela como dato (`id`, `category`, `name`, `summary`, `audiences`, `plan`, `accent`) para evitar duplicar copy y permitir ampliar el catálogo:

- Venta: Ventas, Historial de ventas, Clientes, Promociones, Impulso de venta, Fidelidad.
- Inventario: Productos, Departamentos, Categorías, Inventario por sucursal, Movimientos de inventario.
- Compras: Compras, Historial de compras, Órdenes de compra, Proveedores.
- Administración: Empresas, Sucursales, Usuarios, Roles y permisos, Cajas, Personal, Vacaciones, Comisiones, Anuncios.
- Operación: Cortes de caja, Movimientos de caja, Ticket, Control ambiental.
- Recetas: Recetas, Médicos.
- Fiscal: Facturas, Categorías fiscales, Régimen fiscal, Uso CFDI, Claves ProdServ SAT, Claves de unidad SAT, Monedas SAT, Métodos de pago SAT, Formas de pago SAT, Impuestos SAT.
- Reportes y seguimiento: KPIs, gráficas, historial y exportaciones.

## Lenguaje visual

Tokens tomados de la identidad existente del proyecto fuente:

- azul Yuri `#00B1FF`;
- rojo de atención `#F31322`;
- blanco `#FDFFFF`;
- fondo claro `#F7FBFF`;
- texto `#10212B`;
- texto secundario `#516977`;
- soporte oscuro `#08131B`, superficies `#0E1A23` y `#132330`.

La interfaz es clara, accesible y profesional. Los radios serán 12 px para controles, 16 px para tarjetas y 24 px para destacados. Se usarán bordes suaves, sombras mínimas y estados de foco visibles.

El hero será un SVG propio, escalable y ligero, con nodos conectados y etiquetas de módulos. Se usarán iconos lineales de `lucide-react`; no se utilizarán emojis, fotos stock ni capturas ficticias. Una imagen raster generada podrá añadirse en otra iteración si aporta valor, pero no es necesaria para esta dirección.

## Precios de referencia

Los precios se mostrarán como referencia durante desarrollo y podrán cambiar antes de publicación:

| Plan | Mensual | Anual | Enfoque |
|---|---:|---:|---|
| Esencial | $499 MXN | $4,990 MXN | Venta, caja, catálogo e inventario base |
| Profesional | $899 MXN | $8,990 MXN | Compras, clientes, promociones, reportes, roles y hasta 3 sucursales |
| Escala | $1,499 MXN | $14,990 MXN | Capacidades especializadas, sucursales y permisos ampliados |

El plan destacado será Profesional. No se afirmará que los límites o los importes sean el contrato final.

## Accesibilidad y estados

- HTML semántico con `header`, `nav`, `main`, `section` y `footer`.
- Menú móvil con `aria-expanded`, `aria-controls`, cierre por Escape y cierre al cambiar de ruta.
- Teclado y `:focus-visible` en enlaces, botones, filtros y selector de precios.
- Contraste suficiente para texto y estados.
- Respeto a `prefers-reduced-motion`.
- Demo con estado de espera explícito, no botón roto ni formulario simulado.
- Metadatos en español y 404 coherente.

## Fuera de alcance

No se incorporan Supabase, autenticación, CMS, analytics, pagos, formularios con backend, migraciones, descarga de APK, ejecución de Flutter dentro de la web ni demo persistente. La conexión GitHub/Vercel queda para el usuario; no se hará push desde esta tarea.

## Validación

Se ejecutarán lint, typecheck, build y `git diff --check`. También se verificará manualmente la portada, las tres rutas, navegación móvil, selector de módulos, selector mensual/anual, enlaces de contacto/demo, 404, foco de teclado y reducción de movimiento.
