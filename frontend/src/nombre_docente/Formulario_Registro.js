import React from 'react'
import {Link} from 'react-router-dom'

const Formulario_Registro = () => {
  return (
    <div className='homeAdmi'>
    <div className='barraNavAdmi' >
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to='/'> 
            <img src='./logoTIS.png' width='50px' alt="Logo de la empresa"/>
          </Link>
          <div className='nombre_empresa'>
            <p id='nomb'>Purple-soft</p>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"                   aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to='/'>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/'>Solicitudes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/'>Registrar</Link>
              </li>              
            </ul>
          </div>
          <button className="usuario">
                <img src='./logoTIS.png' width='50px' alt="Foto de perfil del usuario"/>
                <p id="admi" >Administrador</p>
          </button>
        </div>
      </nav>
    </div> 
    
    <h1>Registros de los docentes</h1>
    
    </div>
  )
}

export default Formulario_Registro