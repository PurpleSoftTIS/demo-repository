import React, { useState, useEffect } from 'react';
import './Solicitar1.css'
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Solicitar1 = () => {
    const navigate= useNavigate();
    const [date, setDatos] = useState([]); 
    const { state: datosSend } = useLocation();
    const capacidad=datosSend.numeroEstudiantes;
    const diaSeleccionado=datosSend.diaSeleccionado;
    const hora_fin=datosSend.horaFin;
    const hora_inicio=datosSend.horaInicio
    console.log("Hora inicio:", hora_inicio);
    console.log("Hora fin:", hora_fin);
    
   const CompletarReserva = () =>{


      navigate('/Usuario/Usu/Solicitar1');





    }

    useEffect(() => {
  
        if (capacidad) {
          console.log(capacidad);
          console.log(diaSeleccionado);
          fetch(`http://127.0.0.1:8000/api/ambienteDispo/${capacidad}/${diaSeleccionado}/${hora_inicio}/${hora_fin}`)

          .then(response => {
              if (!response.ok) {
                throw new Error('Error al cargar las horas disponibles');
              }
              return response.json();
            })
            .then(data => {
                setDatos(data);
              
            })
            .catch(error => {
              console.error('Error al cargar las horas disponibles:', error);
            });
        }       
      }, []);  
    
  return (
<div className="container" style={{ minHeight: '78.7vh' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Ambientes Disponibles:</h2>
            <div>
              <button className="butn butn-filtro" >Atras</button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'Right', alignItems: 'center', marginTop: '15px' }}>
            <div>
            </div>
          </div>
          <table className="table table-hover">
            <thead className="thead">
              <tr>
                <th>Aula</th>
                <th>Edificio</th>
                <th>Capacidad</th>
                <th>Nro. Piso</th>
                <th>Acciones</th>
              </tr>
            </thead>
         
          <tbody>
        
            {date.map((dato) => (
              <tr key={dato.id_ambiente} className="fila-lista">
                  <td>{dato.nombre_ambiente}</td>
                  <td>{dato.edificio}</td>
                  <td>{dato.capacidad}</td>
                  <td>{dato.numero_piso}</td>             
                <td>
                  <button className="btn btn-editar mr-2" onClick={CompletarReserva}>Reservar</button>               
                  <NavLink className="button-cta1" to='/Usuario/Usu/DetallesSolitud' activeclassname="active">Atras</NavLink>        

                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
    </div>  )
}

export default Solicitar1;