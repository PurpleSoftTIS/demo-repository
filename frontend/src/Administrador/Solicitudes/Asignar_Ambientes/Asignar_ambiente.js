import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Asignar_ambiente.css';
const Asignar_ambiente = () => {
  
    const navigate = useNavigate();
    const location = useLocation();
    const [date, setDate] = useState([]);
    const solicitud = location.state;
    const [mostrarAmbientesDisponibles, setMostrarAmbientesDisponibles] = useState(true);
    const [contiguous, setContiguous] = useState([]);
    
    const obtenerDiaDeFecha = (fecha) => {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const fechaObj = new Date(fecha);
        return diasSemana[fechaObj.getDay()];
    };

    const horasString = solicitud.horas;
    const horasSeparadas = horasString.split(', ').map(hora => {
        const [horaInicio, horaFin] = hora.split(' - ');
        return { "hora_inicio": horaInicio, "hora_fin": horaFin };
    });


    useEffect(() => {
        const capacidad = solicitud.numero_estudiantes;
        const fechaSolicitud = solicitud.fecha_solicitud; 
        const dia = 'Lunes';
        const horarios = horasSeparadas;
        const horariosJSON = JSON.stringify(horarios);
        console.log(dia);
        console.log(horariosJSON);

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
        })
        .catch(error => {
            console.error('Error al asignar el aula:', error);
        });
    };
    const handleMostrarContiguos = () => {
        const capacidad = 20;
        const fechaSolicitud = solicitud.fecha_solicitud;
        const dia = obtenerDiaDeFecha(fechaSolicitud);
        const horarios = horasSeparadas;
        const horariosJSON = JSON.stringify(horarios);

        fetch(`http://127.0.0.1:8000/api/ambientesContiguos/${capacidad}/${dia}/${horariosJSON}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar ambientes contiguos');
                }
                return response.json();
            })
            .then(data => {
                setContiguous(data);
                setMostrarAmbientesDisponibles(false);
                console.log("Ambientes contiguos:", data);
            })
            .catch(error => {
                console.error('Error al cargar los ambientes contiguos:', error);
            });
    };

   
    return (
        <div className="container" style={{ minHeight: '78.7vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Ambientes Disponibles:</h2>                
            </div>
            <div className='sugerencias'>
                <button className="btn btn-editar mr-2" onClick={handleMostrarContiguos}>Sugerencias</button>               
            </div>
            <div className='atras'>
            <NavLink className="btn btn-editar mr-2" to='/Usuario/Usu/DetallesSolitud' activeClassName="active">Atras</NavLink>        

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
                ) : 
            
            (
                contiguous.length > 0 ? (
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
                            {contiguous.map((group, index) => (
                                <tr key={index} className="fila-lista">
                                    <td>{group.map(room => room.nombre_ambiente).join(", ")}</td>
                                    <td>{group[0].nombre_edificio}</td>
                                    <td>{group.map(room => room.capacidad).reduce((total, capacity) => total + capacity, 0)}</td>
                                    <td>{group[0].numero_piso}</td>
                                    <td>
                                        <button className="btn btn-editar mr-2" onClick={() => AsignarAula(group)}>Sugerir</button>               
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay ambientes contiguos disponibles.</p>
                )
            )}
        </div>
    );
}

export default Asignar_ambiente