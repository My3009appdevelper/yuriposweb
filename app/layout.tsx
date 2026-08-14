import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuri POS — Más que un punto de venta",
  description:
    "Yuri POS conecta ventas, inventario, compras y administración para ayudar a farmacias y abarrotes a trabajar con más orden.",
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
