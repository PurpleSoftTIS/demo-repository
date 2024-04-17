import React, { useState, useEffect } from 'react';
import './ListaAulas.css';
import { FaPlus, FaFileCsv, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Ico1 from '../../assets/IcoGood.png';
import Ico2 from '../../assets/IcoState.png';

function ListaAulas() {
  const [Advertencia, setAdvertencia] = useState(false);
  const [Advertencia2, setAdvertencia2] = useState(false);
  const [aulas, setAulas] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [importar, setImportar] = useState(false);

  const navigate = useNavigate();
  const importaciones = () => {
    setImportar(true);     
  };
  const borrarTodo = () => {
    setAdvertencia(true); 
    setShowOverlay(true); 
  }
  const cancelarBorrar = () => {
    setAdvertencia(false); 
    setShowOverlay(false); 
  };
  const confirmacionEliminacionTodo = () => {
    setAulas([]);
    setAdvertencia(false); 
    setShowOverlay(false); 
  };
  const borrar = () => {
    setAdvertencia2(true); 
    setShowOverlay(true); 
  }
  const cancelar = () => {
    setAdvertencia2(false); 
    setShowOverlay(false); 
  };
  const confirmacionEliminacion = () => {
    setAdvertencia2(false); 
    setShowOverlay(false); 
    window.location.reload();
  };

  const borrarAmbiente = (id_ambiente) => {
    setAdvertencia2(true); 
    setShowOverlay(true);
    fetch(`http://127.0.0.1:8000/api/borrar/${id_ambiente}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
        } else {
          throw new Error('No se pudo actualizar el ambiente.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
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

  return (
    <div className="container" style={{ height: '100vh' }}>
      {showOverlay && <div className="overlay"></div>}

      <div style={{ height: '4vh' }}></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Ambientes Registrados:</h2>
        <div>
          <input type="text" placeholder="Buscar" />
          <button className="butn butn-filtro">Filtros</button>
          <NavLink to="/Admin/Registro/Ambientes" className="butn butn-nuevo">
              Nuevo Ambiente<FaPlus className="icon" />
          </NavLink>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'Right', alignItems: 'center', marginTop: '15px' }}>
        <div>
          <button className="butn butn-csv"  onClickCapture={importaciones}>
            Importar Datos<FaFileCsv className="icon" />
          </button>
          
          {importar && (
            <div className='importaciones'>
            <button className="btnIm">
              Importar Ambientes<FaFileCsv className="icon" />
            </button>
            <button className="btnIm">
              Importar Dias hABILES<FaFileCsv className="icon" />
              </button>
              </div>
            )}
        
          <button className="butn butn-borrar" onClick={borrarTodo}>
            Borrar Todo<FaTrash className="icon" />
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro Aula</th>
            <th>Aula</th>
            <th>Edificio</th>
            <th>Nro Piso</th>
            <th>Capacidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
            <tr key={aula.id_ambiente} className="fila-lista">
              <td>{aula.id_ambiente}</td>
              <td>{aula.nombre_ambiente}</td>
              <td>{aula.edificio}</td>
              <td>{aula.numero_piso}</td>
              <td>{aula.capacidad}</td>
              <td>
                {aula.estado_ambiente === 'activo' ? (
                  <img className="iconos2" src={Ico1} alt="Activo" width="60px" height="60px" />
                ) : (
                  <img className="iconos2" src={Ico2} alt="Inactivo" width="60px" height="60px" />
                )}
              </td>
              <td>
                <button className="btn btn-editar mr-2" onClick={() => handleEditar(aula.id_ambiente)}>
                  Editar
                </button>

                <button className="btn btn-eliminar" onClick={() => { borrarAmbiente(aula.id_ambiente); borrar(); }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Advertencia && (
        <div className="Advertencia">
          <div className="text">
            <h3 className="til1">Advertencia</h3>
            <p className="til2">Estas seguro de eliminar todos los registros?</p>
          </div>
          <div className="botones">
            <button className="conf" onClick={confirmacionEliminacionTodo}>Si</button>
            <button className="ref" onClick={cancelarBorrar}>No</button>
          </div>
        </div>
      )}
       {Advertencia2 && (
        <div className="Advertencia2">
          <div className="text">
            <h3 className="til1">Advertencia</h3>
            <p className="til2">Estas seguro de eliminar el registro?</p>
          </div>
          <div className="botones">
            <button className="conf" onClick={confirmacionEliminacion}>Si</button>
            <button className="ref" onClick={cancelar}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaAulas;
