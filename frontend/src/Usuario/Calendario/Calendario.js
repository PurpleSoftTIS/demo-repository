import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import './Calendario.css';


dayjs.locale("es");

const Calendario = () => {
  const localizer = dayjsLocalizer(dayjs);
  

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

  const components = {
      event: props => {
          const {data} = props.event;
          console.log(data)
          return(
              <div>
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
  
  return (
      <div style={{
          height: "90vh",
          width: "70vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
      }}>
          <Calendar
              localizer={localizer}
              events={events}
              views={['month', 'week', 'day']}
              toolbar={true}
              defaultDate={new Date()} // Default date should be a Date object
              min={dayjs('2024-12-18T06:45:00').toDate()} // Convert to Date
              max={dayjs('2024-12-18T22:45:00').toDate()} // Convert to Date
              step={30}
              timeslots={3}
              messages={messages}
              components={components}
              formats={{
                  dayHeaderFormat:date =>{
                      console.log(date)
                      return dayjs(date).format("ddd mm YYYY");
                  }
              }}
          />
      </div>
  );
}

export default Calendario;
