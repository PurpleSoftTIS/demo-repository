import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

import "./Solicitar.css";

const Solicitar = () => {
  const navigate = useNavigate();   

  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [date, setDate] = useState(new Date());
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

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
    setDate(newDate);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextStep = () => {
    // Construye el objeto de datos que deseas enviar
    const dataToSend = {
      numeroEstudiantes: inputValue,
      diaSeleccionado: date.toLocaleDateString(),
      horaSeleccionada: selectedOption
    };

    navigate('/Usuario/Usu/Solicitar1', { state: dataToSend });
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
            className="input"
          />
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
          <button className="boton-siguiente" onClick={handleNextStep}>Siguiente paso</button>
        </div>
      </div>
    </div>
  );
}

export default Solicitar;
