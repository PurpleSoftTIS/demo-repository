import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/LogoDefinitivo.jpeg';
import userLogo from '../assets/IcoAdmi.png';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showSesion, setShwoSesion] = useState(false);
  const sesionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  
  const checkVisibility = () => {
    if (window.innerWidth > 990) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); 
      }
      if (sesionRef.current && !sesionRef.current.contains(event.target)) {
        setShwoSesion(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    const handleResize = () => {
      if (window.innerWidth > 990) {
        setIsOpen(false);
        setIsVisible(true);
      }else{
        setIsVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    checkVisibility();

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const toggleSesion = ()=>{
    setShwoSesion(!showSesion);

  };
  
  return (
    <div className='barraNavAdmi'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="logo-container">
            <NavLink className="navbar-brand" to='/Admin/Inicio/HomeUno'>         
              <img className="" src={logo} alt="logo" width='60px' height='60px' />
            </NavLink>
            <div className='nombre_empresa'>
              SIRA-FCYT
            </div>
          </div>
          {!isVisible &&(
            <div className={`InicioSesion ${showSesion ? 'active' : ''}`} ref={sesionRef}>
              <button className="usuario" onClick={toggleSesion} >
                <img className="" src={userLogo} alt="logo" width='50px' height='50px' />
              </button>
              <button className='Rol'onClick={toggleSesion}>
                {showSesion && (
                      <div className="sesion">
                          <NavLink className="opciones" to='/' activeclassname="active">Cerrar sesion</NavLink>                          
                      </div>
                  )}
              </button>
            </div> 
          )}
          <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
            <FaBars style={{ color: 'white' }} /> 
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to='/Admin/inicio/HomeUno' exact>Inicio</NavLink> 
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/Admin/ListaSolicitudes'>Solicitudes</NavLink>
              </li>
              <div className="dropdown-container" ref={dropdownRef}>
                  <button className="nav-link dropdown-toggle" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>Registrar</button>
                  {showDropdown && (
                      <div className="menu">
                          <NavLink className="opciones" to='/Admin/Listas/ListaAmbientes' activeClassName="active">Ambiente</NavLink>
                          <NavLink className="opciones" to='/Admin/Listas/ListaDocentes' activeClassName="active">Docente</NavLink>
                          <NavLink className="opciones" to='/Admin/Registro/Materias' activeClassName="active">Materia</NavLink>
                      </div>              
                  )}              
              </div>
            </ul>
          </div>          
          {isVisible &&(
            <div className={`InicioSesion ${showSesion ? 'active' : ''}`} ref={sesionRef}>
              <button className="usuario" onClick={toggleSesion} >
                <img className="" src={userLogo} alt="logo" width='50px' height='50px' />
              </button>
              <button className='Rol'onClick={toggleSesion}>Administrador
                {showSesion && (
                      <div className="sesion">
                          <NavLink className="opciones" to='/' activeclassname="active">Cerrar sesion</NavLink>                          
                      </div>
                  )}
              </button>
            </div> 
          )}           
        </div>
      </nav>
    </div>
  
  )
}

export default Navbar;
