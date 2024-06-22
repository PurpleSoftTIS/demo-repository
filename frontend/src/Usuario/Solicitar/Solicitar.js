import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import { FormContext } from '../../Context/FormContext';
import "./Solicitar.css";

const Solicitar = () => {
  const navigate = useNavigate();
  const { emailC } = useContext(UserContext);
  const { formDataC, feriados, fetchConfiguraciones, fetchFeriados } = useContext(FormContext);
  const correo = emailC;
  const [cantidad, setCantidad] = useState('');
  const [cantidadPeriodos,setCantidadPeriodos] = useState(0); 
  const [selecionMateria, setSelecionMateria] = useState('');
  const [valor, setValor] = useState('');
  const [materia] = useState('');
  const [date, setDate] = useState(new Date());
  const [materias, setMaterias] = useState([]); 
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState(''); 
  const [selectedOption, setSelectedOption] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState(''); 
  const [selectedAmbiente, setSelectedAmbiente] = useState('');
  const [selectedMotivo, setSelectedMotivo] = useState(''); // Estado para almacenar el motivo seleccionado
  const [gruposPorMateria, setGruposPorMateria] = useState({}); // Estado para almacenar los grupos por materia
  const [selectedGrupos, setSelectedGrupos] = useState([]); // Estado para almacenar los grupos seleccionados
  const [isLoading, setIsLoading] = useState(true);
  const [showSystemClosedModal, setShowSystemClosedModal] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        await fetchConfiguraciones();
        await fetchFeriados();
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar configuraciones y feriados:', error);
      }
    };
    if (isLoading && correo) {
      cargarDatos();
    }
  }, [correo]);
  
  useEffect(() => {
    const checkSystemDateRange = () => {
      if (!isLoading && formDataC.length > 0) {
        const fechaInicioConfig = formDataC.find(conf => conf.configuracion === 'Fecha Inicio');
        const fechaFinConfig = formDataC.find(conf => conf.configuracion === 'Fecha Fin');
        const fechaInicio = fechaInicioConfig ? new Date(fechaInicioConfig.valor) : null;
        const fechaFin = fechaFinConfig ? new Date(fechaFinConfig.valor) : null;
        const fechaActual = new Date();
  
        if (fechaInicio && fechaFin && (fechaActual < fechaInicio || fechaActual > fechaFin)) {
          setShowSystemClosedModal(true);
        } else {
          setShowSystemClosedModal(false);
        }
      }
    };
    checkSystemDateRange();
  }, [isLoading, formDataC]);

  const BusquedaAmbiente = (event) => {
    const selectedAmbiente = event.target.value;
    setSelectedAmbiente(selectedAmbiente); 
    const ambienteSeleccionado = formDataC.find(ambiente => ambiente["configuracion"] === selectedAmbiente);
    if (ambienteSeleccionado) {
      console.log(ambienteSeleccionado);
      setCantidadPeriodos(ambienteSeleccionado.valor);
    }
  };
    useEffect(() => {
    if(!isLoading){
      if (date) {
      fetch(`http://127.0.0.1:8000/api/obtenerHoras`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar las horas disponibles');
          }
          return response.json();
        })
        .then(data => {
          data.sort((a, b) => {
            const horaInicioA = parseInt(a.hora_inicio.split(':')[0]);
            const horaInicioB = parseInt(b.hora_inicio.split(':')[0]);
            return horaInicioA - horaInicioB;
          });
          setHorariosDisponibles(data);
        })
        .catch(error => {
          console.error('Error al cargar las horas disponibles:', error);
        });
      }
    }
  }, [date, isLoading]);  

  
  useEffect(() => {
    if (correo) {

      fetch(`http://127.0.0.1:8000/api/obtenerMara/${correo}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud a ' + response.url + ': ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          const uniqueMaterias = Array.from(new Set(data.map(materia => materia.nombre_materia)));

          const gruposPorMateria = uniqueMaterias.reduce((grupos, materia) => {
            grupos[materia] = data.filter(item => item.nombre_materia === materia).map(item => item.grupo);
            return grupos;
          }, {});

          const materiasToShow = uniqueMaterias.map(materia => {
            return { nombre_materia: materia };
          });

          setMaterias(materiasToShow);
          setGruposPorMateria(gruposPorMateria);
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    }
  }, [correo]);
  function generarPeriodos(horaInicio, cantidadPeriodos, duracionPeriodo) {
    const periodos = [];
    const fechaInicio = new Date(`01/01/2000 ${horaInicio}`);
    
    for (let i = 0; i < cantidadPeriodos; i++) {
        const nuevaFechaInicio = new Date(fechaInicio);
        const nuevaFechaFin = new Date(nuevaFechaInicio.getTime() + duracionPeriodo * 60000);
        periodos.push({
            horaInicio: nuevaFechaInicio.toTimeString().split(' ')[0], // Formato HH:mm:ss
            horaFin: nuevaFechaFin.toTimeString().split(' ')[0], // Formato HH:mm:ss
        });
        fechaInicio.setMinutes(fechaInicio.getMinutes() + duracionPeriodo);
    }
    
    return periodos;
}

  const handleDateChange = (newDate) => {
    const dayOfWeek = newDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    setDate(newDate);
    setSelectedDay(capitalizedDayOfWeek);
    setShowCalendar(false);
  };
  const handleInputChange = (event) => {
    const materiaSeleccionada = event.target.value;
    setSelecionMateria(materiaSeleccionada);

    if (materiaSeleccionada !== selecionMateria) {
      setSelectedMateria('');
    }
  };
  const handleGrupoChange = (event) => {
    const grupoSeleccionado = event.target.value;
    const isChecked = event.target.checked;
  
    if (isChecked) {
      setSelectedGrupos([...selectedGrupos, grupoSeleccionado]);
    } else {
      const updatedGrupos = selectedGrupos.filter((grupo) => grupo !== grupoSeleccionado);
      setSelectedGrupos(updatedGrupos);
    }
  };
  
  
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleMateriaChange = (event) => {
    setSelectedMateria(event.target.value);
  };
  
  useEffect(() => {
    setSelectedGrupos([]);
  }, [selecionMateria]);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const seleccionmotivo = (event) => {
    setSelectedMotivo(event.target.value);
  };
  const EnviarDatos = () => {
 

    const horaSeleccionadaObj = horariosDisponibles.find(hora => hora.id_hora.toString() === selectedOption.toString());

    if (horaSeleccionadaObj) {
      const horaInicio = horaSeleccionadaObj.hora_inicio;
      const periodosGenerados = generarPeriodos(horaInicio, parseInt(valor), 90); 

      const dataToSend = {
        correo: correo,
        fechaSeleccionada: date.toLocaleDateString(),
        diaSeleccionado: selectedDay,
        materiaSeleccionada: selecionMateria,
        grupo: materia,
        cantidadEstudiantes: cantidad,
        tipoAmbiente: selectedAmbiente,
        cantidadPeriodos: valor,
        periodos: periodosGenerados,
        motivo: selectedMotivo,
        grupos:selectedGrupos
      };

      console.log("Datos a enviar:", dataToSend);

      fetch("http://127.0.0.1:8000/api/registrarSolicitud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      })
      .then(response => {
        if (response.ok) {
          console.log("Registro exitoso");
          navigate('/Usuario/Usu/Reservas');
        } else {
          console.error("Error en el registro");
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
      });
    } else {
      setShowErrorMessage("La hora seleccionada no es válida");
    }
  };

  const isDateFeriado = (date) => {
    return feriados.some(feriado => new Date(new Date(feriado.fecha).setDate(new Date(feriado.fecha).getDate() + 1)).toDateString() === date.toDateString());
  };

  const handleStepBack =() =>{
    window.history.back();
  }
  
  return (
      <div className='contenedorGeneral'>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
      {showSystemClosedModal && (
        <div className="modal-sistema-cerrado">
          <div className="modal-contenido">
            <h2>Sistema Cerrado</h2>
            <p>El sistema está cerrado y no se puede utilizar en este momento.</p>
            <p>Fechas de uso del sistema:</p>
            <p>Inicio: {formDataC.find(conf => conf.configuracion === 'Fecha Inicio')?.valor}</p>
            <p>Fin: {formDataC.find(conf => conf.configuracion === 'Fecha Fin')?.valor}</p>
            <div className='contenedorBtns'>
              <button className='botonatrasSc' onClick={handleStepBack}>Atras</button>
            </div>
          </div>
        </div>
      )}
      {!showSystemClosedModal && (
      <div className="contenedorsito">
        <div>
          <h4 style={{marginLeft: '0px'}}>Selecciona una fecha:</h4>
          <div className='calendar-input-container'>
            <input
              type="text"
              value={date.toLocaleDateString()}
              readOnly
              onClick={toggleCalendar}
              className="inputcalendario"
            />
            <AiOutlineCalendar className="calendar-icon" onClick={toggleCalendar} />
            {showCalendar && (
              <div className='calendar-popup'>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  minDate={new Date()}
                  maxDate = {new Date(
                    new Date(formDataC.find(conf => conf.configuracion === 'Fecha Fin')?.valor)
                      .setDate(
                        new Date(formDataC.find(conf => conf.configuracion === 'Fecha Fin')?.valor)
                          .getDate() + 1
                      )
                  )}
                  tileDisabled={({ date }) => isDateFeriado(date)}
                />
              </div>
            )}
          </div>
        </div>
        <div className='materia'>
          <label htmlFor="menuMateria" className="label">Materia:</label>
          <select className="input" value={selecionMateria} name="nombre_materia" onChange={handleInputChange}>
            <option value="">Seleccione una materia</option>
            {materias.map((materia, index) => (
              <option key={index} value={materia.nombre_materia}>{materia.nombre_materia}</option>
            ))}
          </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
<div className='Grupo'>
  <label htmlFor="menuMotivo" className="label">Grupo:</label>
  <div className="input">
    {gruposPorMateria[selecionMateria] && gruposPorMateria[selecionMateria].map((grupo, index) => (
      <div key={index} className="grupo-checkbox-item">
        <input
          type="checkbox"
          id={grupo}
          value={grupo}
          onChange={handleGrupoChange}
          checked={selectedGrupos.includes(grupo)} // Marcar el checkbox si el grupo está seleccionado
        />
        <label htmlFor={grupo}>{grupo}</label>
      </div>
    ))}
  </div>
  {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
</div>

  <div className='capacidad'>
        <label htmlFor="campo" className="label">Nro de Estudiantes:</label>
    <input
    type="number" 
    id="campo"
    name="campo"
    value={cantidad}
    onChange={(e) => setCantidad(e.target.value)} // Directamente actualizando el estado `cantidad`
    placeholder='Ingrese la capacidad de estudiantes'
    className="input"
  />
          {showErrorMessage && <p className="error">{showErrorMessage}</p>}
        </div>
        <div className='tipo_ambiente'>
          <label htmlFor="campo1" className="label">Tipo de Ambiente:</label>
          <select
            id="campo1"
            name="campo1"
            value={selectedAmbiente}
            onChange={BusquedaAmbiente}
            className="input"
          >
            <option value="">Seleccione un tipo de ambiente</option>
            <option value='Aula Comun'>Aula Comun</option>
            <option value='Laboratorios'>Laboratorios</option>
            <option value='Auditorio'>Auditorio</option>
          </select>
          {showErrorMessage && <p className="error">{showErrorMessage}</p>}
        </div>
        <select 
  id="menuMotivo" 
  value={valor} 
  onChange={(e) => setValor(e.target.value)} 
  className="input"
>   <label htmlFor="menuMotivo" className="label">Seleccione la cantidad de periodos:</label>

  <option value="">Seleccione la cantidad de periodos</option>
  
  {Array.from({ length: cantidadPeriodos }, (_, i) => i + 1).map((periodo) => (
    <option key={periodo} value={periodo}>{periodo}</option>
  ))}
</select>

        
<div className='motivosol'>
  <label htmlFor="menuMotivo" className="label">Motivo:</label>
  <select 
      className="input" 
      name="motivo"
      onChange={seleccionmotivo}
      value={selectedMotivo} 
    >
      <option value="">Seleccione un Motivo</option>
      <option>Examen Primer Parcial</option>
      <option>Examen Segundo Parcial</option>
      <option>Examen Final</option>
      <option>Examen Segunda instancia</option>
      <option>Examen de Mesa</option>
      <option>Reemplazo de  clases</option>
      <option>Elecciones</option>
      <option>Asamblea de estudiantes</option>
      <option>Reunión a charla</option>                
  </select>
  {showErrorMessage && selectedMotivo === '' && <p className="solo-numero">Este campo es obligatorio</p>}
</div>
        <div className='motivosol'>
          <label htmlFor="menuMotivo" className="label">Seleccione la hora inicio:</label>
          <select id="menu" value={selectedOption} onChange={handleSelectChange} className="select">
            <option value="">Seleccione una hora</option>
            {horariosDisponibles.map((hora, index) => (
              <option key={index} value={hora.id_hora}>
                {hora.hora_inicio}
              </option>
            ))}
          </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
        <div className='buttonsoli'>
          <button className="boton-siguiente" onClick={EnviarDatos}>Enviar</button>       
        </div>
      </div>
      )}
    </>
    )} 
    </div>
  );
}
export default Solicitar;