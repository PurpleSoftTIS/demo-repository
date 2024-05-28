import React, { useState } from "react";
import './Configuraciones.css';
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from 'react-icons/fa';

const Configuraciones = () => {
  const navigate = useNavigate();

  const [periodosAulaComun, setPeriodoAulaComun] = useState("");
  const [periodosLaboratorio, setPeriodosLaboratorio] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [feriados, setFeriados] = useState([""]);
  const [errors, setErrors] = useState({});

  const handleAddFeriado = () => {
    setFeriados([...feriados, ""]);
  };

  const handleFeriadoChange = (index, value) => {
    const newFeriados = feriados.map((feriado, i) => (i === index ? value : feriado));
    setFeriados(newFeriados);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!periodosAulaComun) formErrors.periodosAulaComun = "Completa el campo";
    if (!periodosLaboratorio) formErrors.periodosLaboratorio = "Completa el campo";
    if (!fechaInicio) formErrors.fechaInicio = "Completa el campo";
    if (!fechaFin) formErrors.fechaFin = "Completa el campo";
    feriados.forEach((feriado, index) => {
      if (!feriado) {
        formErrors[`feriado${index}`] = "Completa el campo";
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  const handleDateChange = (e, setter) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate.getDay() === 0) {
      return;
    }
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const datosConf = {
      periodosAulaComun,
      periodosLaboratorio,
      fechaInicio,
      fechaFin,
      feriados,
    };
    console.log("Datos a enviar:", datosConf);

    fetch("http://127.0.0.1:8000/api/registrarConfiguracion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosConf)
    })
      .then(response => {
        console.log("Respuesta del servidor:", response);
        return response.json();
      })
      .then(data => {
        console.log("Registro exitoso:", data);
        setPeriodoAulaComun("");
        setPeriodosLaboratorio("");
        setFechaInicio("");
        setFechaFin("");
        setFeriados([""]);

        navigate("/Admin/Mensaje/RegistroConfiguracion");
      })
      .catch(error => {
        console.error("Error al registrar la configuración:", error);
        navigate("/Admin/Mensaje/RegistroConfiguracionError");
      });
  };

  return (
    <div className="contact-form-container">
      <form className="config-form" onSubmit={handleSubmit}>
        <b className="configuracion">Configuración de periodos y fechas</b>
        <label>
          Periodos de Aula Común:
          <input
            type="text"
            name="periodosAulaComun"
            value={periodosAulaComun}
            onChange={(e) => setPeriodoAulaComun(e.target.value)}
          />
          {errors.periodosAulaComun && <p className="error">{errors.periodosAulaComun}</p>}
        </label>
        <label>
          Periodos de Laboratorio:
          <input
            type="text"
            name="periodosLaboratorio"
            value={periodosLaboratorio}
            onChange={(e) => setPeriodosLaboratorio(e.target.value)}
          />
          {errors.periodosLaboratorio && <p className="error">{errors.periodosLaboratorio}</p>}
        </label>
        <label>
          Límite de Fecha Inicio:
          <input
            type="date"
            name="limiteFechaInicio"
            value={fechaInicio}
            min={new Date().toISOString().split('T')[0]} 
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          {errors.fechaInicio && <p className="error">{errors.fechaInicio}</p>}
        </label>
        <label>
          Límite de Fecha Fin:
          <input
            type="date"
            name="limiteFechaFin"
            value={fechaFin}
            min={new Date().toISOString().split('T')[0]} 
            onChange={(e) => setFechaFin(e.target.value)}
          />
          {errors.fechaFin && <p className="error">{errors.fechaFin}</p>}
        </label>
        <label className="feriados-label">
          Agregar Feriados:
          <FaPlusCircle 
            className="add-icon" 
            onClick={handleAddFeriado} 
          />
        </label>
        {feriados.map((feriado, index) => (
          <div key={index}>
            <input
              type="date"
              value={feriado}
              min={new Date().toISOString().split('T')[0]} 
              onChange={(e) => handleFeriadoChange(index, e.target.value)}
            />
            {errors[`feriado${index}`] && <p className="error">{errors[`feriado${index}`]}</p>}
          </div>

        ))}
        <button type="submit">Aceptar</button>
      </form>
    </div>
  );
};

export default Configuraciones;
