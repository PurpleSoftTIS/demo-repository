import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/LogoDefinitivo.jpeg';
import ico1 from '../assets/iconCss.png';
import ico2 from '../assets/iconHtml.png';
import ico3 from '../assets/iconJavascript.png';
import ico4 from '../assets/iconLaravel.png';
import ico5 from '../assets/iconPostgres.png';
import ico6 from '../assets/iconReact.png';
import ico7 from '../assets/iconHome.png';
import ico8 from '../assets/iconReload.png';
import userLogo from '../assets/IcoUser.png';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const NarbarUsuario = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSesion, setShwoSesion] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  
  const toggleSesion = ()=>{
    setShwoSesion(!showSesion);
  };

  return (
    <div className='barraNavAdmi'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="logo-container">
            <NavLink className="navbar-brand" to='/Usuario/inicio/HomeDos'>         
              <img className="" src={logo} alt="logo" width='60px' height='60px' />
            </NavLink>
            <div className='nombre_empresa'>
              SIRA-FCYT
            </div>
          </div>

          <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
            <FaBars style={{ color: 'white' }} /> 
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to='/Usuario/inicio/HomeDos' exact>Inicio</NavLink> 
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/Usuario/Usu/Solicitar'>Solicitar</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/Usuario/Usu/Reservas'>Reservas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/Usuario/Usu/Ayuda'>Ayuda</NavLink>
              </li>              
            </ul>
          </div>          
            <div className='InicioSesion'>
              <button className="usuario" onClick={toggleSesion} >
                <img className="" src={userLogo} alt="logo" width='50px' height='50px' />
              </button>
              <button className='Rol'onClick={toggleSesion}>Usuario
                {showSesion && (
                      <div className="sesion">
                          <NavLink className="opciones" to='/' activeClassName="active">Cerrar sesion</NavLink>                          
                      </div>
                  )}
              </button>
            </div>          
        </div>
      </nav>

      <footer className='mainfooter'>
        <div className='footer'>
          <div className='description'>
            <p className='text'>
            © 2024 PupleSoft Todos los Derechos reservados
            </p>            
          </div>
          <div className='HomeReload'>
            <NavLink className="iconos" to='/Admin/Inicio/HomeUno'>         
              <img className="" src={ico7} alt="logo" width='40px' height='40px' />
            </NavLink>
            <NavLink className="iconos" to='/Admin/Inicio/HomeUno'>         
              <img className="" src={ico8} alt="logo" width='40px' height='40px' />
            </NavLink>
          </div>

          <div className='iconosTec'>
              <img className="iconos" src={ico1} alt="logo" width='40px' height='40px' />
              <img className="iconos" src={ico2} alt="logo" width='40px' height='40px' />
              <img className="iconos" src={ico3} alt="logo" width='40px' height='40px' />
              <img className="iconos" src={ico4} alt="logo" width='40px' height='40px' />
              <img className="iconos" src={ico5} alt="logo" width='40px' height='40px' />
              <img className="iconos" src={ico6} alt="logo" width='40px' height='40px' />            
          </div>
        </div>
      </footer>

    </div>
  
  )
}

export default NarbarUsuario