import React, { useEffect, useState } from 'react';
import './ListaSolicitudes.css';

const ListaSolicitudesUr = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/SolicitudUrgencias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSolicitudes(data);
        console.log(data);
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div style={{ height: '4vh' }}></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>Solicitudes Urgentes:</h2>
        <div>
          <input type="text" placeholder="Buscar Reserva" />
          <button className="butn butn-filtro">Filtros</button>
        </div>
      </div>
      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro.</th>
            <th>Docente</th>
            <th>Materia</th>
            <th>Capacidad</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Tipo Solicitud</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{solicitud.nombre}</td>
              <td>{solicitud.nombre_materia}</td>
              <td>{solicitud.capacidad}</td>
              <td>{solicitud.nombre_ambiente}</td>
              <td>{solicitud.grupo}</td>
              <td>{solicitud.tipo_solicitud}</td>
              <td>{solicitud.fecha_solicitud}</td>
              <td>{solicitud.hora_inicio}</td>
              <td>
                <button className="btn btn-primary">Aprobar</button>
                <button className="btn btn-danger">Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaSolicitudesUr;