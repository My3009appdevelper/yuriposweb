# MauKun — especificación de diseño del portafolio

Fecha: 2026-08-14  
Estado: propuesta aprobada para documentar; pendiente de revisión escrita antes de implementación  
Stack previsto: Next.js, TypeScript y CSS modular o equivalente ligero

## 1. Objetivo

Construir la primera versión pública de **MauKun**, una vitrina profesional para presentar y promocionar productos digitales propios. La experiencia debe sentirse tecnológica, pulida, clara y preparada para crecer sin parecer una plantilla genérica.

La versión inicial no integrará aplicaciones ejecutables ni backend de productos. Su responsabilidad será presentar el estudio, ordenar el catálogo y dejar una base sólida para añadir fichas, demos y estados de producto posteriormente.

## 2. Decisiones aprobadas

- Personalidad visual: **B · Luminous Lab**.
- Estructura de portada: **B · Editorial index**.
- Navegación: `Inicio`, `Catálogo`, `Sobre mí`, `Contacto`.
- El enlace de productos se llamará **Catálogo**.
- El catálogo inicial puede estar vacío; no se deben inventar aplicaciones publicadas.
- Las demos interactivas se consideran una extensión futura, no parte de la primera entrega.
- El proyecto se implementará con Next.js.

## 3. Alcance de la primera entrega

### Incluido

- Sitio responsive para escritorio, tablet y móvil.
- Barra de navegación persistente con estado activo y menú móvil.
- Página de inicio editorial.
- Página de catálogo preparada para una lista data-driven de productos, con estado vacío elegante.
- Página “Sobre mí” con estructura de contenido pendiente de datos finales.
- Página “Contacto” con estructura preparada para enlaces o formulario, sin persistencia propia en esta fase.
- Sistema visual coherente: superficies luminosas, tipografía sans tecnológica, bordes finos, radios suaves y acentos cian.
- Transiciones sutiles y respeto de `prefers-reduced-motion`.
- Metadatos básicos, títulos de página, favicon y estructura semántica.

### Fuera de alcance

- Ejecución o incrustación de Pharma POS u otras aplicaciones.
- Autenticación, base de datos, Supabase, panel de administración o CMS.
- Envío persistente de formularios de contacto.
- Analítica, pagos, descargas o cuentas de usuario.
- Creación de contenido ficticio que pueda confundirse con productos reales.

## 4. Arquitectura de información

### Rutas

- `/`: presentación del estudio, propuesta de valor, índice breve y llamada al catálogo.
- `/catalogo`: índice completo de productos; admite estados `Disponible`, `En desarrollo` y `Próximamente` cuando existan datos reales.
- `/sobre-mi`: historia, criterio, capacidades y enlaces personales.
- `/contacto`: formas de contacto y futura entrada de solicitud.

### Inicio

1. Navegación con marca MauKun y enlaces principales.
2. Hero editorial con una frase de posicionamiento y CTA hacia `Catálogo`.
3. Breve manifiesto sobre construir software útil, preciso y con intención.
4. Vista previa del índice de productos, compatible con cero, uno o muchos productos.
5. Bloque de transición hacia `Sobre mí` o `Contacto`.
6. Footer con navegación secundaria y enlaces configurables.

### Catálogo vacío

El catálogo sin productos no será una pantalla rota ni una rejilla de placeholders. Mostrará una composición intencional que explique que MauKun está preparando sus primeros lanzamientos y ofrecerá una ruta clara a `Sobre mí` o `Contacto`. El componente de estado vacío se sustituirá automáticamente por fichas cuando se añadan productos reales.

## 5. Dirección visual

### Referencia de Pharma POS

La interfaz de Pharma POS fue inspeccionada como fuente visual. Se conservará su lenguaje como referencia de producto, sin convertir obligatoriamente todo MauKun en una copia del POS:

- Azul de marca: `#00B1FF`.
- Rojo de marca: `#F31322`.
- Blanco: `#FDFFFF`.
- Fondo claro: `#F7FBFF`.
- Texto oscuro: `#10212B`.
- Texto secundario: `#516977`.
- Fondo oscuro de apoyo: `#08131B`.
- Superficies oscuras: `#0E1A23` y `#132330`.

MauKun usará una adaptación luminosa: predominio de fondo claro y texto oscuro, cian para acciones y selección, y rojo únicamente como acento excepcional. La paleta exacta quedará centralizada en tokens CSS para poder ajustar contraste sin dispersar valores.

### Composición

