import React, { useEffect, useState } from 'react';
import "./Reservar.css"
import { FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 
import Ico1 from '../../assets/IcoGood.png';
import Ico2 from '../../assets/IcoState.png';

 const Reservar = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/reservasDocentes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReservas(data);
        console.log(data);
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

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
          <tbody>
          {reservas.map((reserva, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{reserva.nombre_materia}</td>
              <td>{reserva.nombre_ambiente}</td>
              <td>{reserva.fecha_solicitud}</td>
              <td>{reserva.hora_inicio}</td>
              <td>
                {reserva.estado_solicitud === "activo" ? (
                  <img className="iconos2" src={Ico1} alt="aceptado" width="50px" height="50px" />
                ) : (
                  <img className="iconos2" src={Ico2} alt="pendiente" width="50px" height="50px" />
                )}
              </td>

              <td>
                <button className="btn btn-primary">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
        </thead>      
      </table>
    </div>
  );
};
export default Reservar;
