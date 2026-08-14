"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavigation } from "@/lib/navigation";

function isNavigationItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

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

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={21} strokeWidth={2.1} /> : <Menu size={21} strokeWidth={2.1} />}
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? " primary-navigation-open" : ""}`}
          aria-label="Navegación principal"
        >
          {siteNavigation.map((item) => {
            const active = isNavigationItemActive(pathname, item.href);
            const isSoon = item.status === "soon";

            return (
              <Link
                className={`nav-link${active ? " nav-link-active" : ""}${isSoon ? " nav-link-soon" : ""}`}
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.label}</span>
                {isSoon ? <span className="nav-soon-badge">Próximamente</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
