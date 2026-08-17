export type Audience = "general" | "farmacias" | "abarrotes";

export type ModuleCategory =
  | "Venta"
  | "Inventario"
  | "Compras"
  | "Administración"
  | "Operación"
  | "Recetas"
  | "Reportes";

export type PlanName = "Esencial" | "Profesional" | "Escala";

export type YuriModule = {
  id: string;
  category: ModuleCategory;
  name: string;
  summary: string;
  audiences: readonly Audience[];
  plan: PlanName;
  icon: string;
  visualAsset?: string;
};

export const moduleCategories: readonly ModuleCategory[] = [
  "Venta",
  "Inventario",
  "Compras",
  "Administración",
  "Operación",
  "Recetas",
  "Reportes",
];

export const yuriModules: readonly YuriModule[] = [
  {
    id: "ventas",
    category: "Venta",
    name: "Ventas",
    summary: "Registra ventas, cobra y mantiene la operación del mostrador en movimiento.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "shopping-cart",
    visualAsset: "/assets/modulos-webp/ventas.webp",
  },
  {
    id: "historial-ventas",
    category: "Venta",
    name: "Historial de ventas",
    summary: "Consulta operaciones anteriores y vuelve al detalle cuando necesitas contexto.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "history",
    visualAsset: "/assets/modulos-webp/historial-ventas.webp",
  },
  {
    id: "promociones",
    category: "Venta",
    name: "Promociones",
    summary: "Configura ofertas que ayudan a mover productos y dar motivos para volver.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "sparkles",
    visualAsset: "/assets/modulos-webp/promociones.webp",
  },
  {
    id: "impulso-venta",
    category: "Venta",
    name: "Impulso de venta",
    summary: "Relaciona productos y recomendaciones para acompañar cada decisión de compra.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "trending-up",
    visualAsset: "/assets/modulos-webp/impulso-venta.webp",
  },
  {
    id: "clientes",
    category: "Venta",
    name: "Clientes",
    summary: "Conserva la información de tus clientes para atender mejor cada visita.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "users-round",
    visualAsset: "/assets/modulos-webp/clientes.webp",
  },
  {
    id: "fidelidad",
    category: "Venta",
    name: "Fidelidad",
    summary: "Da seguimiento a beneficios y recompensas para construir relaciones duraderas.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Escala",
    icon: "heart-handshake",
    visualAsset: "/assets/modulos-webp/fidelidad.webp",
  },
  {
    id: "productos",
    category: "Inventario",
    name: "Productos",
    summary: "Administra el catálogo que sostiene tus ventas, precios y existencias.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "package",
    visualAsset: "/assets/modulos-webp/productos.webp",
  },
  {
    id: "departamentos-categorias",
    category: "Inventario",
    name: "Departamentos y categorías",
    summary: "Ordena el catálogo en niveles claros para encontrar y analizar productos sin perder tiempo.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "folder-tree",
    visualAsset: "/assets/modulos-webp/departamentos-categorias.webp",
  },
  {
    id: "inventario-sucursal",
    category: "Inventario",
    name: "Inventario por sucursal",
    summary: "Mira existencias por ubicación y toma decisiones con el contexto correcto.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "warehouse",
    visualAsset: "/assets/modulos-webp/inventario-sucursal.webp",
  },
  {
    id: "movimientos-inventario",
    category: "Inventario",
    name: "Movimientos de inventario",
    summary: "Revisa entradas, salidas, ajustes y el recorrido de tus existencias.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "arrow-left-right",
    visualAsset: "/assets/modulos-webp/movimientos-inventario.webp",
  },
  {
    id: "compras",
    category: "Compras",
    name: "Compras",
    summary: "Organiza el abastecimiento desde la necesidad hasta la recepción.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "shopping-basket",
    visualAsset: "/assets/modulos-webp/compras.webp",
  },
  {
    id: "historial-compras",
    category: "Compras",
    name: "Historial de compras",
    summary: "Consulta lo que compraste y encuentra patrones para comprar con criterio.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "history",
    visualAsset: "/assets/modulos-webp/historial-compras.webp",
  },
  {
    id: "ordenes-compra",
    category: "Compras",
    name: "Órdenes de compra",
    summary: "Da estructura a pedidos y entregas para que el inventario no dependa de memoria.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Escala",
    icon: "clipboard-list",
    visualAsset: "/assets/modulos-webp/ordenes-compra.webp",
  },
  {
    id: "proveedores",
    category: "Compras",
    name: "Proveedores",
    summary: "Centraliza tus relaciones de abastecimiento y consulta su información cuando toca decidir.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "truck",
    visualAsset: "/assets/modulos-webp/proveedores.webp",
  },
  {
    id: "sucursales",
    category: "Administración",
    name: "Sucursales",
    summary: "Mantén varias ubicaciones bajo una operación que conserva el control.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "map-pin",
    visualAsset: "/assets/modulos-webp/sucursales.webp",
  },
  {
    id: "usuarios",
    category: "Administración",
    name: "Usuarios",
    summary: "Organiza quién trabaja en el sistema y qué necesita para hacer su trabajo.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "user-round-cog",
    visualAsset: "/assets/modulos-webp/usuarios.webp",
  },
  {
    id: "cajas",
    category: "Administración",
    name: "Cajas",
    summary: "Configura los puntos de cobro y el contexto que necesita cada turno.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "cash-register",
    visualAsset: "/assets/modulos-webp/cajas.webp",
  },
  {
    id: "personal",
    category: "Administración",
    name: "Personal",
    summary: "Conserva la estructura de tu equipo y sus relaciones laborales.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Escala",
    icon: "badge-check",
    visualAsset: "/assets/modulos-webp/personal.webp",
  },
  {
    id: "vacaciones",
    category: "Administración",
    name: "Vacaciones",
    summary: "Da seguimiento a descansos y disponibilidad con una vista más ordenada.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Escala",
    icon: "calendar-days",
    visualAsset: "/assets/modulos-webp/vacaciones.webp",
  },
  {
    id: "comisiones",
    category: "Administración",
    name: "Comisiones",
    summary: "Relaciona el desempeño comercial con reglas de comisión más claras.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Escala",
    icon: "percent",
    visualAsset: "/assets/modulos-webp/comisiones.webp",
  },
  {
    id: "anuncios",
    category: "Administración",
    name: "Anuncios",
    summary: "Comunica información operativa dentro del espacio donde trabaja tu equipo.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Escala",
    icon: "megaphone",
    visualAsset: "/assets/modulos-webp/anuncios.webp",
  },
  {
    id: "roles-permisos",
    category: "Administración",
    name: "Roles y permisos",
    summary: "Entrega acceso con criterio para proteger la operación sin frenar al equipo.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "shield-check",
    visualAsset: "/assets/difference-yuri/optimized/roles-permisos.webp",
  },
  {
    id: "cortes-caja",
    category: "Operación",
    name: "Cortes de caja",
    summary: "Cierra turnos con una revisión clara de lo que ocurrió en caja.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "receipt-text",
    visualAsset: "/assets/modulos-webp/cortes-caja.webp",
  },
  {
    id: "movimientos-caja",
    category: "Operación",
    name: "Movimientos de caja",
    summary: "Observa entradas y salidas para mantener una operación más transparente.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "arrow-right-left",
    visualAsset: "/assets/modulos-webp/movimientos-caja.webp",
  },
  {
    id: "ticket",
    category: "Operación",
    name: "Ticket",
    summary: "Configura la salida de venta que recibe cada cliente en el mostrador.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "file-text",
    visualAsset: "/assets/modulos-webp/ticket.webp",
  },
  {
    id: "control-ambiental",
    category: "Operación",
    name: "Control ambiental",
    summary: "Registra temperatura y humedad para cuidar procesos sensibles.",
    audiences: ["farmacias"],
    plan: "Escala",
    icon: "thermometer",
    visualAsset: "/assets/modulos-webp/control-ambiental.webp",
  },
  {
    id: "recetas",
    category: "Recetas",
    name: "Recetas",
    summary: "Relaciona la venta con la información operativa de una receta.",
    audiences: ["farmacias"],
    plan: "Escala",
    icon: "pill",
    visualAsset: "/assets/modulos-webp/recetas.webp",
  },
  {
    id: "medicos",
    category: "Recetas",
    name: "Médicos",
    summary: "Administra los profesionales relacionados con el flujo de recetas.",
    audiences: ["farmacias"],
    plan: "Escala",
    icon: "stethoscope",
    visualAsset: "/assets/modulos-webp/medicos.webp",
  },
  {
    id: "facturas",
    category: "Reportes",
    name: "Facturación",
    summary: "Da seguimiento a la información fiscal asociada a tus operaciones.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Escala",
    icon: "file-check-2",
    visualAsset: "/assets/modulos-webp/facturacion.webp",
  },
  {
    id: "exportaciones",
    category: "Reportes",
    name: "Exportaciones",
    summary: "Lleva información operativa a formatos que puedas revisar y compartir.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "download",
    visualAsset: "/assets/modulos-webp/exportacion.webp",
  },
  {
    id: "graficas",
    category: "Reportes",
    name: "Gráficas",
    summary: "Observa tendencias y comparaciones sin depender de hojas separadas.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "bar-chart-3",
    visualAsset: "/assets/modulos-webp/graficas.webp",
  },
  {
    id: "kpis",
    category: "Reportes",
    name: "KPIs operativos",
    summary: "Convierte la actividad de ventas y operación en señales para decidir.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "chart-no-axes-combined",
    visualAsset: "/assets/modulos-webp/kpis.webp",
  },
];

