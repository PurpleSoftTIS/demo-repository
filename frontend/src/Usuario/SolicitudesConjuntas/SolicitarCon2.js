import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useLocation } from 'react-router-dom'; // Importing useNavigate and useLocation from react-router-dom
import { FormContext } from '../../Context/FormContext';

import './SolicitarCon2.css';

const SolicitarCon2 = () => {
  const { state: formData } = useLocation();
  const materia = formData ? formData.nombre_materia : null;
  const motivo = formData ? formData.motivo : null;
  const docente = formData ? formData.id_docente : null;
  const docente1 = formData ? formData.id_docente2 : null;
  const docente2 = formData ? formData.id_docente3 : null;

  const { setFromDataContext } = useContext(FormContext);

    setFromDataContext({
      nombre_materia: materia,
      motivo: motivo,
      docente2: docente,
      docente: docente1,
      docente2: docente2
    });
 

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

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

  const handleDateChange = newDate => {
    const dayOfWeek = newDate.toLocaleDateString('es-ES', { weekday: 'long' });
    setDate(newDate);
    setSelectedDay(dayOfWeek);
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleNextStep = () => {
    const datos2 = {
      materia,
      docente,
      numeroEstudiantes: inputValue,
      diaSeleccionado: selectedDay,
      horaSeleccionada: selectedOption,
    };
    navigate('/Usuario/Usu/SolicitarCon3', { state: datos2 });
  };

  return (
    <div className="contenedorGeneral">
      <div className="contenedorsito">
        <div>
          <h4>Selecciona una fecha:</h4>
          <div className="calendario-container">
            <Calendar
              onChange={handleDateChange}
              value={date}
              minDate={new Date()}
              maxDate={new Date(2026, 11, 31)}
            />
          </div>
          <p className="fecha">
            Fecha seleccionada: {date.toLocaleDateString()}
          </p>{' '}
          {/* Mostrar el día seleccionado */}
        </div>
        <div className="capacidad">
          <label htmlFor="campo" className="label">
            Nro de Estudiantes:
          </label>
          <input
            type="text"
            id="campo"
            name="campo"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ingrese la capacidad es estudiantes"
            className="input"
          />
        </div>
        <div className="horarios">
          <label htmlFor="menu" className="label">
            Selecciona una opción:
          </label>
          <select
            id="menu"
            value={selectedOption}
            onChange={handleSelectChange}
            className="select"
          >
            {horariosDisponibles.map((hora, index) => (
              <option key={index} value={hora.id_hora}>
                {hora.hora_inicio} - {hora.hora_fin}
              </option>
            ))}
          </select>

          <button className="boton-siguiente" onClick={handleNextStep}>
            Siguiente paso
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolicitarCon2;
