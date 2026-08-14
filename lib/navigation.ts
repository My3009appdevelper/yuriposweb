export type NavigationStatus = "active" | "soon";

export type NavigationItem = {
  href: string;
  label: string;
  status?: NavigationStatus;
};

export const siteNavigation: readonly NavigationItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/contacto", label: "Contacto" },
  { href: "/demo", label: "Demo", status: "soon" },
];
