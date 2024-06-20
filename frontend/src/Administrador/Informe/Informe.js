import React, { useEffect, useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Informe = () => {
  const [datos, setDatos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const tablaRef = useRef(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/informe-uso-ambientes')
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          setMensaje('No existe un informe del uso de ambientes');
        } else {
          setDatos(data);
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setMensaje('Error al obtener el informe del uso de ambientes');
      });
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  const handlePrintClick = () => {
    if (datos.length > 0 && tablaRef.current) {
      html2canvas(tablaRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.text('Informe del Uso de Ambientes', 20, 10);
        pdf.text('SIRA-FCYT', 20, 20);
        pdf.addImage(imgData, 'PNG', 20, 30, 170, 0);
        pdf.save('informe_uso_ambientes.pdf');
      });
    }
  };

  return (
    <div className="containerDoss" style={{ minHeight: '78.7vh' }}>
      <div className='encabezados'>
        <div className='contenidoss'>
          <h2 className='titulolistas'>Informe Uso de Ambientes</h2>
          <div className='buscadox'>
            <button className="butn butn-filtro">Filtros</button>
            <button
              className="butn butn-filtro"
              onClick={handlePrintClick}
              disabled={datos.length === 0}
            >
              Imprimir
            </button>
            <button className="butn butn-nuevo" onClick={handleBackClick}>Atrás</button>
          </div>
        </div>
      </div>

      <div className='tabla-contenedor'>
        {mensaje ? (
          <p>{mensaje}</p>
        ) : (
          <table className="table table-hover" ref={tablaRef}>
            <thead className="thead">
              <tr>
                <th>Nombre Ambiente</th>
                <th>Capacidad</th>
                <th>Edificio</th>
                <th>Cantidad de Usos</th>
                <th>Última Reserva</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato, index) => (
                <tr key={index}>
                  <td>{dato.nombre_ambiente}</td>
                  <td>{dato.capacidad}</td>
                  <td>{dato.edificio}</td>
                  <td>{dato.usos}</td>
                  <td>{new Date(dato.ultima_reserva).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Informe;