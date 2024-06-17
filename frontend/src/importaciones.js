// importaciones.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeUno from './inicio/HomeUno';
import Ambientes from './Administrador/Registrar/ambientes/Ambientes';
import AmbientesActualizar from './Administrador/Registrar/ambientes/AmbientesActualizar';
import Docentes from './Administrador/Registrar/docentes/Docentes';
import Navbar from './navegador/Navbar';
import RegistrarMateria from './Administrador/Registrar/materias/RMaterias';
import LoginForm from './Login/LoginForm';
import RegistrarDiaHora from './Administrador/Registrar/dia_hora/RegistrarDiaHora';
import NarbarUsuario from './navegador/NarbarUsuario';
import HomeDos from './inicio/HomeDos';
import ListaSolicitudes from './Administrador/Solicitudes/ListaSolicitudes/ListaSolicitudes';
import ListaSolicitudesUr from './Administrador/Solicitudes/ListaSolicitudes/ListaSolicitudesUr';
import Solicitar  from './Usuario/Solicitar/Solicitar';
import ListaAulas from './Administrador/Listados/ListaAulas';
import MensajeExitoso from './Mensajes/MensajeExitoso';
import MensajeError from './Mensajes/MensajeError';
import RegistrarDiaHoras from './Administrador/Registrar/dia_hora/RegistrarDiaHoraActualizar';
import ListaMaterias from './Administrador/Listados/ListaMaterias';
import ListaDocentes from './Administrador/Listados/ListaDocentes';
import { Footer } from './navegador/Footer';
import MensajeExitosoU from './Mensajes/MensajeExitosoU';
import MensajeErrorU from './Mensajes/MensajeErrorU';
import MensajeActExito from './Mensajes/MensajeActExito';
import MensajeActError from './Mensajes/MensajeActError';
import DocentesActualizar from './Administrador/Registrar/docentes/DocentesActualizar';
import MensajeDatExito from './Mensajes/MensajeDatExito';
import MensajeDatError from './Mensajes/MensajeDatError';
import PasswordResetForm from './Login/PasswordResetForm';
import MensajeNoEncontrado from './Mensajes/MensajeNoEncontrado';
import { AmbientesDis } from './Usuario/Ambientes/AmbientesDis';
import MisSolicitudes from './Usuario/Mis_Solicitudes/MisSolicitudes';
import AyudaAdmin from './Administrador/Ayuda/AyudaAdmin';
import Configuraciones from './Administrador/Configuraciones/Configuraciones';
import SolicitarCon1 from './Usuario/SolicitudesConjuntas/SolicitarCon1';
import MensajeConfExitoso from './Mensajes/MensajeConfExitoso';
import MensajeConfError from './Mensajes/MensajeConfError';
import Asignar_ambiente from './Administrador/Solicitudes/Asignar_Ambientes/Asignar_ambiente';
import AmbientesSol from './Administrador/Solicitudes/Ambientes_Disponibles/AmbientesSol';
import Informe from './Administrador/Informe/Informe';
import Calendario from './Login/Calendario';

export {
  React,Router,Routes,Route,HomeUno,Ambientes,Docentes,Navbar,RegistrarMateria,
  LoginForm,RegistrarDiaHora, NarbarUsuario, HomeDos, ListaSolicitudes, Solicitar
  ,ListaAulas, MensajeExitoso, MensajeError,ListaDocentes,RegistrarDiaHoras,AmbientesActualizar,
  Footer,ListaMaterias,MensajeExitosoU,MensajeErrorU,MensajeActExito,MensajeActError
  ,DocentesActualizar,MensajeDatExito,MensajeDatError,ListaSolicitudesUr,Navigate,PasswordResetForm,
  MensajeNoEncontrado,AmbientesDis,AmbientesSol,MisSolicitudes,AyudaAdmin,Configuraciones,SolicitarCon1,
  MensajeConfExitoso,MensajeConfError,Asignar_ambiente,Calendario,Informe
};
