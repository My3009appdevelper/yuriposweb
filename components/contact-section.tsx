import { ArrowRight, Mail, MessageCircle, Sparkles } from "lucide-react";

export function ContactSection() {
  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="container contact-section-grid">
        <div className="contact-section-copy">
          <p className="eyebrow">Siguiente paso</p>
          <h2 id="contact-title">Hablemos de cómo Yuri POS puede ordenar tu negocio.</h2>
          <p>
            Cuéntame qué quieres mejorar en tu operación y te mostraré qué módulos tienen sentido para tu forma de trabajar.
          </p>
        </div>

        <div className="contact-section-panel">
          <div className="contact-section-panel-heading">
            <span className="contact-section-panel-icon"><Sparkles size={19} aria-hidden="true" /></span>
            <div>
              <p className="contact-section-panel-label">Respondo personalmente</p>
              <p className="contact-section-panel-note">Cuéntame qué quieres mejorar y te orientaré sobre los módulos adecuados.</p>
            </div>
          </div>

          <div className="contact-methods">
            <a className="contact-method" href="mailto:maufuku3009@gmail.com" aria-label="Enviar correo a maufuku3009@gmail.com">
              <span className="contact-method-icon"><Mail size={18} aria-hidden="true" /></span>
              <span className="contact-method-copy">
                <small>Correo</small>
                <strong>Enviar un mensaje</strong>
              </span>
              <ArrowRight className="contact-method-arrow" size={17} aria-hidden="true" />
            </a>
            <a
              className="contact-method"
              href="https://wa.me/525570757594?text=Hola%20Mau%2C%20me%20interesa%20conocer%20Yuri%20POS."
              target="_blank"
              rel="noreferrer"
              aria-label="Escribir por WhatsApp"
            >
              <span className="contact-method-icon"><MessageCircle size={18} aria-hidden="true" /></span>
              <span className="contact-method-copy">
                <small>WhatsApp</small>
                <strong>Escribir por WhatsApp</strong>
              </span>
              <ArrowRight className="contact-method-arrow" size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

