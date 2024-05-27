import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons'; 
import "./Mensaje.css";
import { useNavigate } from "react-router-dom";

const MensajeNoEncontrado = () => {
    const navigate = useNavigate();
    const retroceder = () => {
      navigate("Usuario/Usu/Reservas");
    };    
    return (
      <div className="d-flex justify-content-center align-items-center " style={{ height: '76.1vh' }}>
        <div className="card text-center">
          <div className="card-body">
            <div className="d-flex flex-column align-items-center"> 
              <FontAwesomeIcon icon={faSadTear} className="icono-check" />
              <h5 className="card-title">No hay Aulas disponibles para su Solicitud</h5> 
            </div>
            <p className="parrafito">Lo sentimos, no se encontraron aulas disponibles en fecha para atender su solicitud, puede intentar con otra fecha</p>
            <div>          
              <button onClick={retroceder} style={{backgroundColor: '#0d0d46', color: 'white'}} className="btn">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MensajeNoEncontrado;