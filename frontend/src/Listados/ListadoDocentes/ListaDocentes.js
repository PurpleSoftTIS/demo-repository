import React, { useState, useEffect } from 'react';
import './ListaDocentes.css';
import { FaPlus, FaFileCsv, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Ico1 from "../../assets/IcoGood.png";
import Ico2 from "../../assets/IcoState.png";
import { useNavigate } from "react-router-dom";
import { read, utils } from 'xlsx';


const ListaDocentes = () => {
  const navigate = useNavigate(); 
  const [docentes, setDocentes] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteDocente, setShowDeleteDocente] = useState(false);
  const [docenteToDelete, setDocenteToDelete] = useState([]);
  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/docentes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setDocentes(data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const eliminarDocenteYUsuario = (id_docente, id_usuario) => {
    setDocenteToDelete({ id_docente, id_usuario });
    setShowDeleteDocente(true);
  };

  const eliminarTodosDocentes = () => {
    fetch('http://127.0.0.1:8000/api/borrarTodoDocente', {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {       
        window.location.reload();
      } else{
        throw new Error('Error al eliminar todos los docentes y usuarios');
      }
    })      
    .catch(error => console.error('Error al eliminar el docente y el usuario:', error))
    .finally(() => {
      setShowDeleteConfirmation(false);
    });
  };
  
  const confirmarEliminarDocente = () => {
    const { id_docente, id_usuario } = docenteToDelete;
    fetch(`http://127.0.0.1:8000/api/docentes/${id_docente}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setDocentes(docentes.filter(docente => docente.id !== id_docente));
          
          return fetch(`http://127.0.0.1:8000/api/usuarios/${id_usuario}`, {
            method: 'DELETE',
          });
        } else {
          throw new Error('Error al eliminar el docente');
        }
      })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error('Error al eliminar el usuario');
        }
      })
      .catch(error => console.error('Error al eliminar el docente y el usuario:', error));
    setShowDeleteDocente(false);
    setDocenteToDelete(null);
  };

  const cancelarEliminarDocente = () => {
    setShowDeleteDocente(false);
    setDocenteToDelete(null);
  };
  
  const borrarTodo = () => {
    setShowDeleteConfirmation(true);
  }; 

  const cancelarBorrarTodo = () => {
    setShowDeleteConfirmation(false);
  }; 
  const cargaMasiva = (event) => {
    const files = event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const wb = read(event.target.result, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = utils.sheet_to_json(ws, { header: 1 });
  
        fetch('http://127.0.0.1:8000/api/masivoDocentes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            console.log('Datos enviados al servidor exitosamente.');
          } else {
            throw new Error('Error al enviar datos al servidor.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };
  
      reader.readAsBinaryString(file);
    }
  };
  
  const editarDocente = (docente) => {
    const datos = {
      id_docente:docente.id_docente,
      nombre:docente.nombre,
      apellido_paterno:docente.apellido_paterno,
      apellido_materno:docente.apellido_materno,
      codigo_docente:docente.codigo_docente,
      correo_electronico:docente.correo_electronico,
      tipo_docente:docente.tipo_docente
    };
    navigate('/Admin/Registro/DocentesActualizar', { state: datos });
  };

  const buscardor = (e) => {
    setBuscar(e.target.value);
    console.log(e.target.value);
  }
  let resultado = [];
  if(!buscar){
    resultado = docentes;
  }else{
    resultado = docentes.filter((docente) =>
      docente.id_docente.toString().toLowerCase().includes(buscar.toLowerCase())||
      docente.nombre.toString().toLowerCase().includes(buscar.toLowerCase())||
    docente.apellido_paterno.toString().toLowerCase().includes(buscar.toLowerCase())||
    docente.apellido_materno.toString().toLowerCase().includes(buscar.toLowerCase())||
    docente.codigo_docente.toString().toLowerCase().includes(buscar.toLowerCase())||
    docente.correo_electronico.toString().toLowerCase().includes(buscar.toLowerCase())||
    docente.tipo_docente.toString().toLowerCase().includes(buscar.toLowerCase())    
    
    );
    
  }
  return (
    
    <div className="container" style={{ minHeight: '78.7vh' }}>
      <div style={{ height: '4vh' }}></div>  
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Docentes Registrados:</h2>
        <div>
        <input value={buscar} onChange={buscardor} type="text" placeholder="Buscar" className='buscador' />
          <button className="butn butn-filtro">Filtros</button>
          <NavLink to="/Admin/Registro/Docentes" className="butn butn-nuevo">
            Nuevo Docente<FaPlus className="icon" />
          </NavLink>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', marginTop: '15px' }}>
        <div>
          <label htmlFor="inputGroupFile" className="butn butn-csv">
                Importar<FaFileCsv className="icon" />
              </label>
              <input
                id="inputGroupFile"
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={cargaMasiva} // Asociado a la importación de ambientes
          />          
          <button className="butn butn-borrar" onClick={borrarTodo}>
            Borrar Todo<FaTrash className="icon"/>
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro. de Docente</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Codigo Docente</th>
            <th>Correo</th>            
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resultado.map(docente => (
            <tr key={docente.id} className="fila-lista">
              <td>{docente.id_docente}</td>
              <td>{docente.nombre}</td>
              <td>{docente.apellido_paterno}</td>
              <td>{docente.apellido_materno}</td>
              <td>{docente.codigo_docente}</td>
              <td>{docente.correo_electronico}</td>
              <td>{docente.tipo_docente}</td>
              <td>
                {docente.estado_docente === "activo" ? (
                  <img className="iconos2" src={Ico1} alt="Activo" width="50px" height="50px" />
                ) : (
                  <img className="iconos2" src={Ico2} alt="Inactivo" width="50px" height="50px" />
                )}
              </td>
              <td>
              <button className="btn btn-editar mr-2" onClick={() => editarDocente(docente)}>Editar</button>
                <button className="btn btn-eliminar" onClick={() => eliminarDocenteYUsuario(docente.id_docente, docente.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteConfirmation && (
        <div className="overlay">
          <div className="Advertencia">
            <div className="text">
              <h3 className="til1">Advertencia</h3>
              <p className="til2">¿Estás seguro de eliminar todos los registros?</p>
            </div>
            <div className="botones">
              <button className="conf" onClick={eliminarTodosDocentes}>Sí</button>
              <button className="ref" onClick={cancelarBorrarTodo}>No</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteDocente && (
        <div className="overlay">
          <div className="Advertencia">
            <div className="text">
              <h3 className="til1">Advertencia</h3>
              <p className="til2">¿Estás seguro de eliminar este docente?</p>
            </div>
            <div className="botones">
              <button className="conf" onClick={confirmarEliminarDocente}>Sí</button>
              <button className="ref" onClick={cancelarEliminarDocente}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default ListaDocentes;
