import { ArrowRight, Mail, Phone, Sparkles } from "lucide-react";

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
          <div className="contact-section-actions">
            <a className="button button-primary" href="mailto:maufuku3009@gmail.com">
              Escribirme por correo <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="contact-text-link" href="#precios">
              Revisar planes <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="contact-section-panel">
          <div className="contact-section-panel-heading">
            <span className="contact-section-panel-icon"><Sparkles size={19} aria-hidden="true" /></span>
            <div>
              <p className="contact-section-panel-label">Canales directos</p>
              <p className="contact-section-panel-note">Respondo personalmente las consultas sobre Yuri POS.</p>
            </div>
          </div>

          <div className="contact-methods">
            <a className="contact-method" href="mailto:maufuku3009@gmail.com" aria-label="Enviar correo a maufuku3009@gmail.com">
              <span className="contact-method-icon"><Mail size={18} aria-hidden="true" /></span>
              <span className="contact-method-copy">
                <small>Correo</small>
                <strong>maufuku3009@gmail.com</strong>
              </span>
              <ArrowRight className="contact-method-arrow" size={17} aria-hidden="true" />
            </a>
            <a className="contact-method" href="tel:+525570757594" aria-label="Llamar al +52 55 7075 7594">
              <span className="contact-method-icon"><Phone size={18} aria-hidden="true" /></span>
              <span className="contact-method-copy">
                <small>Teléfono</small>
                <strong>+52 55 7075 7594</strong>
              </span>
              <ArrowRight className="contact-method-arrow" size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

