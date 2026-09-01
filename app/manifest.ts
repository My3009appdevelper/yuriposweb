import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Saruki POS",
    short_name: "Saruki",
    description:
      "Gestión operativa y punto de venta para negocios que quieren trabajar con más orden.",
    lang: "es-MX",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f9ff",
    theme_color: "#f4f9ff",
    icons: [
      {
        src: "/assets/brand/saruki-icon-dark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
