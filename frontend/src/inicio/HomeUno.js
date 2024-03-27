import React from 'react'
<<<<<<< HEAD
import Sillas from '../assets/Sillas.JPG'
=======
import imagenFacu from '../assets/Sillas.jpeg'
>>>>>>> rama_antes_de_la_main
import { Link } from 'react-router-dom';
import './InicioAdmi.css';

const HomeUno = () => {
  return (
    <div className="container mt-5">
      <div className="row">
<<<<<<< HEAD
        <div className="col-md-6">
          <div className="row">            
            <div className="col-6 pl-0">
              <img src={Sillas} alt="Imagen 2" className="img-fluid imagen img-grande"/>
            </div>
          </div>
          <div className="row mt-3">           
          </div>
=======
        <div className="col-md-6 d-flex align-items-center justify-content-center img-container">
          <div className="blue-overlay"></div>
          <img src={imagenFacu} alt="Imagen 2" className="img-fluid imagen img-grande"/>
>>>>>>> rama_antes_de_la_main
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
        </div>
      </div>
    </div>
  );
}

export default HomeUno
