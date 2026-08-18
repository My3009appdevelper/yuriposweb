"use client";

import Link from "next/link";
import { Boxes, CreditCard, Home, Mail, MonitorPlay, Package, Sparkles, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
    case "Beneficios":
      return Sparkles;
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

function getNavigationAnchor(href: string) {
  return href.split("#")[1] ?? null;
}

export function Navbar() {
  const pathname = usePathname();
  const [activeLandingSection, setActiveLandingSection] = useState("inicio");
  const visibleNavigation = siteNavigation.filter((item) => pathname === "/" || !item.landingOnly);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = siteNavigation
      .filter((item) => item.landingOnly)
      .map((item) => getNavigationAnchor(item.href))
      .filter((anchor): anchor is string => Boolean(anchor));
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const headerOffset = 96;
      const scrollPosition = window.scrollY + headerOffset;
      let currentSection = "inicio";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
          currentSection = sectionId;
        }
      }

      setActiveLandingSection((previous) => previous === currentSection ? previous : currentSection);
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

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
            const anchor = getNavigationAnchor(item.href);
            const active = pathname === "/" && anchor
              ? activeLandingSection === anchor
              : isNavigationItemActive(pathname, item.href);
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