export type AudienceStory = {
  id: "farmacias" | "abarrotes";
  eyebrow: string;
  title: string;
  description: string;
  bullets: readonly string[];
  moduleIds: readonly string[];
};

export const audienceStories: readonly AudienceStory[] = [
  {
    id: "farmacias",
    eyebrow: "Para farmacias",
    title: "Más control cuando cada detalle importa.",
    description:
      "Yuri POS reúne la venta, el inventario y los procesos que hacen especial a una farmacia en una operación más ordenada.",
    bullets: [
      "Lotes, caducidades e inventario por sucursal.",
      "Recetas y médicos dentro del flujo operativo.",
      "Control ambiental de temperatura y humedad.",
      "Compras, proveedores y configuración fiscal.",
    ],
    moduleIds: [
      "inventario-sucursal",
      "movimientos-inventario",
      "control-ambiental",
      "recetas",
      "medicos",
      "facturas",
    ],
  },
  {
    id: "abarrotes",
    eyebrow: "Para abarrotes",
    title: "Más velocidad para el día a día.",
    description:
      "Cuando cada venta cuenta, Yuri POS ayuda a cobrar con agilidad y a mantener el catálogo, la caja y las compras bajo control.",
    bullets: [
      "Catálogo y existencias fáciles de consultar.",
      "Cobro, tickets y cortes de caja ordenados.",
      "Proveedores, compras y promociones conectados.",
      "Clientes y reportes para decidir con contexto.",
    ],
    moduleIds: [
      "ventas",
      "productos",
      "cortes-caja",
      "compras",
      "proveedores",
      "promociones",
    ],
  },
];

