import React, { useState, useEffect } from 'react';
import './ListaSolicitudes.css';
import { Modal, Button, Form } from 'react-bootstrap';

const ListaSolicitudes = () => {
  const [show, setShow] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMotivoChange = (event) => {
    setMotivoRechazo(event.target.value);
  };

  const handleEnviarClick = () => {
    // Aquí enviar el motivo 
    console.log('Motivo de rechazo:', motivoRechazo);
    handleClose();
  };

  return (
    <div className="container" style={{ height: '100vh' }}>
      {}
      <button className="btn btn-eliminar" onClick={handleShow}>
        Rechazar
      </button>
      {}
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rechazar Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="motivoRechazo">
            <Form.Label>Motivo de rechazo:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escribe aquí el motivo"
              value={motivoRechazo}
              onChange={handleMotivoChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEnviarClick}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaSolicitudes;
