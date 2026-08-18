import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const siteUrl = "https://yuri-pos.vercel.app";
const siteTitle = "Yuri POS — Más que un punto de venta";
const siteDescription =
  "Yuri POS conecta ventas, inventario, compras y administración para ayudar a farmacias y abarrotes a trabajar con más orden.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Yuri POS",
  },
  description: siteDescription,
  applicationName: "Yuri POS",
  keywords: ["Yuri POS", "punto de venta", "farmacias", "abarrotes", "inventario", "ventas"],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/assets/brand/short-yuri-logo-dark.png",
        type: "image/png",
        sizes: "1228x1281",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/brand/short-yuri-logo-light.png",
        type: "image/png",
        sizes: "1218x1291",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/assets/brand/short-yuri-logo-dark.png",
        type: "image/png",
        sizes: "1228x1281",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/brand/short-yuri-logo-light.png",
        type: "image/png",
        sizes: "1218x1291",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Yuri POS",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yuri POS — gestión que acompaña",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f9ff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
