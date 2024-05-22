import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Ico1 from '../../assets/IcoMore.png';

import "./Solicitar.css";

const Solicitar = () => {
  const navigate = useNavigate();
  const { state: correoElectronico } = useLocation();

  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [selectedDay, setSelectedDay] = useState(''); 
  const [selectedOption, setSelectedOption] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const [selectedMateria, setSelectedMateria] = useState(''); 
  const [aux, setAux] = useState(0); // Definir aux con useState
  const [formData, setFormData] = useState({ id_docente: '' }); // Definir formData con useState
  const [docentes, setDocentes] = useState([]); // Definir docentes con useState
  const correo = correoElectronico;

  const disabledDates = [
    { month: 4, day: 30 },
    { month: 7, day: 6 },
    { month: 8, day: 14 }, 
    { month: 10, day: 2 },
  ];

  const highlightedDates = [
    { month: 5, day: 10 },   
    { month: 5, day: 11 },   
    { month: 5, day: 12 },   
    { month: 5, day: 13 },  
    { month: 5, day: 14 },  
    { month: 5, day: 15 },   
    { month: 5, day: 16 },   
    { month: 5, day: 17 },   
    { month: 5, day: 18 },   
    { month: 5, day: 19 },   
    { month: 5, day: 20 },   
    { month: 5, day: 21 },   
    { month: 5, day: 22 },  
    { month: 5, day: 24 },
    { month: 5, day: 25 },
    { month: 5, day: 26 },
    { month: 5, day: 27 },
    { month: 5, day: 28 },
    { month: 5, day: 29 },
    { month: 6, day: 1 },
    { month: 6, day: 2 },
    { month: 6, day: 3 },
    { month: 6, day: 4 },
    { month: 6, day: 5 },
  ];

  const [MoreDocente, setMoreDocente] = useState(false);
  const [MoreDocenteDos, setMoreDocenteDos] = useState(false);
  const [additionalDocentes, setAdditionalDocentes] = useState([]);

  const handleAdditionalDocenteChange = (index, value) => {
    const newAdditionalDocentes = [...additionalDocentes];
    newAdditionalDocentes[index] = value;
    setAdditionalDocentes(newAdditionalDocentes);
  };

  const masDocente = () => {
    if (aux === 1) {
      setMoreDocente(true); 
    } else {
      setMoreDocenteDos(true); 
    }
    setAux(aux + 1);
  };

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

  const handleDateChange = (newDate) => {
    const dayOfWeek = newDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    setDate(newDate);
    setSelectedDay(capitalizedDayOfWeek);
    setShowCalendar(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
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
      numeroEstudiantes: inputValue,
      diaSeleccionado: selectedDay,
      correo: correo,
      fechaSeleccionada: date.toLocaleDateString(), 
      materiaSeleccionada: selectedMateria, 
    };

    if (!inputValue || !selectedMateria) {
      setErrorIncompleto("Por favor, complete todos los campos del formulario");
      return;
    } else {
      setShowErrorMessage("");
      if (!tipoNumero.test(inputValue)) {
        setShowErrorMessage("Ingrese solo números");
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

  const tileDisabled = ({ date }) => {
    const isSunday = date.getDay() === 0;
    const isDisabledDate = disabledDates.some(disabledDate => 
      date.getMonth() === disabledDate.month &&
      date.getDate() === disabledDate.day
    );
    return isSunday || isDisabledDate;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isHighlighted = highlightedDates.some(highlightedDate => 
        date.getMonth() === highlightedDate.month &&
        date.getDate() === highlightedDate.day
      );
      return isHighlighted ? 'highlighted-date' : null;
    }
    return null;
  };

  return (
    <div className='contenedorGeneral' style={{ minHeight: '100vh' }}>
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
                  tileDisabled={tileDisabled}
                  tileClassName={tileClassName}
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
            value={inputValue}
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
          <select id="menuMateria" value={selectedMateria} onChange={handleMateriaChange} className="select">
            <option value="">Selecciona una materia</option>
            <option value="Materia 1">Materia 1</option>
            <option value="Materia 2">Materia 2</option>
          </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <div className='motivo'>
          <label htmlFor="menuMotivo" className="label">Grupo:</label>
          <select id="menuMotivo" value={selectedMateria} onChange={handleMateriaChange} className="select">
            <option value="">Seleccione el Grupo</option>
            <option value="Materia 1">Materia 1</option>
            <option value="Materia 2">Materia 2</option>
          </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <div className='motivo'>
          <label htmlFor="menuMotivo" className="label">Motivo:</label>
          <select id="menuMotivo" value={selectedMateria} onChange={handleMateriaChange} className="select">
            <option value="">Seleccione el Motivo</option>
            <option value="Materia 1">Materia 1</option>
            <option value="Materia 2">Materia 2</option>
          </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <div className='motivo'>
          <label htmlFor="menuMotivo" className="label">Seleccione la cantidad de periodos:</label>
          <select id="menuMotivo" value={selectedMateria} onChange={handleMateriaChange} className="select">
            <option value="">Periodos</option>
            <option value="Materia 1">Materia 1</option>
            <option value="Materia 2">Materia 2</option>
          </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <div className='horarios'>
          {showErrorMessage && selectedOption === '' && <p className="solo-numero">Este campo es obligatorio</p>}
          {errorInconpleto && <p className="error">{errorInconpleto}</p>}
        </div>
        <div className="contact-form-phone-parent">
          <div className="subtitulo">Docente
            <img className="iconos2" src={Ico1} alt="Activo" width="25px" height="25px" onClick={masDocente} />
          </div>
          <select 
            className="input24" 
            value={formData.id_docente}
            name="id_docente"
            onChange={(e) => setFormData({ ...formData, id_docente: e.target.value })}
          >
            <option value="">Seleccione un Docente</option>
            {docentes.map((docente, index) => (
              <option key={index} value={docente.id_docente}>{docente.nombre_completo_docente}</option>
            ))}
          </select>
              
          {MoreDocente && (
            <select 
              className="input24" 
              value={additionalDocentes[0]}
              onChange={e => handleAdditionalDocenteChange(0, e.target.value)}
            >
              <option value="">Seleccione un Docente</option>
              {docentes.map((docente, index) => (
                <option key={index} value={docente.id_docente}>{docente.nombre_completo_docente}</option>
              ))}
            </select>
          )}

          {MoreDocenteDos && (
            <select 
              className="input24" 
              value={additionalDocentes[1]}
              onChange={e => handleAdditionalDocenteChange(1, e.target.value)}
            >
              <option value="">Seleccione un Docente</option>
              {docentes.map((docente, index) => (
                <option key={index} value={docente.id_docente}>{docente.nombre_completo_docente}</option>
              ))}
            </select>
          )}

        </div>
        <div>
          <button className="boton-siguiente" onClick={handleNextStep}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default Solicitar;
