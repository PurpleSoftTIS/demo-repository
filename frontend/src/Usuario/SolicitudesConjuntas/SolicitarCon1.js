<<<<<<< HEAD
import React from 'react'
import { useNavigate } from "react-router-dom";

const SolicitarCon1 = () => {
  //FORMA DE ENVIAR DATOS/
  const navigate = useNavigate();   
  const reservarAmbiente = () => {
    const datos = {
      capacidad : "hOLA",
      dia:"vIERNES",
      hora:"15:25 - 15:59",
      nombre_ambiente: "300",
      edificio: "Eicifio Nuevo",
      numero_piso: "0"
    };
    navigate('/Usuario/Usu/SolicitarCon3', { state: datos });
  };
  return (
    <div>
      <div className='capacidad'>
           <button onClick={reservarAmbiente}>
          enviar
         </button>
        </div>
    </div>
  )
}
=======
import React, { useState } from 'react';
import './SolicitarCon1.css';
import { useNavigate } from 'react-router-dom';


const SolicitarCon1 = () => {
  const navigate = useNavigate();   
  const [materia, setMateria] = useState("");
  const [carrera, setCarrera] = useState("");
  const [docente, setDocente] = useState("");
>>>>>>> rama_antes_de_la_main


  const handleRegistroSolicitud = () => {  
    const datos = {
      materia,
      carrera,
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
            <div className="subtitulo">Carrera</div>
            <input 
              className="campo" 
              type="text"
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
              placeholder="Ingrese la materia solicitada"
            />
          </div>
          <div className="contact-form-phone-parent">
            <div className="subtitulo">Materia</div>
            <input 
              className="campo" 
              type="text"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
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