- Contenedor de lectura amplio pero limitado para evitar líneas excesivas.
- Espaciado generoso y ritmo vertical editorial.
- Tarjetas con fondo de superficie, borde fino y sombras muy contenidas.
- Radios orientativos: 12 px en controles, 16 px en tarjetas y 24 px en contenedores destacados.
- Detalles de producto en forma de índice, no como una cuadrícula genérica de ecommerce.
- Microinteracciones de entrada, hover y foco; ninguna animación debe bloquear la lectura.

### Tipografía

Se usará una sans moderna con jerarquía marcada. `TafelSansProLight`, observada en Pharma POS, será la referencia visual; antes de reutilizar un archivo concreto se verificará disponibilidad y licencia en el proyecto MauKun. Los títulos tendrán peso y tracking controlados; los textos auxiliares serán breves y de alto contraste.

## 6. Componentes principales

- `SiteShell`: estructura global, fondo, ancho de contenido y footer.
- `Navbar`: marca, enlaces, activo, menú móvil y foco de teclado.
- `EditorialHero`: título, texto, CTA y composición visual de apertura.
- `ProductIndex`: lista ordenada y extensible de productos.
- `ProductIndexItem`: número, nombre, estado, descripción corta y enlace futuro.
- `CatalogEmptyState`: estado inicial sin productos.
- `AboutPreview`: extracto de `Sobre mí`.
- `ContactCta`: llamada no invasiva hacia `Contacto`.
- `PageIntro`: encabezados consistentes para páginas internas.
- `Footer`: navegación secundaria y enlaces configurables.

Los componentes recibirán contenido por props o módulos de datos, no por cadenas duplicadas en múltiples páginas.

## 7. Modelo de contenido futuro

El catálogo debe poder crecer sin cambiar la arquitectura:

```ts
type ProductStatus = 'available' | 'in-progress' | 'coming-soon';

type Product = {
  slug: string;
  index: string;
  name: string;
  summary: string;
  status: ProductStatus;
  category?: string;
  accent?: string;
  href?: string;
  demoUrl?: string;
};
```

La primera versión puede exportar una lista vacía. Cuando exista un producto real, se añadirá mediante datos tipados y se generará su ficha en `/catalogo/[slug]` en una fase posterior.

## 8. Comportamiento y estados

- El enlace activo de navegación debe ser evidente y también accesible para lectores de pantalla.
- El menú móvil se abrirá y cerrará con teclado, tendrá `aria-expanded` y no perderá el foco.
- Los botones y enlaces tendrán estados hover, focus-visible, pressed y disabled cuando corresponda.
- Si una ruta no existe, Next.js debe mostrar una página 404 coherente con la identidad visual.
- Las imágenes futuras deberán tener dimensiones conocidas, `alt` descriptivo y carga diferida cuando no estén en el primer viewport.
- Si se añade un formulario de contacto en una fase posterior, los estados de validación, envío, error y éxito serán explícitos.

## 9. Preparación para demos futuras

La primera entrega no cargará Flutter ni ejecutará Pharma POS. La separación de responsabilidades será:

- MauKun presenta el producto y su ficha.
- Una futura ficha podrá enlazar a una demo local o aislada mediante `demoUrl`.
- La edición demo de Pharma POS se diseñará después como una aplicación independiente con datos locales por visitante; no se mezclará con la navegación del portafolio.

## 10. Validación prevista

Antes de considerar la implementación terminada se verificará:

- `npm run lint`, typecheck y build de producción.
- Render de las cuatro rutas en tamaños móvil, tablet y escritorio.
- Navegación por teclado y focus-visible.
- Contraste de texto y controles.
- Estado vacío del catálogo y comportamiento con un producto de prueba local no publicado.
- `prefers-reduced-motion`.
- Enlaces internos, 404 y metadatos básicos.
- Revisión visual manual en navegador; los checks estáticos no sustituyen esa revisión.

## 11. Datos pendientes antes de publicar contenido final

- Nombre y biografía definitivos para `Sobre mí`.
- Correo, redes o canal de contacto.
- Logotipo/wordmark final de MauKun.
- Primeros productos y sus estados.
- Decisión posterior sobre formulario de contacto y analítica.

## 12. Criterio de aceptación de diseño

La web debe sentirse como un estudio de productos digitales con criterio propio: clara en el primer vistazo, elegante sin exceso decorativo, fácil de ampliar y honesta sobre qué productos existen realmente. La ausencia inicial de aplicaciones no debe parecer una carencia técnica, sino una etapa deliberada del índice de MauKun.
