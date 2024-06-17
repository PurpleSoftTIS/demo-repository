import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/LogoDefinitivo.jpeg';
import userLogo from '../assets/IcoUser.png';
import { FaBars, FaBell } from 'react-icons/fa';
import { UserContext } from '../Context/UserContext';

import './Navbar.css';

const NarbarUsuario = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [showSesion, setShowSesion] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdownRef2 = useRef(null);
  const { setUserC, setEmailC, setUrole,  userC, emailC} = useContext(UserContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const correo = emailC;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        if (showNotification) {
          fetch(`http://127.0.0.1:8000/api/notifications/mark-as-read/${correo}`, {
            method: 'POST',
          }).then(() => setNotificationCount(0));
        }
        setShowNotification(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
          setShowDropdown2(false);
        }      
    };

    document.body.addEventListener('click', handleClickOutside);

    const handleResize = () => {
      if (window.innerWidth > 991) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    fetch('http://127.0.0.1:8000/api/notifications')
      .then(response => response.json())
      .then(data => setNotifications(data));

    fetch(`http://127.0.0.1:8000/api/notifications/count/${correo}`)
      .then(response => response.json())
      .then(data => setNotificationCount(data.notification_count));

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };   
  }, [correo, showNotification]);

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
  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };

  const toggleNotification = () => {
    if (showNotification) {
      fetch(`http://127.0.0.1:8000/api/notifications/mark-as-read/${correo}`, {
        method: 'POST',
      }).then(() => setNotificationCount(0));
    }
    setShowNotification(!showNotification);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          <div className={`notification ${showNotification ? 'active' : ''}`} ref={notificationRef}>
            <button className={`bell-icon ${showNotification ? 'active' : ''}`} onClick={toggleNotification}>
              <FaBell style={{ color: 'white' }} />
              {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
            </button>
            {showNotification && (
              <div className="notification-menu">
                {notifications.length === 0 ? (
                  <p>No hay notificaciones</p>
                ) : (
                  <div className="notifications-list">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="notification-iteme">
                        <p>
                          {formatDate(notification.created_at)} - {notification.content}
                        </p>
                        <hr />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div> 
          <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
            <FaBars style={{ color: 'white' }} /> 
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to='/Usuario/Inicio/HomeDos'>Inicio</NavLink> 
            </li>
              <div className="dropdown-container">
                  <button className="nav-link dropdown-toggle" onClick={toggleDropdown2} style={{ cursor: 'pointer' }}>Solicitar</button>
                  {showDropdown2 && (
                      <div className="menu">
                          <NavLink className="opciones" to='/Usuario/Usu/Solicitar' activeclassname="active">Indivudual</NavLink>
                          <NavLink className="opciones" to='/Usuario/Usu/SolicitarCon' activeclassname="active">Conjunta</NavLink>
                      </div>              
                  )}              
              </div>             
              <li className="nav-item">
                <NavLink className="nav-link" to='/Usuario/Usu/Reservas'>Mis Solicitudes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/Usuario/Usu/AmbientesDis'>Ambientes Disponibles</NavLink>
              </li>                              
            </ul>
          </div>          
          <div className='InicioSesion'>
            <button className="usuario" onClick={toggleSesion} >
              <img className="" src={userLogo} alt="logo" width='50px' height='50px' />
            </button>
            <button className='Rol'onClick={toggleSesion}>
            {userC}
            </button>
              {showSesion && (
                <div className="sesiones">
                  <button className="opciones" onClick={handleLogout}>Cerrar sesión</button>
                </div>
              )} 
          </div>          
        </div>
      </nav>     
    </div>
  )
}

export default NarbarUsuario;
