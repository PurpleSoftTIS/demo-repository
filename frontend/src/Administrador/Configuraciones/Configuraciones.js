import React, { useState, useEffect } from "react";
import './Configuraciones.css';
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlusCircle, FaSave, FaTimes } from 'react-icons/fa';

const Configuraciones = () => {
  const navigate = useNavigate();

  const [periodosAulaComun, setPeriodoAulaComun] = useState("");
  const [periodosLaboratorio, setPeriodosLaboratorio] = useState("");
  const [periodosAuditorio, setPeriodiosAuditorio] = useState("");
  const [periodosUsuario, setPeriodosUsuario] = useState("");

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mensajesMasivos, setMensajesMasivos] = useState("No");

  const [feriados, setFeriados] = useState([]);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newFeriado, setNewFeriado] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/configuraciones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const aulaComun = data.find(conf => conf.configuracion === 'Aula Comun');
        const laboratorio = data.find(conf => conf.configuracion === 'Laboratorios');
        const auditorio = data.find(conf => conf.configuracion === 'Auditorio');
        const respuestaUsuario = data.find(conf => conf.configuracion === 'Tiempo de respuesta Usuario');
        const inicio = data.find(conf => conf.configuracion === 'Fecha Inicio');
        const fin = data.find(conf => conf.configuracion === 'Fecha Fin');
        const mensajes = data.find(conf => conf.configuracion === 'Mensajes masivo');

        setPeriodoAulaComun(aulaComun ? aulaComun.valor : "");
        setPeriodosLaboratorio(laboratorio ? laboratorio.valor : "");
        setPeriodiosAuditorio(auditorio ? auditorio.valor : "");
        setPeriodosUsuario(respuestaUsuario ? respuestaUsuario.valor : "");
        setFechaInicio(inicio ? inicio.valor : "");
        setFechaFin(fin ? fin.valor : "");
        setMensajesMasivos(mensajes ? (mensajes.valor === '1' ? 'Si' : 'No') : 'No');
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/feriados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setFeriados(data);
      })
      .catch(error => console.error('Error al obtener los feriados:', error));
  }, []);

  const validateForm = () => {
    let formErrors = {};
    if (!periodosAulaComun) formErrors.periodosAulaComun = "Completa el campo";
    if (!periodosLaboratorio) formErrors.periodiosLaboratorio = "Completa el campo";
    if (!periodosAuditorio) formErrors.periodiosAuditorio = "Completa el campo";
    if (!periodosUsuario) formErrors.periodiosUsuario = "Completa el campo";
    if (!fechaInicio) formErrors.fechaInicio = "Completa el campo";
    if (!fechaFin) formErrors.fechaFin = "Completa el campo";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const datosConf = {
      periodosAulaComun,
      periodosLaboratorio,
      periodosAuditorio,
      periodosUsuario,
      fechaInicio,
      fechaFin,
      mensajesMasivos: mensajesMasivos === 'Si' ? '1' : '0'
    };

    fetch("http://127.0.0.1:8000/api/registrarConfiguraciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosConf)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          navigate("/Admin/Mensaje/ConfiguracionExitosa");
        } else {
          throw new Error(data.error || 'Error al registrar la configuración');
        }
      })
      .catch(error => {
        console.error("Error al registrar la configuración:", error);
        navigate("/Admin/Mensaje/ConfiguracionError");
      });
  };

  const handleAddFeriado = () => {
    setShowModal(true);
  };

  const handleDeleteFeriado = (fecha) => {
    fetch(`http://127.0.0.1:8000/api/eliminarFeriado/${fecha}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          setFeriados(feriados.filter(f => f.fecha !== fecha));
          showSnackbar('Feriado borrado', 'error');
        } else {
          throw new Error(data.error || 'Error al eliminar el feriado');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el feriado:', error);
        showSnackbar('Error al eliminar el feriado', 'error');
      });
  };

  const handleModalSave = () => {
    fetch('http://127.0.0.1:8000/api/registrarFeriados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fecha: newFeriado })
    })
      .then(response => response.json())
      .then(data => {
        setFeriados([...feriados, { fecha: newFeriado }]);
        showSnackbar('Feriado registrado', 'success');
        setNewFeriado("");
      })
      .catch(error => {
        console.error('Error al guardar el feriado:', error);
        showSnackbar('Error al guardar el feriado', 'error');
      });
  };

  const handleDeleteAllFeriados = () => {
    fetch('http://127.0.0.1:8000/api/eliminarTodosFeriados', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          setFeriados([]);
          showSnackbar('Todos los feriados borrados', 'error');
        } else {
          throw new Error(data.error || 'Error al eliminar todos los feriados');
        }
      })
      .catch(error => {
        console.error('Error al eliminar todos los feriados:', error);
        showSnackbar('Error al eliminar todos los feriados', 'error');
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setTimeout(() => {
      setSnackbarMessage("");
      setSnackbarType("");
    }, 2000);
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
            name="periodiosLaboratorio"
            value={periodosLaboratorio}
            onChange={(e) => setPeriodosLaboratorio(e.target.value)}
          />
          {errors.periodiosLaboratorio && <p className="error">{errors.periodiosLaboratorio}</p>}
        </label>
        <label>
          Periodos de Auditorio:
          <input
            type="text"
            name="periodiosAuditorio"
            value={periodosAuditorio}
            onChange={(e) => setPeriodiosAuditorio(e.target.value)}
          />
          {errors.periodiosAuditorio && <p className="error">{errors.periodiosAuditorio}</p>}
        </label>
        <label>
          Tiempo de respuesta en horas para el usuario:
          <input
            type="text"
            name="periodiosUsuario"
            value={periodosUsuario}
            onChange={(e) => setPeriodosUsuario(e.target.value)}
          />
          {errors.periodiosUsuario && <p className="error">{errors.periodiosUsuario}</p>}
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
          Gestionar Feriados:
          <FaPlusCircle className="add-icon" onClick={handleAddFeriado} />
        </label>
        <button type="submit">Aceptar</button>
      </form>

      {showModal && (
        <div className="modal-feriado">
          <div className="modal-content-feriado">
            <h3>Gestionar Feriados</h3>
            <div className="feriados-list-modal">
              {feriados.length > 0 ? (
                feriados.map(feriado => (
                  <div key={feriado.fecha} className="feriado-item-modal">
                    <input
                      type="date"
                      value={feriado.fecha}
                      className="feriado-input-modal"
                      readOnly
                    />
                    <FaTrash onClick={() => handleDeleteFeriado(feriado.fecha)} className="delete-icon-modal" />
                  </div>
                ))
              ) : (
                <p>No hay feriados registrados</p>
              )}
            </div>
            <h4 style={{marginLeft: '4px'}}>Agregar nuevo feriado</h4>
            <div className="feriado-input-modal-container">
              <input
                type="date"
                value={newFeriado}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setNewFeriado(e.target.value)}
                className="feriado-input-modal"
              />
              <FaSave onClick={handleModalSave} className="save-icon" />
            </div>
            <div className="modal-buttons">
              <button className="delete-all-btn" onClick={handleDeleteAllFeriados}>
                <FaTrash className="button-icon" /> Borrar Todos
              </button>
              <button className="close-btn" onClick={handleModalClose}>
                <FaTimes className="button-icon" /> Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {snackbarMessage && (
        <div className={`snackbar ${snackbarType}`}>
          {snackbarMessage}
        </div>
      )}
    </div>
  );
};

export default Configuraciones;
