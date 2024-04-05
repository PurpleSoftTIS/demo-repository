import { React, Router, Routes, Route, HomeUno, Ambientes, Docentes, Navbar, RegistrarMateria,
        LoginForm, RegistrarDiaHora, NarbarUsuario, HomeDos, ListaSolicitudes, Reservar, Solicitar, Ayuda,
        ListaAulas, RegistroAmbienteExitoso, RegistroAmbienteError, RegistroDocenteExitoso,
        RegistroDocenteError,ListaDocentes } from './importaciones';

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
      <Route path='/Listas/ListaDocentes' element={<ListaDocentes/>} />
      <Route path='/Mensaje/ExitoAmbiente' element={<RegistroAmbienteExitoso/>}/>
      <Route path='/Mensaje/ErrorAmbiente' element={<RegistroAmbienteError/>}/>
      <Route path='/Mensaje/ExitoDocente' element={<RegistroDocenteExitoso/>}/>
      <Route path='/Mensaje/ErrorDocente' element={<RegistroDocenteError/>}/>      
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
        <Route path='/' element={<LoginForm />} />
        {/*<Route path='/' element={<RegistroDocenteExitoso />} />*/}
        <Route path='/Login' element={<LoginForm />} />
        <Route path='/Admin/*' element={<AdminRoutes />} /> 
        <Route path='/Usuario/*' element={<UserRoutes />} />                 
      </Routes>
    </Router>
  );
}

export default App;