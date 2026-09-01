export const metadata = {
  title: "Demo interactiva — Saruki POS",
  description: "Prueba Saruki POS con un negocio de ejemplo y una sesión aislada.",
};

export default function DemoPage() {
  return (
    <main className="immersive-app-page" aria-label="Demo interactiva de Saruki POS">
      <iframe
        className="immersive-app-frame"
        src="/demo-app/index.html"
        title="Demo interactiva de Saruki POS"
        loading="eager"
        referrerPolicy="same-origin"
      />
    </main>
  );
}
