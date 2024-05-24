
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ListaSolicitudes.css';

const ListaSolicitudesUr = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [show, setShow] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [fecha, setFecha] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/SolicitudUrgencias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Filtrar las solicitudes según los motivos especificados
        const solicitudesFiltradas = data.filter(
          (solicitud) =>
            solicitud.motivo === 'Examen' ||
            solicitud.motivo === 'Examen de mesa' ||
            solicitud.motivo === 'Segunda instancia'
        );
        setSolicitudes(solicitudesFiltradas);
        console.log(solicitudesFiltradas);
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  const filtrarSolicitudes = Array.isArray(solicitudes)
    ? solicitudes.filter(
        (solicitud) =>
          solicitud.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          solicitud.nombre_materia.toLowerCase().includes(busqueda.toLowerCase()) ||
          solicitud.tipo_solicitud.toLowerCase().includes(busqueda.toLowerCase())
      )
    : [];

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div style={{ height: '4vh' }}></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>Solicitudes Urgentes:</h2>
        <div>
          <input
            type="text"
            placeholder="Buscar Reserva"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="butn butn-filtro" onClick={handleShow}>Filtros</button>
        </div>
      </div>
      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro.</th>
            <th>Docente</th>
            <th>Materia</th>
            <th>Capacidad</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Tipo Solicitud</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {solicitudes.map((solicitud) => (
           <tr key={solicitud.id_solicitud}>
              <td>{solicitud.id_solicitud}</td>
              <td>{solicitud.nombre}</td>
              <td>{solicitud.nombre_materia}</td>
              <td>{solicitud.numero_estudiantes}</td>
              <td>{solicitud.nombre_ambiente}</td>
              <td>{solicitud.grupo}</td>
              <td>{solicitud.tipo_solicitud}</td>
              <td>{solicitud.fecha_solicitud}</td>
              <td>{solicitud.hora_inicio}</td>
              <td>
                <button className="btn btn-editar mr-2">Aceptar</button>
                <button className="btn btn-eliminar">Rechazar</button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control 
        as="select" 
        value={motivo} 
        onChange={(e) => setMotivo(e.target.value)}
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        <option value="">Selecciona un motivo</option>
        <option value="motivo1">Examen de Mesa</option>
        <option value="motivo2">Examen Primer Parcial</option>
        <option value="motivo3">Examen Segundo Parcial</option>
        <option value="motivo4">Examen Final</option>
        <option value="motivo5">Examen Segunda Instancia</option>
        <option value="motivo6">Elecciones</option>
        <option value="motivo7">Congreso</option>


        {/* Agrega aquí más opciones si es necesario */}
      </Form.Control>
      
      <Form.Control 
        type="date" 
        value={fecha} 
        onChange={(e) => setFecha(e.target.value)}
        style={{ backgroundColor: 'white', color: 'black' }}
      />
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Aplicar Filtros
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaSolicitudesUr;
