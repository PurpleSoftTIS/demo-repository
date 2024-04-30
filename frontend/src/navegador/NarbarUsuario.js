import React, { useState, useEffect,useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/LogoDefinitivo.jpeg';
import userLogo from '../assets/IcoUser.png';
import { FaBars } from 'react-icons/fa';
import './Navbar.css';


const NarbarUsuario = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSesion, setShowSesion] = useState(false);
  const { state: correoElectronico } = useLocation();
  const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdownRef2 = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setIsOpen(false);
      }
      if (correoElectronico) {
        fetch('http://127.0.0.1:8000/api/nombre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo_electronico: correoElectronico }),
        })
          .then(response => response.json())
          .then(data => {
            setNombreUsuario(data.nombre);
          })
          .catch(error => {
            console.error('Error al obtener el nombre del usuario:', error);
          });
      }    
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };   
  }, [correoElectronico]);  
  const [nombreUsuario, setNombreUsuario] = useState("Usuario");

  const toggleSesion = () => {
    setShowSesion(!showSesion);
  };
  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
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
              <div className="dropdown-container" ref={dropdownRef2}>
                  <button className="nav-link dropdown-toggle" onClick={toggleDropdown2} style={{ cursor: 'pointer' }}>Solicitar</button>
                  {showDropdown2 && (
                      <div className="menu">
                          <NavLink className="opciones" to='/Usuario/Usu/Solicitar' activeclassname="active">Indivudual</NavLink>
                          <NavLink className="opciones" to='/Usuario/Usu/SolicitarCon1' activeclassname="active">Conjunta</NavLink>
                      </div>              
                  )}              
              </div>             
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
            <button className='Rol'onClick={toggleSesion}>
            {nombreUsuario}
              {showSesion && (
                <div className="sesion">
                  <NavLink className="opciones" to='/' activeClassName="active">Cerrar sesion</NavLink>                          
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