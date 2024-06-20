import React, { useState, useEffect, useContext } from 'react';
import Ico1 from '../../assets/IcoGood.png';
import Ico2 from '../../assets/IcoState.png';
import { UserContext } from '../../Context/UserContext';

const MisSolicitudes = () => {
  const [reservas, setReservas] = useState([]);
  const { emailC } = useContext(UserContext);
  
  const correo = emailC;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/ReservasDocentes/${correo}`, {
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
  }, [correo]);

  return (
    <div className="containerDoss" style={{ minHeight: '78vh' }}>
      <h2 className='titulolistas'>Mis Solicitudes:</h2> 
      <div style={{marginBottom: '50px'}}></div>       
      <div className='tabla-contenedor'>
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
              <th>Acciones</th>
            </tr>
          </thead>     
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id_solicitud} className="fila-lista">
                <td>{reserva.id_solicitud}</td>
                <td>{reserva.nombre_materia}</td>
                <td>{reserva.nombre_ambiente}</td>
                <td>{reserva.fecha_solicitud}</td>
                <td>{`${reserva.horas.split(',')[0].split(' - ')[0]} - ${reserva.horas.split(',')[reserva.horas.split(',').length - 1].split(' - ')[1]}`}</td>
                <td>{reserva.numero_estudiantes}</td>
                <td className='iconos'>
                  {reserva.estado_solicitud === 'aceptado' ? (
                    <img src={Ico1} alt="aceptado" width="50px" height="50px" />
                  ) : (
                    <img src={Ico2} alt="pendiente" width="50px" height="50px" />
                  )}
                </td>
                <td>
                  <button className="btn btn-eliminar">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MisSolicitudes;