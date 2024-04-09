import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="container mt-5">
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
          <div>          
            <Link to="/Admin/ListaSolicitudes" style={{backgroundColor: '#0d0d46', color: 'white'}} className="btn">Solicitudes</Link>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center col2">
          <div className="rectangulo-azul">
            <img src={FotoInicio} alt="Imagen 2" className={`img-fluid imagen img-grande ${mostrarImagen ? 'animacion-puerta' : ''} mx-auto d-block`} />
          </div>
        </div>
      </div>
      <footer>
        <div className="footer-of">
          <div className="row fila-footer">
           <div className="col-lg-12 cont-footer">
              <p>Este es el footer de mi aplicación.</p>
              <p>© {new Date().getFullYear()} Mi Empresa</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  );
}

export default HomeUno;
