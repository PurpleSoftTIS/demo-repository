import React, { useState } from 'react';
import './RegistrarDiaHora.css';

const DiasHoras = () => {
  const [selectedDay, setSelectedDay] = useState(""); // Estado para almacenar el día seleccionado
  const [selectedHours, setSelectedHours] = useState({}); // Estado para almacenar los horarios seleccionados

  // Función para manejar el cambio de día seleccionado
  const handleDayClick = (day) => {
    setSelectedDay(day);
    // Verificar si ya hay selecciones guardadas para el día seleccionado
    if (!selectedHours[day]) {
      // Si no hay selecciones previas, inicializa el estado para el día seleccionado
      setSelectedHours(prevState => ({ ...prevState, [day]: {} }));
    }
  };

  // Función para manejar el cambio de horario seleccionado
  const handleHourChange = (event) => {
    const { id, checked } = event.target;
    setSelectedHours(prevState => ({
      ...prevState,
      [selectedDay]: {
        ...prevState[selectedDay],
        [id]: checked
      }
    }));
  };

  // Función para mostrar los horarios según el día seleccionado
  const showHours = () => {
    if (selectedDay && selectedHours[selectedDay]) {
      return (
        <div className="col-md-6">
          <div className="row">
          <div className="square4 mx-auto my-5">
          <h4>Selecciona Las Horas</h4>
  <div className="row">
    <div className="col">
      <ul className="list-unstyled">
      <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="6:15" checked={selectedHours[selectedDay]['6:15']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="6:15">6:45-8:15</label>
                    </li>
                    <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="8:15" checked={selectedHours[selectedDay]['8:15']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="8:15">8:15-9:45</label>
                    </li>
                    <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="9:45" checked={selectedHours[selectedDay]['9:45']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="9:45">9:45-11:15</label>
                    </li>
                    <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="11:15" checked={selectedHours[selectedDay]['11:15']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="11:15">11:15-12:45</label>
                    </li>
                    <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="12:45" checked={selectedHours[selectedDay]['12:45']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="12:45">12:45-14:15</label>
                    </li>
       
      </ul>
    </div>
    <div className="col">
      <ul className="list-unstyled">
      <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="14:15" checked={selectedHours[selectedDay]['14:15']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="14:15">14:15-15:45</label>
                    </li>
                    <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="15:45" checked={selectedHours[selectedDay]['15:45']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="15:45">15:45-17:15</label>
                    </li>
                    <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="17:15" checked={selectedHours[selectedDay]['17:15']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="17:15">17:45-18:45</label>
                    </li>
                    <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="18:45" checked={selectedHours[selectedDay]['18:45']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="18:45">18:45-20:15</label>
                    </li>
                    <li className="form-check">
                      <input className="form-check-input" type="checkbox" id="20:15" checked={selectedHours[selectedDay]['20:15']} onChange={handleHourChange} />
                      <label className="form-check-label" htmlFor="20:15">20:15-21:45</label>
                    </li>
       
      </ul>
    </div>
  </div>
  </div>
  </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="container text-center mt-5">
       <div className="container text-center mt-5">
        <div className="square mx-auto my-5 text-center ">
       
    <h4>Días y Horas Hábiles Para el Ambiente</h4>
  
          <div className="row justify-content-center">
            <div className="col-md-6 text-center ">
              <h4>Selecciona un día</h4>
              <div className="days-container">
                <button className={`day-btn ${selectedDay === "Lunes" && "selected"}`} onClick={() => handleDayClick("Lunes")}>Lunés</button>
                <button className={`day-btn ${selectedDay === "Martes" && "selected"}`} onClick={() => handleDayClick("Martes")}>Martes</button>
                <button className={`day-btn ${selectedDay === "Miércoles" && "selected"}`} onClick={() => handleDayClick("Miércoles")}>Miércoles</button>
                <button className={`day-btn ${selectedDay === "Jueves" && "selected"}`} onClick={() => handleDayClick("Jueves")}>Jueves</button>
                <button className={`day-btn ${selectedDay === "Viernes" && "selected"}`} onClick={() => handleDayClick("Viernes")}>Viernes</button>
                {/* Agrega más días aquí */}
              </div>
            </div>
            {showHours()}
          </div>
        </div>
      </div>
      <div className="square3 mx-auto d-flex justify-content-center align-items-center">
        <button type="button" className="btn btn-primary custom-btn">Registrar Ambiente</button>
      </div>
    </div>
  );
}

export default DiasHoras;