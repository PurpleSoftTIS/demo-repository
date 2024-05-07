import React, { useEffect, useState } from 'react';
import './ListaSolicitudes.css';

const ListaSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formularioData, setFormData] = useState({
    Docente: "",
    Materia: "",
    Grupo: "",
    Aula: "",
    Capacidad: "",
    Fecha: "",
    Hora: "",
    Motivo: "",
    Tipo_de_solicitud: ""
  });

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

  const mostrarFormularioParaSolicitud = (solicitud) => {
    setFormData({
      docente: solicitud.nombre,
      materia: solicitud.nombre_materia,
      grupo: solicitud.grupo,
      aula: solicitud.nombre_ambiente,
      capacidad: solicitud.numero_estudiantes,
      tipo_de_solicitud: solicitud.tipo_solicitud,
      fecha: solicitud.fecha_solicitud,
      hora: solicitud.hora_inicio,
      motivo: solicitud.motivo
    });
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container" style={{ minHeight: '78.7vh' }}>
      <div style={{ height: '4vh' }}></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>Solicitudes Todas:</h2>
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
          {solicitudes.map((solicitud, index) => (
            <tr key={index}
              className="fila-lista"
              onClick={() => mostrarFormularioParaSolicitud(solicitud)}
            >
              <td>{index + 1}</td>
              <td>{solicitud.nombre}</td>
              <td>{solicitud.nombre_materia}</td>
              <td>{solicitud.motivo}</td>
              <td>{solicitud.fecha_solicitud}</td>
              <td>{solicitud.hora_inicio}</td>
              <td>
                <button className="btn btn-primary">Aceptar</button>
                <button className="btn btn-danger">Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mostrarFormulario && (
        <div className="overlay" onClick={cerrarFormulario}>
          <div className="formulario-emergente" onClick={(e) => e.stopPropagation()}>
            <div className="contact-form-container">
              <section className="contenedor">
                <div className="contact-form-sub-heading-cta">
                  <b className="contact-form-enter-details">Detalles de Solicitud</b>
                  {Object.entries(formularioData).map(([key, value]) => (
                    <div key={key} className="contact-form-phone-parent">
                      <div className="contact-form-phone">{key.replace(/_/g, ' ')}</div>
                      <input
                        className="contact-form-rectangle"
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaSolicitudes;
