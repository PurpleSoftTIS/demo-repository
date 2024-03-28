import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUno from './inicio/HomeUno';
import Solicitar from './solicitar/Solicitar';
import Ambientes from './Registrar/ambientes/Ambientes';
import Docentes from './Registrar/docentes/Docentes';
import Ambientes from './Registrar/ambientes/Ambientes';
import Docentes from './Registrar/docentes/Docentes';
import Navbar from './navegador/Navbar';
import RegistrarMateria from './Registrar/materias/RegistrarMateria';
import Landing from './inicio/Landing';
import LoginForm from './Login/LoginForm';
import RegistrarDiaHora from './Registrar/dia_hora/RegistrarDiaHora';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Login' element={<LoginForm />} />
        
        <Route path='*' element={
            <div>
            <Navbar />
            <Routes>
              <Route path='/Inicio/HomeUno' element={<HomeUno/>}/>  
              <Route path='/Solicitar' element={<Solicitar />} />
              <Route path='/Registro/Ambientes' element={<Ambientes />} />
              <Route path='/Registro/Materias' element={<RegistrarMateria />} />
              <Route path='/Registro/Docentes' element={<Docentes />} /> 
              <Route path='/Registro/DiaHora' element={<RegistrarDiaHora />} /> 

            </Routes>
          </div>
        }/>        
      </Routes>
    </Router>
  );
}

export default App;
