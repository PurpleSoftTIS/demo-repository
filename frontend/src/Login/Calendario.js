import React, { useEffect, useState, useRef } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import './Calendario.css';
import Ico1 from "../assets/IcoQuitBase.png";
import { useNavigate } from 'react-router-dom';

dayjs.locale("es");

const Calendario = () => {
    const navigate = useNavigate();
    const localizer = dayjsLocalizer(dayjs);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month'); 
    const calendarRef = useRef(null);  
    const [showCalendar, setShowCalendar] = useState(false);
    const [solicitudes, setSolicitudes] = useState([]);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showSmallCalendar, setShowSmallCalendar] = useState(false);
    const [nombreDocente, setNombreDocente] = useState("");
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
        fetch('http://127.0.0.1:8000/api/obtenerTodasSolicitudes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setSolicitudes(data);
            console.log("datos", data);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
    }, []);

    const transformSolicitudesToEvents = (solicitudes) => {
        const events = [];

        solicitudes.forEach(solicitud => {
            const horas = solicitud.horas.split(', ');
            const startTime = horas[0].split(' - ')[0];
            const endTime = horas[horas.length - 1].split(' - ')[1];
            const startDate = dayjs(`${solicitud.fecha_solicitud}T${startTime}`).toDate();
            const endDate = dayjs(`${solicitud.fecha_solicitud}T${endTime}`).toDate();

            events.push({
                start: startDate,
                end: endDate,
                title: `Materia: ${solicitud.nombre_materia}\nGrupo: ${solicitud.grupo}`,
                data: {
                    NombreDocente: solicitud.nombre,
                    TipoSolicitud: solicitud.tipo_solicitud,
                    Materia: solicitud.nombre_materia,
                    Carrera: solicitud.nombre_carrera,
                    Motivo: solicitud.motivo,
                    Grupo: solicitud.grupo,
                    Cantidad_de_Estudiantes: solicitud.numero_estudiantes,
                    Aula: solicitud.aula,
                    Edificio: solicitud.edificio,
                    Tipo_Ambiente: solicitud.tipo_ambiente,
                    Piso: solicitud.piso,
                    EstadoSolicitud: solicitud.estado_solicitud,
                }//76988846
            });
        });

        return events;
    };

    const events = transformSolicitudesToEvents(solicitudes);

    const showDetails = (data) => {
        setShowDropdown2(!showDropdown2);
        setNombreDocente(data.NombreDocente);
        setTipoSolicitud(data.TipoSolicitud);
        setMateria(data.Materia);
        setCarrera(data.Carrera);
        setMotivo(data.Motivo);
        setGrupo(data.Grupo);
        setCantidadEst(data.Cantidad_de_Estudiantes);
        setAula(data.Aula);
        setEdificio(data.Edificio);
        setTipoAmbiente(data.Tipo_Ambiente);
        setPiso(data.Piso);
    };

    const components = {
        event: props => {
            const { data } = props.event;
            return (
                <div onClick={() => showDetails(data)}>
                    {props.title}
                </div>
            );
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
        setShowSmallCalendar(view === 'week' || view === 'day');
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
    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
    const reloadPage = () => {
        window.location.reload();
    };

    const backPage = () => {
        navigate('/Admin/Registro/AmbientesActualizar');             
    };
    
    return (
        <div className='Contenedor'>
            <h1 className='Titulo'>
                Calendario
            </h1>
            <div className="container">
                <aside className="sidebar">
                    <h2>{capitalizeFirstLetter(dayjs(currentDate).format('dddd DD MMMM YYYY'))}</h2>
                    <button className='botones' onClick={handleToday}>Hoy</button>
                    <button className='botones' onClick={handlePrevious}>Anterior</button>
                    <button className='botones' onClick={handleNext}>Siguiente</button>
                    <button className='botones' onClick={() => handleViewChange('month')}>Mes</button>
                    <button className='botones' onClick={() => handleViewChange('week')}>Semana</button>
                    <button className='botones' onClick={() => handleViewChange('day')}>Día</button>
                    <button className="botones3" onClick={backPage}>Atras</button>       
                    <button className="botones2" onClick={reloadPage}>Recargar</button>
                    {showCalendar && (
                        <div className='calendar-popup'>
                            <Calendar
                            minDate={new Date()}
                            maxDate={new Date(2026, 11, 31)}
                            
                            />
                        </div>
                    )}
                    {showSmallCalendar && (
                        <div className="small-calendar-container">
                            <Calendar
                                localizer={localizer}
                                events={events}
                                views={['month']}
                                defaultView="month"
                                toolbar={false}
                                style={{ height: 200, width: 200 }} // Ajusta el tamaño según sea necesario
                            />
                        </div>
                    )}
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
                            dayHeaderFormat: date => dayjs(date).format("ddd MM YYYY")
                        }}
                        onNavigate={handleNavigate}
                        view={currentView}  
                        onView={setCurrentView}  
                    />
                </div>
                {showDropdown2 && (
                    <div className="contenidoTres">
                        <div className='parteSuperior'>
                            <h3 className='tituloIni'>Detalles de la solicitud</h3>
                            <img className="iconos3" src={Ico1} alt="logo" width="35px" height="35px" onClick={() => setShowDropdown2(false)}/> 
                        </div>
                        <h4 className='nombreTitulo'>Docente Solicitante:</h4>
                        <label className='Dato'>{nombreDocente}</label>
                        <h4 className='nombreTitulo'>Tipo solicitud:</h4>
                        <label className='Dato'>{tipoSolicitud}</label>
                        <h4 className='nombreTitulo'>Materia:</h4>
                        <label className='Dato'>{materia}</label>
                        <h4 className='nombreTitulo'>Carrera:</h4>
                        <label className='Dato'>{carrera}</label>
                        <h4 className='nombreTitulo'>Motivo:</h4>
                        <label className='Dato'>{motivo}</label>
                        <h4 className='nombreTitulo'>Grupo:</h4>
                        <label className='Dato'>{grupo}</label>
                        <h4 className='nombreTitulo'>Cantidad de estudiantes:</h4>
                        <label className='Dato'> {cantidadEst}</label>
                        <h4 className='nombreTitulo'>Aula:</h4>
                        <label className='Dato'>{aula}</label>
                        <h4 className='nombreTitulo'>Edificio:</h4>
                        <label className='Dato'>{edificio}</label>
                        <h4 className='nombreTitulo'>Piso:</h4>
                        <label className='Dato'>{piso}</label>
                        <h4 className='nombreTitulo'>Tipo aula:</h4>
                        <label className='Dato'>{tipoAmbiente}</label>
                    </div>
                )} 
            </div>
        </div>
    );
}

export default Calendario;
