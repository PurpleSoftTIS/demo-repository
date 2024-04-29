import React, {} from 'react';
import './ListaSolicitudes.css';

const ListaSolicitudes = () => {
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
            <th>Capacidad</th>
            <th>Aula</th>
            <th>Grupo</th>            
            <th>Tipo Solicitud</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>        
      </table> 
         
    </div>
  );
};

export default ListaSolicitudes