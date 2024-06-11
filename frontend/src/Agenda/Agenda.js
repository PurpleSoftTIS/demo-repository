import React, { useState, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import CustomToolbar from './CustomToolBar';
import './Agenda.css';
import 'moment/locale/es';

const localizer = momentLocalizer(moment);

const NoToolbar = () => <div></div>;

const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const handleSelect = ({ start, end }) => {
    setStart(start);
    setEnd(end);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    setEvents([...events, { start, end, title }]);
    setTitle('');
    setShowModal(false);
  };

  const calendarRef = useRef(null);

  const handleNavigate = (action) => {
    if (calendarRef.current) {
      calendarRef.current.props.onNavigate(action);
    }
  };

  const handleViewChange = (view) => {
    if (calendarRef.current) {
      calendarRef.current.props.onView(view);
    }
  };

  const handleNavigateWrapper = (date) => {
    setCurrentDate(date);
    handleNavigate(date);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="aside">
          <h3>Opciones</h3>
          <CustomToolbar
            onNavigate={(action) => {
              if (action === 'PREV') {
                setDate(moment(date).subtract(1, 'month').toDate());
              } else if (action === 'NEXT') {
                setDate(moment(date).add(1, 'month').toDate());
              }
            }}
            onView={handleViewChange}
            currentDate={currentDate}
          />
        </Col>
        <Col md={9}>
          <Calendar
            localizer={localizer}
            events={events}
            selectable
            defaultView="month"
            views={['month', 'week', 'day']}
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
            onSelectSlot={handleSelect}
            style={{ height: '100vh' }}
            ref={calendarRef}
            components={{
              toolbar: NoToolbar,
            }}
            onNavigate={setCurrentDate}
          />
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Título del Evento</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={handleSaveEvent}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Agenda;
