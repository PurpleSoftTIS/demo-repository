import React, { useState, useContext, useEffect } from 'react';
import './SolicitarCon1.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const SolicitarCon1 = () => {
  const navigate = useNavigate();   
  const { emailC } = useContext(UserContext);
  const correo = emailC;
  const [materias, setMaterias] = useState([]); 
  const [docentes, setDocentes] = useState([]); 
  const [formData, setFormData] = useState({
    nombre_materia: '',
    id_docente: '',
    id_docente2: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [motivo, setMotivo] = useState('');
  const opcionesMotivo = [
    'Examen 1°Parcial',
    'Examen 2°Parcial',
    'Examen Final',
    'Examen 2°Instancia',
    'Examen Mesa',
    'Reemplazo de Clases',
    'Elecciones',
    'Examen de ingreso'
  ];
  

  useEffect(() => {
    if (correo) {
      // Realiza la solicitud al backend solo si el correo está disponible
      fetch(`http://127.0.0.1:8000/api/obtenerMara/${correo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud a ' + response.url + ': ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          setMaterias(data); 
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    }
  }, [correo]);

  useEffect(() => {
    // Realiza la solicitud al backend para obtener los docentes por materia
    if (formData.nombre_materia) {
      fetch(`http://127.0.0.1:8000/api/docentespormateria/${formData.nombre_materia}/${correo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud a ' + response.url + ': ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          setDocentes(data); 
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    }
  }, [formData.nombre_materia]);

  const handleRegistroSolicitud = () => {  
    navigate('/Usuario/Usu/SolicitarCon2', { state: formData });    
  };

  return (
    <div className="contact-form-container" style={{ minHeight: '78.7vh' }}>
      <section className="contenedora">
        <div className="titulo">
          <b className="reserva">Reservar</b>
          <div className="contact-form-phone-parent">
            <div className="subtitulo">Materia</div>
            <select
              className="input24" 
              value={formData.nombre_materia}
              name="nombre_materia"
              onChange={handleInputChange}
            >
              <option value="">Seleccione una materia</option>
              {materias.map((materia, index) => (
                <option key={index} value={materia.nombre_materia}>{materia.nombre_materia}</option>
              ))}
            </select>
          </div>
          <div className="contact-form-phone-parent">
            <div className="subtitulo">Docente</div>
            <select 
              className="input24" 
              value={formData.id_docente}
              name="id_docente"
              onChange={handleInputChange}
            >
              <option value="">Seleccione un Docente</option>
              {docentes.map((docente, index) => (
                <option key={index} value={docente.id_docente}>{docente.nombre_completo_docente}</option>
              ))}
            </select>
          </div>

          <div className="contact-form-phone-parent">
          <div className="subtitulo">Motivo</div>
             <select
             className="input24" 
             value={motivo}
             name="motivo"
             onChange={(e) => setMotivo(e.target.value)}
            >
            <option value="">Seleccione un motivo</option>
            {opcionesMotivo.map((opcion, index) => (
              //opciones?
            <option key={index} value={opcion}>{opcion}</option>
            ))}
            </select>
          </div>

          <button className="buton" onClick={handleRegistroSolicitud}>
            <div className="buttton">Siguiente</div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default SolicitarCon1;
