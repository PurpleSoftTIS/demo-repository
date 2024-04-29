import React from 'react'
import { useNavigate } from "react-router-dom";

const SolicitarCon1 = () => {
  //FORMA DE ENVIAR DATOS/
  const navigate = useNavigate();   
  const reservarAmbiente = () => {
    const datos = {
      capacidad : "hOLA",
      dia:"vIERNES",
      hora:"15:25 - 15:59",
      nombre_ambiente: "300",
      edificio: "Eicifio Nuevo",
      numero_piso: "0"
    };
    navigate('/Usuario/Usu/SolicitarCon3', { state: datos });
  };
  return (
    <div>
      <div className='capacidad'>
           <button onClick={reservarAmbiente}>
          enviar
         </button>
        </div>
    </div>
  )
}

export default SolicitarCon1