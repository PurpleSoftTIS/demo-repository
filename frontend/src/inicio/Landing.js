import React from 'react';
import "./Landing.css";
import { Link } from 'react-router-dom';
import logo from "../assets/logoSIS.png"
import logop from "../assets/logosol-1@2x.png"

const Landing = () => {

  return (
    <div className="hero-06">
      <div className="nav-bare">
        <button className="logon">
          <img className="image-1-icon" alt="logo" src={logo}/>
          <div className="ovonrueden">SIRA</div>
        </button>
        <div className="menus">
          <button className="about">Acerca de</button>
          <a className="pricing" href="https://www.umss.edu.bo/" target="_blank" rel="noreferrer">UMSS</a>
          <a className="pricing" href="http://www.fcyt.umss.edu.bo/" target="_blank" rel="noreferrer">FCYT</a>
        </div>
      </div>
      <div className="content">
        <div className="heading-logo">
          <div className="heading-cta">
            <div className="heading-text">
              <div className="find-the-most">
                Sistema de gestión y Reserva de Ambientes. SIRA.
              </div>
              <div className="vestibulum-placerat">
                Plataforma de gestión de reservas para ambientes de la FCYT,
                diseñada para docentes y autoridades de la Universidad Mayor de San Simón
              </div>
            </div>
            <button className="cta-button">
              <Link to="/Login" className="cta-02">
                <div className="get-started-for">Inicia Sesión</div>
              </Link>
            </button>
          </div>
          <div className="logo-cloud">
            <div className="heading">DESARROLLADO PARA:</div>
            <div className="logos">
              <a href="http://www.fcyt.umss.edu.bo/" target="_blank" rel="noreferrer"><button className="image-2" /></a>
              <a href="https://www.umss.edu.bo/" target="_blank" rel="noreferrer"><button className="image-3" /></a>
            </div>
          </div>
        </div>
        <div className="design-parent">
          <div className="design">
            <img className="vector-icon" alt="" src="/vector.svg" />
          </div>
          <img className="logo-sol-1-icon" alt="" src={logop} />
        </div>
      </div>
      <footer className="image" />
    </div>
  );
};

export default Landing;
