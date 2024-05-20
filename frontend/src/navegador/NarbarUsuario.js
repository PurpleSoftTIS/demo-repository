import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/LogoDefinitivo.jpeg';
import userLogo from '../assets/IcoUser.png';
import { FaBars } from 'react-icons/fa';
import { UserContext } from '../Context/UserContext';

import './Navbar.css';

const NarbarUsuario = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [showSesion, setShowSesion] = useState(false);
  const dropdownRef2 = useRef(null);
  const { setUserC, setEmailC, setUrole,  userC } = useContext(UserContext);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    setUserC(null);
    setEmailC(null);
    setUrole(null);
    navigate("/");
  };

  const toggleSesion = () => {
    setShowSesion(!showSesion);
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
              <NavLink className="nav-link" to='/Usuario/Inicio/HomeDos'>Inicio</NavLink> 
            </li>
              <div className="dropdown-container" ref={dropdownRef2}>
                <NavLink className="nav-link" to='/Usuario/Usu/Solicitar' activeclassname="active">Solicitar</NavLink>                              
              </div>             
              <li className="nav-item">
                <NavLink className="nav-link" to='/Usuario/Usu/Reservas'>Mis solicitudes</NavLink>
              </li>              
              <li className="nav-item">
                <NavLink className="nav-link" to='/Usuario/Usu/AmbientesDis'>Ambientes</NavLink>
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
            <button className='Rol'onClick={toggleSesion}>
            {userC}
              {showSesion && (
                <div className="sesion">
                  <button className="opciones" onClick={handleLogout}>Cerrar sesión</button>
                </div>
              )}
            </button>
          </div>          
        </div>
      </nav>     
    </div>
  )
}

export default NarbarUsuario;
