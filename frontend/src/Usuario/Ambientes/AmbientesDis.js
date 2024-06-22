import React, { useState, useEffect } from 'react';
import './AmbientesDis.css';

export const AmbientesDis = () => {
    const [ambientesDisponibles, setAmbientesDisponibles] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/ambientesTodos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar ambientes disponibles');
                }
                return response.json();
            })
            .then(data => {
                setAmbientesDisponibles(data);
            })
            .catch(error => {
                console.error('Error al cargar los ambientes disponibles:', error);
            });
    }, []);
    const mostrarHorarios = () => {
        setMostrarFormulario(!mostrarFormulario);
      };
    
    return (
        <div className="containerDoss" style={{ minHeight: '78.7vh'}}>
            <div className='encabezados'>
                <h2 className='titulolistas'>Ambientes:</h2>
            </div>
            <div style={{marginBottom: '50px'}}></div>       
            <div className='tabla-contenedor'>
            <table className="table table-hover">
                <thead className="thead">
                    <tr>
                        <th>Nro.</th>
                        <th>Edificio</th>
                        <th>Tipo Ambiente</th>
                        <th>Nombre Ambiente</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {ambientesDisponibles.map((ambiente, index) => (
                        <tr key={index} className="fila-lista" onClick={mostrarHorarios}>
                            <td>{index + 1}</td>
                            <td>{ambiente.edificio}</td>
                            <td>{ambiente.tipo_ambiente}</td>
                            <td>{ambiente.nombre_ambiente}</td>
                            <td>{ambiente.capacidad}</td>
                            <td>{ambiente.estado_ambiente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>           
        </div>
    );
};
