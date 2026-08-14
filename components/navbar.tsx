"use client";

import Link from "next/link";
import { Home, Mail, MonitorPlay, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteNavigation } from "@/lib/navigation";

function isNavigationItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link className="brand-lockup" href="/" aria-label="Yuri POS, ir a Inicio">
          <span className="brand-logo" aria-hidden="true">
            <Image
              className="brand-logo-image"
              src="/assets/brand/yuri-logo.png"
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
          {siteNavigation.map((item) => {
            const active = isNavigationItemActive(pathname, item.href);
            const isSoon = item.status === "soon";
            const NavigationIcon: LucideIcon = item.href === "/"
              ? Home
              : item.href === "/contacto"
                ? Mail
                : MonitorPlay;

            return (
              <Link
                className={`nav-link${active ? " nav-link-active" : ""}${isSoon ? " nav-link-soon" : ""}`}
                href={item.href}
                key={item.href}
                aria-label={`${item.label}${isSoon ? ", próximamente" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <NavigationIcon className="nav-link-icon" size={16} strokeWidth={2.1} aria-hidden="true" />
                <span className="nav-link-label">{item.label}</span>
                {isSoon ? <span className="nav-soon-badge">Próximamente</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
