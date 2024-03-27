import { useCallback } from "react";
import "./Landing.css";
import { Link } from 'react-router-dom';
import logo from "../assets/logoSIS.png"

const Landing = () => {
  const onPricingClick = useCallback(() => {
    window.location.href = "https://www.umss.edu.bo/";
  }, []);

  const onSupportClick = useCallback(() => {
    window.location.href = "http://www.fcyt.umss.edu.bo/";
  }, []);

  const onImage2Click = useCallback(() => {
    window.location.href = "http://www.fcyt.umss.edu.bo/";
  }, []);

  const onImage3Click = useCallback(() => {
    window.location.href = "https://www.umss.edu.bo/";
  }, []);

  return (
    <div className="hero-06">
      <div className="nav-bare">
        <button className="logon">
          <img className="image-1-icon" alt="logo" src={logo}/>
          <div className="ovonrueden">SIRA</div>
        </button>
        <div className="menus">
          <button className="about">Acerca de</button>
          <button className="about">Reservas</button>
          <button className="pricing" onClick={onPricingClick}>
            UMSS
          </button>
          <button className="pricing" onClick={onSupportClick}>
            FCYT
          </button>
        </div>
      </div>
      <div className="content">
        <div className="heading-logo">
          <div className="heading-cta">
            <div className="heading-text">
              <div className="find-the-most">
                Sistema de gestion y Reserva de Ambientes. SIRA.
              </div>
              <div className="vestibulum-placerat">
                Plataforma de gestion de reservas para ambientes de la FCYT,
                diseñada para docentes y autoridades de la Universidad Mayor de San Simón
              </div>
            </div>
            <button className="cta-button">
              <Link to="/Login" className="cta-02">
                <div className="get-started-for">{`Inicia Sesión `}</div>
              </Link>
            </button>
          </div>
          <div className="logo-cloud">
            <div className="heading">DESARROLLADO PARA:</div>
            <div className="logos">
              <button className="image-2" onClick={onImage2Click} />
              <button className="image-3" onClick={onImage3Click} />
            </div>
          </div>
        </div>
        <div className="design-parent">
          <div className="design">
            <img className="vector-icon" alt="" src="/vector.svg" />
          </div>
          <img className="frame-icon" alt="" src="/frame.svg" />
        </div>
      </div>
      <footer className="image" />
    </div>
  );
};

export default Landing;