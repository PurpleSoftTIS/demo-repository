import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Solicitar.css";
import { Link } from "react-router-dom";


export const Solicitar = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='contenedorGeneral'>
        <div className="contenedorsito">
          <div >
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
            
              <option value="opcion1">6:45-8:15</option>
              <option value="opcion2">8:15-9:45</option>
              <option value="opcion3">9:45-11:15</option>
              <option value="opcion4">11:15-12:45</option>
              <option value="opcion5">12:45-14:15</option>
              <option value="opcion6">14:15-15:45</option>
              <option value="opcion7">15:45-17:15</option>
              <option value="opcion8">17:15-18:45</option>
              <option value="opcion9">18:45-20:15</option>
              <option value="opcion10">20:15-21:45</option>
            
            </select>
          </div>
        </div>
        <button>
          buscar
        </button>



        <Link to="/Usuario/Usu/DetallesSol" className="navbar-brand logon">
                    Siguiente
        </Link>
    </div>
  );
}

