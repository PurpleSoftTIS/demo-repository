import React, { useState, useEffect } from 'react';
import './ListaAulas.css';
import { FaPlus, FaFileCsv, FaTrash, FaChartBar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Ico1 from '../../assets/IcoGood.png';
import Ico2 from '../../assets/IcoState.png';
import { read, utils } from 'xlsx';

function ListaAulas() {
  const [Advertencia, setAdvertencia] = useState(false);
  const [Advertencia2, setAdvertencia2] = useState(false);
  const [aulas, setAulas] = useState([]);
  const [importar, setImportar] = useState(false);
  const [ambienteToDelete, setAmbienteToDelete] = useState(null); 
  const [buscar, setBuscar] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem('listaAulasCurrentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const itemsPerPage = 10;

  const importaciones = () => {
    setImportar(!importar);
  };  

  const cancelarBorrar = () => {
    setAdvertencia(false); 
  };

  const confirmacionEliminacionTodo = () => {
    setAdvertencia(true); 
  };

  const borrar = (id_ambiente) => {
    setAmbienteToDelete(id_ambiente);
    setAdvertencia2(true); 
  }

  const cancelar = () => {
    setAmbienteToDelete(null);
    setAdvertencia2(false); 
  };

  const borrarTodos = () => {
    fetch(`http://127.0.0.1:8000/api/borrarTodo`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
     if(response.ok){
      window.location.reload();
    }
     });
  };

  const borrarAmbiente = () => {
    fetch(`http://127.0.0.1:8000/api/borrar/${ambienteToDelete}`, {  
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error('No se pudo actualizar el ambiente.');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleArchivoSeleccionado = async (event) => {
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const wb = read(event.target.result, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = utils.sheet_to_json(ws, { header: 1 });
  
        try {
          const response = await fetch('http://127.0.0.1:8000/api/CargaAmbientes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          if (response.ok) {
            console.log('Datos enviados al servidor exitosamente.');
            navigate("/Admin/Mensaje/CargaMasiva");
          } else {
            navigate("/Admin/Mensaje/ErrorCargaMasiva");
            throw new Error('Error al enviar datos al servidor.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      reader.readAsBinaryString(file);
    }
  };

  const handleArchivoDiasHorasSeleccionado = async (event) => {
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const wb = read(event.target.result, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = utils.sheet_to_json(ws, { header: 1 });
  
        try {
          const response = await fetch('http://127.0.0.1:8000/api/CargaDiasHoras', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          if (response.ok) {
            console.log('Datos enviados al servidor exitosamente.');
            navigate("/Admin/Mensaje/CargaMasiva");
          } else {
            navigate("/Admin/Mensaje/ErrorCargaMasiva");
            throw new Error('Error al enviar datos al servidor.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      reader.readAsBinaryString(file);
    }
  };

  const handleEditar = (id_ambiente) => {
    fetch(`http://127.0.0.1:8000/api/ambiente/${id_ambiente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el ambiente');
        }
        console.log('Ambiente actualizado:', response);
        return response.json();
      })
      .then((data) => {
        navigate('/Admin/Registro/AmbientesActualizar', {
          state: { datosAmbientes: data },
        });
        console.log('Datos del ambiente actualizado:', data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/listaAmbiente')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los ambientes');
        }
        return response.json();
      })
      .then((data) => {
        setAulas(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem('listaAulasCurrentPage', currentPage);
  }, [currentPage]);

  const buscardor = (e) => {
    setBuscar(e.target.value);
    setCurrentPage(1);  // Reset page to 1 when a search is performed
  }

  let resultado = [];
  if (!buscar) {
    resultado = aulas;
  } else {
    resultado = aulas.filter((aula) =>
      aula.id_ambiente.toString().toLowerCase().includes(buscar.toLowerCase()) ||
      aula.nombre_ambiente.toString().toLowerCase().includes(buscar.toLowerCase()) ||
      aula.edificio.toString().toLowerCase().includes(buscar.toLowerCase()) ||
      aula.tipo_ambiente.toString().toLowerCase().includes(buscar.toLowerCase()) ||
      aula.numero_piso.toString().toLowerCase().includes(buscar.toLowerCase()) ||
      aula.capacidad.toString().toLowerCase().includes(buscar.toLowerCase())
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
    <div className="containerDoss" style={{ minHeight: '78.7vh' }}>
      <div className='encabezados'>
        <div className='contenidoss'>
          <h2 className='titulolistas'>Ambientes Registrados:</h2>
          <div className='buscadox'>
            <input value={buscar} onChange={buscardor} type="text" placeholder="Buscar" className='buscador' />
            <button className="butn butn-filtro">Filtros</button>
          </div>
          <div className='buttonses'>
            <NavLink to="/Admin/Registro/Ambientes" className="butn butn-nuevo">
              Nuevo Ambiente<FaPlus className="icon" />
            </NavLink>
            <NavLink to="/Admin/Informe" className="butn butn-nuevo">
              Generar Informe<FaChartBar className="icon" />
            </NavLink>
          </div>
          <div className='buttonses'>
          <button className="butn butn-csv" onClickCapture={importaciones}>
            Importar Datos<FaFileCsv className="icon" />
          </button>
          {importar && (
            <div className='importaciones'>
              <label htmlFor="inputGroupFile" className="butn butn-csv" style={{ marginTop: '7px' }}>
                Importar Ambientes<FaFileCsv className="icon" />
              </label>
              <input
                id="inputGroupFile"
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={handleArchivoSeleccionado} // Asociado a la importación de ambientes
              />
              <label htmlFor="inputGroupFile2" className="butn butn-csv" style={{ marginTop: '7px' }}>
                Importar Dias y Horas<FaFileCsv className="icon" />
              </label>
              <input
                id="inputGroupFile2"
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={handleArchivoDiasHorasSeleccionado} // Asociado a la importación de días y horas
              />
            </div>
          )}
          <button className="butn butn-borrar" onClick={confirmacionEliminacionTodo}>
            Borrar Todo<FaTrash className="icon" />
          </button>
        </div>
        </div>
      </div>
      <div className='tabla-contenedor'>
        <table className="table table-hover">
          <thead className="thead">
            <tr>
              <th>Nro Aula</th>
              <th>Aula</th>
              <th>Edificio</th>
              <th>Tipo Ambiente</th>
              <th>Nro Piso</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((aula) => (
              <tr key={aula.id_ambiente} className="fila-lista">
                <td>{aula.id_ambiente}</td>
                <td>{aula.nombre_ambiente}</td>
                <td>{aula.edificio}</td>
                <td>{aula.tipo_ambiente}</td>
                <td>{aula.numero_piso}</td>
                <td>{aula.capacidad}</td>
                <td className='iconos'>
                  {aula.estado_ambiente === 'activo' ? (
                    <img src={Ico1} alt="Activo" width="60px" height="60px" />
                  ) : (
                    <img src={Ico2} alt="Inactivo" width="60px" height="60px" />
                  )}
                </td>
                <td>
                  <button className="btn btn-editar" onClick={() => handleEditar(aula.id_ambiente)}>
                    Editar
                  </button>
                  <button className="btn btn-eliminar" onClick={() => { borrar(aula.id_ambiente); }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {Advertencia && (
          <div className="overlay">
            <div className="Advertencia">
              <div className="text">
                <h3 className="til1">Advertencia</h3>
                <p className="til2">¿Estás seguro de eliminar todos los registros?</p>
              </div>
              <div className="botonesx">
                <button className="conf" onClick={borrarTodos}>Sí</button>
                <button className="ref" onClick={cancelarBorrar}>No</button>
              </div>
            </div>
          </div>
        )}
        {Advertencia2 && (
          <div className="overlay">
            <div className="Advertencia">
              <div className="text">
                <h3 className="til1">Advertencia</h3>
                <p className="til2">¿Estás seguro de eliminar este Ambiente?</p>
              </div>
              <div className="botonesx">
                <button className="conf" onClick={borrarAmbiente}>Sí</button>
                <button className="ref" onClick={cancelar}>No</button>
              </div>
            </div>
          </div>
        )}
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
}

export default ListaAulas;
