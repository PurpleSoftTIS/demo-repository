import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faTimesCircle
import "./Mensaje.css";

const MensajeActError = () => {
  const retroceder = () => {
    window.history.back();
    window.history.back(); 
  };
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '76.1vh' }}>
      <div className="card text-center">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center"> 
            <FontAwesomeIcon icon={faTimesCircle} className="icono-x" />
            <h5 className="card-title">Ha ocurrido un error</h5> 
          </div>
          <p className="parrafito">Hubo un error al intentar guardar su actualizacion intente de nuevo</p>
          <div>          
          <button onClick={retroceder} style={{backgroundColor: '#0d0d46', color: 'white'}} className="btn">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensajeActError;