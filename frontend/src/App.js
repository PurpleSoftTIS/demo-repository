import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUno from './inicio/HomeUno';
import Solicitar from './solicitar/Solicitar';
import RegistrarAmbiente from './Registrar/ambientes/RegistrarAmbiente';
import FormularioDocente from './Registrar/docentes/FormularioDocente';
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
        <Route path='/Ambiente' element={<RegistrarAmbiente />} />
        <Route path='/Materia' element={<RegistrarMateria />} />
        <Route path='/Docentes' element={<FormularioDocente />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
