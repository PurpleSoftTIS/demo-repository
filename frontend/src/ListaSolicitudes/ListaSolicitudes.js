import React, {useEffect,useState} from 'react';
import './ListaSolicitudes.css';

const ListaSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/obtenerSol', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setSolicitudes(data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);
  return (
    <div className="container" style={{ height: '100vh' }}>
      <div style={{ height: '4vh' }}></div>  
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Solicitudes:</h2>
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
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <tr key={solicitud.id_solicitud} className="fila-lista">
              <td>{solicitud.nombre_completo}</td>
              <td>{solicitud.materia}</td>
              <td>{solicitud.motivo}</td>
              <td>{solicitud.fecha_solicitud}</td>
              <td>{solicitud.id_hora}</td>
              <td>
                <button className="btn btn-editar mr-2">
                  Aceptar
                </button>

                <button className="btn btn-eliminar" >
                  Rechazar
                </button>
              </td>
            </tr>
          ))}
        </tbody>        
      </table> 
      
    </div>
  );
};

export default ListaSolicitudes