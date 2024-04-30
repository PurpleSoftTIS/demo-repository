import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import "./Solicitar.css";

const Solicitar = () => {
  const navigate = useNavigate();
  const location =useLocation();
  console.log("Datos de ubicación:", location.state);

  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [selectedDay, setSelectedDay] = useState(''); 
  const [selectedOption, setSelectedOption] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const correoElectronico = location.state.correo;


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
          setHorariosDisponibles(data);
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
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextStep = () => {
    const tipoNumero = /^\d+$/;
    const dataToSend = {
      numeroEstudiantes: inputValue,
      diaSeleccionado: selectedDay,
      correo:correoElectronico,
    };
  
    if (!inputValue) {
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
  
  
  return (
    <div className='contenedorGeneral'>
      <div className="contenedorsito">
        <div>
          <h4>Selecciona una fecha:</h4>
          <div className='calendario-container'>
            <Calendar
              onChange={handleDateChange}
              value={date}
              minDate={new Date()} 
              maxDate={new Date(2026, 11, 31)} 
            />
          </div>
          <p className='fecha'>Fecha seleccionada: {date.toLocaleDateString()}</p>
        </div>

        <div className='capacidad'>
          <label htmlFor="campo" className="label">Nro de Estudiantes:</label>
          <input
            type="text"
            id="campo"
            name="campo"
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Ingrese la capacidad es estudiantes'
            className="input"
          />
          {showErrorMessage && <p className="error">{showErrorMessage}</p>}
        </div>

        <div className='horarios'>
          <label htmlFor="menu" className="label">Selecciona una opción:</label>
          <select id="menu" value={selectedOption} onChange={handleSelectChange} className="select" >
            {horariosDisponibles.map((hora, index) => (
              <option key={index} value={hora.id_hora} >
                {hora.hora_inicio} - {hora.hora_fin}
              </option>
            ))}
          </select>
          {showErrorMessage && selectedOption === '' && <p className="solo-numero">Este campo es obligatorio</p>}
          {errorInconpleto && <p className="error">{errorInconpleto}</p>}
          <button className="boton-siguiente" onClick={handleNextStep}>Siguiente paso</button>
        </div>
      </div>
    </div>
  );
}

export default Solicitar;
