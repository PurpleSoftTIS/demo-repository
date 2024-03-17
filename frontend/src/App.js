import React from 'react';


import './App.css';
import { Navbar } from './Components/Navbar'; 
import  {Dias_Horas} from './Components/Dias_Horas';
export default function App(){
  return(
    <div>
      <Navbar />
      <Dias_Horas />
    </div>
    
  )
}
