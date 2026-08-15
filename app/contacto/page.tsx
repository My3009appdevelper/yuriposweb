import { redirect } from "next/navigation";

export const metadata = {
  title: "Contacto — Yuri POS",
  description: "Conoce el siguiente paso para hablar sobre Yuri POS y sus módulos.",
};

export default function ContactPage() {
  redirect("/#contacto");
}

