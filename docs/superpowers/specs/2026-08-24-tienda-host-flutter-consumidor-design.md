# Tienda pública hospedada en MauKun Web

## Contexto

`C:\Apps\maukunweb` es el sitio público de Yuri POS construido con Next.js y desplegable como sitio web/host. La Demo actual vive en `public/demo-app` y se presenta desde `/demo` mediante un `iframe`. El panel operativo y la aplicación de tienda pertenecen al proyecto Flutter en `C:\Apps\pharma-pos`.

El flavor `consumidor` ya contiene el flujo de tienda conectado a la Edge Function `storefront` de Supabase: selección de tienda por token, catálogo, carrito, pedido como invitado, recoger en tienda, domicilio, pago en caja y seguimiento.

## Objetivo

Agregar una pestaña `Tienda` inmediatamente después de `Demo` y hacer que el mismo sitio Next hospede la versión web del flavor `consumidor`, sin reimplementar el catálogo, carrito ni checkout en React.

La URL pública será:

```text
https://yuri-pos.vercel.app/tienda?tienda=TOKEN
```

El token continuará siendo el identificador público revocable configurado desde el POS.

## Decisión de arquitectura

### MauKun Web: host público

Next.js conservará la responsabilidad de:

- navegación global y branding de MauKun/Yuri POS;
- ruta pública `/tienda`;
- recepción del parámetro `tienda` del QR;
- presentación del contenedor y metadatos de la página;
- publicación de los archivos estáticos compilados del flavor consumidor.

No tendrá acceso a `service_role`, no consultará directamente las tablas de pedidos y no duplicará reglas comerciales.

### Flutter consumidor: aplicación de tienda

El build web del flavor `consumidor` será publicado bajo `public/tienda-app` y se mostrará desde la ruta `/tienda`, siguiendo el patrón que ya funciona con `public/demo-app`.

El wrapper Next propagará la query `tienda` al `iframe`:

```text
/tienda?tienda=TOKEN
→ /tienda-app/index.html?tienda=TOKEN
```

El `iframe` tendrá permiso explícito de cámara para que el lector QR web pueda funcionar cuando el navegador lo permita.

### Supabase

La aplicación Flutter conservará su integración existente con la Edge Function `storefront`. Las acciones públicas seguirán siendo catálogo, creación de pedido y consulta de seguimiento; las acciones internas continuarán protegidas por Auth y permisos del POS.

El host Next no agregará un cliente administrativo de Supabase ni secretos privados. La única configuración necesaria para generar enlaces QR desde el POS será el valor público del host, mediante `CONSUMIDOR_WEB_URL`.

## Cambios funcionales

1. Agregar `{ href: "/tienda", label: "Tienda" }` después de `Demo` en `lib/navigation.ts`.
2. Agregar el ícono y la variante visual de tienda en `components/navbar.tsx` y `app/globals.css`, conservando el tratamiento visual de Demo sin convertir toda la navegación en botones destacados.
3. Crear `app/tienda/page.tsx` como wrapper server-rendered que lea `searchParams`, construya la URL segura del build estático y presente la aplicación consumidor.
4. Crear estilos específicos para el contenedor de tienda, con altura suficiente para el flujo móvil y escritorio, sin interferir con los estilos internos de Flutter.
5. Crear un script de sincronización/verificación del build consumidor, análogo al flujo existente de Demo.
6. Publicar el build web del flavor consumidor con base path `/tienda-app/` para que sus assets funcionen dentro de Next.
7. Actualizar las verificaciones de navegación para exigir que `Tienda` siga a `Demo` y agregar una verificación de que el wrapper conserva el parámetro QR.
8. Actualizar la documentación de ejecución y publicación con el comando de build y la variable `CONSUMIDOR_WEB_URL`.

## Flujo de usuario

### Entrada desde la navegación

`/tienda` abre la pantalla de entrada del consumidor. Si no hay token, la aplicación permite leer un QR o espera que el usuario abra un enlace de tienda.

### Entrada desde QR

El QR abre `/tienda?tienda=TOKEN`. Next conserva ese parámetro al abrir el build Flutter. Flutter valida el formato, consulta el catálogo a través de `storefront` y presenta la tienda asociada.

### Compra

El consumidor ve nombre de la sucursal, productos disponibles, precios vigentes y carrito. El checkout conserva el comportamiento del MVP ya aprobado: invitado, recoger o domicilio y pago en caja. El pedido queda en `pedidos_online`, separado de `ventas`, y la bandeja del POS lo recibe para confirmación.

## Distribución del build

El build de producción se generará desde `C:\Apps\pharma-pos` con:

```text
flutter build web --release --base-href=/tienda-app/ --dart-define=APP_FLAVOR=consumidor
```

El resultado se sincronizará a `C:\Apps\maukunweb\public\tienda-app`. El script validará como mínimo:

- existencia de `index.html` y `flutter_bootstrap.js`;
- base href `/tienda-app/`;
- bundle principal y assets Flutter;
- ausencia de source maps publicados;
- compatibilidad del wrapper `/tienda` con el parámetro `tienda`.

El paquete compilado será un artefacto publicado, igual que `public/demo-app`; no se copiará el proyecto Flutter completo ni su base local.

## Seguridad y límites

- El token QR es un bearer token público revocable; rotarlo invalida el enlace anterior.
- El host no recibirá ni almacenará `service_role`.
- La tienda no accederá directamente a tablas de Supabase.
- El build seguirá excluyendo productos con receta y respetando la validación server-side de inventario, precio y caducidad.
- El flujo no agrega cuentas de consumidor, pago en línea, reservación automática de inventario ni conversión automática a `ventas`.
- El acceso a cámara depende del navegador, HTTPS y permisos del dispositivo; el enlace directo seguirá siendo la alternativa universal.

## Validación

La implementación deberá conservar las verificaciones existentes y agregar:

- `npm run lint`;
- `npm run typecheck`;
- `npm run build`;
- `npm run test:demo`;
- verificación del paquete `tienda-app`;
- inspección manual de `/tienda`, `/tienda?tienda=TOKEN`, navegación móvil y permiso de cámara;
- comprobación manual de un catálogo y pedido real de prueba sin publicar secretos.

## Fuera de alcance

- Reescribir la tienda en React/Next.
- Crear otro backend o duplicar la Edge Function.
- Cambiar la Demo existente.
- Convertir MauKun Web en panel administrativo.
- Cambiar las tablas o reglas de Supabase ya implementadas para el MVP consumidor.
- Crear una PWA independiente con branding diferente en esta iteración.
