import React, { useState, useEffect, useRef, useContext } from 'react';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/LogoDefinitivo.jpeg';
import userLogo from '../assets/IcoAdmi.png';
import { FaBars, FaBell, FaEdit, FaTrash, FaComments, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../Context/UserContext';

const Navbar = () => {
  const baseURL = 'http://127.0.0.1:8000/api';
  const [isOpen, setIsOpen] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const dropdownRef2 = useRef(null);
  const dropdownRef = useRef(null);
  const { setUserC, setEmailC, setUrole, userC} = useContext(UserContext);
  const [showSesion, setShowSesion] = useState(false);
  const sesionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationInput, setNotificationInput] = useState('');
  const notificationRef = useRef(null);
  const sesionRef2 = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editNotificationContent, setEditNotificationContent] = useState('');
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [activeTab, setActiveTab] = useState('mensajes');
  const [contacts, setContacts] = useState([]);
  const [conversationContacts, setConversationContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [mensajeInput, setMensajeInput] = useState('');
  const usuarioId = sessionStorage.getItem('id');
  const usuarioTipo = "Administrador";
  const [showMensajes, setShowMensajes] = useState(false); 
  const mensajesRef = useRef(null);
  const messagesListRef = useRef(null);
  const bottomRef = useRef(null);
  const nombre = userC;

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
        setShowSesion(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setShowDropdown2(false); 
      }
      if (sesionRef2.current && !sesionRef2.current.contains(event.target)) {
        setShowSesion(false);
      }
      if (mensajesRef.current && !mensajesRef.current.contains(event.target)) {
        setShowMensajes(false);
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
      } else {
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

  useEffect(() => {
    if (usuarioId && usuarioTipo) {
      fetchContacts(usuarioId, usuarioTipo);
      fetchConversationContacts(usuarioId, usuarioTipo);
    }
  }, [usuarioId, usuarioTipo]);

  const fetchContacts = (userId, userType) => {
    fetch(`${baseURL}/mensajes/contacts/${userId}/${userType}`)
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  };

  const fetchConversationContacts = (userId, userType) => {
    fetch(`${baseURL}/mensajes/conversationContacts/${userId}/${userType}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setConversationContacts(data))
      .catch(error => console.error('Error fetching conversation contacts:', error));
  };

  const fetchMessages = (senderId, senderType, receiverId, receiverType) => {
    fetch(`${baseURL}/mensajes/${senderId}/${senderType}/${receiverId}/${receiverType}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        scrollToBottom();
      })
      .catch((error) => console.error('Error fetching messages:', error));
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesListRef.current) {
        messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
      }
    }, 200);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };
  const toggleSesion = () => {
    setShowSesion(!showSesion);
  };
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const toggleMensajes = () => {
    setShowMensajes(!showMensajes);
    fetchConversationContacts(usuarioId, usuarioTipo);
    fetchContacts(usuarioId, usuarioTipo);
    if (selectedContact) {
      fetchMessages(usuarioId, usuarioTipo, selectedContact.id, selectedContact.tipo);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('id');
    setUserC(null);
    setEmailC(null);
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
        handleCloseEditModal();
      })
      .catch(error => console.error('Error al editar la notificación:', error));
  };

  const handleDelete = (notificationId) => {
    fetch(`http://127.0.0.1:8000/api/notifications/${notificationId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
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

  const handleOptionClick = () => {
    setShowDropdown(false); 
  };
  const handleOptionClick2 = () => {
    setShowDropdown2(false); 
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    fetchMessages(usuarioId, usuarioTipo, contact.id, contact.tipo);
    setTimeout(() => {
      setShowMensajes(true);
    }, 100);
  };

  const handleBackClick = () => {
    setSelectedContact(null);
    setTimeout(() => {
      setShowMensajes(true);
      fetchConversationContacts(usuarioId, usuarioTipo);
    }, 100);
  };

  const handleMensajeSubmit = (e) => {
    e.preventDefault();

    if (!mensajeInput.trim() || !selectedContact) return;

    const newMensaje = {
      sender_id: usuarioId,
      sender_type: usuarioTipo,
      receiver_id: selectedContact.id,
      receiver_type: selectedContact.tipo,
      contenido: mensajeInput
    };

    fetch(`${baseURL}/mensajes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMensaje),
    })
      .then(response => response.json())
      .then(data => {
        setMessages([...messages, data]);
        setMensajeInput('');
        scrollToBottom();
      })
      .catch(error => console.error('Error sending message:', error));
  };

  return (
    <div className='barraNavAdmi'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="logo-container">
            <NavLink className="navbar-brand" to='/'>         
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
          <div className='mensajes-container' ref={mensajesRef}>
            <button className={`bell-icon ${showMensajes ? 'active' : ''}`} onClick={toggleMensajes}>
              <FaComments style={{ color: 'white' }} />
            </button>
            {showMensajes && (
              <div className='mensajes-menu'>
                {selectedContact ? (
                  <div>
                    <div className='chat-header'>
                      <button className='back-button' onClick={handleBackClick}>
                        <FaArrowLeft />
                      </button>
                      <h3>{selectedContact.nombre}</h3>
                    </div>
                    <div className='chat-container'>
                      <div className='messages-list' ref={messagesListRef}>
                        {messages.map((mensaje) => (
                          <div
                            key={mensaje.id}
                            className={`message ${mensaje.sender_id == usuarioId && mensaje.sender_type == usuarioTipo ? 'sent' : 'received'}`}
                          >
                            <p>{mensaje.contenido}</p>
                          </div>
                        ))}
                        <div ref={bottomRef} />
                      </div>
                      <form className='message-form' onSubmit={handleMensajeSubmit}>
                        <input
                          type='text'
                          className='message-input'
                          placeholder='Escribe un mensaje'
                          value={mensajeInput}
                          onChange={(e) => setMensajeInput(e.target.value)}
                        />
                        <button type='submit' className='message-submit'>
                          <FaPaperPlane />
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='mensajes-tabs'>
                      <button onClick={() => setActiveTab('mensajes')} className={activeTab === 'mensajes' ? 'mensaje-active' : ''}>Mensajes</button>
                      <button onClick={() => setActiveTab('usuarios')} className={activeTab === 'usuarios' ? 'mensaje-active' : ''}>Usuarios</button>
                      <button onClick={() => setActiveTab('admin')} className={activeTab === 'admin' ? 'mensaje-active' : ''}>Admin</button>
                    </div>
                    <div className='mensajes-content'>
                      <div className='mensajes-section' style={{ display: activeTab === 'mensajes' ? 'block' : 'none' }}>
                        <h2>Mensajes</h2>
                        {conversationContacts.length === 0 ? (
                          <p>No hay conversaciones abiertas.</p>
                        ) : (
                          conversationContacts.map((contact) => (
                            <div key={contact.id} className='contact-item' onClick={() => handleContactClick(contact)}>
                              <p>{contact.nombre}</p>
                            </div>
                          ))
                        )}
                      </div>
                      <div className='contacts-section' style={{ display: activeTab === 'usuarios' || activeTab === 'admin' ? 'block' : 'none' }}>
                        <h2>{activeTab === 'usuarios' ? 'Usuarios' : 'Admin'}</h2>
                        {contacts.filter((contact) => contact.tipo === (activeTab === 'usuarios' ? 'Usuario' : 'Administrador')).map((contact) => (
                          <div key={contact.id} className='contact-item' onClick={() => handleContactClick(contact)}>
                            <p>{contact.nombre}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
                <NavLink className="nav-link" to='/'>Inicio</NavLink> 
              </li>              
              <div className="dropdown-container" ref={dropdownRef2}>
                  <button className="nav-link dropdown-toggle" onClick={toggleDropdown2} style={{ cursor: 'pointer' }}>Solicitudes</button>
                  {showDropdown2 && (
                      <div className="menu">
                          <NavLink className="opciones" to='/Admin/ListaSolicitudes' activeclassname="active" onClick={handleOptionClick2}>Todas</NavLink>
                          <NavLink className="opciones" to='/Admin/ListaSolicitudesUr' activeclassname="active" onClick={handleOptionClick2}>Urgentes</NavLink>
                      </div>              
                  )}              
              </div>
              <div className="dropdown-container" ref={dropdownRef}>
                  <button className="nav-link dropdown-toggle" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>Registrar</button>
                  {showDropdown && (
                      <div className="menu">
                          
                          <NavLink className="opciones" to='/Admin/Listas/ListaAmbientes' activeclassname="active" onClick={handleOptionClick}>Ambiente</NavLink>
                          <NavLink className="opciones" to='/Admin/Listas/ListaDocentes' activeclassname="active" onClick={handleOptionClick}>Docente</NavLink>
                          <NavLink className="opciones" to='/Admin/Listas/ListaMaterias' activeclassname="active" onClick={handleOptionClick}>Materia</NavLink>
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
              <button className='Rol'onClick={toggleSesion}>{nombre}</button>
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
