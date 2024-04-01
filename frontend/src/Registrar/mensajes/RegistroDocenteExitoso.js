import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faCheckCircle
import { Link } from 'react-router-dom';
import "./RegistroDocente.css";

const RegistroDocenteExitoso = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center"> 
            <FontAwesomeIcon icon={faCheckCircle} className="icono-check" />
            <h5 className="card-title">Registro de Docente Exitoso</h5> 
          </div>
          <p className="parrafito">Su registro se ha guardado exitosamente</p>
          <div>          
                <Link to="/Solicitar" style={{backgroundColor: '#0d0d46', color: 'white'}} className="btn">Aceptar</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroDocenteExitoso;
