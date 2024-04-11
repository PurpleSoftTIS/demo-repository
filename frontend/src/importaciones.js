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
import { Reservar } from './Usuario/Resevar/Reservar';
import { Solicitar } from './Usuario/Solicitar/Solicitar';
import { Ayuda } from './Usuario/Ayuda/Ayuda';
import ListaAulas from './Listados/ListadoAmbientes/ListaAulas';
import RegistroAmbienteExitoso from './Registrar/mensajes/RegistroAmbienteExitoso';
import RegistroAmbienteError from './Registrar/mensajes/RegistroAmbienteError';
import RegistroDocenteExitoso from './Registrar/mensajes/RegistroDocenteExitoso';
import RegistroDocenteError from './Registrar/mensajes/RegistroDocenteError';
import RegistrarDiaHoras from './Registrar/dia_hora/RegistrarDiaHoraActualizar';
import ListaMaterias from './Listados/ListadoMaterias/ListaMaterias';
import ListaDocentes from './Listados/ListadoDocentes/ListaDocentes';
import { Footer } from './navegador/Footer';
export {
  React,Router,Routes,Route,HomeUno,Ambientes,Docentes,Navbar,RegistrarMateria,
  LoginForm,RegistrarDiaHora, NarbarUsuario, HomeDos, ListaSolicitudes, Reservar, Solicitar,
  Ayuda, ListaAulas, RegistroDocenteExitoso,
  RegistroDocenteError,ListaDocentes,RegistrarDiaHoras,AmbientesActualizar
  ,RegistroAmbienteExitoso, RegistroAmbienteError,Footer,ListaMaterias
};
