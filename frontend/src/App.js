import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUno from './inicio/HomeUno';
import Solicitar from './solicitar/Solicitar';
import Ambientes from './Registrar/ambientes/Ambientes';
import Docentes from './Registrar/docentes/Docentes';
import Navbar from './navegador/Navbar';
import RegistrarMateria from './Registrar/materias/RegistrarMateria';
import Landing from './inicio/Landing';
import LoginForm from './Login/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Landing' element={<Landing />} />
        <Route path='/Login' element={<LoginForm />} />
        <Route path='*' element={
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
        } />
      </Routes>
    </Router>
  );
}

export default App;
