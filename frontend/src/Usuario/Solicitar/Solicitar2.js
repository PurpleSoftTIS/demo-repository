import React, { useState, useEffect } from 'react';
import './Solicitar2.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Solicitar2 = () => {
  const navigate = useNavigate();   
  const location =useLocation();
  console.log("Datos solicitar 2:", location.state);
  
  const [grupo, setGrupo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [materia, setMateria] = useState([]);

  const handleRegistroSolicitud = (e) => {
    e.preventDefault();

   console.log("Solicitud registrada:", { materia, grupo, motivo });
    navigate('/Usuario/Usu/Reservas');
  };
  useEffect(() => {
    const correo = location.state.correo;
     console.log(correo);
    if (correo) {
      // Suponiendo que "docente" sea la variable donde almacenas el correo electrónico del docente
      fetch(`http://127.0.0.1:8000/api/obtenerMaterias/${correo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar los horarios del docente');
          }
          return response.json();
        })
        .then(data => {
          setMateria(data);
        })
        .catch(error => {
          console.error('Error al cargar los horarios del docente:', error);
        });
    }
  }, []);

  

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
