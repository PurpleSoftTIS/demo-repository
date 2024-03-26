import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/LogoSIS.jpeg';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); 
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    const handleResize = () => {
      if (window.innerWidth > 991) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  return (
    <div className='barraNavAdmi'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="logo-container">
            <NavLink className="navbar-brand" to='/'>         
             <img className="" src={logo} alt="logo" width='60px' height='70px' />
            </NavLink>
            <div className='nombre_empresa'>
              <p id='nomb'>SIRA-FCYT</p>
            </div>
          </div>
          <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
            <FaBars style={{ color: 'white' }} /> 
          </button>
          {isOpen && (
            <button className="usuario">
              <img className="" src={logo} alt="logo" width='50px' />
              <p id="admi">Administrador</p>
            </button>
          )}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to='/' exact>Inicio</NavLink> 
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/Solicitar'>Solicitudes</NavLink>
              </li>
              <div className="dropdown-container" ref={dropdownRef}>
                  <button className="nav-link dropdown-toggle" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>Registrar</button>
                  {showDropdown && (
                      <div className="menu">
                          <NavLink className="opciones" to='/Registro/Ambientes' activeClassName="active">Ambiente</NavLink>
                          <NavLink className="opciones" to='/Registro/Docentes' activeClassName="active">Docente</NavLink>
                          <NavLink className="opciones" to='/Registro/Materias' activeClassName="active">Materia</NavLink>
                      </div>
                  )}
              </div>
            </ul>
          </div>
          {!isOpen && (
            <button className="usuario">
              <img className="" src={logo} alt="logo" width='60px' height='70px' />
              <p id="admi">Administrador</p>
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar;