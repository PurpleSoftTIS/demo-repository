import React, { useState,useEffect } from 'react';
import './ListaAulas.css';
import { FaPlus, FaFileCsv, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";

  function ListaAulas() {
    const [aulas,setAulas] = useState([]);
    const navigate = useNavigate();

    
    
    const borrarTodo = () => {
      setAulas([]);
    };
    const borrarambiente = (ID_AMBIENTE)=>{
          fetch(`http://127.0.0.1:8000/api/borrar/${ID_AMBIENTE}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
          },
         })
         .then(response => {
          if (response.ok) {
              alert('El ambiente se ha actualizado correctamente.');
          } else {
              throw new Error('No se pudo actualizar el ambiente.');
          }
      })



    };
     
    const handleEditar = (ID_AMBIENTE) => {
      
      fetch(`http://127.0.0.1:8000/api/ambiente/${ID_AMBIENTE}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
      
      
        })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error al actualizar el ambiente');
          }
          console.log('Ambiente actualizado:',response);

          return response.json();

      })
      .then(data => {
        navigate('/Admin/Registro/AmbientesActualizar', { state: { datosAmbientes: data } });

          console.log('Datos del ambiente actualizado:', data);
    
      
      })
      .catch(error => {
          console.error(error);
      });
  };

    
  
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/listaAmbiente")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los ambientes');
                }
                


                return response.json();
               


            })
            .then(data => {
                setAulas(data);
                console.log(data);

            })
            .catch(error => {
                console.error(error);
            });
    }, []);
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
            <tr key={aula.ID_AMBIENTE} className="fila-lista">
              <td>{aula.ID_AMBIENTE}</td>
              <td>{aula.NOMBRE_AMBIENTE}</td>
              <td>{aula.EDIFICIO}</td>
              <td>{aula.NUMERO_PISO}</td>
              <td>{aula.CAPACIDAD}</td>
              <td>
              <button className="btn btn-editar mr-2" onClick={() => handleEditar(aula.ID_AMBIENTE)}>Editar</button>

              <button className="btn btn-eliminar" onClick={() => borrarambiente(aula.ID_AMBIENTE)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaAulas;
