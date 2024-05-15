import React, { useEffect, useState } from 'react';
import FotoInicio from '../assets/FotoInicio.JPG';
import logo_fcyt from '../assets/logo_fcyt.png';
import './HomeUno.css';

const HomeUno = () => {
  const [mostrarImagen, setMostrarImagen] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMostrarImagen(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container mt-5" style={{ height: '70.9vh' }}>
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="text-center">
            <img src={logo_fcyt} alt="Imagen 3" className="img-fluid  imagen-arriba" />
          </div>
          <div> 
            <p className="text-center titulo-personalizado">Bienvenido al Sistema de Gestion de Reservacion de Ambientes FCyT UMSS</p>
            <p className="text-center texto-personalizado">Sistema de ayuda al administrador en la gestion de ambientes de la Facultad de 
              Ciencias y Tecnologia</p>
          </div>
          
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center col2">
          <div className="rectangulo-azul">
            <img src={FotoInicio} alt="Imagen 2" className={`img-fluid imagen img-grande ${mostrarImagen ? 'animacion-puerta' : ''} mx-auto d-block`} />
          </div>
        </div>
      </div>
     
    </div>
    
  );
}

export default HomeUno;
