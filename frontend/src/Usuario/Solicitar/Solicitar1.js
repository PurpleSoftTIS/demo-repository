import React, { useState, useEffect } from 'react';
import './Solicitar1.css';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Solicitar1 = () => {
    const navigate = useNavigate();
    const [date, setDatos] = useState([]); 
    const { state: datosSend } = useLocation();
    const capacidad = datosSend.numeroEstudiantes;
    const diaSeleccionado = datosSend.diaSeleccionado;
    const hora_fin = datosSend.horaFin;
    const hora_inicio = datosSend.horaInicio;
    const correo = datosSend.correo;
    console.log("solicitar 1",correo);
    useEffect(() => {
        if (capacidad) {
            fetch(`http://127.0.0.1:8000/api/ambientesDispo/${capacidad}/${diaSeleccionado}/${hora_inicio}/${hora_fin}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cargar ambientes  disponibles');
                    }
                    return response.json();
                })
                .then(data => {
                    setDatos(data);
                })
                .catch(error => {
                    console.error('Error al cargar los ambientes disponibles:', error);
                });
            }       
        }, []);  
    const handleReservar = (aulaSeleccionada) => {
        console.log("datos send",datosSend);
        const datosConAula = { ...datosSend, aulaSeleccionada };
        navigate('/Usuario/Usu/DetallesSol', { state: datosConAula  });
    };
    return (
        <div className="container" style={{ minHeight: '78.7vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Ambientes Disponibles:</h2>                
            </div>
            <div style={{ display: 'flex', justifyContent: 'Right', alignItems: 'center', marginTop: '15px' }}>
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
                                <button className="btn btn-editar mr-2" onClick={() => handleReservar(dato)}>Reservar</button>               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Solicitar1;
  