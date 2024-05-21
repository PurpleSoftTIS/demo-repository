import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

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
  const correo = correoElectronico;

  const disabledDates = [
    new Date(2024, 0, 1), // Example specific date (January 1, 2024)
    new Date(2024, 11, 25), // Example specific date (December 25, 2024)
  ];

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

  const tileDisabled = ({ date }) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isDisabledDate = disabledDates.some(disabledDate => 
      date.getFullYear() === disabledDate.getFullYear() &&
      date.getMonth() === disabledDate.getMonth() &&
      date.getDate() === disabledDate.getDate()
    );
    return isWeekend || isDisabledDate;
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
                  tileDisabled={tileDisabled}
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
          <label htmlFor="menu" className="label">Selecciona una opción:</label>
          <select id="menu" value={selectedOption} onChange={handleSelectChange} className="select">
            {horariosDisponibles.map((hora, index) => (
              <option key={index} value={hora.id_hora}>
                {hora.hora_inicio} - {hora.hora_fin}
              </option>
            ))}
          </select>
          {showErrorMessage && selectedOption === '' && <p className="solo-numero">Este campo es obligatorio</p>}
          {errorInconpleto && <p className="error">{errorInconpleto}</p>}
          <button className="boton-siguiente" onClick={handleNextStep}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default Solicitar;