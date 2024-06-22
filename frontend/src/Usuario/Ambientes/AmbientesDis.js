import React, { useState, useEffect } from 'react';
import './AmbientesDis.css';

export const AmbientesDis = () => {
  const [ambientesDisponibles, setAmbientesDisponibles] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem('ambientesDisCurrentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const itemsPerPage = 10;

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

  useEffect(() => {
    sessionStorage.setItem('ambientesDisCurrentPage', currentPage);
  }, [currentPage]);

  const mostrarHorarios = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const buscardor = (e) => {
    setBuscar(e.target.value);
    setCurrentPage(1);  // Reset page to 1 when a search is performed
  };

  let resultado = [];
  if (!buscar) {
    resultado = ambientesDisponibles;
  } else {
    resultado = ambientesDisponibles.filter((ambiente) =>
      ambiente.edificio.toString().toLowerCase().includes(buscar.toLowerCase()) ||
      ambiente.tipo_ambiente.toString().toLowerCase().includes(buscar.toLowerCase()) ||
      ambiente.nombre_ambiente.toString().toLowerCase().includes(buscar.toLowerCase()) ||
      ambiente.capacidad.toString().toLowerCase().includes(buscar.toLowerCase()) ||
      ambiente.estado_ambiente.toString().toLowerCase().includes(buscar.toLowerCase())
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = resultado.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(resultado.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxPagesToShow / 2);
        endPage = currentPage + Math.floor(maxPagesToShow / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`page-button ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="containerDoss" style={{ minHeight: '78.7vh'}}>
      <div className='encabezados'>
        <h2 className='titulolistas'>Ambientes:</h2>
      </div>
      <div className='buscadox'>
        <input value={buscar} onChange={buscardor} type="text" placeholder="Buscar" className='buscador' />
        <button className="butn butn-filtro">Filtros</button>
      </div>
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
            {currentItems.map((ambiente, index) => (
              <tr key={index + (currentPage - 1) * itemsPerPage} className="fila-lista" onClick={mostrarHorarios}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
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
      {totalPages > 1 && (
        <div className='pagination'>
          <button
            className="page-button"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            ««
          </button>
          <button
            className="page-button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          {renderPageNumbers()}
          <button
            className="page-button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
          <button
            className="page-button"
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            »»
          </button>
        </div>
      )}
    </div>
  );
};
