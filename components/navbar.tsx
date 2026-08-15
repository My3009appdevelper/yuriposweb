"use client";

import Link from "next/link";
import { Boxes, CreditCard, Home, Mail, MonitorPlay, Package, UsersRound, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteNavigation, type NavigationItem } from "@/lib/navigation";

function isNavigationItemActive(pathname: string, href: string) {
  const [basePath, anchor] = href.split("#");
  const routePath = basePath || "/";
  if (routePath === "/") return pathname === "/" && (!anchor || anchor === "inicio");
  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}

function getNavigationIcon(item: NavigationItem): LucideIcon {
  switch (item.label) {
    case "Inicio":
      return Home;
    case "Módulos":
      return Package;
    case "Negocios":
      return UsersRound;
    case "Planes":
      return CreditCard;
    case "Contacto":
      return Mail;
    case "Demo":
      return MonitorPlay;
    default:
      return Boxes;
  }
}

export function Navbar() {
  const pathname = usePathname();
  const visibleNavigation = siteNavigation.filter((item) => pathname === "/" || !item.landingOnly);

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link className="brand-lockup" href="/" aria-label="Yuri POS, ir a Inicio">
          <span className="brand-logo" aria-hidden="true">
            <Image
              className="brand-logo-image"
              src="/assets/brand/yuri-logo-dark.png"
              alt=""
              width={120}
              height={120}
              priority
            />
          </span>
          <span className="brand-product-label">POS</span>
        </Link>

        <nav
          id="primary-navigation"
          className="primary-navigation"
          aria-label="Navegación principal"
        >
          {visibleNavigation.map((item) => {
            const active = isNavigationItemActive(pathname, item.href);
            const NavigationIcon = getNavigationIcon(item);

            return (
              <Link
                className={`nav-link${active ? " nav-link-active" : ""}${item.variant === "demo" ? " nav-link-demo" : ""}`}
                href={item.href}
                key={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
              >
                <NavigationIcon className="nav-link-icon" size={16} strokeWidth={2.1} aria-hidden="true" />
                <span className="nav-link-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

