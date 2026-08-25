import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda — Yuri POS",
  description: "Consulta el catálogo de tu tienda y prepara tu pedido.",
};

const storeTokenPattern = /^[A-Za-z0-9._~-]{1,128}$/;

type StorePageProps = {
  searchParams: Promise<{ tienda?: string | string[] }>;
};

function getStoreToken(value: string | string[] | undefined) {
  const token = Array.isArray(value) ? value[0] : value;
  return token && storeTokenPattern.test(token) ? token : null;
}

export default async function StorePage({ searchParams }: StorePageProps) {
  const params = await searchParams;
  const token = getStoreToken(params.tienda);
  const query = token ? `?tienda=${encodeURIComponent(token)}` : "";

  return (
    <main className="immersive-app-page" aria-label="Tienda en línea de Yuri POS">
      <iframe
        className="immersive-app-frame"
        src={`/tienda-app/index.html${query}`}
        title="Tienda en línea de Yuri POS"
        allow="camera"
        loading="eager"
        referrerPolicy="same-origin"
      />
    </main>
  );
}