export type CapabilityHighlight = {
  id: "offline-first" | "multisucursal" | "roles-permisos" | "reportes-operativos";
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  contextTagline: string;
  visualKey: string;
};

export const capabilityHighlights: readonly CapabilityHighlight[] = [
  {
    id: "offline-first",
    eyebrow: "Sigue trabajando",
    title: "Operación offline-first",
    description: "La persistencia local mantiene el flujo preparado cuando la conexión no acompaña.",
    icon: "wifi-off",
    contextTagline: "La caja sigue su ritmo.",
    visualKey: "offline",
  },
  {
    id: "multisucursal",
    eyebrow: "Crece con orden",
    title: "Multisucursal",
    description: "Organiza tus sucursales, cajas y permisos desde una misma lógica.",
    icon: "network",
    contextTagline: "Cada sucursal habla el mismo idioma.",
    visualKey: "multisucursal",
  },
  {
    id: "roles-permisos",
    eyebrow: "Cuida el acceso",
    title: "Roles y permisos",
    description: "Cada persona puede trabajar con el nivel de acceso que necesita.",
    icon: "shield-check",
    contextTagline: "El acceso correcto, en cada mano.",
    visualKey: "roles",
  },
  {
    id: "reportes-operativos",
    eyebrow: "Decide mejor",
    title: "Reportes operativos",
    description: "KPI, gráficas e historial convierten la actividad en señales útiles.",
    icon: "chart-no-axes-combined",
    contextTagline: "La actividad se vuelve una señal.",
    visualKey: "reports",
  },
];

export type PricingPlan = {
  id: string;
  name: PlanName;
  monthly: number;
  annual: number;
  summary: string;
  features: readonly string[];
  featured?: boolean;
};

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: "esencial",
    name: "Esencial",
    monthly: 499,
    annual: 4990,
    summary: "La operación diaria de un negocio pequeño, ordenada desde el primer día.",
    features: ["Ventas, caja e inventario base", "Catálogo de productos", "Una sucursal para comenzar"],
  },
  {
    id: "profesional",
    name: "Profesional",
    monthly: 899,
    annual: 8990,
    summary: "El sistema de gestión para negocios que ya necesitan control y contexto.",
    features: ["Todo lo esencial", "Compras, clientes y promociones", "Reportes, roles y hasta 3 sucursales"],
    featured: true,
  },
  {
    id: "escala",
    name: "Escala",
    monthly: 1499,
    annual: 14990,
    summary: "Una base sólida con capacidades especializadas para equipos más grandes.",
    features: ["Todo lo profesional", "Recetas, fiscal y control ambiental", "Sucursales y permisos ampliados"],
  },
];
