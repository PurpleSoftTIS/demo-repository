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
      {/**<div className="contact-form-container">
      <section className="contenedor">
        <div className="contact-form-sub-heading-cta">
          <b className="contact-form-enter-details">Detalles de Solicitud</b>
          <div className="contact-form-phone-parent">
            <div className="contact-form-phone">Docente</div>
            <label 
              className="contact-form-rectangle" 
              type="text"

              placeholder="Ingrese la materia solicitada"
            />
          </div>
          <div className="contact-form-phone-parent">
            <div className="contact-form-phone">Materia</div>
            <label 
              className="contact-form-rectangle" 
              type="text"
              placeholder="Ingrese la materia solicitada"
            />
          </div>
          <div className="contact-form-phone-parent">
            <div className="contact-form-phone">Capacidad</div>
            <label 
              className="contact-form-rectangle" 
              type="text"
              placeholder="Ingrese la materia solicitada"
            />
          </div>
          <div className="contact-form-frame-parent">
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Aula</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <label
                className="contact-form-rectangle1" 
                type="text"
                
                placeholder="Ingrese el aula"
              />
            </div>
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Grupo</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <label 
                className="contact-form-rectangle1" 
                type="text"
                placeholder="Ingrese el grupo"
              />
            </div>
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Tipo de Solicitud</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <input 
                className="contact-form-rectangle1" 
                type="text"
                placeholder="Conjunta o Individual "
              />
            </div>
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Fecha</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <label 
                className="contact-form-rectangle1" 
                type="text"
                placeholder="Ingrese el grupo"
              />
            </div>
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Hora</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <label 
                className="contact-form-rectangle1" 
                type="text"
                placeholder="Ingrese el grupo"
              />
            </div>
          </div>
          
          <button className="contact-form-cta-button" >
            <div className="contact-form-button">Aceptar</div>
          </button>
        </div>
      </section>
    </div> */}
    </div>
  );
};

export default ListaSolicitudes