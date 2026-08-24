# Yuri POS web

Portfolio comercial de Yuri POS, construido con Next.js App Router. Presenta el sistema como una plataforma de gestión operativa y punto de venta para farmacias y abarrotes.

## Ejecutar localmente

Requisitos: Node.js 20.9 o posterior y npm.

```powershell
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Tienda hospedada

`maukunweb` funciona como el host público. La tienda funcional pertenece al
flavor Flutter `consumidor` de `C:\Apps\pharma-pos`; Supabase conserva el
backend y la Edge Function `storefront`. MauKun Web no consulta directamente
las tablas de pedidos ni contiene secretos privados.

Para actualizar el paquete público de la tienda:

```powershell
cd C:\Apps\pharma-pos
flutter build web --release --base-href=/tienda-app/ --dart-define=APP_FLAVOR=consumidor

cd C:\Apps\maukunweb
npm run sync:store
```

Si la build está en otra ubicación, define `PHARMA_POS_CONSUMER_WEB_DIR` antes
de ejecutar `npm run sync:store`. Los enlaces QR abren `/tienda?tienda=TOKEN`.
Para que el POS genere esos enlaces con el host publicado, configura
`CONSUMIDOR_WEB_URL`, por ejemplo:

```text
https://yuri-pos.vercel.app/tienda
```

## Verificación

```powershell
npm run lint
npm run typecheck
npm run build
npm run test:demo
npm run test:store
```

## Rutas

- `/` — hero, capacidades, índice filtrable de módulos, Farmacias, Abarrotes y precios.
- `/contacto` — estado del canal de contacto, sin formulario ficticio.
- `/demo` — demo web Flutter aislada con datos de ejemplo.
- `/tienda` — aplicación web del flavor consumidor hospedada dentro del sitio.
- cualquier ruta inexistente — 404 de Yuri POS.

## Dónde editar el contenido

- `lib/yuri-content.ts` contiene módulos, audiencias, capacidades y planes de referencia.
- `components/hero-map.tsx` contiene el mapa SVG del hero.
- `components/module-index.tsx` contiene el filtro de categorías.
- `components/pricing-table.tsx` contiene el selector mensual/anual.
- `app/globals.css` contiene tokens, layout y responsive.

## Precios

Los importes mostrados son referencias de desarrollo, no una oferta contractual:

- Esencial: $499 MXN/mes o $4,990 MXN/año.
- Profesional: $899 MXN/mes o $8,990 MXN/año.
- Escala: $1,499 MXN/mes o $14,990 MXN/año.

Antes de publicar conviene validar límites, funciones por plan, soporte, impuestos y condiciones comerciales.

## GitHub y Vercel

El repositorio público del portfolio es:

```text
https://github.com/My3009appdevelper/yuriposweb
```

La versión actual ya está publicada en Vercel:

```text
https://yuri-pos.vercel.app
```

El proyecto usa la configuración detectada de Next.js. La publicación de la
tienda requiere sincronizar el build Flutter; el host no necesita una clave
privada de Supabase. Los precios siguen siendo referencias de desarrollo y
deben revisarse antes de una publicación comercial definitiva.

## Límites actuales

La tienda MVP permite pedidos como invitado, recoger en tienda, domicilio y
pago en caja. Todavía no incluye cuentas de consumidor, pago en línea,
reservación automática de inventario ni conversión automática a `ventas`.
La demo y la tienda Flutter se publican como paquetes estáticos aislados; sus
datos y reglas no deben confundirse con el panel operativo.
