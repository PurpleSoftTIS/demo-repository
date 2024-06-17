import React from 'react'


const Informe = () => {
    return (
        <div className="container" style={{ minHeight: '78.7vh' }}>
          <div className='encabezados'>
            <div className='contenidoss'>
              <h2 className='TituloAm'>Informe Uso de Ambientes</h2>
              <div className='buscado'>              
                <button className="butn butn-filtro">Filtros</button>
                <button className="butn butn-filtro">Imprimir</button>
                <button className="button">Atras</button>
              </div>
            </div>
          </div>
          
          <div className='tablass' >
          <table className="table table-hover">
            <thead className="thead">
              <tr>
                <th>Docente</th>
                <th>Materia</th>
                <th>Grupo</th>
                <th>Ambiente</th>
                <th>Edificio</th>
                <th>Cantidad de Uso</th>
                <th>Fecha</th>
                <th>Actividad</th>
              </tr>
            </thead>
          </table>
          </div>
          
        </div>
      );
}

export default Informe