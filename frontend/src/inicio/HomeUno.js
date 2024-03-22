import React from 'react';
import imagesf from '../assets/imagesf.jpg';
import descarga from '../assets/descarga.jpg';
import laboratorios_fcyt from '../assets/laboratorios_fcyt.jpg';
import images from '../assets/images.png';
import { Link } from 'react-router-dom';
import './HomeUno.css'; 

const HomeUno = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-6 pr-0"> {/* En dispositivos pequeños, ocupa 6 columnas */}
              <img src={imagesf} alt="images 1" className="img-fluid imagen img-pequena" />
            </div>
            <div className="col-6 pl-0"> {/* En dispositivos pequeños, ocupa 6 columnas */}
              <img src={descarga} alt="Imagen 2" className="img-fluid imagen img-grande" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6 pr-0"> {/* En dispositivos pequeños, ocupa 6 columnas */}
              <img src={laboratorios_fcyt} alt="Imagen 3" className="img-fluid imagen img-grande" />
            </div>
            <div className="col-6 pl-0"> {/* En dispositivos pequeños, ocupa 6 columnas */}
              <img src={images} alt="Imagen 4" className="img-fluid imagen img-pequena" />
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div>
            <p className="titulo-personalizado">Bienvenidos al Sistema de Reserva de Ambientes FCyT UMSS</p>
            <p className="texto-personalizado">Sistema de ayuda al docente en la reserva de ambientes de la Facultad de Ciencias y Tecnologia</p>
            
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