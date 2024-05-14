import React, { useState, useEffect } from 'react';
import './ListaAulas.css';
import { FaPlus, FaFileCsv, FaTrash } from 'react-icons/fa';
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
  const [ambienteToDelete, setAmibienteToDelete] = useState("");
  const [buscar, setBuscar] = useState("");
  const navigate = useNavigate();
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
    setAmibienteToDelete(id_ambiente)
    setAdvertencia2(true); 
  }
  const cancelar = () => {
    setAdvertencia2(false); 
  };
  const borrarTodos = () => {
    fetch(`http://127.0.0.1:8000/api/borrarTodo`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then (response => {
     if(response.ok){

      window.location.reload();
    }
    
     });
  };
  const borrarAmbiente = () => {
    const {id_ambiente} = ambienteToDelete;

    setAdvertencia2(true); 
    fetch(`http://127.0.0.1:8000/api/borrar/${id_ambiente}`, {
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

  const obtenerId = (aula) => {
    const idAmniente= aula.id_ambiente;
    return idAmniente;

  };
  const buscardor = (e) => {
    setBuscar(e.target.value);
    console.log(e.target.value);
  }
  let resultado = [];
  if(!buscar){
    resultado = aulas;
  }else{
    resultado = aulas.filter((aula) =>
      aula.id_ambiente.toString().toLowerCase().includes(buscar.toLowerCase())||
      aula.nombre_ambiente.toString().toLowerCase().includes(buscar.toLowerCase())||
      aula.edificio.toString().toLowerCase().includes(buscar.toLowerCase())||
      aula.tipo_ambiente.toString().toLowerCase().includes(buscar.toLowerCase())||
      aula.numero_piso.toString().toLowerCase().includes(buscar.toLowerCase())||
      aula.capacidad.toString().toLowerCase().includes(buscar.toLowerCase())    
    );
    
  }
  return (
    <div className="container" style={{ minHeight: '78.7vh' }}>
      <div style={{ height: '4vh' }}></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Ambientes Registrados:</h2>
        <div>

          <input value={buscar} onChange={buscardor} type="text" placeholder="Buscar" className='buscador' />
          
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
             <label htmlFor="inputGroupFile" className="butn butn-csv">
                Importar Ambientes<FaFileCsv className="icon" />
              </label>
              <input
                id="inputGroupFile"
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={handleArchivoSeleccionado} // Asociado a la importación de ambientes
              />
                <label htmlFor="inputGroupFile2" className="butn butn-csv">
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
          {resultado.map((aula) => (
            <tr key={aula.id_ambiente} className="fila-lista">
              <td>{aula.id_ambiente}</td>
              <td>{aula.nombre_ambiente}</td>
              <td>{aula.edificio}</td>
              <td>{aula.tipo_ambiente}</td>
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

                <button className="btn btn-eliminar" onClick={() => {borrar(aula.id_ambiente); }}>
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
          <div className="botones">
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
             <p className="til2">¿Estás seguro de eliminar este docente?</p>
           </div>
           <div className="botones">
             <button className="conf" onClick={borrarAmbiente(obtenerId)}>Sí</button>
             <button className="ref" onClick={cancelar}>No</button>
           </div>
         </div>
       </div>
      )}
    </div>
  );
}

export default ListaAulas;