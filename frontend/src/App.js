import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes en lugar de Route
import RegistrarAmbiente from './Ambientes/RegistrarAmbiente';
import RegistrarDiaHora from './dia_hora/RegistrarDiaHora';
import Formulario_Registro from './nombre_docente/Formulario_Registro';
import HomeUno from './inicio/HomeUno';

function App() {
  return (
    <div className='App'>
      <Router>
        <HomeUno />
        <Routes> {/* Usa Routes como contenedor de nuestrars rutas  */}
          <Route path='/HomeUno' element={<HomeUno />} /> {/* Usa el prop "element" en lugar de "component" */}
          <Route path='/nombre_docente' component={<Formulario_Registro />} />
          <Route path='/Ambientes' component={<RegistrarAmbiente />} />
          <Route path='/dia_hora' component={<RegistrarDiaHora />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
