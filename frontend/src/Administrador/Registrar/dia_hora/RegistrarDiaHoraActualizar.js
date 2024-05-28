import React, { useState, useEffect } from 'react';
import './RegistrarDiaHora.css';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const RegistrarDiaHoras = () => {
  var exitoso = true;

    const [selectedDay, setSelectedDay] = useState(""); // Estado para almacenar el día seleccionado
    const [selectedHours, setSelectedHours] = useState({}); // Estado para almacenar los horarios seleccionados
    const { state: datosAmbiente } = useLocation();
    useEffect(() => {
      console.log("Datos de ambiente:", datosAmbiente);
      if (datosAmbiente && datosAmbiente.diasHoras) {
          const initialSelectedHours = {};
          for (const day in datosAmbiente.diasHoras) {
              initialSelectedHours[day] = {};
              datosAmbiente.diasHoras[day].forEach(hour => {
                  initialSelectedHours[day][hour] = true; // Marcar todas las horas como seleccionadas
              });
          }
          setSelectedHours(initialSelectedHours);
          console.log("Horarios seleccionados inicializados:", initialSelectedHours);
      }
  }, [datosAmbiente]);
  
    // Función para manejar el cambio de día seleccionado
    const handleDayClick = (day) => {
      console.log("Día seleccionado:", day);
  
      // Guardar el estado de las horas seleccionadas para el día actual antes de cambiar al siguiente día
      if (selectedDay && selectedHours[selectedDay]) {
          setSelectedHours(prevState => ({
              ...prevState,
              [selectedDay]: { ...selectedHours[selectedDay] }
          }));
      }
  
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
        console.log("Hora cambiada:", id, "Seleccionada:", checked);

        setSelectedHours(prevState => ({
            ...prevState,
            [selectedDay]: {
                ...prevState[selectedDay],
                [id]: checked
            }
        }));
    };
  
    const showHours = () => {
      console.log("selectedDay:", selectedDay);
      console.log("selectedHours[selectedDay]:", selectedHours[selectedDay]);
      
      if (selectedDay) {
        const allPossibleHours = [
          "06:45-08:15",
          "08:15-09:45",
          "09:45-11:15",
          "11:15-12:45",
          "12:45-14:15",
          "14:15-15:45",
          "15:45-17:15",
          "17:45-18:45",
          "18:45-20:15",
          "20:15-21:45"
        ];
        const firstFiveHours = allPossibleHours.slice(0, 5);
        const secondFiveHours = allPossibleHours.slice(5);
      
        return (
          <div className="col-md-6">
            <div className="row">
              <div className="square4 mx-auto my-5">
                <h4 className="text-center">Selecciona Las Horas</h4>
                <div className="row justify-content-center">
                  {/* Primera columna */}
                  <div className="col text-center">
                    <ul className="list-unstyled">
                      {firstFiveHours.map(hour => (
                        <li className="form-check" key={hour}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={hour}
                            checked={selectedHours[selectedDay] ? selectedHours[selectedDay][hour] === true : false}
                            onChange={handleHourChange}
                          />
                          <label className="form-check-label" htmlFor={hour}>{hour}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Segunda columna */}
                  <div className="col text-center">
                    <ul className="list-unstyled">
                      {secondFiveHours.map(hour => (
                        <li className="form-check" key={hour}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={hour}
                            checked={selectedHours[selectedDay] ? selectedHours[selectedDay][hour] === true : false}
                            onChange={handleHourChange}
                          />
                          <label className="form-check-label" htmlFor={hour}>{hour}</label>
                        </li>
                      ))}
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
    }      
    const createJSON = () => {
       const id=datosAmbiente.id_ambiente;
        const nombreAula=datosAmbiente.nombreAula;
       const capacidadEstudiantes=datosAmbiente.capacidadEstudiantes;
       const edificio=datosAmbiente.edificio;
        const piso=datosAmbiente.piso;
        const Tipo =datosAmbiente.Tipo;
      const json = {
        id,
        nombreAula,
        capacidadEstudiantes,
        edificio,
        piso,
        Tipo,
        diasHoras: {} 
      };
      for (const day in selectedHours) {
        const hours = selectedHours[day];
        json.diasHoras[day] = Object.keys(hours).filter(hour => hours[hour]);
      }
      return JSON.stringify(json, null, 2);
    };
  
    const handleActualizarAmbiente = () => {
      const json = createJSON();
      console.log("Datos a enviar:", json); 
      const idAmbiente = datosAmbiente.id_ambiente; 

      fetch(`http://127.0.0.1:8000/api/actualizar/${idAmbiente}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: json
      })
      .then(response => {
        if (response.ok) {
          console.log("Actualizacion exitoso");
          exitoso = true;
        } else {
          console.error("Error en la actualizacion");
          exitoso = true;

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
         
      <h4>Días y Horas Hábiles para el Ambiente</h4>
    
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
          <div className="square3 mx-auto d-flex justify-content-center align-items-center">
            <NavLink className="btn btn-primary custom-btn  " to='/Admin/Listas/ListaAmbientes' activeclassname="active">Cancelar</NavLink>        
            <NavLink className="btn btn-primary custom-btn" to={exitoso ? "/Admin/Mensaje/ActualizacionExitosa" : "/Admin/Mensaje/ErrorActualizacion" } onClick={handleActualizarAmbiente}>Actualizar Ambiente</NavLink>
          </div>
        </div> 
      </div>
    );
}

export default RegistrarDiaHoras