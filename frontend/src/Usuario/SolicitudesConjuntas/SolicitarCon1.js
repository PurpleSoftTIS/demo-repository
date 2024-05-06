import React, { useState } from 'react';
import './SolicitarCon1.css';
import { useNavigate } from 'react-router-dom';


const SolicitarCon1 = () => {
  const navigate = useNavigate();   
  const [materia, setMateria] = useState("");
  const [docente, setDocente] = useState("");


  const handleRegistroSolicitud = () => {  
    const datos = {
      materia,
      docente
    };  
    navigate('/Usuario/Usu/SolicitarCon2', { state: datos });    
  };

  /*useEffect(() => {
    fetch('http://127.0.0.1:8000/api/SolicitudUrgencias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSolicitudes(data);
        console.log(data);
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);*/

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