import React, { useState } from 'react';
import './Solicitar2.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Solicitar2 = () => {
  const navigate = useNavigate();   

  const [materia, setMateria] = useState('');
  const [grupo, setGrupo] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleRegistroSolicitud = (e) => {
    e.preventDefault();

  
  
    fetch("http://127.0.0.1:8000/api/RegistrarSol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify()
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al registrar la solicitud');
      }
      return response.json();
    })
    .then(data => {
      console.log("Registro exitoso:", data);
      // Aquí puedes mostrar un mensaje de éxito o redirigir a otra página
      navigate('/Usuario/Usu/Reservas');
    })
    .catch(error => {
      console.error("Error al registrar la solicitud:", error);
      // Aquí puedes mostrar un mensaje de error al usuario
    });
  };

  return (
    <div className="contact-form-container">
      <section className="contenedor">
        <div className="contact-form-details-wrapper">          
        </div>
        <div className="contact-form-sub-heading-cta">
          <b className="contact-form-enter-details">Detalles de Solicitud</b>
          <div className="contact-form-phone-parent">
            <div className="contact-form-phone">Materia</div>
            <input 
              className="contact-form-rectangle" 
              type="text"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              placeholder="Ingrese la materia solicitada"
            />
          </div>
          <div className="contact-form-frame-parent">
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Grupo</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <input 
                className="contact-form-rectangle1" 
                type="text"
                value={grupo}
                onChange={(e) => setGrupo(e.target.value)}
                placeholder="Ingrese el grupo"
              />
            </div>
          </div>
          <div className="contact-form-message-parent">
            <div className="contact-form-message">Motivo</div>
            <input 
              className="contact-form-rectangle3" 
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ingrese el motivo"
            />
          </div>
          <button className="contact-form-cta-button" onClick={handleRegistroSolicitud}>
            <div className="contact-form-button">Enviar</div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Solicitar2;
