import React, { useState, useEffect, useContext } from 'react';
import "./MisSolicitudes.css"
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
    <div className="container" style={{ height: '100vh.' }}>
      <div style={{ height: '4vh' }}></div>  
      <div >
        <h2 style={{ margin: 0 }}>Mis Solicitudes:</h2>        
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
              <td>{reserva.hora_inicio + " " + reserva.hora_fin}</td>
              <td>{reserva.numero_estudiantes}</td>
              <td>
                {reserva.estado_solicitud === 'aceptada' ? (
                    <img className="iconos2" src={Ico1} alt="aceptado" width="50px" height="50px" />
                  ) : (
                  <img className="iconos2" src={Ico2} alt="pendiente" width="50px" height="50px" />
                )}
              </td>
              <td>
               <button className="btn btn-eliminar" >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MisSolicitudes