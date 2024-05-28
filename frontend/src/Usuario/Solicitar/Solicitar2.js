import React, { useState, useEffect, useContext } from 'react';
import './Solicitar2.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const Solicitar3 = () => {
  const navigate = useNavigate();   
  const location = useLocation();
  const { emailC } = useContext(UserContext);
  const [grupo, setGrupo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [materias, setMaterias] = useState([]);
  const [materia, setMateria] = useState('');
  const [nomateria, setNomateria] = useState('');
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(false);
  const { state: datosRecibidos } = useLocation();
  const correo = emailC;
  const aula =datosRecibidos.aulaSeleccionada;
  const horaFin=datosRecibidos.horaFin;
  const horaInicio=datosRecibidos.horaInicio;
  const numeroEstudiantes=datosRecibidos.numeroEstudiantes;
  const fecha=datosRecibidos.fechaSeleccionada;
  

  useEffect(() => { 
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
  }, [correo]);

  const createJSON = () =>{
    const json ={
     correo,
     numeroEstudiantes,
     horaInicio,
     horaFin,
     fecha,
     aula,
     motivo,
     materia,
    };
    console.log("datos recividos",location.state);
    return json;
  }
  const EnviarSolicitud = () => {
    const json = createJSON();
    console.log("Datos a enviar:", json); 
    fetch("http://127.0.0.1:8000/api/registrarSolicitud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
     body: JSON.stringify(json) 

    })
    .then(response => {
      if (response.ok) {

        console.log("Registro exitoso");
            navigate('/Usuario/Usu/Reservas');

      } else {
        console.error("Error en el registro");
      }
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
    });
  };

  const handleMateriaChange = (e) => {
    const nuevaMateria = e.target.value;
    setNomateria(nuevaMateria)
    if (nuevaMateria === "") {
        setGrupo(''); // Si la nueva materia es "", establece el grupo en vacío
        setGrupoSeleccionado(false); // También puedes querer deseleccionar el grupo
    } else {
        const materiaData = materias.find(item => item.nombre_materia === nuevaMateria);
        if (materiaData) {
            setMateria(materiaData.id_materia);
            setGrupo(materiaData.grupo);
            setGrupoSeleccionado(true);
        }
    }
  };

  return (
    <div className="contact-form-container">
      <section className="contenedor">
        <div className="contact-form-details-wrapper">          
        </div>
        <div className="contact-form-sub-heading-cta">
          <b className="contact-form-enter-details">Detalles de Solicitud</b>
          <div className="contact-form-phone-parent">
            <div className="contact-form-phone">Materia</div>
            <select
              className="input24"
              value={nomateria}
              onChange={handleMateriaChange}
            >
              <option value="">Seleccione una materia</option> 
              {materias.map((item, index) => (
                <option key={index} value={item.nombre_materia}>
                  {item.nombre_materia}
                </option>
              ))}
            </select>
          </div>
          <div className="contact-form-frame-parent">
            <div className="contact-form-full-name-parent">
              <div className="contact-form-full-name">Grupo</div>
            </div>
            <div className="contact-form-rectangle-parent">
              <input 
                className="contact-form-rectangle1" 
                type="text"
                value={grupo}
                onChange={(e) => setGrupo(e.target.value)}
                placeholder="Ingrese el grupo"
                disabled={grupoSeleccionado} // Deshabilita la edición si se seleccionó una materia
              />
            </div>
          </div>
          <div className="contact-form-message-parent">
            <div className="contact-form-message">Motivo</div>
            <input 
              className="contact-form-rectangle3" 
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ingrese el motivo"
            />
          </div>
          <button className="contact-form-cta-button" onClick={EnviarSolicitud}>
            <div className="contact-form-button">Enviar</div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Solicitar3;