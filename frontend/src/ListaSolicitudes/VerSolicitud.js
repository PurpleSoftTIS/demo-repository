import React, {  } from 'react';
import './VerSolicitud.css';

const VerSolicitud = () => {

  return (
    <div className="contact-form-container">
      <section className="contenedor">
        <div className="contact-form-sub-heading-cta">
          <b className="contact-form-enter-details">Detalles de Solicitud</b>
          <div className="contact-form-phone-parent">
            <div className="contact-form-phone">Docente</div>
            <label 
              className="contact-form-rectangle" 
              type="text"

              placeholder="Ingrese la materia solicitada"
            />
          </div>
          <div className="contact-form-phone-parent">
            <div className="contact-form-phone">Materia</div>
            <label 
              className="contact-form-rectangle" 
              type="text"
              placeholder="Ingrese la materia solicitada"
            />
          </div>
          <div className="contact-form-phone-parent">
            <div className="contact-form-phone">Capacidad</div>
            <label 
              className="contact-form-rectangle" 
              type="text"
              placeholder="Ingrese la materia solicitada"
            />
          </div>
          <div className="contact-form-frame-parent">
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Aula</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <label
                className="contact-form-rectangle1" 
                type="text"
                
                placeholder="Ingrese el aula"
              />
            </div>
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Grupo</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <label 
                className="contact-form-rectangle1" 
                type="text"
                placeholder="Ingrese el grupo"
              />
            </div>
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Tipo de Solicitud</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <input 
                className="contact-form-rectangle1" 
                type="text"
                placeholder="Conjunta o Individual "
              />
            </div>
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Fecha</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <label 
                className="contact-form-rectangle1" 
                type="text"
                placeholder="Ingrese el grupo"
              />
            </div>
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Hora</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <label 
                className="contact-form-rectangle1" 
                type="text"
                placeholder="Ingrese el grupo"
              />
            </div>
          </div>
          
          <button className="contact-form-cta-button" >
            <div className="contact-form-button">Aceptar</div>
          </button>
        </div>
      </section>
    </div>  
    )
}

export default VerSolicitud