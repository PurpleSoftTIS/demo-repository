import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUno from './inicio/HomeUno';
import Ambientes from './Registrar/ambientes/Ambientes';
import Docentes from './Registrar/docentes/Docentes';
import Navbar from './navegador/Navbar';
import RegistrarMateria from './Registrar/materias/RMaterias';
import Landing from './inicio/Landing';
import LoginForm from './Login/LoginForm';
import RegistrarDiaHora from './Registrar/dia_hora/RegistrarDiaHora';
import NarbarUsuario from './navegador/NarbarUsuario';
import HomeDos from './inicio/HomeDos';
import ListaSolicitudes from './ListaSolicitudes/ListaSolicitudes';
import { Reservar } from './Usuario/Resevar/Reservar';
import { Solicitar } from './Usuario/Solicitar/Solicitar';
import { Ayuda } from './Usuario/Ayuda/Ayuda';
import ListaAulas from './Listados/ListadoAmbientes/ListaAulas';

function AdminRoutes() {
  return (
    <div>
    <Navbar /> 
    <Routes>
      <Route path='/Inicio/HomeUno' element={<HomeUno/>}/>  
      <Route path='/ListaSolicitudes' element={<ListaSolicitudes />} />
      <Route path='/Registro/Ambientes' element={<Ambientes />} />
      <Route path='/Registro/Materias' element={<RegistrarMateria />} />
      <Route path='/Registro/Docentes' element={<Docentes />} /> 
      <Route path='/Registro/DiaHora' element={<RegistrarDiaHora />} /> 
      <Route path='/Listas/ListaAmbientes' element={<ListaAulas/>} />
    </Routes>
  </div>
  );
}

function UserRoutes() {
  return (
    <div>
    <NarbarUsuario />
    <Routes>
      <Route path='/Inicio/HomeDos' element={<HomeDos/>}/>  
      <Route path='/Usu/Solicitar' element={<Solicitar />} />
      <Route path='/Usu/Reservas' element={<Reservar />} />
      <Route path='/Usu/Ayuda' element={<Ayuda />} /> 
    </Routes>
  </div>        
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Login' element={<LoginForm />} />
        <Route path='/Admin/*' element={<AdminRoutes />} /> 
        <Route path='/Usuario/*' element={<UserRoutes />} />                 
      </Routes>
    </Router>
  );
}

export default App;
