import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/LogoDefinitivo.jpeg';
import userLogo from '../assets/IcoUser.png';
import { FaBars, FaBell, FaComments, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { UserContext } from '../Context/UserContext';
import './Navbar.css';

const NarbarUsuario = () => {
  const baseURL = 'http://127.0.0.1:8000/api';
  const [isOpen, setIsOpen] = useState(false);
  const [showSesion, setShowSesion] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdownRef2 = useRef(null);
  const { setUserC, setEmailC, setUrole, userC, emailC } = useContext(UserContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const correo = emailC;
  const [activeTab, setActiveTab] = useState('mensajes');
  const [contacts, setContacts] = useState([]);
  const [conversationContacts, setConversationContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [mensajeInput, setMensajeInput] = useState('');
  const usuarioId = localStorage.getItem('id');
  const usuarioTipo = 'Usuario';
  const [showMensajes, setShowMensajes] = useState(false);
  const mensajesRef = useRef(null);
  const messagesListRef = useRef(null);
  const bottomRef = useRef(null);
  const sesionRef = useRef(null);

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
      if (mensajesRef.current && !mensajesRef.current.contains(event.target)) {
        setShowMensajes(false);
      }
      if (sesionRef.current && !sesionRef.current.contains(event.target)) {
        setShowSesion(false);
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
      .then((response) => response.json())
      .then((data) => setNotifications(data));

    fetch(`http://127.0.0.1:8000/api/notifications/count/${correo}`)
      .then((response) => response.json())
      .then((data) => setNotificationCount(data.notification_count));

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [correo, showNotification]);

  useEffect(() => {
    if (usuarioId && usuarioTipo) {
      fetchContacts(usuarioId, usuarioTipo);
      fetchConversationContacts(usuarioId, usuarioTipo);
    }
  }, [usuarioId, usuarioTipo]);

  const fetchContacts = (userId, userType) => {
    fetch(`${baseURL}/mensajes/contacts/${userId}/${userType}`)
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  };

  const fetchConversationContacts = (userId, userType) => {
    fetch(`${baseURL}/mensajes/conversationContacts/${userId}/${userType}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setConversationContacts(data))
      .catch((error) => console.error('Error fetching conversation contacts:', error));
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
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    sessionStorage.clear();
    setUserC(null);
    setEmailC(null);
    setUrole(null);
    navigate('/');
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

  const toggleMensajes = () => {
    setShowMensajes(!showMensajes);
    fetchConversationContacts(usuarioId, usuarioTipo);
    fetchContacts(usuarioId, usuarioTipo);
    if (selectedContact) {
      scrollToBottom();
      fetchMessages(usuarioId, usuarioTipo, selectedContact.id, selectedContact.tipo);
    }
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
      contenido: mensajeInput,
    };

    fetch(`${baseURL}/mensajes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMensaje),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        setMensajeInput('');
        scrollToBottom();
      })
      .catch((error) => console.error('Error sending message:', error));
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
          <button className='navbar-toggler' type='button' onClick={() => setIsOpen(!isOpen)}>
            <FaBars style={{ color: 'white' }} />
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id='navbarNav'>
            <ul className='navbar-nav mx-auto'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/'>Inicio</NavLink>
              </li>
              <div className='dropdown-container' ref={dropdownRef2}>
                <button className='nav-link dropdown-toggle' onClick={toggleDropdown2} style={{ cursor: 'pointer' }}>Solicitar</button>
                {showDropdown2 && (
                  <div className='menu'>
                    <NavLink className='opciones' to='/Usuario/Usu/Solicitar' activeclassname='active'>Indivudual</NavLink>
                    <NavLink className='opciones' to='/Usuario/Usu/SolicitarCon' activeclassname='active'>Conjunta</NavLink>
                  </div>
                )}
              </div>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/Usuario/Usu/Reservas'>Mis Solicitudes</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/Usuario/Usu/AmbientesDis'>Ambientes Disponibles</NavLink>
              </li>
            </ul>
          </div>
          <div className='InicioSesion'  ref={sesionRef} >
            <button className='usuario' onClick={toggleSesion}>
              <img className='' src={userLogo} alt='logo' width='50px' height='50px' />
            </button>
            <button className='Rol' onClick={toggleSesion}>
              {userC}
            </button>
            {showSesion && (
              <div className='sesiones'>
                <button className='opciones' onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NarbarUsuario;
