import React, { useState, useEffect } from 'react';
import '../ListadoAmbientes/ListaAulas.css'
import { FaPlus, FaFileCsv, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 
import Ico1 from "../../assets/IcoGood.png";
import Ico2 from "../../assets/IcoState.png";

const ListaMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const sortedMaterias = materias.sort((a, b) => a.id_materia - b.id_materia);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/materias')
      .then(response => response.json())
      .then(data => {
        setMaterias(data);
      })
      .catch(error => console.error('Error al obtener las Materias:', error));
  }, []);

  const eliminarMateria = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/materias/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMaterias(materias.filter(materia => materia.id_materia !== id));
        console.log('Materia eliminada correctamente');
      } else {
        console.error('Error al eliminar materia');
      }
    } catch (error) {
      console.error('Error al eliminar materia:', error);
    }
  };
  
  const borrarTodo = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/materias', {
        method: 'DELETE',
      });
      if (response.ok) {
        setMaterias([]);
        console.log('Todas las materias eliminadas correctamente');
      } else {
        console.error('Error al eliminar todas las materias: ', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar todas las materias: ', error);
    }
  };  

  const handleFileChange = (event) => { // Nuevo controlador de eventos para la entrada de archivo
    setFile(event.target.files[0]);
  };

  async function handleImportClick() {
    try {
        const formData = new FormData();
        formData.append('csv_file', file);
        setLoading(true);

        const response = await fetch('http://127.0.0.1:8000/api/importMaterias', {
            method: 'POST',
            body: formData
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        setLoading(false);
        fetch('http://127.0.0.1:8000/api/materias')
          .then(response => response.json())
          .then(data => {
            setMaterias(data);
          })
          .catch(error => console.error('Error al obtener las Materias:', error));
        console.log('Importación exitosa');
    } catch (error) {
        console.error('Error al importar:', error);
        setLoading(false);
    }
  }
  
  return (
    <div className="container" style={{ minHeight: '78.7vh' }}>
      <div style={{ height: '4vh' }}></div>  
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Materias Registradas:</h2>
        <div>
          <input type="text" placeholder="Buscar" />
          <button className="butn butn-filtro">Filtros</button>
          <NavLink to="/Admin/Registro/Materias" className="butn butn-nuevo">
            Nueva Materia<FaPlus className="icon" />
          </NavLink>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'Right', alignItems: 'center', marginTop: '15px' }}>
        <div>
          {loading && <div className="spinner-border text-primary" role="status"></div>}
          <input type="file" onChange={handleFileChange} />
          <button className="butn butn-csv" onClick={handleImportClick}>
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
            <th>Nro Materia</th>
            <th>Codigo Materia</th>
            <th>Nombre Materia</th>
            <th>Grupo</th>
            <th>Carrera</th>
            <th>Docente</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedMaterias.map((materia) => (
              <tr key={materia.id_materia} className="fila-lista">
              <td>{materia.id_materia}</td>
              <td>{materia.codigo_materia}</td>
              <td>{materia.nombre_materia}</td>
              <td>{materia.grupo}</td>
              <td>{materia.nombre_carrera}</td>
              <td>{materia.nombre_completo_docente}</td>
              <td>
                {materia.estado_materia === "activo" ? (
                  <img className="iconos2" src={Ico1} alt="Activo" width="60px" height="60px" />
                ) : (
                  <img className="iconos2" src={Ico2} alt="Inactivo" width="60px" height="60px" />
                )}
              </td>
              <td>
              <NavLink className="btn btn-editar mr-2" to={`/Admin/Editar/Materia/${materia.id_materia}`}>Editar</NavLink>
              <button className="btn btn-eliminar" onClick={() => eliminarMateria(materia.id_materia)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaMaterias;
