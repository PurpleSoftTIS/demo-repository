import React from 'react'
import "./Reservar.css"
import { FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 
//import Ico1 from "../../assets/IcoGood.png";
//import Ico2 from "../../assets/IcoState.png";
export const Reservar = () => {
  return (
    <div className="container" style={{ height: '76.1vh' }}>
      <div style={{ height: '4vh' }}></div>  
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Mis Reservas:</h2>
        <div>
          <input type="text" placeholder="Buscar" />
          <button className="butn butn-filtro">Filtros</button>
          <NavLink to="/Admin/Registro/Ambientes" className="butn butn-nuevo">
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
