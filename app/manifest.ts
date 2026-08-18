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
        src: "/assets/brand/short-yuri-logo-dark.png",
        sizes: "1228x1281",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/brand/short-yuri-logo-light.png",
        sizes: "1218x1291",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
