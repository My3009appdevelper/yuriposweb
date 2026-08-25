export const metadata = {
  title: "Demo interactiva — Yuri POS",
  description: "Prueba Yuri POS con un negocio de ejemplo y una sesión aislada.",
};

export default function DemoPage() {
  return (
    <main className="immersive-app-page" aria-label="Demo interactiva de Yuri POS">
      <iframe
        className="immersive-app-frame"
        src="/demo-app/index.html"
        title="Demo interactiva de Yuri POS"
        loading="eager"
        referrerPolicy="same-origin"
      />
    </main>
  );
}
