import React, { useState, useEffect, useContext } from 'react';
import './Solicitar2.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const Solicitar3 = () => {
  const navigate = useNavigate();   
  const location = useLocation();
  console.log("datos enviado", location.state);
  const { emailC } = useContext(UserContext);
  const [grupo, setGrupo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [materia, setMateria] = useState([]);
  console.log(materia);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('');
  
  const { state: datosRecibidos } = useLocation();
  const correo = emailC;
  console.log("es el email",correo);
  const aula =datosRecibidos.aulaSeleccionada.id_ambiente;
  const horaFin=datosRecibidos.horaFin;
  const horaInicio=datosRecibidos.horaInicio;
  const numeroEstudiantes=datosRecibidos.numeroEstudiantes;
  const fecha=datosRecibidos.fechaSeleccionada;

  console.log(correo);
  console.log(aula);
  useEffect(() => {
    const codificarPunto = (cadena) => {
      if (typeof cadena === 'string') {
        return cadena.replace(/\./g, '%');
      } else {
        
        return ''; 
      }
    };

      const obtenerMaterias = async () => {
        try {
          const correoCodificado = codificarPunto(emailC);
          const response = await fetch(`http://127.0.0.1:8000/api/obtenerMara/${correoCodificado}`);
          if (!response.ok) {
            throw new Error('Error en la solicitud a ' + response.url + ': ' + response.statusText);
          }
          const data = await response.json();
          setMateria(data);
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };
    
      obtenerMaterias(); // Llamada inicial para obtener materias
    }, [emailC]);

  useEffect(() => {
    // Guardar datos en el almacenamiento local
    localStorage.setItem('datosRecibidos', JSON.stringify(datosRecibidos));
  }, [datosRecibidos]);

  // Obtener datos del almacenamiento local al cargar la página
  useEffect(() => {
    const datosGuardados = localStorage.getItem('datosRecibidos');
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      // Restaurar datos recibidos
      // Coloca la lógica para establecer los estados según los datos recibidos
    }
  }, []);

  const createJSON = () => {
    const json = {
      correo,
      numeroEstudiantes,
      horaInicio,
      horaFin,
      fecha,
      aula,
      motivo,
      materia: materiaSeleccionada
    };
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
              value={materiaSeleccionada}
              onChange={(e) => {
                const materiaSeleccionada = e.target.value;
                const materiaData = materia.find(item => item.nombre_materia === materiaSeleccionada);
                if (materiaData) {
                  setMateriaSeleccionada(materiaSeleccionada);
                  setGrupoSeleccionado(materiaData.grupo);
                }
              }}
            >
              <option value="">Seleccione una materia</option>
              {materia.map((item, index) => (
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
                value={grupoSeleccionado}
                placeholder="Grupo"
                disabled
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
