import React, { useState, useEffect } from 'react';
import './SolicitarCon3.css'; // Ajusta la importación del CSS según la ubicación real del archivo CSS
import { useNavigate, useLocation } from "react-router-dom";

const SolicitarCon3 = () => {
  const navigate = useNavigate();
  const { state: datos2 } = useLocation();
  const { materia, carrera, docente, numeroEstudiantes, diaSeleccionado, horaSeleccionada } = datos2 || {};

  const [ambientesDisponibles, setAmbientesDisponibles] = useState([]);

  useEffect(() => {
    if (ambientesDisponibles) {
      fetch(`http://127.0.0.1:8000/api/ambienteDispoDos/${numeroEstudiantes}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar los ambientes disponibles');
          }
          return response.json();
        })
        .then(data => {
          setAmbientesDisponibles(data);
        })
        .catch(error => {
          console.error('Error al cargar los ambientes disponibles:', error);
        });
    }
  }, [numeroEstudiantes,ambientesDisponibles]);

   const handleNextStep = (ambiente) => {
    const datos3 = {
      materia,
      carrera,
      docente,
      numeroEstudiantes,
      diaSeleccionado,
      horaSeleccionada,
      edificio: ambiente.edificio,
      numero_piso: ambiente.numero_piso,
      nombre_ambiente: ambiente.nombre_ambiente
    };
    navigate('/Usuario/Usu/SolicitarCon4', { state: datos3 });
  };

  return (
    <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ height: '4vh' }}></div>
      <h2 style={{ margin: 0, textAlign: 'center' }}>Ambientes Disponibles:</h2>
      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro.</th>
            <th>Edificio</th>
            <th>Piso</th>
            <th>Aula</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ambientesDisponibles.map((ambiente, index) => (
            <tr key={index} className="fila-lista">
              <td>{index + 1}</td>
              <td>{ambiente.edificio}</td>
              <td>{ambiente.numero_piso}</td>
              <td>{ambiente.nombre_ambiente}</td>
              <td>
                <button className="btn btn-editar mr-2" onClick={() => handleNextStep(ambiente)}>Reservar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolicitarCon3;
