import React, { useEffect, useState,useContext,useRef } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import './Calendario.css';
import Ico1 from "../assets/IcoQuit.png";
import "./LoginForm.css";
import { NavLink } from 'react-router-dom';



dayjs.locale("es");

const Calendario = () => {
    const localizer = dayjsLocalizer(dayjs);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month'); 
  const calendarRef = useRef(null);  
  
  const [solicitudes, setSolicitudes] = useState([]);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const [nommbreDocente, setNombreDocente] = useState("");
  const [tipoSolicitud, setTipoSolicitud] = useState("");
  const [materia, setMateria] = useState("");
  const [carrera, setCarrera] = useState("");
  const [motivo, setMotivo] = useState("");
  const [grupo, setGrupo] = useState("");
  const [cantidadEst, setCantidadEst] = useState("");
  const [aula, setAula] = useState("");
  const [edificio, setEdificio] = useState("");
  const [tipoAmbiente, setTipoAmbiente] = useState("");
  const [piso, setPiso] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/obtenerSol', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setSolicitudes(data);
        
        console.log("datos",data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
}, []);

  const events = [
      {
          start: dayjs('2024-06-05T06:45:00').toDate(),
          end: dayjs('2024-06-05T08:15:00').toDate(),
          title: "Reserva 1",
          data: {
              TipoSolicitud: 'Invididual',
              NombreDocente: 'Corina',
              EstadoSolicitud: 'Aceptado',
              Materia: 'Introduccion a la programacion',
              Grupo: 2,
              carrera: '',

          }
      },
      {
        start: dayjs('2024-06-05T06:45:00').toDate(),
        end: dayjs('2024-06-05T08:15:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
    {
        start: dayjs('2024-06-05T06:45:00').toDate(),
        end: dayjs('2024-06-05T08:15:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
    {
        start: dayjs('2024-06-05T06:45:00').toDate(),
        end: dayjs('2024-06-05T08:15:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
    {
        start: dayjs('2024-06-05T06:45:00').toDate(),
        end: dayjs('2024-06-05T08:15:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
    {
        start: dayjs('2024-06-05T06:45:00').toDate(),
        end: dayjs('2024-06-05T08:15:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
    {
        start: dayjs('2024-06-05T06:45:00').toDate(),
        end: dayjs('2024-06-05T08:15:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
    {
        start: dayjs('2024-06-05T06:45:00').toDate(),
        end: dayjs('2024-06-05T08:15:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
    {
        start: dayjs('2024-06-05T06:45:00').toDate(),
        end: dayjs('2024-06-05T08:15:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
    {
        start: dayjs('2024-06-05T115:45:00').toDate(),
        end: dayjs('2024-06-05T17:15:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
    {
        start: dayjs('2024-06-05T20:15:00').toDate(),
        end: dayjs('2024-06-05T21:45:00').toDate(),
        title: "Reserva 1",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,
        }
    },
      {
          start: dayjs('2024-06-06T15:45:00').toDate(),
          end: dayjs('2024-06-06T17:15:00').toDate(),
          title: "Reserva 2",
          data: {
              TipoSolicitud: 'Invididual',
              NombreDocente: 'Corina',
              EstadoSolicitud: 'Aceptado',
              Materia: 'Introduccion a la programacion',
              Grupo: 2,

          }
      },
      {
        start: dayjs('2024-06-05T8:15:00').toDate(),
        end: dayjs('2024-06-0509:45:00').toDate(),
        title: "Reserva 2",
        data: {
            TipoSolicitud: 'Invididual',
            NombreDocente: 'Corina',
            EstadoSolicitud: 'Aceptado',
            Materia: 'Introduccion a la programacion',
            Grupo: 2,

        }
    },
      {
          start: dayjs('2024-06-18T18:45:00').toDate(),
          end: dayjs('2024-06-18T20:15:00').toDate(),
          title: "Reserva 3",
          data: {
              TipoSolicitud: 'Invididual',
              NombreDocente: 'Corina',
              EstadoSolicitud: 'Aceptado',
              Materia: 'Introduccion a la programacion',
              Grupo: 2,
          }
      }
  ];
  const showDetails = () => {
    setShowDropdown2(!showDropdown2);
  };
  const cargaDocente = () => {
        setNombreDocente(solicitudes.nombre);
        setAula(solicitudes.nombre);
        setCantidadEst(solicitudes.nombre);
        setCarrera(solicitudes.nombre);
        setEdificio(solicitudes.nombre);
        setGrupo(solicitudes.nombre);
        setMateria(solicitudes.nombre);
        setMotivo(solicitudes.nombre);
        setPiso(solicitudes.nombre);

  };
  
  const components = {

      event: props => {
          const {data} = props.event;
          console.log(data)
          return(
              <div onClick={showDetails}>
                {props.title}
              </div>
          )
      } 
      
  };
  const messages = {
      date: 'Fecha',
      time: 'Hora',
      event: 'Evento',
      allDay: 'Todo el día',
      week: 'Semana',
      work_week: 'Semana laboral',
      day: 'Día',
      month: 'Mes',
      previous: 'Anterior',
      next: 'Siguiente',
      yesterday: 'Ayer',
      tomorrow: 'Mañana',
      today: 'Hoy',
      agenda: 'Agenda',
      noEventsInRange: 'No hay eventos en este rango',
      showMore: total => `+ Ver más (${total})`,
  };
  const handleNavigate = date => {
    setCurrentDate(date);
  };

  const handleViewChange = view => {
    setCurrentView(view);
    calendarRef.current.props.onView(view);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    calendarRef.current.props.onNavigate(today);
  };

  const handlePrevious = () => {
    const newDate = dayjs(currentDate).subtract(1, currentView === 'month' ? 'month' : currentView === 'week' ? 'week' : 'day').toDate();
    setCurrentDate(newDate);
    calendarRef.current.props.onNavigate(newDate);
  };

  const handleNext = () => {
    const newDate = dayjs(currentDate).add(1, currentView === 'month' ? 'month' : currentView === 'week' ? 'week' : 'day').toDate();
    setCurrentDate(newDate);
    calendarRef.current.props.onNavigate(newDate);
  };
 
  return (
    <div className="container">
    <aside className="sidebar">
        <h2>{dayjs(currentDate).format('MMMM YYYY')}</h2>
        <button onClick={handleToday}>Hoy</button>
        <button onClick={handlePrevious}>Anterior</button>
        <button onClick={handleNext}>Siguiente</button>
        <button onClick={() => handleViewChange('month')}>Mes</button>
        <button onClick={() => handleViewChange('week')}>Semana</button>
        <button onClick={() => handleViewChange('day')}>Día</button>
    </aside>
    <div className="calendar-container">
        <Calendar
            ref={calendarRef}
            localizer={localizer}
            events={events}
            views={['month', 'week', 'day']}
            toolbar={false} // Ocultar el toolbar del calendario
            defaultDate={new Date()}
            min={dayjs('2024-12-18T06:45:00').toDate()}
            max={dayjs('2024-12-18T22:45:00').toDate()}
            step={30}
            timeslots={3}
            messages={messages}
            components={components}
            formats={{
                dayHeaderFormat: date => {
                    console.log(date);
                    return dayjs(date).format("ddd mm YYYY");
                }
            }}
            onNavigate={handleNavigate}
            view={currentView}  
            onView={setCurrentView}  
        />
    </div>
    {showDropdown2 && (
                      <div className="contenidoTres">
                        <img className="iconos2" src={Ico1} alt="logo" width="35px" height="35px" onClick={showDetails}/> 
                        <label  className='Titulos' value={nommbreDocente}>
                            Corina Justina Flores Villarroel</label>
                        <br></br>
                        <label className='Dato'value={tipoSolicitud}>
                            Tipo solicitud: Invididual</label>
                        <br></br>
                        <label className='Dato'value={materia}>
                            Materia: Metodos y tecnicas de programacion</label>
                        <br></br>
                        <label className='Dato' value={carrera}>
                            Carrera: Ingeniria Informatica</label>
                        <br></br>
                        <label className='Dato'value={motivo}>
                             Motivo: Examen Primer Parcial</label>
                        <br></br>
                        <label className='Dato'value={grupo}>
                            Grupo: 3</label>
                        <br></br>
                        <label className='Dato'value={cantidadEst}>
                            Cantidad de estudiandes: 200</label>
                        <br></br>
                        <label className='Dato' value={aula}>
                            Aula: 690A</label>
                        <br></br>
                        <label className='Dato'value={edificio}>
                            Edificio: Edificio Academico 2</label>
                        <br></br>
                        <label className='Dato'value={piso}>
                            Piso: Edificio Academico 2</label>
                        <br></br>
                        <label className='Dato'value={tipoAmbiente}>
                            Tipo aula: Aula Comun</label>
                        </div>              
            
            )} 
        <NavLink className="nav-link pricing" to='/' activeclassname="active">Atras</NavLink>        

</div>
  );
}

export default Calendario;
