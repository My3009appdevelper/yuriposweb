import { redirect } from "next/navigation";

export const metadata = {
  title: "Contacto — Saruki POS",
  description: "Conoce el siguiente paso para hablar sobre Saruki POS y sus módulos.",
};

export default function ContactPage() {
  redirect("/#contacto");
}
