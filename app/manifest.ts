import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yuri POS",
    short_name: "Yuri POS",
    description:
      "Gestión operativa y punto de venta para negocios que quieren trabajar con más orden.",
    lang: "es-MX",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f9ff",
    theme_color: "#f4f9ff",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
