import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
       
    setIsOpen(!isOpen);
  };
  return (
    <div className='homeAdmi'>
    <div className='barraNavAdmi'>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <div className='logo'>
            <Link to='/'>
            <img id= 'imageUno' src='./logoTIS.png' width='65px' alt="Logo de la empresa" />
          </Link>
            </div>
          
          <div className='nombre_empresa'>
            <p id='nomb'>SIRA-FCYT</p>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to='/'>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/Solicitar'>Solicitudes</Link>
              </li>
              <li className="nav-item">
                  <button className="registrar" onClick={toggleMenu}>Registrar</button>
                  {isOpen && (
                    <div className="menu">
                      <Link className="opciones" to='/Docentes'>Docente</Link>
                      <Link className="opciones" to='/Materia'>Materias</Link>
                      <Link className="opciones" to='/Ambiente'>Ambientes</Link>
                    </div>
                  )}
              </li>
            </ul>
          </div>
          <div className='perfil'>
            <button className="foto">
              <img src='./logoTIS.png' width='40px' alt="Foto de perfil del usuario" />
            </button>
            <button className='rol'>
              <p id="admi" >Administrador</p>
            </button>
          </div>            
        </div>
      </nav>
    </div>
  </div>  )
}

export default Navbar