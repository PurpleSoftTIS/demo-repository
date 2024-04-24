import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import './SolicitarCon2.css'
const SolicitarCon2 = () => {
    
  const navigate = useNavigate();   

  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [selectedDay, setSelectedDay] = useState(''); 
  const [selectedOption, setSelectedOption] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showErrorDate, setShowErrorDate] = useState(false);
  const [showErrorHour, setShowErrorHour] = useState(false);
  const [errorInconpleto, setErrorIncompleto] = useState("");


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
    setDate(newDate);
    setSelectedDay(dayOfWeek);
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
      horaSeleccionada: selectedOption
    };
    if (!inputValue) {
      setErrorIncompleto(" Por favor, complete todos los campos del formulario");
      return;
    }else{
      setShowErrorMessage("");
      if(!tipoNumero.test(inputValue)){
        setShowErrorMessage("Ingrese solo numeros")
  
      }else{
        setShowErrorMessage("")
  
        navigate('/Usuario/Usu/Solicitar1', { state: dataToSend });
  
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
    
              <p className='fecha'>Fecha seleccionada: {date.toLocaleDateString()}</p> {/* Mostrar el día seleccionado */}
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

export default SolicitarCon2