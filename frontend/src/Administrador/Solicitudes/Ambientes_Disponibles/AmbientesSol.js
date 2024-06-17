import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './AmbientesSol.css';

const Asignar_ambiente = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [date, setDate] = useState([]);
    const solicitud = location.state;
    const [mostrarAmbientesDisponibles, setMostrarAmbientesDisponibles] = useState(true);
    const [contiguous, setContiguous] = useState([]);
    const [selectedAmbientes, setSelectedAmbientes] = useState([]);
    const [mostrarBotonSugerencias, setMostrarBotonSugerencias] = useState(true);
    const [mostrarBotonAtras, setMostrarBotonAtras] = useState(false);
    const [ubicacionesContiguas, setUbicacionesContiguas] = useState([]);
    const [ambientesContiguosOriginales, setAmbientesContiguosOriginales] = useState([]);

    const obtenerDiaDeFecha = (fecha) => {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        
        const [year, month, day] = fecha.split('-').map(Number);
        const fechaObj = new Date(Date.UTC(year, month - 1, day));
        
        return diasSemana[fechaObj.getUTCDay()];
    };

    const horasString = solicitud.horas;
    const horasSeparadas = horasString.split(', ').map(hora => {
        const [horaInicio, horaFin] = hora.split(' - ');
        return { "hora_inicio": horaInicio, "hora_fin": horaFin };
    });

    useEffect(() => {
        const capacidad = solicitud.numero_estudiantes;
        const fechaSolicitud = solicitud.fecha_solicitud;
        const dia = obtenerDiaDeFecha(fechaSolicitud);
        const horarios = horasSeparadas;
        const horariosJSON = JSON.stringify(horarios);
        console.log(dia);
        console.log(fechaSolicitud);
        fetch(`http://127.0.0.1:8000/api/ambientesDisponibless/${capacidad}/${dia}/${horariosJSON}/${fechaSolicitud}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los ambientes disponibles');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Ambientes disponibles:', data);
                setDate(data);
                setMostrarAmbientesDisponibles(true);
            })
            .catch((error) => {
                console.error('Error al obtener los ambientes disponibles:', error);
            });

    }, []);

    const handleAtrasClick = () => {
        if (mostrarAmbientesDisponibles) {
            navigate('/Usuario/Usu/DetallesSolitud');
        } else {
            setMostrarAmbientesDisponibles(true);
            setMostrarBotonSugerencias(true);
            setContiguous(ambientesContiguosOriginales); // Restaurar ambientes contiguos originales
        }
    };

    const AsignarAula = (ambientes) => {
        const aula = ambientes[0];
        const dataToSend = {
            id_ambiente: aula.id_ambiente,
            id_solicitud: solicitud.id_solicitud,
        };
        console.log(dataToSend);
        fetch('http://127.0.0.1:8000/api/asignarAula', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al asignar el aula');
                }
                return response.json();
            })
            .then(data => {
                console.log('Aula asignada:', data);
                navigate('/Admin/ListaSolicitudes');
            })
            .catch(error => {
                console.error('Error al asignar el aula:', error);
            });
    };

    const handleMostrarContiguos = () => {
        const fecha = solicitud.fecha_solicitud;
        const dia = obtenerDiaDeFecha(fecha);
        const horarios = horasSeparadas;
        const horariosJSON = JSON.stringify(horarios);

        fetch(`http://127.0.0.1:8000/api/ambientesContiguos/${dia}/${horariosJSON}/${fecha}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar ambientes contiguos');
                }
                return response.json();
            })
            .then(data => {
                const ubicaciones = [...new Set(data.map(ambiente => ambiente.edificio))];
                setUbicacionesContiguas(ubicaciones);
                setAmbientesContiguosOriginales(data);
                setContiguous(data);
                setMostrarAmbientesDisponibles(false);
                setMostrarBotonSugerencias(false);
                setMostrarBotonAtras(true);

                console.log("Ambientes contiguos:", data);
            })
            .catch(error => {
                console.error('Error al cargar los ambientes contiguos:', error);
            });
    };

    const rechazarsolicitud = () => {
        const id_solicitud = solicitud.id_solicitud;

        fetch(`http://127.0.0.1:8000/api/rechazarsolicitud/${id_solicitud}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al cambiar el estado de la solicitud');
                }
                console.log('Solicitud actualizada:', response);
                return response.json();
            })
            .then((data) => {
                navigate('/Admin/ListaSolicitudes');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSelectAmbiente = (ambiente) => {
        setSelectedAmbientes(prevSelected => {
            const ubicacionesSeleccionadas = prevSelected.map(a => a.edificio);
            if (ubicacionesSeleccionadas.length > 0 && !ubicacionesSeleccionadas.includes(ambiente.edificio)) {
                alert('Ha seleccionado dos ambientes en diferentes ubicaciones.');
            }
            if (prevSelected.includes(ambiente)) {
                return prevSelected.filter(a => a !== ambiente);
            } else {
                return [...prevSelected, ambiente];
            }
        });
    };

    const handleSelectUbicacion = (ubicacion) => {
        if (ubicacion === "") {
            setContiguous(ambientesContiguosOriginales); 
        } else {
            const ambientesEnUbicacion = ambientesContiguosOriginales.filter(ambiente => ambiente.edificio === ubicacion);
            setContiguous(ambientesEnUbicacion);
        }
    };

    const enviarAmbientesAsignar = () => {
        const dataToSend = selectedAmbientes.map(ambiente => ({
            id_ambiente: ambiente.id_ambiente,
            id_solicitud: solicitud.id_solicitud,
        }));
        console.log("deslmas", dataToSend);
        fetch('http://127.0.0.1:8000/api/asignarAmbientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al asignar los ambientes');
                }
                return response.json();
            })
            .then(data => {
                console.log('Ambientes asignados:', data);
                navigate('/Admin/ListaSolicitudes');
            })
            .catch(error => {
                console.error('Error al asignar los ambientes:', error);
            });
    };

    return (
        <div className="containerr" style={{ minHeight: '78.7vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Ambientes Disponibles:</h2>
            </div>
            <div className='sugerencias'>
                {mostrarBotonSugerencias && (
                    <button className="btn btn-editar mr-2" onClick={handleMostrarContiguos}>Sugerencias</button>
                )}
                <button className="btn btn-editar mr-2" onClick={rechazarsolicitud}>Rechazar</button>
            </div>
            <div className='atras'>
                <button className="btn btn-editar mr-2" onClick={handleAtrasClick}>
                    {mostrarAmbientesDisponibles ? 'Atrás' : 'Ambientes'}
                </button>
                {!mostrarAmbientesDisponibles && (
                    <div className='ubicacion'>
                        <select className="btn btn-editar mr-2" onChange={(e) => handleSelectUbicacion(e.target.value)}>
                            <option value="">Seleccionar Ubicación</option>
                            {ubicacionesContiguas.map((ubicacion, index) => (
                                <option key={index} value={ubicacion}>{ubicacion}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'Right', alignItems: 'center', marginTop: '15px' }}>
            </div>

            {mostrarAmbientesDisponibles ? (
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
                                    <button className="btn btn-editar mr-2" onClick={() => AsignarAula([dato])}>Asignar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <>
                    {contiguous.length > 0 && (
                        <>
                            <table className="table table-hover">
                                <thead className="thead">
                                    <tr>
                                        <th>Aulas</th>
                                        <th>Edificio</th>
                                        <th>Capacidad</th>
                                        <th>Nro. Piso</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contiguous.map((dato) => (
                                        <tr key={dato.id_ambiente} className="fila-lista">
                                            <td>{dato.nombre_ambiente}</td>
                                            <td>{dato.edificio}</td>
                                            <td>{dato.capacidad}</td>
                                            <td>{dato.numero_piso}</td>
                                            <td>
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedAmbientes.includes(dato)}
                                                    onChange={() => handleSelectAmbiente(dato)} 
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="btn btn-editar" onClick={enviarAmbientesAsignar}>Enviar Ambientes Asignar</button>
                        </>
                    )}
                    {contiguous.length === 0 && (
                        <p>No hay ambientes contiguos disponibles en esta ubicación.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Asignar_ambiente;
