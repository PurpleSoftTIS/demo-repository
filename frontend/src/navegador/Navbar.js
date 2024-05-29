import React, { useState, useEffect, useRef, useContext } from 'react';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/LogoDefinitivo.jpeg';
import userLogo from '../assets/IcoAdmi.png';
import { FaBars, FaBell, FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../Context/UserContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const dropdownRef2 = useRef(null);
  const dropdownRef = useRef(null);
  const { setUrole } = useContext(UserContext);
  const [showSesion, setShwoSesion] = useState(false);
  const sesionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationInput, setNotificationInput] = useState('');
  const notificationRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editNotificationContent, setEditNotificationContent] = useState('');
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  
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
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotification(false);
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

    fetch('http://127.0.0.1:8000/api/notifications')
      .then(response => response.json())
      .then(data => setNotifications(data));
    
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };
  const toggleSesion = ()=>{
    setShwoSesion(!showSesion);

  };
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('role'); // Eliminar el item 'role' del sessionStorage
    setUrole(null);
    navigate("/");
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: notificationInput }),
    })
      .then(response => response.json())
      .then(data => {
        setNotifications([data, ...notifications]);
        setNotificationInput('');
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = (notification) => {
    setEditNotificationContent(notification.content);
    setSelectedNotificationId(notification.id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditNotificationContent('');
    setSelectedNotificationId(null);
  };

  const handleEditNotification = () => {
    fetch(`http://127.0.0.1:8000/api/notifications/${selectedNotificationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editNotificationContent }),
    })
    .then(response => response.json())
    .then(data => {
      // Actualizar la lista de notificaciones en el frontend con la notificación editada
      const updatedNotifications = notifications.map(notification => {
        if (notification.id === selectedNotificationId) {
          return {
            ...notification,
            content: editNotificationContent,
          };
        }
        return notification;
      });
      setNotifications(updatedNotifications);
      // Cerrar el modal
      handleCloseEditModal();
    })
    .catch(error => console.error('Error al editar la notificación:', error));
  };

  const handleDelete = (notificationId) => {
    // Implementa la lógica para enviar la solicitud de eliminación al backend
    // Aquí estoy suponiendo que estás usando una solicitud DELETE
    fetch(`http://127.0.0.1:8000/api/notifications/${notificationId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        // Eliminar la notificación de la lista en el frontend
        const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
        setNotifications(updatedNotifications);
      } else {
        console.error('Error al eliminar la notificación:', response.status);
      }
    })
    .catch(error => console.error('Error al eliminar la notificación:', error));
  };

  const handleConf = () => {
    navigate("/Admin/Configuraciones")
  }

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
          <div className={`notification ${showNotification ? 'active' : ''}`} ref={notificationRef}>
            <button className={`bell-icon ${showNotification ? 'active' : ''}`} onClick={toggleNotification}>
              <FaBell style={{ color: 'white' }} />
            </button>
            {showNotification && (
              <div className="notification-menu">
                {notifications.length === 0 ? (
                  <p>No hay notificaciones</p>
                ) : (
                  <div className="notifications-list">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="notification-item">
                        <p>
                          {formatDate(notification.created_at)} - {notification.content}
                        </p>
                        <div className="notification-actions">
                          <FaEdit onClick={() => handleEdit(notification)} />
                          <FaTrash onClick={() => handleDelete(notification.id)} />
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                )}
                <form onSubmit={handleNotificationSubmit}>
                  <input 
                    type="text" 
                    placeholder="Enviar notificación" 
                    value={notificationInput} 
                    onChange={(e) => setNotificationInput(e.target.value)} 
                  />
                  <button type="submit">Enviar</button>
                </form>
              </div>
            )}
          </div> 
          {!isVisible &&(
            <div className={`InicioSesion ${showSesion ? 'active' : ''}`} ref={sesionRef}>
              <button className="usuario" onClick={toggleSesion} >
                <img className="" src={userLogo} alt="logo" width='50px' height='50px' />
              </button>
              <button className='Rol'onClick={toggleSesion}></button>
                {showSesion && (
                      <div className="sesion">
                          <button className="opciones" onClick={handleLogout}>Cerrar sesión</button>                          
                          <button className="opciones" onClick={handleConf} >Configuracion</button>
                      </div>
                  )}
            </div> 
          )}
          <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
            <FaBars style={{ color: 'white' }} /> 
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to='/Admin/inicio/HomeUno'>Inicio</NavLink> 
              </li>              
              <div className="dropdown-container" ref={dropdownRef2}>
                  <button className="nav-link dropdown-toggle" onClick={toggleDropdown2} style={{ cursor: 'pointer' }}>Solicitudes</button>
                  {showDropdown2 && (
                      <div className="menu">
                          <NavLink className="opciones" to='/Admin/ListaSolicitudes' activeclassname="active">Todas</NavLink>
                          <NavLink className="opciones" to='/Admin/ListaSolicitudesUr' activeclassname="active">Urgentes</NavLink>
                      </div>              
                  )}              
              </div>
              <div className="dropdown-container" ref={dropdownRef}>
                  <button className="nav-link dropdown-toggle" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>Registrar</button>
                  {showDropdown && (
                      <div className="menu">
                          <NavLink className="opciones" to='/Admin/Listas/ListaAmbientes' activeclassname="active">Ambiente</NavLink>
                          <NavLink className="opciones" to='/Admin/Listas/ListaDocentes' activeclassname="active">Docente</NavLink>
                          <NavLink className="opciones" to='/Admin/Listas/ListaMaterias' activeclassname="active">Materia</NavLink>
                      </div>              
                  )}              
              </div>
              <li className="nav-item">
                <NavLink className="nav-link" to='/Admin/AyudaAdmin'>Ayuda</NavLink> 
              </li>
            </ul>
          </div>          
          {isVisible &&(
            <div className={`InicioSesion ${showSesion ? 'active' : ''}`} ref={sesionRef}>
              <button className="usuario" onClick={toggleSesion} >
                <img className="" src={userLogo} alt="logo" width='50px' height='50px' />
              </button>
              <button className='Rol'onClick={toggleSesion}>Administrador</button>
                {showSesion && (
                      <div className="sesion">
                          <button className="opciones" onClick={handleLogout}>Cerrar sesión</button>
                          <button className="opciones" onClick={handleConf} >Configuracion</button>
                      </div>
                  )}
            </div> 
          )}           
        </div>
      </nav>
      {isEditModalOpen && (
        <div className="modal add-carrera-modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseEditModal} style={{fontSize: '20px'}}>&times;</span>
            <h2>Editar Notificación</h2>
            <input
              type="text"
              value={editNotificationContent}
              onChange={(e) => setEditNotificationContent(e.target.value)}
            />
            <button onClick={handleEditNotification}>Guardar</button>
          </div>
        </div>
      )}
    </div>
  
  )
}

export default Navbar;
