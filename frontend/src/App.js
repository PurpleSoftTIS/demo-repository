import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUno from './inicio/HomeUno';
import Solicitar from './solicitar/Solicitar';
import Ambientes from './Registrar/ambientes/Ambientes';
import Docentes from './Registrar/docentes/Docentes';
import Navbar from './navegador/Navbar';
import RegistrarMateria from './Registrar/materias/RegistrarMateria';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeUno />} />
        <Route path='/Solicitar' element={<Solicitar />} />
        <Route path='/Registro/Ambientes' element={<Ambientes />} />
        <Route path='/Registro/Materias' element={<RegistrarMateria />} />
        <Route path='/Registro/Docentes' element={<Docentes />} />
      </Routes>
    </div>
  </Router>
  
  );
}

export default App;
