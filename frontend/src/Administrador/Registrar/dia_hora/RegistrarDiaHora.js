import React, { useState } from 'react';
import './RegistrarDiaHora.css';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const RegistrarDiaHora = () => {
    var exitoso = true;
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedHours, setSelectedHours] = useState({});
  
    const { state: datosAmbiente } = useLocation();

    const handleDayClick = (day) => {
      setSelectedDay(day);
     
      if (!selectedHours[day]) {
        
        setSelectedHours(prevState => ({ ...prevState, [day]: {} }));
      }
    };
  
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
    
    const handleSelectAll = () => {
      setSelectedHours(prevState => ({
          ...prevState,
          [selectedDay]: {
              ...prevState[selectedDay],
              '6:45-8:15': true,
              '8:15-9:45': true,
              '9:45-11:15': true,
              '11:15-12:45': true,
              '12:45-14:15': true,
              '14:15-15:45': true,
              '15:45-17:15': true,
              '17:15-18:45': true,
              '18:45-20:15': true,
              '20:15-21:45': true
          }
      }));
  };
    
    
    
    const showHours = () => {
      if (selectedDay && selectedHours[selectedDay]) {
        return (
          <div className="col-md-6" style={{ height: '76.1vh' }}>
            <div className="row">
            <div className="square4 mx-auto my-5">
            <h4>Selecciona Las Horas</h4>
    <div className="row">
      <div className="col">
        <ul className="list-unstyled">
          <li className="form-check">
                        <input className="form-check-input" type="checkbox" id="6:45-8:15" checked={selectedHours[selectedDay]['6:45-8:15']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="6:45-8:15">6:45-8:15</label>
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
                        <input className="form-check-input" type="checkbox" id="17:15-18:45" checked={selectedHours[selectedDay]['17:15-18:45']} onChange={handleHourChange} />
                        <label className="form-check-label" htmlFor="17:15-18:45">17:15-18:45</label>
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
      <button className="boton-seleccion" onClick={handleSelectAll}>Seleccionar todos</button>
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
      const json = {
        datosAmbiente, 
        diasHoras: {} 
      };
      for (const day in selectedHours) {
        const hours = selectedHours[day];
        json.diasHoras[day] = Object.keys(hours).filter(hour => hours[hour]);
      }
      return JSON.stringify(json, null, 2);
    };
  
    const handleRegistrarAmbiente = () => {
      const json = createJSON();
      console.log("Datos a enviar:", json); 
  
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
          exitoso = true;
        } else {
          console.error("Error en el registro");
          exitoso = false;
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
      });
    };
    return (
      <div className="diashoras text-center mt-5" style={{ height: '70.7vh' }}>
         <div className="diashoras text-center mt-5">
          <div className="square9 mx-auto my-5 text-center ">
         
      <h4>Días y Horas Hábiles para el Ambiente</h4>
    
            <div className="row justify-content-center">
              <div className="col-md-6 text-center ">
                <h4>Selecciona un día</h4>
                <div className="days-container">
                  <button className={`day-btn ${selectedDay === "Lunes" && "selected"}`} onClick={() => handleDayClick("Lunes")}>Lunes</button>
                  <button className={`day-btn ${selectedDay === "Martes" && "selected"}`} onClick={() => handleDayClick("Martes")}>Martes</button>
                  <button className={`day-btn ${selectedDay === "Miércoles" && "selected"}`} onClick={() => handleDayClick("Miércoles")}>Miércoles</button>
                  <button className={`day-btn ${selectedDay === "Jueves" && "selected"}`} onClick={() => handleDayClick("Jueves")}>Jueves</button>
                  <button className={`day-btn ${selectedDay === "Viernes" && "selected"}`} onClick={() => handleDayClick("Viernes")}>Viernes</button>
                  <button className={`day-btn ${selectedDay === "Sabado" && "selected"}`} onClick={() => handleDayClick("Sabado")}>Sabado</button>
                </div>
              </div>
              {showHours()}
            </div>
          </div>
          <div className="square3 mx-auto d-flex justify-content-center align-items-center">
            <NavLink className="btn btn-primary custom-btn  " to='/Admin/Listas/ListaAmbientes' activeclassname="active">Cancelar</NavLink>        
            <NavLink className="btn btn-primary custom-btn " to={exitoso ? "/Admin/Mensaje/RegistroExitoso" : "/Admin/Mensaje/RegistroError" } onClick={handleRegistrarAmbiente}>Registrar Ambiente</NavLink>
          </div>
        </div> 
      </div>
    );
}

export default RegistrarDiaHora;