import React, { useState, useEffect,useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import Ico1 from '../../assets/IcoMore.png';

import "./Solicitar.css";

const Solicitar = () => {
  const navigate = useNavigate();
  const { emailC } = useContext(UserContext);
  const correo = emailC;
  const [cantidad, setCantidad] = useState('');
  const [selecionMateria, setSelecionMateria] = useState('');
  const [valor, setValor] = useState('');
  const [date, setDate] = useState(new Date());
  const [materias, setMaterias] = useState([]); 
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [grupos, setGrupos] = useState([]); 
  const [formData, setFormData] = useState([]); 
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState(''); 
  const [selectedOption, setSelectedOption] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const [selectedMateria, setSelectedMateria] = useState(''); 
  const [docentes, setDocentes] = useState([]); 
  const [aux, setAux] = useState(0); 

  
  
    const [additionalDocentes, setAdditionalDocentes] = useState([]);
  useEffect(() => {
    if (date) {
      fetch(`http://127.0.0.1:8000/api/obtenerHoras`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar las horas disponibles');
          }
          return response.json();
        })
        .then(data => {
          data.sort((a, b) => {
            const horaInicioA = parseInt(a.hora_inicio.split(':')[0]);
            const horaInicioB = parseInt(b.hora_inicio.split(':')[0]);
            return horaInicioA - horaInicioB;
          });
          setHorariosDisponibles(data);
          console.log(data);
        })
        .catch(error => {
          console.error('Error al cargar las horas disponibles:', error);
        });
    }
  }, [date]);  
  useEffect(() => {
    if (selectedMateria) {
      cargarGrupos(selectedMateria);
    }
    
  }, [selectedMateria]);
 
  useEffect(() => {
    if (correo) {
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

  const cargarGrupos = (materia) => {
    fetch(`http://127.0.0.1:8000/api/obtenerGrupos/${materia}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud a ' + response.url + ': ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setGrupos(data); 
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }
  
  
   
  useEffect(() => {    
      fetch(`http://127.0.0.1:8000/api/docentespormateria/${selecionMateria}/${correo}`)
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
  }, [selecionMateria, correo]); 
  
  
  const handleAdditionalDocenteChange = (index, value) => {
    const newAdditionalDocentes = [...additionalDocentes];
    newAdditionalDocentes[index] = value;
    setAdditionalDocentes(newAdditionalDocentes);
  };
  const handleDateChange = (newDate) => {
    const dayOfWeek = newDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    setDate(newDate);
    setSelectedDay(capitalizedDayOfWeek);
    setShowCalendar(false);
  };
  const handleInputChange = (event) => {
    setSelecionMateria(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleMateriaChange = (event) => {
    setSelectedMateria(event.target.value);
  };
  const handleNextStep = () => {
    const tipoNumero = /^\d+$/;
    const dataToSend = {
       
    };

    if (!selecionMateria || !selectedMateria) {
      setErrorIncompleto("Por favor, complete todos los campos del formulario");
      return;
    } else {
      setShowErrorMessage("");
      if (!tipoNumero.test(selecionMateria)) {
        setShowErrorMessage("Ingrese solo numeros");
      } else {
        setShowErrorMessage("");
        if (!selectedOption) {
          setShowErrorMessage("Seleccione una hora");
          return;
        }
        const horaSeleccionadaObj = horariosDisponibles.find(hora => hora.id_hora.toString() === selectedOption.toString());

        if (horaSeleccionadaObj) {
          const horaInicio = horaSeleccionadaObj.hora_inicio;
          const horaFin = horaSeleccionadaObj.hora_fin;
          dataToSend.horaInicio = horaInicio;
          dataToSend.horaFin = horaFin;
          console.log(dataToSend);
          navigate('/Usuario/Usu/Solicitar1', { state: dataToSend });
        } else {
          setShowErrorMessage("La hora seleccionada no es válida");
        }
      }
    }
  };
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const enviarDatos = () => {
    const formData = {
      numeroEstudiantes: selecionMateria,
      diaSeleccionado: selectedDay,
      correo: correo,
      fechaSeleccionada: date.toLocaleDateString(), 
      materiaSeleccionada: selectedMateria,
      horaSeleccionada: selectedOption,
    };
    navigate('/Admin/Ambientes/AmbientesSol', { state: formData });
    navigate('/Admin/Ambientes/AmbientesSol', { state: formData });

  };
  const EnviarSolicitud = () => {
    const data = {
      materias,
      correo,
      cantidad,
      diaSeleccionado: selectedDay,
      horaSeleccionada: selectedOption,
    };
    console.log("Datos a enviar:", data); 
    fetch("http://127.0.0.1:8000/api/registrarSolicitud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) 
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
    <div className='contenedorGeneral' style={{minHeight: '100vh'}}>
      <div className="contenedorsito">
        <div>
          <h4>Selecciona una fecha:</h4>
          <div className='calendar-input-container'>
            <input
              type="text"
              value={date.toLocaleDateString()}
              readOnly
              onClick={toggleCalendar}
              className="calendar-input"
            />
            <AiOutlineCalendar className="calendar-icon" onClick={toggleCalendar} />
            {showCalendar && (
              <div className='calendar-popup'>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  minDate={new Date()}
                  maxDate={new Date(2026, 11, 31)}
                  
                />
              </div>
            )}
          </div>
        </div>
        <div className='capacidad'>
          <label htmlFor="campo" className="label">Nro de Estudiantes:</label>
          <input
            type="text"
            id="campo"
            name="campo"
            value={cantidad}
            onChange={handleInputChange}
            placeholder='Ingrese la capacidad de estudiantes'
            className="input"
          />
          {showErrorMessage && <p className="error">{showErrorMessage}</p>}
        </div>
        <div className='tipo_ambiente'>
          <label htmlFor="campo1" className="label">Tipo de Ambiente:</label>
          <input
            type="text"
            id="campo1"
            name="campo1"
            placeholder='Aula Comun, Laboratorio'
            className="input"
          />
          {showErrorMessage && <p className="error">{showErrorMessage}</p>}
        </div>
        <div className='materia'>
          <label htmlFor="menuMateria" className="label">Materia:</label>
          <select className="input24" value={selecionMateria} name="nombre_materia" onChange={handleInputChange}>
              <option value="">Seleccione una materia</option>
              {materias.map((materia, index) => (
                <option key={index} value={materia.nombre_materia}>{materia.nombre_materia}</option>
              ))}
            </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <div className='motivo'>
          <label htmlFor="menuMotivo" className="label">Grupo:</label>
          <select className="input24" value={valor} name="nombre_grupo" onChange={(e) => setValor(e.target.value)}>
              <option value="">Seleccione el Grupo</option>
              {grupos.map((grupo, index) => (
                <option key={index} value={grupo.grupo}>{grupo.grupo}</option>
              ))}
            </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <div className='motivo'>
          <label htmlFor="menuMotivo" className="label">Motivo:</label>
          <select 
              className="input24" 
              name="id_docente"
              onChange={handleMateriaChange}
              value={selectedMateria}
            >
                <option value="">Seleccione un Motivo</option>              
                  <option >Examen Primer Parcial</option>
                  <option >Examen Segundo Parcial</option>
                  <option >Examen Final</option>
                  <option >Examen Segunda instancia</option>
                  <option >Reemplazo de  clases</option>
                  <option >Elecciones</option>
                  <option >Asamblea de estudiantes</option>
                <option >Reunión a charla </option>                
            </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <div className='motivo'>
          <label htmlFor="menuMotivo" className="label">Seleccione la hora inicio:</label>
          <select id="menu" value={selectedOption} onChange={handleSelectChange} className="select">
            {horariosDisponibles.map((hora, index) => (
              <option key={index} value={hora.id_hora}>
                {hora.hora_inicio}
              </option>
            ))}
          </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <div className='motivo'>
          <label htmlFor="menuMotivo" className="label">Seleccione la cantidad de periodos:</label>
          <input
            type="text"
            id="campo1"
            name="campo1"
            placeholder='Aula Comun, Laboratorio'
            className="input"
          />
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <button className="boton-siguiente" onClick={handleNextStep}>Enviar</button>       
      </div>
    </div>
  );
}

export default Solicitar;
