import React, { useState, useEffect } from 'react';
import './Solicitar1.css'
const Solicitar1 = () => {

    const [date, setDatos] = useState([]);  
    useEffect(() => {

        if (date) {
          fetch(`http://127.0.0.1:8000/api/ambienteDispo/{$capacidad}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Error al cargar las horas disponibles');
              }
              return response.json();
            })
            .then(data => {
                setDatos(data);
            })
            .catch(error => {
              console.error('Error al cargar las horas disponibles:', error);
            });
        }       
      }, [date]);  
  return (
<div className="container" style={{ minHeight: '78.7vh' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Ambientes Disponibles:</h2>
            <div>
              <button className="butn butn-filtro" >Atras</button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'Right', alignItems: 'center', marginTop: '15px' }}>
            <div>
            </div>
          </div>
          <table className="table table-hover">
            <thead className="thead">
              <tr>
                <th>Aula</th>
                <th>Edificio</th>
                <th>Capacidad</th>
                <th>Nro. Piso</th>
                <th>Acciones</th>
              </tr>
            </thead>
         
          <tbody>
            {date.map((dato) => (
              <tr key={dato.id_ambiente} className="fila-lista">
                  <td>{dato.nombre_ambiente}</td>
                  <td>{dato.edificio}</td>
                  <td>{dato.capacidad}</td>
                  <td>{dato.numero_piso}</td>             
                <td>
                  <button className="btn btn-editar mr-2">Reservar</button>               
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
    </div>  )
}

export default Solicitar1;