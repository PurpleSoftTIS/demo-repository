import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import moment from 'moment';

const CustomToolbar = ({ onNavigate, onView, currentDate }) => {
  const goToToday = () => {
    onNavigate('TODAY');
  };

  const goToMonthView = () => {
    onView('month');
  };

  const goToWeekView = () => {
    onView('week');
  };

  const goToDayView = () => {
    onView('day');
  };

  const goToPreviousMonth = () => {
    onNavigate('PREV');
  };
  
  const goToNextMonth = () => {
    onNavigate('NEXT');
  };

  const formattedDate = moment(currentDate).format('MMMM YYYY');

  return (
    <div className="toolbar-container">
      <div className="month-title">
        <h4>{formattedDate}</h4>
      </div>
      <ButtonGroup vertical className="mb-2">
        <Button className="toolbar-button small-button" onClick={goToToday}>Hoy</Button>
        <Button className="toolbar-button small-button" onClick={goToPreviousMonth}>Atrás</Button>
        <Button className="toolbar-button small-button" onClick={goToNextMonth}>Adelante</Button>
      </ButtonGroup>
      <ButtonGroup vertical>
        <Button className="toolbar-button small-button" onClick={goToMonthView}>Mes</Button>
        <Button className="toolbar-button small-button" onClick={goToWeekView}>Semana</Button>
        <Button className="toolbar-button small-button" onClick={goToDayView}>Día</Button>
      </ButtonGroup>
    </div>
  );
};

export default CustomToolbar;
