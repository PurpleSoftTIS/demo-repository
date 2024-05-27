import React from 'react'
import './Configuraciones.css';

const Configuraciones = () => {
  return (
    <div className="contact-form-container">
      <form className="config-form">
        <b className="configuracion">Configuración de periodos y fechas</b>
        <label>
          Periodos de Aula Común:
          <input type="text" name="periodosAulaComun" />
        </label>
        <label>
          Periodos de Laboratorio:
          <input type="text" name="periodosLaboratorio" />
        </label>
        <label>
          Límite de Fecha Inicio:
          <input type="date" name="limiteFechaInicio" />
        </label>
        <label>
          Límite de Fecha Fin:
          <input type="date" name="limiteFechaFin" />
        </label>
        <label>
          Agregar Feriados:
            <input type="text" name="agregarFeriados" placeholder='Agregar fechas con comas' />
        </label>
        <button type="submit">Aceptar</button>
      </form>
    </div>
  );
};

export default Configuraciones