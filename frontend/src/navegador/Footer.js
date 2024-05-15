import React from 'react';
import ico1 from '../assets/iconCss.png';
import ico2 from '../assets/iconHtml.png';
import ico3 from '../assets/iconJavascript.png';
import ico4 from '../assets/iconLaravel.png';
import ico5 from '../assets/iconPostgres.png';
import ico6 from '../assets/iconReact.png';
import ico7 from '../assets/iconHome.png';
import ico8 from '../assets/iconReload.png';
import './Footer.css'
import {useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();

  const reloadPage = () => {
    window.location.reload();
  };


const homePage = () => {
     navigate("/"); 
  };
  return (
    <footer className='mainfooter'>
      <div className='footer'>
        <div className='description'>
          <p className='text'>
            © 2024 PupleSoft Todos los Derechos reservados
          </p>            
        </div>
        <div className='HomeReload'>
        <button className="iconos" onClick={homePage}>         
          <img className="" src={ico7} alt="logo" width='40px' height='40px'/>
        </button>
          <button className="iconos" onClick={reloadPage}>         
            <img className="" src={ico8} alt="logo" width='40px' height='40px' />
          </button>
        </div>
        <div className='iconosTec'>
          <img className="iconos" src={ico1} alt="logo" width='40px' height='40px' />
          <img className="iconos" src={ico2} alt="logo" width='40px' height='40px' />
          <img className="iconos" src={ico3} alt="logo" width='40px' height='40px' />
          <img className="iconos" src={ico4} alt="logo" width='40px' height='40px' />
          <img className="iconos" src={ico5} alt="logo" width='40px' height='40px' />
          <img className="iconos" src={ico6} alt="logo" width='40px' height='40px' />            
        </div>
      </div>
    </footer>  
  );
}