import React, { useState, useEffect } from 'react';
import './Solicitar1.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Solicitar1 = () => {
  const navigate = useNavigate();   

  const { state: dataToSend } = useLocation();
  const capacidad = dataToSend ? dataToSend.numeroEstudiantes : null; 
  const dia = dataToSend ? dataToSend.diaSeleccionado : null;
  const hora = dataToSend ? dataToSend.horaSeleccionada : null; 

  const [ambientesDisponibles, setAmbientesDisponibles] = useState([]);  

  useEffect(() => {
    if (ambientesDisponibles) {
      fetch(`http://127.0.0.1:8000/api/ambienteDispo/${capacidad}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar las horas disponibles');
          }
          return response.json();
        })
        .then(data => {
          setAmbientesDisponibles(data);
        })
        .catch(error => {
          console.error('Error al cargar las horas disponibles:', error);
        });
    }       
  }, [capacidad, ambientesDisponibles]);  

  const reservarAmbiente = (ambiente) => {
    const datos = {
      capacidad,
      dia,
      hora,
      nombre_ambiente: ambiente.nombre_ambiente,
      edificio: ambiente.edificio,
      numero_piso: ambiente.numero_piso
    };
    navigate('/Usuario/Usu/DetallesSol', { state: datos });
  };

  return (
    <div className="container" style={{ minHeight: '78.7vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Ambientes Disponibles:</h2>
        <div>
          <NavLink to="/Usuario/Usu/Solicitar" className="butn butn-filtro">
            Atras
          </NavLink>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'Right', alignItems: 'center', marginTop: '15px' }}>
        <div></div>
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
          {ambientesDisponibles.map((ambiente) => (
            <tr key={ambiente.id_ambiente} className="fila-lista">
              <td>{ambiente.nombre_ambiente}</td>
              <td>{ambiente.edificio}</td>
              <td>{ambiente.capacidad}</td>
              <td>{ambiente.numero_piso}</td>
              <td>
                <button className="btn btn-editar mr-2" onClick={() => reservarAmbiente(ambiente)}>Reservar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Solicitar1;
