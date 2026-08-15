export type NavigationItem = {
  href: string;
  label: string;
  landingOnly?: boolean;
  variant?: "demo";
};

export const siteNavigation: readonly NavigationItem[] = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#modulos", label: "Módulos", landingOnly: true },
  { href: "/#publico", label: "Negocios", landingOnly: true },
  { href: "/#precios", label: "Planes", landingOnly: true },
  { href: "/#contacto", label: "Contacto", landingOnly: true },
  { href: "/demo", label: "Demo", variant: "demo" },
];

