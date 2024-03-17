import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarAdmi from './navegacion/NavbarAdmi';
import Registrar_ambientes from './ambientes/Registrar_ambientes';
import Registrar_dia_hora from './dia_hora/Registrar_dia_hora';
import HomeUno from './inicio/HomeUno';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavbarAdmi />
        {/*<Switch>
          <Route path='/HomeUno' exact component={HomeUno} />
          <Route path='/ambientes' component={Registrar_ambientes} />
          <Route path='/dia_hora' component={Registrar_dia_hora} />
        </Switch>*/}
      </Router>
    </div>
  );
}

export default App;


