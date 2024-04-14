import React from 'react'
import './Solicitar2.css'
const Solicitar2 = () => {
  
  return (
    <div className="contact-form-container">
      <section className="contact-form-content">
        <div className="contact-form-details-wrapper">
          <div className="contact-form-details">
            <div className="contact-form-heading-details">
              <div className="contact-form-heading-text">
                <div className="contact-form-get-in-touch" />
                <div className="contact-form-lorem-ipsum-dolor-si" />
              </div>
              <div className="contact-form-street-11-bloc" />
            </div>
            <div className="contact-form-view-job-openings" />
          </div>
        </div>
        <div className="contact-form-sub-heading-cta">
          <b className="contact-form-enter-details">Detalles de Solicitud</b>
          <div className="contact-form-phone-parent">
            <div className="contact-form-phone">Materia</div>
            <input className="contact-form-rectangle" type="text" />
          </div>
          <div className="contact-form-frame-parent">
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Grupo</div>
              <div className="contact-form-email">Nro. Estudiantes</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <input className="contact-form-rectangle1" type="text" />
              <input className="contact-form-rectangle2" type="text" />
            </div>
          </div>
          <div className="contact-form-message-parent">
            <div className="contact-form-message">Motivo</div>
            <input className="contact-form-rectangle3" type="text" />
          </div>
          <button className="contact-form-cta-button">
            <div className="contact-form-button">Enviar</div>
          </button>
        </div>
      </section>
    </div>
  );
};



export default Solicitar2