import React, { useState, useEffect } from "react";
import './Configuraciones.css';
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from 'react-icons/fa';

const Configuraciones = () => {
  const navigate = useNavigate();

  const [periodosAulaComun, setPeriodoAulaComun] = useState("");
  const [periodosLaboratorio, setPeriodosLaboratorio] = useState("");
  const [periodosAuditorio, setPeriodosAuditorio] = useState("");
  const [periodosUsuaro, setPeriodosUsuario] = useState("");

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mensajesMasivos, setMensajesMasivos] = useState("No");

  const [feriados, setFeriados] = useState([]);
  const [errors, setErrors] = useState({});

  const [datosCarga, setDatosCarga] = useState({});
  const [datosCargaFecha, setDatosCargaFecha] = useState({});
  const [datosCargaFeriado, setDatosCargaFeriado] = useState([]);

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
    if (!periodosAuditorio) formErrors.periodosAuditorio = "Completa el campo";
    if (!periodosUsuaro) formErrors.periodosAuditorio = "Completa el campo";
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

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/configuraciones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setDatosCarga(data);
        setPeriodoAulaComun(data.periodosAulaComun);
        setPeriodosLaboratorio(data.periodosLaboratorio);
        setPeriodosAuditorio(data.periodosAuditorio);
        setPeriodosUsuario(data.periodosUsuaro);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/configuracionesFecha', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setDatosCargaFecha(data);
        setFechaInicio(data.fechaInicio);
        setFechaFin(data.fechaFin);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/configuracionesFeriados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setDatosCargaFeriado(data);
        // Asegúrate de que la lista tenga al menos un campo vacío
        setFeriados(data.feriados.length > 0 ? data.feriados : [""]);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const datosConf = {
      periodosAulaComun,
      periodosLaboratorio,
      periodosAuditorio,
      periodosUsuaro,
      fechaInicio,
      fechaFin,
      feriados,
      mensajesMasivos
    };
    console.log("Datos a enviar:", datosConf);

    fetch("http://127.0.0.1:8000/api/subirConfiguraciones", {
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
        setPeriodosAuditorio("");
        setPeriodosUsuario("");
        setFechaInicio("");
        setFechaFin("");
        setFeriados([]);
        navigate("/Admin/Mensaje/ConfiguracionExitosa");
      })
      .catch(error => {
        console.error("Error al registrar la configuración:", error);
        navigate("/Admin/Mensaje/ConfiguracionError");
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
          Periodos de Auditorio:
          <input
            type="text"
            name="periodosAuditorio"
            value={periodosAuditorio}
            onChange={(e) => setPeriodosAuditorio(e.target.value)}
          />
          {errors.periodosAuditorio && <p className="error">{errors.periodosAuditorio}</p>}
        </label>
        <label>
          Tiempo de respuesta en horas para el usuario:
          <input
            type="text"
            name="periodosUsuaro"
            value={periodosUsuaro}
            onChange={(e) => setPeriodosUsuario(e.target.value)}
          />
          {errors.periodosAuditorio && <p className="error">{errors.periodosAuditorio}</p>}
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
        <div className="input-container">
            <div className="label-here">Configuracion de mensajes masivos</div>
            <div className="frame-parent">
              <div className="frame-container">
                <div className="frame-group">
                  <input 
                    type="radio" 
                    id="si" 
                    name="tipo" 
                    value="Si" 
                    checked={mensajesMasivos === "Si"}
                    onChange={() => setMensajesMasivos("Si")}
                    className="input15 radio-personalizado"
                  />
                  <label htmlFor="si" className="cotton-blend">Si</label>
                </div>
              </div>
              <div className="frame-container">
                <div className="frame-group">
                  <input 
                    type="radio" 
                    id="no" 
                    name="tipo" 
                    value="No" 
                    checked={mensajesMasivos === "No"}
                    onChange={() => setMensajesMasivos("No")}
                    className="input15 radio-personalizado"
                  />
                  <label htmlFor="no" className="cotton-blend">No</label>
                </div>
              </div>
            </div>
        </div>
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
