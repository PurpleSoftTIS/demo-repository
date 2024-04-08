import React, { useState } from 'react';
import './ListaAulas.css';
import { FaPlus, FaFileCsv, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 

const ListaAulas = () => {
  const [aulas, setAulas] = useState([
    {
      id: 1,
      nro_aula: '1',
      nombre: 'Aula 690B',
      edificio: 'Edificio Principal',
      nro_piso: 1,
      capacidad: 30
    },
    {
      id: 2,
      nro_aula: '2',
      nombre: 'Aula 692F',
      edificio: 'Edificio Principal',
      nro_piso: 2,
      capacidad: 25
    },
  ]);

  const eliminarAula = (id) => {
    setAulas(aulas.filter(aula => aula.id !== id));
  };
  
  const borrarTodo = () => {
    setAulas([]);
  };

  return (
    <div className="container" style={{ height: '76.1vh' }}>
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
            <th>Nro Aula</th>
            <th>Aula</th>
            <th>Edificio</th>
            <th>Nro Piso</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
            <tr key={aula.id} className="fila-lista">
              <td>{aula.nro_aula}</td>
              <td>{aula.nombre}</td>
              <td>{aula.edificio}</td>
              <td>{aula.nro_piso}</td>
              <td>{aula.capacidad}</td>
              <td>
              <button className="btn btn-editar mr-2">Editar</button>
              <button className="btn btn-eliminar" onClick={() => eliminarAula(aula.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaAulas;
