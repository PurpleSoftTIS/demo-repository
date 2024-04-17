import React, { useState, useEffect } from 'react';
import './ListaDocentes.css';
import { FaPlus, FaFileCsv, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Ico1 from "../../assets/IcoGood.png";
import Ico2 from "../../assets/IcoState.png";

const ListaDocentes = () => {
  const [docentes, setDocentes] = useState([]);

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
          // Recargar la página después de eliminar el docente y el usuario
          window.location.reload();
        } else {
          throw new Error('Error al eliminar el usuario');
        }
      })
      .catch(error => console.error('Error al eliminar el docente y el usuario:', error));
  };
  
  const borrarTodo = () => {
    setDocentes([]);
  };

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div style={{ height: '4vh' }}></div>  
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Docentes Registrados:</h2>
        <div>
          <input type="text" placeholder="Buscar" />
          <button className="butn butn-filtro">Filtros</button>
          <NavLink to="/Admin/Registro/Docentes" className="butn butn-nuevo">
            Nuevo Docente<FaPlus className="icon" />
          </NavLink>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'Right', alignItems: 'center', marginTop: '15px' }}>
        <div>
          <button className="butn butn-csv">
            Importar<FaFileCsv className="icon"/>
          </button>
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
          {docentes.map(docente => (
            <tr key={docente.id_docente} className="fila-lista">
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
                <button className="btn btn-editar mr-2">Editar</button>
                <button className="btn btn-eliminar" onClick={() => eliminarDocenteYUsuario(docente.id_docente, docente.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
         
    </div>
  );
};

export default ListaDocentes;
