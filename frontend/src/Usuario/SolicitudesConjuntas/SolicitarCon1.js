import React, { useState, useEffect,useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';
import "./SolicitarCon1.css";

const SolicitarCon1 = () => {
  const navigate = useNavigate();
  const { emailC } = useContext(UserContext);
  const correo = emailC;
  const [cantidad, setCantidad] = useState('');
  const [cantidadPeriodos,setCantidadPeriodos] = useState(0); 
  const [selecionMateria, setSelecionMateria] = useState('');
  const [valor, setValor] = useState('');
  const [materia, setmateria] = useState('');
  const [date, setDate] = useState(new Date());
  const [materias, setMaterias] = useState([]); 
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [formData, setFormData] = useState([]); 
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState(''); 
  const [selectedOption, setSelectedOption] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const [selectedMateria, setSelectedMateria] = useState(''); 
  const [tipoAmbientes, setTipoAmbientes] = useState([]); 
  const [selectedAmbiente, setSelectedAmbiente] = useState('');
  const [selectedMotivo, setSelectedMotivo] = useState(''); 
  const [gruposPorMateria, setGruposPorMateria] = useState({}); 
  const [selectedGrupos, setSelectedGrupos] = useState([]); 
  const [docentesPorMateria, setDocentesPorMateria] = useState([]);

  const BusquedaAmbiente = (event) => {
    const selectedAmbiente = event.target.value;
    setSelectedAmbiente(selectedAmbiente); 
    const ambienteSeleccionado = tipoAmbientes.find(ambiente => ambiente["configuracion"] === selectedAmbiente);
    if (ambienteSeleccionado) {
      console.log(ambienteSeleccionado);
      setCantidadPeriodos(ambienteSeleccionado.valor);
    }
  };
  console.log(cantidadPeriodos);
  const codificarPunto = (cadena) => {
    if (typeof cadena === 'string') {
      return cadena.replace(/\./g, '%');
    } else {
      
      return ''; 
    }
  };
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
          data.sort((a, b) => {
            const horaInicioA = parseInt(a.hora_inicio.split(':')[0]);
            const horaInicioB = parseInt(b.hora_inicio.split(':')[0]);
            return horaInicioA - horaInicioB;
          });
          setHorariosDisponibles(data);
          console.log(data);
        })
        .catch(error => {
          console.error('Error al cargar las horas disponibles:', error);
        });
    }
  }, [date]);  

  
  useEffect(() => {
    if (correo) {
      const correoCodificado = codificarPunto(correo);

      fetch(`http://127.0.0.1:8000/api/obtenerMara/${correoCodificado}`)
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




  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/configuraciones')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los tipos de ambientes');
        }
        return response.json();
      })
      .then(data => {
        setTipoAmbientes(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error al obtener los tipos de ambientes:', error);
      });
  }, []);
  
  const handleDateChange = (newDate) => {
    const dayOfWeek = newDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

    setDate(newDate);
    setSelectedDay(capitalizedDayOfWeek);
    setShowCalendar(false);
  };
  const materiadocente = (event) => {
    const materiaSeleccionada = event.target.value;
    setSelecionMateria(materiaSeleccionada);

    if (materiaSeleccionada !== selecionMateria) {
      setSelectedMateria('');
    }
    fetch(`http://127.0.0.1:8000/api/docentesPorMateria/${materiaSeleccionada}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los docentes por materia');
      }
      return response.json();
    })
    .then(data => {
      const docentesUnicos = {};
      data.forEach(item => {
        const { nombre, apellido_paterno, apellido_materno } = item.docente;
        const nombreCompleto = `${nombre} ${apellido_paterno} ${apellido_materno}`;
  
        const grupoMateria = item.materia.grupo;
        const docenteExistente = Object.values(docentesUnicos).find(docente => {
          return docente.nombreCompleto === nombreCompleto;
        });
  
        if (docenteExistente) {
          docenteExistente.grupos.push(grupoMateria);
        } else {
          const nuevoDocente = {
            nombreCompleto: nombreCompleto,
            grupos: [grupoMateria]
          };
          docentesUnicos[nombreCompleto] = nuevoDocente;
        }
      });
  
      const docentesArray = Object.values(docentesUnicos);
  
      docentesArray.sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
  
      setDocentesPorMateria(docentesArray);
      console.log(docentesArray);
    })
    .catch(error => {
      console.error('Error al obtener los docentes por materia:', error);
    });
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
  const handleNextStep = () => {
    const tipoNumero = /^\d+$/;
    const dataToSend = {
       
    };

    if (!selecionMateria || !selectedMateria) {
      setErrorIncompleto("Por favor, complete todos los campos del formulario");
      return;
    } else {
      setShowErrorMessage("");
      if (!tipoNumero.test(selecionMateria)) {
        setShowErrorMessage("Ingrese solo numeros");
      } else {
        setShowErrorMessage("");
        if (!selectedOption) {
          setShowErrorMessage("Seleccione una hora");
          return;
        }
        const horaSeleccionadaObj = horariosDisponibles.find(hora => hora.id_hora.toString() === selectedOption.toString());

        if (horaSeleccionadaObj) {
          const horaInicio = horaSeleccionadaObj.hora_inicio;
          const horaFin = horaSeleccionadaObj.hora_fin;
          dataToSend.horaInicio = horaInicio;
          dataToSend.horaFin = horaFin;
          console.log(dataToSend);
          navigate('/Usuario/Usu/Solicitar1', { state: dataToSend });
        } else {
          setShowErrorMessage("La hora seleccionada no es válida");
        }
      }
    }
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
      if (!selectedGrupos.length) {
        setShowErrorMessage("Por favor, seleccione al menos un grupo");
        return;
      }
    
      const docentesSeleccionados = [];
      docentesPorMateria.forEach((docente, index) => {
        const gruposSeleccionadosDocente = docente.grupos.filter(grupo => selectedGrupos.includes(grupo));
        if (gruposSeleccionadosDocente.length > 0) {
          docentesSeleccionados.push({
            nombre: docente.nombreCompleto,
            grupos: gruposSeleccionadosDocente
          });
        }
      });
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
        grupos:selectedGrupos,
        docentesSeleccionados: docentesSeleccionados


      };

      console.log("Datos a enviar:", dataToSend);

      fetch("http://127.0.0.1:8000/api/registrarSolicitudConjunta", {
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
  
  return (
    <div className='contenedorGeneral' style={{minHeight: '100vh'}}>
      <div className="contenedorsito">
        <div>
          <h4>Selecciona una fecha:</h4>
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
                  maxDate={new Date(2026, 11, 31)}
                  
                />
              </div>
            )}
          </div>
        </div>
        <div className='materia'>
          <label htmlFor="menuMateria" className="label">Materia:</label>
          <select className="input" value={selecionMateria} name="nombre_materia" onChange={materiadocente}>
            <option value="">Seleccione una materia</option>
            {materias.map((materia, index) => (
              <option key={index} value={materia.nombre_materia}>{materia.nombre_materia}</option>
            ))}
          </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
       <div className="input docente-container">
  {docentesPorMateria.map((docente, index) => (
    <label key={index} className="docente-wrapper">
      <label htmlFor={`docente-${index}`} className="docente-label">
        {docente.nombre}
      </label>
      <label className="grupos">
        grupos
      </label>
      {docente.grupos.map((grupo, idx) => (
        <label key={idx} htmlFor={`grupo-${index}-${grupo}`} className="grupo-label">
          <input
            type="checkbox"
            id={`grupo-${index}-${grupo}`}
            value={grupo}
            onChange={handleGrupoChange}
            checked={selectedGrupos.includes(grupo)}
          />
          {grupo}
        </label>
      ))}
    </label>
  ))}
</div>


  <div className='capacidad'>
        <label htmlFor="campo" className="label">Nro de Estudiantes:</label>
    <input
    type="number" 
    id="campo"
    name="campo"
    value={cantidad}
    onChange={(e) => setCantidad(e.target.value)}
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
            {tipoAmbientes.map((ambiente, index) => (
              <option key={index} value={ambiente["configuracion"]}>
                {ambiente["configuracion"]}
              </option>
            ))}
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

        
<div className='motivo'>
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
      <option>Reemplazo de  clases</option>
      <option>Elecciones</option>
      <option>Asamblea de estudiantes</option>
      <option>Reunión a charla</option>                
  </select>
  {showErrorMessage && selectedMotivo === '' && <p className="solo-numero">Este campo es obligatorio</p>}
</div>
        <div className='motivo'>
          <label htmlFor="menuMotivo" className="label">Seleccione la hora inicio:</label>
          <select id="menu" value={selectedOption} onChange={handleSelectChange} className="select">
            {horariosDisponibles.map((hora, index) => (
              <option key={index} value={hora.id_hora}>
                {hora.hora_inicio}
              </option>
            ))}
          </select>
          {showErrorMessage && selectedMateria === '' && <p className="solo-numero">Este campo es obligatorio</p>}
        </div>
       
        <button className="boton-siguiente" onClick={EnviarDatos}>Enviar</button>       
      </div>
   
    </div>
    
  );
}

export default SolicitarCon1;
