import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yuri-pos.vercel.app";
const siteTitle = "Saruki POS — Más que un punto de venta";
const siteDescription =
  "Saruki POS conecta ventas, inventario, compras y administración para ayudar a farmacias y abarrotes a trabajar con más orden.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Saruki POS",
  },
  description: siteDescription,
  applicationName: "Saruki POS",
  keywords: ["Saruki POS", "punto de venta", "farmacias", "abarrotes", "inventario", "ventas"],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/assets/brand/saruki-icon-dark.png",
        type: "image/png",
        sizes: "512x512",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/brand/saruki-icon-light.png",
        type: "image/png",
        sizes: "512x512",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/assets/brand/saruki-icon-dark.png",
        type: "image/png",
        sizes: "512x512",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/brand/saruki-icon-light.png",
        type: "image/png",
        sizes: "512x512",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Saruki POS",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saruki POS — gestión que acompaña",
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
      <body>{children}</body>
    </html>
  );
}
