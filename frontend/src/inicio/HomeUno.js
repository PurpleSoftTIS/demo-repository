import React from 'react'
import imagenFacu from '../assets/Sillas.jpeg'
import { Link } from 'react-router-dom';
import './HomeUno.css';

const HomeUno = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">          
          <div className="row mt-3">           
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div>
            <p className="titulo-personalizado">Bienvenidos al Sistema de Gestion de Reservacion de Ambientes FCyT UMSS</p>
            <p className="texto-personalizado">Sistema de ayuda al administrador en la gestion de ambientes de la Facultad de 
            Ciencias y Tecnologia</p>
            
            <Link to="/Solicitar">
              <button className="btn btn-solicitudes" >Solicitudes</button>
            </Link>
          </div>
          <div className="row">            
            <div className="col-6 pl-0">
              <img src={imagenFacu} alt="Imagen 2" className="img-fluid imagen img-grande"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeUno