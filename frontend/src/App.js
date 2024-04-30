import { React, Router, Routes, Route, HomeUno, Ambientes, Docentes, Navbar, RegistrarMateria,
        LoginForm, RegistrarDiaHora, NarbarUsuario, HomeDos, ListaSolicitudes, Reservar, Solicitar, Ayuda,
        ListaAulas, MensajeExitoso, MensajeError,ListaDocentes,RegistrarDiaHoras,ListaSolicitudesUr,
        AmbientesActualizar,Footer,ListaMaterias,Solicitar2,Solicitar1,MensajeExitosoU,
        MensajeErrorU,MensajeActExito,MensajeActError,DocentesActualizar,MensajeDatExito,MensajeDatError
      ,SolicitarCon1,SolicitarCon2,SolicitarCon3,SolicitarCon4,VerSolicitud} from './importaciones';
       

function AdminRoutes() {
  return (
    <div>
    <Navbar/> 
    <Routes>
      <Route path='/Inicio/HomeUno' element={<HomeUno/>}/>  
      <Route path='/ListaSolicitudes' element={<ListaSolicitudes />} />
      <Route path='/DetallesSolicitud' element={<VerSolicitud />} />
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
      <Route path='Usu/DetallesSol' element={<Solicitar2/>}/>
      <Route path='/Mensaje/Exitoso' element={<MensajeExitosoU/>}/>
      <Route path='/Mensaje/Error' element={<MensajeErrorU/>}/>
      <Route path='/Usu/SolicitarCon1' element={<SolicitarCon1/>} />
      <Route path='/Usu/SolicitarCon2' element={<SolicitarCon2/>} />
      <Route path='/Usu/SolicitarCon3' element={<SolicitarCon3/>} />
      <Route path='/Usu/SolicitarCon4' element={<SolicitarCon4/>} />
    </Routes>
    <Footer/>

  </div>        
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />      
        <Route path='/Admin/*' element={<AdminRoutes />} /> 
        <Route path='/Usuario/*' element={<UserRoutes />} />                 
      </Routes>
    </Router>
  );
}

export default App;