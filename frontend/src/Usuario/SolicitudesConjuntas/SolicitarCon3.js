import React from 'react'
import { useLocation } from 'react-router-dom';

const SolicitarCon3 = () => {
    /*FORMA DE RESIVIR DATOS*/

  const { state: datos } = useLocation();
  const capacidad = datos ? datos.capacidad : null; 
  const dia = datos ? datos.dia : null;
  const hora = datos ? datos.hora : null; 
  console.log(datos)
  return (
    <div>SolicitarCon3</div>
  )
}

export default SolicitarCon3








