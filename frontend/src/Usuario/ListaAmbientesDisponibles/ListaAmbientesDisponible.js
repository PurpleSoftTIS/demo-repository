import React, {useState} from 'react';
import './ListaAmbientesDisponibles.css'; 

const ListaAmbientesDisponibles = () => {
    const [ambientesDisponibles, setAmbientesDisponibles] = useState([]);

  return (
    <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ height: '4vh' }}></div>
      <h2 style={{ margin: 0, textAlign: 'center' }}>Ambientes:</h2>
      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro.</th>
            <th>Edificio</th>
            <th>Tipo Ambiente</th>
            <th>Capacidad</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ambientesDisponibles.map((ambiente, index) => (
            <tr key={index} className="fila-lista">
              <td>{index + 1}</td>
              <td>{ambiente.edificio}</td>
              <td>{ambiente.tipo_ambiente}</td>
              <td>{ambiente.capacidad}</td>
              <td>{ambiente.fecha}</td>
              <td>{ambiente.hora}</td>
              <td>{ambiente.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>           
    </div>
  );
};

export default ListaAmbientesDisponibles;
