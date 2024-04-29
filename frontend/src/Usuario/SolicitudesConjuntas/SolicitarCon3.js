import React, {} from 'react';
import './SolicitarCon3';


const SolicitarCon3 = () => {
  

  return (
    <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ height: '4vh' }}></div>  
    <h2 style={{ margin: 0, textAlign: 'center' }}>Ambientes Disponibles:</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

      </div>
    
      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro.</th>
            <th>Edificio</th>
            <th>Piso</th>
            <th>Aula</th>
            <th>acciones</th>
            
          </tr>
        </thead>
      </table> 
         
    </div>
  );
};

export default SolicitarCon3;