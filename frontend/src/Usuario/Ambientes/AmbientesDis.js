import React, { useState, useEffect } from 'react';
import './AmbientesDis.css';

export const AmbientesDis = () => {
    const [ambientesDisponibles, setAmbientesDisponibles] = useState([]);

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
    
    return (
        <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ height: '4vh' }}></div>
            <h2 style={{ margin: 0, textAlign: 'center' }}>Ambientes:</h2>
            <table className="table table-hover">
                <thead className="thead">
                    <tr>
                        <th>Nro.</th>
                        <th>Edificio</th>
                        <th>Tipo Ambiente</th>
                        <th>Capacidad</th>
                        <th>Fecha</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {ambientesDisponibles.map((ambiente, index) => (
                        <tr key={index} className="fila-lista">
                            <td>{index + 1}</td>
                            <td>{ambiente.edificio}</td>
                            <td>{ambiente.tipo_ambiente}</td>
                            <td>{ambiente.capacidad}</td>
                            <td>{ambiente.nombre_dia}</td>
                            <td>{ambiente.hora_inicio}</td>
                            <td>{ambiente.hora_fin}</td>
                            <td>{ambiente.estado_ambiente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
