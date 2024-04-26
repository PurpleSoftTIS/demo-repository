import React from 'react';
import "./Reservar.css"
import { FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 

 const Reservar = () => {
 

  return (
    <div className="container" style={{ height: '100vh.' }}>
      <div style={{ height: '4vh' }}></div>  
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Mis Reservas:</h2>
        <div>
          <NavLink to="/Usuario/Usu/Solicitar" className="butn butn-nuevo">
            Nuevo Solicitud<FaPlus className="icon" />
          </NavLink>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'Right', alignItems: 'center', marginTop: '15px' }}>
        <div>           
        </div>
      </div>
      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro Reserva</th>
            <th>Materia</th>
            <th>Aula</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Capacidad</th>
            <th>Estado</th>

          </tr>
        </thead>      
      </table>
    </div>
  );
};
export default Reservar;
