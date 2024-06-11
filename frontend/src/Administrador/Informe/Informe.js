import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Informe = () => {
    return (
        <div className="container" style={{ minHeight: '78.7vh' }}>
          <div style={{ height: '4vh' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Informe Uso de Ambientes</h2>
            <div>
              
              <button className="butn butn-filtro">Filtros</button>
              <button className="butn butn-filtro">Imprimir</button>
              <button className="button">Atras</button>

            </div>
          </div>
          <table className="table table-hover">
            <thead className="thead">
              <tr>
                <th>Ambiente</th>
                <th>Edificio</th>
                <th>Cantidad de Uso</th>
                <th>Fecha</th>
                <th>Actividad</th>
              </tr>
            </thead>
          </table>
        </div>
      );
}

export default Informe