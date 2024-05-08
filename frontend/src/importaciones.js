// importaciones.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeUno from './inicio/HomeUno';
import Ambientes from './Registrar/ambientes/Ambientes';
import AmbientesActualizar from './Registrar/ambientes/AmbientesActualizar';
import Docentes from './Registrar/docentes/Docentes';
import Navbar from './navegador/Navbar';
import RegistrarMateria from './Registrar/materias/RMaterias';
import LoginForm from './Login/LoginForm';
import RegistrarDiaHora from './Registrar/dia_hora/RegistrarDiaHora';
import NarbarUsuario from './navegador/NarbarUsuario';
import HomeDos from './inicio/HomeDos';
import ListaSolicitudes from './ListaSolicitudes/ListaSolicitudes';
import ListaSolicitudesUr from './ListaSolicitudes/ListaSolicitudesUr';
import Reservar  from './Usuario/Resevar/Reservar';
import Solicitar  from './Usuario/Solicitar/Solicitar';
import { Ayuda } from './Usuario/Ayuda/Ayuda';
import ListaAulas from './Listados/ListadoAmbientes/ListaAulas';
import MensajeExitoso from './Registrar/mensajes/MensajeExitoso';
import MensajeError from './Registrar/mensajes/MensajeError';
import RegistrarDiaHoras from './Registrar/dia_hora/RegistrarDiaHoraActualizar';
import ListaMaterias from './Listados/ListadoMaterias/ListaMaterias';
import ListaDocentes from './Listados/ListadoDocentes/ListaDocentes';
import { Footer } from './navegador/Footer';
import Solicitar3 from './Usuario/Solicitar/Solicitar3';
import Solicitar1 from './Usuario/Solicitar/Solicitar1';
import MensajeExitosoU from './Usuario/MensajesUsuario/MensajeExitosoU';
import MensajeErrorU from './Usuario/MensajesUsuario/MensajeErrorU';
import MensajeActExito from './Registrar/mensajes/MensajeActExito';
import MensajeActError from './Registrar/mensajes/MensajeActError';
import DocentesActualizar from './Registrar/docentes/DocentesActualizar';
import MensajeDatExito from './Registrar/mensajes/MensajeDatExito';
import MensajeDatError from './Registrar/mensajes/MensajeDatError';
import SolicitarCon1 from './Usuario/SolicitudesConjuntas/SolicitarCon1';
import SolicitarCon2 from './Usuario/SolicitudesConjuntas/SolicitarCon2';
import SolicitarCon3 from './Usuario/SolicitudesConjuntas/SolicitarCon3';
import SolicitarCon4 from './Usuario/SolicitudesConjuntas/SolicitarCon4';
export {
  React,Router,Routes,Route,HomeUno,Ambientes,Docentes,Navbar,RegistrarMateria,
  LoginForm,RegistrarDiaHora, NarbarUsuario, HomeDos, ListaSolicitudes, Reservar, Solicitar,
  Ayuda, ListaAulas, MensajeExitoso, MensajeError,ListaDocentes,RegistrarDiaHoras,AmbientesActualizar,
  Footer,ListaMaterias,Solicitar3,Solicitar1,MensajeExitosoU,MensajeErrorU,MensajeActExito,MensajeActError
  ,DocentesActualizar,MensajeDatExito,MensajeDatError,SolicitarCon1,SolicitarCon2,SolicitarCon3,SolicitarCon4,
  ListaSolicitudesUr
};
