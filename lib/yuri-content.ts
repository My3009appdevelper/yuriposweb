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

export type ModuleGroup = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  moduleIds: readonly string[];
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
    plan: "Esencial",
    icon: "history",
    visualAsset: "/assets/modulos-webp/historial-ventas.webp",
  },
  {
    id: "promociones",
    category: "Venta",
    name: "Promociones",
    summary: "Configura ofertas que ayudan a mover productos y dar motivos para volver.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "sparkles",
    visualAsset: "/assets/modulos-webp/promociones.webp",
  },
  {
    id: "impulso-venta",
    category: "Venta",
    name: "Impulso de venta",
    summary: "Relaciona productos y recomendaciones para acompañar cada decisión de compra.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Escala",
    icon: "trending-up",
    visualAsset: "/assets/modulos-webp/impulso-venta.webp",
  },
  {
    id: "clientes",
    category: "Venta",
    name: "Clientes",
    summary: "Conserva la información de tus clientes para atender mejor cada visita.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
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
    name: "Departamentos",
    summary: "Ordena tu catálogo por departamentos claros para encontrar productos y analizar el negocio sin perder tiempo.",
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
    plan: "Esencial",
    icon: "warehouse",
    visualAsset: "/assets/modulos-webp/inventario-sucursal.webp",
  },
  {
    id: "compras",
    category: "Compras",
    name: "Compras",
    summary: "Organiza el abastecimiento desde la necesidad hasta la recepción.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "shopping-basket",
    visualAsset: "/assets/modulos-webp/compras.webp",
  },
  {
    id: "historial-compras",
    category: "Compras",
    name: "Historial de compras",
    summary: "Consulta lo que compraste y encuentra patrones para comprar con criterio.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "history",
    visualAsset: "/assets/modulos-webp/historial-compras.webp",
  },
  {
    id: "ordenes-compra",
    category: "Compras",
    name: "Órdenes de compra",
    summary: "Da estructura a pedidos y entregas para que el inventario no dependa de memoria.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "clipboard-list",
    visualAsset: "/assets/modulos-webp/ordenes-compra.webp",
  },
  {
    id: "proveedores",
    category: "Compras",
    name: "Proveedores",
    summary: "Centraliza tus relaciones de abastecimiento y consulta su información cuando toca decidir.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "truck",
    visualAsset: "/assets/modulos-webp/proveedores.webp",
  },
  {
    id: "sucursales",
    category: "Administración",
    name: "Sucursales",
    summary: "Mantén varias ubicaciones bajo una operación que conserva el control.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "map-pin",
    visualAsset: "/assets/modulos-webp/sucursales.webp",
  },
  {
    id: "usuarios",
    category: "Administración",
    name: "Usuarios",
    summary: "Organiza quién trabaja en el sistema y qué necesita para hacer su trabajo.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
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
    id: "roles-permisos",
    category: "Administración",
    name: "Roles y permisos",
    summary: "Entrega acceso con criterio para proteger la operación sin frenar al equipo.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
    icon: "shield-check",
    visualAsset: "/assets/difference-yuri/optimized/roles-permisos.webp",
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
    plan: "Profesional",
    icon: "megaphone",
    visualAsset: "/assets/modulos-webp/anuncios.webp",
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
    plan: "Esencial",
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
    plan: "Profesional",
    icon: "thermometer",
    visualAsset: "/assets/modulos-webp/control-ambiental.webp",
  },
  {
    id: "recetas",
    category: "Recetas",
    name: "Recetas",
    summary: "Relaciona la venta con la información operativa de una receta.",
    audiences: ["farmacias"],
    plan: "Profesional",
    icon: "pill",
    visualAsset: "/assets/modulos-webp/recetas.webp",
  },
  {
    id: "medicos",
    category: "Recetas",
    name: "Médicos",
    summary: "Administra los profesionales relacionados con el flujo de recetas.",
    audiences: ["farmacias"],
    plan: "Profesional",
    icon: "stethoscope",
    visualAsset: "/assets/modulos-webp/medicos.webp",
  },
  {
    id: "facturas",
    category: "Reportes",
    name: "Facturación",
    summary: "Da seguimiento a la información fiscal asociada a tus operaciones.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Profesional",
    icon: "file-check-2",
    visualAsset: "/assets/modulos-webp/facturacion.webp",
  },
  {
    id: "exportaciones",
    category: "Reportes",
    name: "Exportaciones",
    summary: "Lleva información operativa a formatos que puedas revisar y compartir.",
    audiences: ["general", "farmacias", "abarrotes"],
    plan: "Esencial",
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

export const moduleGroups: readonly ModuleGroup[] = [
  {
    id: "administracion",
    eyebrow: "01 · Administración",
    title: "Administra tu negocio con una sola lógica.",
    description: "Centraliza sucursales, equipos, cajas y permisos para que cada persona sepa qué hacer y tú conserves el control a medida que el negocio crece.",
    moduleIds: ["sucursales", "usuarios", "cajas", "roles-permisos", "personal", "vacaciones", "comisiones", "anuncios"],
  },
  {
    id: "venta",
    eyebrow: "02 · Venta",
    title: "Vende sin problemas, incluso en los días con más movimiento.",
    description: "Convierte cada visita en una operación ágil: cobra, entiende el historial y crea razones para que tus clientes regresen.",
    moduleIds: ["ventas", "historial-ventas", "promociones", "impulso-venta", "clientes", "fidelidad"],
  },
  {
    id: "inventario",
    eyebrow: "03 · Inventario",
    title: "Controla tus productos e inventarios con claridad.",
    description: "Conoce qué tienes, dónde está y cómo está organizado para reponer a tiempo y evitar decisiones a ciegas.",
    moduleIds: ["productos", "departamentos-categorias", "inventario-sucursal"],
  },
  {
    id: "compras",
    eyebrow: "04 · Abastecimiento",
    title: "Abastece tus sucursales y trabaja mejor con tus proveedores.",
    description: "Ordena cada compra desde la necesidad hasta la recepción y conserva una relación de abastecimiento que te permita crecer con confianza.",
    moduleIds: ["compras", "historial-compras", "ordenes-compra", "proveedores"],
  },
  {
    id: "operacion",
    eyebrow: "05 · Operación",
    title: "Mantén la operación bajo control, desde la caja hasta la farmacia.",
    description: "Da seguimiento a cortes, movimientos, tickets y procesos sensibles para que el equipo trabaje con una rutina confiable.",
    moduleIds: ["cortes-caja", "movimientos-caja", "ticket", "control-ambiental", "recetas", "medicos"],
  },
  {
    id: "reportes",
    eyebrow: "06 · Reportes",
    title: "Decide con información clara y accionable.",
    description: "Convierte la actividad de tu negocio en señales que te ayuden a entender lo que ocurre, compartirlo y elegir el siguiente paso.",
    moduleIds: ["facturas", "exportaciones", "graficas", "kpis"],
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
  monthly: string;
  annual: string;
  summary: string;
  limits: readonly string[];
  extraNote: string;
  features: readonly string[];
  featured?: boolean;
};

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: "esencial",
    name: "Esencial",
    monthly: "$X",
    annual: "$X",
    summary: "La base clara para poner en orden la operación diaria desde el primer día.",
    limits: ["2 sucursales incluidas", "5 usuarios incluidos"],
    extraNote: "Sucursal o usuario adicional disponible según tus necesidades.",
    features: [
      "Sucursales, usuarios, cajas y roles y permisos",
      "Ventas, historial de ventas, promociones y clientes",
      "Productos, departamentos e inventario por sucursal",
      "Compras, historial de compras y proveedores",
      "Cortes de caja, movimientos de caja, ticket y exportaciones",
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    monthly: "$X",
    annual: "$X",
    summary: "Más contexto y control para equipos que ya están creciendo.",
    limits: ["5 sucursales incluidas", "12 usuarios incluidos"],
    extraNote: "Extras por sucursal o usuario con una tarifa más conveniente que en Esencial.",
    features: [
      "Sucursales, usuarios, cajas y roles y permisos",
      "Ventas, historial de ventas, promociones y clientes",
      "Productos, departamentos e inventario por sucursal",
      "Compras, historial de compras y proveedores",
      "Cortes de caja, movimientos de caja, ticket y exportaciones",
      "Anuncios y órdenes de compra",
      "Control ambiental, recetas y médicos",
      "Facturación, gráficas y KPIs operativos",
    ],
    featured: true,
  },
  {
    id: "escala",
    name: "Escala",
    monthly: "$X",
    annual: "$X",
    summary: "Capacidades avanzadas para equipos, sucursales y procesos especializados.",
    limits: ["10 sucursales incluidas", "25 usuarios incluidos"],
    extraNote: "La mejor tarifa por sucursal o usuario adicional.",
    features: [
      "Sucursales, usuarios, cajas y roles y permisos",
      "Ventas, historial de ventas, promociones y clientes",
      "Productos, departamentos e inventario por sucursal",
      "Compras, historial de compras, órdenes de compra y proveedores",
      "Cortes de caja, movimientos de caja, ticket y exportaciones",
      "Anuncios, control ambiental, recetas y médicos",
      "Facturación, gráficas y KPIs operativos",
      "Impulso de venta y fidelidad",
      "Personal, vacaciones y comisiones",
    ],
  },
];
