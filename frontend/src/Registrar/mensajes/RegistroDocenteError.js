import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Importa el icono faTimesCircle
import { Link } from 'react-router-dom';
import "./RegistroDocente.css";

const RegistroDocenteError = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center"> 
            <FontAwesomeIcon icon={faTimesCircle} className="icono-x" />
            <h5 className="card-title">Registro de Docente Fallido</h5> 
          </div>
          <p className="parrafito">Hubo un error al intentar guardar el registro</p>
          <div>          
          <Link to="/Admin/Listas/ListaDocentes" style={{backgroundColor: '#0d0d46', color: 'white'}} className="btn">Aceptar</Link>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default RegistroDocenteError;
