# Yuri POS web

Portfolio comercial de Yuri POS, construido con Next.js App Router. Presenta el sistema como una plataforma de gestión operativa y punto de venta para farmacias y abarrotes.

## Ejecutar localmente

Requisitos: Node.js 20.9 o posterior y npm.

```powershell
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Verificación

```powershell
npm run lint
npm run typecheck
npm run build
```

## Rutas

- `/` — hero, capacidades, índice filtrable de módulos, Farmacias, Abarrotes y precios.
- `/contacto` — estado del canal de contacto, sin formulario ficticio.
- `/demo` — estado de la futura demo web aislada; todavía no está habilitada.
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

El código queda listo para conectarse al repositorio:

```text
https://github.com/My3009appdevelper/yuriposweb
```

Este checkout no hizo `push` ni despliegue. Para conectarlo manualmente:

```powershell
git remote add origin https://github.com/My3009appdevelper/yuriposweb.git
git push -u origin master
```

Después, en Vercel, importa el repositorio y usa la configuración detectada de Next.js. No se requieren variables de entorno para esta versión estática.

## Límites actuales

No se incluye Supabase, autenticación, CMS, analytics, pagos, backend de contacto, migraciones, demo Flutter embebida ni sesión de demo productiva. La futura demo deberá usar datos precargados aislados y borrar los cambios al cerrar la sesión.

