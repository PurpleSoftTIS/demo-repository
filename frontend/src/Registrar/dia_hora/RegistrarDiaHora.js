import React, { useState } from 'react';
import './RegistrarDiaHora.css';
import { useLocation } from 'react-router-dom';

const RegistrarDiaHora = () => {
  
    const [selectedDay, setSelectedDay] = useState(""); // Estado para almacenar el día seleccionado
    const [selectedHours, setSelectedHours] = useState({}); // Estado para almacenar los horarios seleccionados
    const { state: datosAmbiente } = useLocation();
  
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
                        <input className="form-check-input" type="checkbox" id="6:15-8:15" checked={selectedHours[selectedDay]['6:15-8:15']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="6:15-8:15">6:45-8:15</label>
                      </li>
                      <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="8:15-9:45" checked={selectedHours[selectedDay]['8:15-9:45']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="8:15-9:45">8:15-9:45</label>
                      </li>
                      <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="9:45-11:15" checked={selectedHours[selectedDay]['9:45-11:15']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="9:45-11:15">9:45-11:15</label>
                      </li>
                      <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="11:15-12:45" checked={selectedHours[selectedDay]['11:15-12:45']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="11:15-12:45">11:15-12:45</label>
                      </li>
                      <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="12:45-14:15" checked={selectedHours[selectedDay]['12:45-14:15']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="12:45-14:15">12:45-14:15</label>
                      </li>
         
        </ul>
      </div>
      <div className="col">
        <ul className="list-unstyled">
        <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="14:15-15:45" checked={selectedHours[selectedDay]['14:15-15:45']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="14:15-15:45">14:15-15:45</label>
                      </li>
                      <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="15:45-17:15" checked={selectedHours[selectedDay]['15:45-17:15']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="15:45-17:15">15:45-17:15</label>
                      </li>
                      <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="17:45-18:45" checked={selectedHours[selectedDay]['17:45-18:45']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="17:45-18:45">17:45-18:45</label>
                      </li>
                      <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="18:45-20:15" checked={selectedHours[selectedDay]['18:45-20:15']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="18:45-20:15">18:45-20:15</label>
                      </li>
                      <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="20:15-21:45" checked={selectedHours[selectedDay]['20:15-21:45']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="20:15-21:45">20:15-21:45</label>
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
    const createJSON = () => {
      // Combinar los datos del ambiente con los días y horas seleccionados
      const json = {
        datosAmbiente, // Datos del ambiente
        diasHoras: {} // Días y horas seleccionados
      };
      for (const day in selectedHours) {
        const hours = selectedHours[day];
        json.diasHoras[day] = Object.keys(hours).filter(hour => hours[hour]);
      }
      return JSON.stringify(json, null, 2);
    };
  
    // Función para manejar el evento de clic en el botón "Registrar Ambiente"
    const handleRegistrarAmbiente = () => {
      const json = createJSON();
      console.log("Datos a enviar:", json); // Imprimir el JSON en la consola
  
      // Aquí puedes enviar el JSON a una API
      fetch("http://127.0.0.1:8000/api/registrarambiente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: json
      })
      .then(response => {
        if (response.ok) {
          console.log("Registro exitoso");
          // Aquí puedes hacer algo después de un registro exitoso
        } else {
          console.error("Error en el registro");
          // Aquí puedes manejar errores en el registro
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
        // Aquí puedes manejar errores de red u otros errores
      });
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
               
                </div>
              </div>
              {showHours()}
            </div>
          </div>
        </div>
        <div className="square3 mx-auto d-flex justify-content-center align-items-center">
          <button type="button" className="btn btn-primary custom-btn" onClick={handleRegistrarAmbiente}>Registrar Ambiente</button>
  
        </div>
      </div>
    );
}

export default RegistrarDiaHora