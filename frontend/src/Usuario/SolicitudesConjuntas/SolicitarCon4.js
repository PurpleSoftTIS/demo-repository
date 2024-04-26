import React, { useState } from 'react';
import './SolicitarCon4.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SolicitarCon4 = () => {
    
  const navigate = useNavigate();   

  const { state: datos } = useLocation();
  const capacidad = datos ? datos.capacidad : null; 
  const dia = datos ? datos.dia : null;
  const hora = datos ? datos.hora : null;
  const nombreAm = datos ? datos.nombre_ambiente : null;
  const edificio = datos ? datos.edificio : null;
  const numeroPiso = datos ? datos.numeroPiso : null;
  const [errorInconpleto, setErrorIncompleto] = useState("");

  const [materia, setMateria] = useState('');
  const [grupo, setGrupo] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleRegistroSolicitud = (e) => {
    e.preventDefault();

    const datosSolicitud = {
      capacidad,
      dia,
      hora,
      nombreAm,
      edificio,
      numeroPiso,
      materia,
      grupo,
      motivo
    };
  
    fetch("http://127.0.0.1:8000/api/RegistrarSol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosSolicitud)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al registrar la solicitud');
      }
      return response.json();
    })
    .then(data => {
      console.log("Registro exitoso:", data);
      navigate('/Usuario/Usu/Reservas');
    })
    .catch(error => {
      console.error("Error al registrar la solicitud:", error);
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
            <div className="contact-form-phone">Grupo</div>
            <input 
              className="contact-form-rectangle" 
              type="text"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              placeholder="Ingrese el primer grupo"
            />
            <input 
              className="contact-form-rectangle" 
              type="text"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              placeholder="Ingrese el segundo grupo"
            />
            <input 
              className="contact-form-rectangle" 
              type="text"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              placeholder="Ingrese el tercer grupo"
            />
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
    </div>  )
}

export default SolicitarCon4