import React, { useState } from 'react';
import './SolicitarCon4.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SolicitarCon4 = () => {
  const navigate = useNavigate();

  const { state: datos3 } = useLocation();
  const materia = datos3 ? datos3.materia : null; 
  const carrera = datos3 ? datos3.grupo : null;
  const docente = datos3 ? datos3.docente : null; 
  const numeroEstudiantes = datos3 ? datos3.numeroEstudiantes : null; 
  const diaSeleccionado = datos3 ? datos3.diaSeleccionado : null; 
  const horaSeleccionada = datos3 ? datos3.horaSeleccionada : null;
  const edificio = datos3 ? datos3.edificio : null;  
  const numero_piso = datos3 ? datos3.numero_piso : null;  
  const nombre_ambiente = datos3 ? datos3.nombre_ambiente : null;  


  const [grupo, setGrupo] = useState("");
  const [motivo, setMotivo] = useState("");


  const handleRegistroSolicitud = (e) => {
    e.preventDefault();

    const datosSolicitud = {      
      materia,
      carrera,
      docente,
      numeroEstudiantes,
      diaSeleccionado,
      horaSeleccionada,
      edificio,
      numero_piso,
      nombre_ambiente,
      grupo,
      motivo
    };
    console.log(datosSolicitud);
  
    fetch("http://127.0.0.1:8000/api/RegistrarSolCon", {
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
    navigate('/Usuario/Usu/SolicitarCon4')
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
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              placeholder="Ingrese el primer grupo"
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