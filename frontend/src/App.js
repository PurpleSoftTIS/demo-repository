import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { React, Router, Routes, Route, Navigate, HomeUno, Ambientes, Docentes, Navbar, RegistrarMateria,
        LoginForm, RegistrarDiaHora, NarbarUsuario, HomeDos, ListaSolicitudes, Reservar, Solicitar, Ayuda,
        ListaAulas, MensajeExitoso, MensajeError,ListaDocentes,RegistrarDiaHoras,ListaSolicitudesUr,
        AmbientesActualizar,Footer,ListaMaterias,Solicitar3,Solicitar1,MensajeExitosoU,
        MensajeErrorU,MensajeActExito,MensajeActError,DocentesActualizar,MensajeDatExito,MensajeDatError
      ,SolicitarCon1,SolicitarCon2,SolicitarCon3,PasswordResetForm} from './importaciones';
       
function PrivateAdminRoute({ element }) {
  const { urole } = useContext(UserContext);

  return urole === 'admin' ? element : <Navigate to="/" replace />;
}

function PrivateUserRoute({ element }) {
  const { urole } = useContext(UserContext);

  return urole === 'user' ? element : <Navigate to="/" replace />;
}

function PrivateGestRoute({ element }) {
  const { urole } = useContext(UserContext);
  console.log (urole);
  return urole === 'gest' ? element : <Navigate to="/" replace/>;
}

function PrivateRestRoute({ element }) {
  const { urole } = useContext(UserContext);
  console.log (urole);
  return urole === 'rest' ? element : <Navigate to="/" replace/>;
}

function AdminRoutes() {
  return (
    <div>
    <Navbar/> 
    <Routes>
      <Route path='/Inicio/HomeUno' element={<HomeUno/>}/>  
      <Route path='/ListaSolicitudes' element={<ListaSolicitudes />} />
      <Route path='/ListaSolicitudesUr' element={<ListaSolicitudesUr />} />
      <Route path='/Registro/Ambientes' element={<Ambientes />} />
      <Route path='/Registro/Materias' element={<RegistrarMateria />} />
      <Route path='/Editar/Materia/:id' element={<RegistrarMateria />} />
      <Route path='/Registro/Docentes' element={<Docentes />} /> 
      <Route path='/Registro/DocentesActualizar' element={<DocentesActualizar />} />
      <Route path='/Registro/DiaHora' element={<RegistrarDiaHora />} /> 
      <Route path='/Registro/AmbientesActualizar' element={<AmbientesActualizar />} /> 
      <Route path='/Registro/Diahorasactualizar' element={<RegistrarDiaHoras />} /> 
      <Route path='/Listas/ListaAmbientes' element={<ListaAulas/>} />
      <Route path='/Listas/ListaDocentes' element={<ListaDocentes/>} />
      <Route path='/Mensaje/RegistroExitoso' element={<MensajeExitoso/>}/>
      <Route path='/Mensaje/RegistroError' element={<MensajeError/>}/>            
      <Route path='/Listas/ListaMaterias' element={<ListaMaterias/>} />
      <Route path='/Mensaje/ActualizacionExitosa' element={<MensajeActExito/>}/>
      <Route path='/Mensaje/ErrorActualizacion' element={<MensajeActError/>}/>
      <Route path='/Mensaje/CargaMasiva' element={<MensajeDatExito/>}/> 
      <Route path='/Mensaje/ErrorCargaMasiva' element={<MensajeDatError/>}/> 
    </Routes>
    <Footer/>
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
      <Route path='/Usu/Solicitar1' element={<Solicitar1 />} />
      <Route path='/Usu/Reservas' element={<Reservar />} />
      <Route path='/Usu/Ayuda' element={<Ayuda />} /> 
      <Route path='Usu/DetallesSol' element={<Solicitar3/>}/>
      <Route path='/Mensaje/Exitoso' element={<MensajeExitosoU/>}/>
      <Route path='/Mensaje/Error' element={<MensajeErrorU/>}/>
      <Route path='/Usu/SolicitarCon1' element={<SolicitarCon1/>} />
      <Route path='/Usu/SolicitarCon2' element={<SolicitarCon2/>} />
      <Route path='/Usu/SolicitarCon3' element={<SolicitarCon3/>} />
    </Routes>
    <Footer/>
  </div>        
  );
}

function GestRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/Ayuda' element={<h1>Ayuda</h1>}/>
      </Routes>
    </div>
  );
}

function RestRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/password' element={<PasswordResetForm />} />
      </Routes>
    </div>
  );
}

function getHomeElement(urole) {
  switch (urole) {
    case 'admin':
      return (
        <div>
          <Navbar />
          <HomeUno />
          <Footer />
        </div>
      );
    case 'user':
      return (
        <div>
          <NarbarUsuario />
          <HomeDos />
          <Footer />
        </div>
      );
    case 'gest':
    case 'rest':
      return <LoginForm />;
    default:
      return <Navigate to="/" replace />;
  }
}

function App() {
  const { isLoading, urole } = useContext(UserContext);
  return (
    <Router>
      {isLoading ? (
          <div>Loading...</div>
        ) : (
        <Routes>
          <Route path='/' element={getHomeElement(urole)} />
          <Route path="/Admin/*" element={<PrivateAdminRoute element={<AdminRoutes />} />} />
          <Route path="/Usuario/*" element={<PrivateUserRoute element={<UserRoutes />} />} />
          <Route path='/Gest/*' element={<PrivateGestRoute element={<GestRoutes />} />} />
          <Route path='/Rest/*' element={<PrivateRestRoute element={<RestRoutes />} />} />     
        </Routes>
      )}
    </Router>
  );
}

export default App;