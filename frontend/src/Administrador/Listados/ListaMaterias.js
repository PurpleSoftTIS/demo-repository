import React, { useState, useEffect } from 'react';
import './ListaAulas.css';
import { FaPlus, FaFileCsv, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 
import Ico1 from "../../assets/IcoGood.png";
import Ico2 from "../../assets/IcoState.png";
import { useNavigate } from "react-router-dom";

const ListaMaterias = () => {
  const navigate = useNavigate(); 

  const [materias, setMaterias] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [advertenciaBorrarTodo, setAdvertenciaBorrarTodo] = useState(false);
  const [advertenciaEliminar, setAdvertenciaEliminar] = useState(false);
  const [idMateria, setIdMateria] = useState(null);
  const sortedMaterias = materias.sort((a, b) => a.id_materia - b.id_materia);
  const [buscar, setBuscar] = useState("");

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
    } finally {
      setIdMateria(null); // Restablecer el estado idMateria a null
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

  const handleFileChange = (event) => { 
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
        navigate("/Admin/Mensaje/CargaMasiva");

    } catch (error) {
      navigate("/Admin/Mensaje/ErrorCargaMasiva");

        console.error('Error al importar:', error);
        setLoading(false);
    }
  }
  const buscardor = (e) => {
    setBuscar(e.target.value);
    console.log(e.target.value);
  }
  let resultado = [];
  if(!buscar){
    resultado = sortedMaterias;
  }else{
    resultado = sortedMaterias.filter((materia) =>
      materia.id_materia.toString().toLowerCase().includes(buscar.toLowerCase())||
    materia.codigo_materia.toString().toLowerCase().includes(buscar.toLowerCase())||
    materia.nombre_materia.toString().toLowerCase().includes(buscar.toLowerCase())||
    materia.grupo.toString().toLowerCase().includes(buscar.toLowerCase())||
    materia.nombre_carrera.toString().toLowerCase().includes(buscar.toLowerCase())||
    materia.nombre_completo_docente.toString().toLowerCase().includes(buscar.toLowerCase())    
    );
    
  }
  
  return (
    <div className="containerDoss" style={{ minHeight: '78.7vh' }}>
      <div className='encabezados'>
        <div  className='contenidoss'>
          <h2 className='TituloAm'>Materias Registradas:</h2>
          <div className='buscado'>
          <input value={buscar} onChange={buscardor} type="text" placeholder="Buscar" className='buscador' />
            <button className="butn butn-filtro">Filtros</button>
            <NavLink to="/Admin/Registro/Materias" className="butn butn-nuevo">
              Nueva Materia<FaPlus className="icon" />
            </NavLink>
          </div>
        </div>
        <div  className='importar2'>
            {loading && <div className="spinner-border text-primary" role="status"></div>}
            <input type="file" onChange={handleFileChange} />
            <button className="butn butn-csv" onClick={handleImportClick}>
              Importar<FaFileCsv className="icon"/>
            </button>
            <button className="butn butn-borrar" onClick={() => setAdvertenciaBorrarTodo(true)}>
              Borrar Todo<FaTrash className="icon"/>
            </button>
        </div>
      </div>  
      <div className='tablass'>
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
          {resultado.map((materia) => (
              <tr key={materia.id_materia} className="fila-lista">
              <td>{materia.id_materia}</td>
              <td>{materia.codigo_materia}</td>
              <td>{materia.nombre_materia}</td>
              <td>{materia.grupo}</td>
              <td>{materia.nombre_carrera}</td>
              <td>{materia.nombre_completo_docente}</td>
              <td className='iconos'>
                {materia.estado_materia === "activo" ? (
                  <img  src={Ico1} alt="Activo" width="60px" height="60px" />
                ) : (
                  <img  src={Ico2} alt="Inactivo" width="60px" height="60px" />
                )}
              </td>
              <td>
              <NavLink className="btn btn-editar mr-2" to={`/Admin/Editar/Materia/${materia.id_materia}`}>Editar</NavLink>
              <button className="btn btn-eliminar" onClick={() => { setIdMateria(materia.id_materia); setAdvertenciaEliminar(true); }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {advertenciaBorrarTodo && (
        <div className="overlay">
          <div className="Advertencia">
            <div className="text">
              <h3 className="til1">Advertencia</h3>
              <p className="til2">¿Estás seguro de eliminar todas las materias?</p>
            </div>
            <div className="botones">
              <button className="conf" onClick={() => { setAdvertenciaBorrarTodo(false); borrarTodo(); }}>Sí</button>
              <button className="ref" onClick={() => setAdvertenciaBorrarTodo(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      {advertenciaEliminar && (
        <div className="overlay">
          <div className="Advertencia">
            <div className="text">
              <h3 className="til1">Advertencia</h3>
              <p className="til2">¿Estás seguro de eliminar esta materia?</p>
            </div>
            <div className="botones">
              <button className="conf" onClick={() => { setAdvertenciaEliminar(false); eliminarMateria(idMateria); }}>Sí</button>
              <button className="ref" onClick={() => setAdvertenciaEliminar(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      </div>
     
    </div>
  );
};

export default ListaMaterias;