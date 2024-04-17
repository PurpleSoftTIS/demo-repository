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
import Solicitar2 from './Usuario/Solicitar/Solicitar2';
import Solicitar1 from './Usuario/Solicitar/Solicitar1';
export {
  React,Router,Routes,Route,HomeUno,Ambientes,Docentes,Navbar,RegistrarMateria,
  LoginForm,RegistrarDiaHora, NarbarUsuario, HomeDos, ListaSolicitudes, Reservar, Solicitar,
  Ayuda, ListaAulas, MensajeExitoso, MensajeError,ListaDocentes,RegistrarDiaHoras,AmbientesActualizar,
  Footer,ListaMaterias,Solicitar2,Solicitar1
};
