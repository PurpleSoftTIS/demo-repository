import React, { useState } from 'react';
import './SolicitarCon1.css';
import { useNavigate } from 'react-router-dom';


const SolicitarCon1 = () => {
  const navigate = useNavigate();   
  const [materia, setMateria] = useState('');
  const [grupo, setGrupo] = useState('');
  const [docente, setDocente] = useState('');


  const handleRegistroSolicitud = () => {  
    const datos = {
      materia,
      grupo,
      docente
    };  
    navigate('/Usuario/Usu/SolicitarCon2', { state: datos });    
  };
  return (
    <div className="contact-form-container">
      <section className="contenedora">
        <div className="titulo">
          <b className="reserva">Reservas</b>
          <div className="contact-form-phone-parent">
            <div className="subtitulo">Materia</div>
            <input 
              className="campo" 
              type="text"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              placeholder="Ingrese la materia solicitada"
            />
          </div>
          <div className="contact-form-phone-parent">
            <div className="subtitulo">Grupo</div>
            <input 
              className="campo" 
              type="text"
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              placeholder="Ingrese el grupo"
            />
          </div>
          <div className="contact-form-phone-parent">
            <div className="subtitulo">Docente</div>
            <input 
              className="campo" 
              type="text"
              value={docente}
              onChange={(e) => setDocente(e.target.value)}
              placeholder="Ingrese el docente solicitado"
            />
          </div>
          
          <button className="buton" onClick={handleRegistroSolicitud}>
            <div className="buttton">Siguiente</div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default SolicitarCon1;