import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faCheckCircle
//import { Link } from 'react-router-dom';
import "./Mensaje.css";

const MensajeDatExito = () => {
    const retroceder = () => {
        window.history.back();
      };
    
      return (
        <div className="d-flex justify-content-center align-items-center " style={{ height: '76.1vh' }}>
          <div className="card text-center">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center"> 
                <FontAwesomeIcon icon={faCheckCircle} className="icono-check" />
                <h5 className="card-title">Carga de  Exitosa</h5> 
              </div>
              <p className="parrafito">Su registro masivo de guardo correctamente</p>
              <div>          
              <button onClick={retroceder} style={{backgroundColor: '#0d0d46', color: 'white'}} className="btn">Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default MensajeDatExito