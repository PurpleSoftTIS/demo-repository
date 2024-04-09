import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars,FaAt, FaLock } from "react-icons/fa"; 
import { Collapse, Row,Col,Container } from "react-bootstrap";
import logo from "../assets/logoSIS.png";
import logop from "../assets/logosol-1@2x.png";
import "./LoginForm.css";
import Ico1 from "../assets/IconosLan/IcoCssL.png";
import Ico2 from "../assets/IconosLan/IcoHtmlL.png";
import Ico3 from "../assets/IconosLan/IcoJavascriptL.png";
import Ico4 from "../assets/IconosLan/IcoLaravelL.png";
import Ico5 from "../assets/IconosLan/IcoPostL.png";
import Ico6 from "../assets/IconosLan/IcoReactL.png";
import Ico7 from "../assets/IconosLan/IcoFacultad.png";
import Ico8 from "../assets/IconosLan/IcoFacultadEscudo.png";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
const navigate = useNavigate();

  const [menuClicked, setMenuClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValido, setEmailValido] = useState(false);
  const correoElectronico = email;

  const handleSubmit = (e) => {
    e.preventDefault();
   
    fetch("http://127.0.0.1:8000/api/verificar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo_electronico: email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al verificar el correo electrónico");
      }
      return response.json();
    })
    .then((data) => {
        if (data.exists) {
            console.log("El correo electrónico existe");
            setEmailValido(true);
            
        } else {
            if (email === "purpleSoft@gmail.com") {
                navigate("/Admin/Inicio/HomeUno");
            } else {
                navigate(emailValido ? "/Usuario/Inicio/HomeDos" : "/");
            }
            console.log("El correo electrónico no existe");
            setEmailValido(false);
            
        }
    })
    .catch((error) => {
      console.error(error);
    });

 
  navigate("/Usuario/Inicio/HomeDos", { state: correoElectronico });


  };

  return (
    <div className="hero-6">
        <div>
            <nav className="navbar navbar-expand-lg nav-bare">
                <Link to="/" className="navbar-brand logon">
                    <img className="image-1-icon" alt="logo" src={logo} />
                    <span className="ovonrueden">SIRA</span>
                </Link>
                <button className={`navbar-toggler ${menuClicked ? "active" : ""}`}
                    type="button"
                    onClick={() => {
                    setMenuClicked(!menuClicked);
                    setMenuOpen(!menuOpen);
                    }}
                    aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon menu-icono">
                <FaBars />
                 </span>
                </button>
                    <Collapse in={menuOpen}>
                        <div className="navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto menus">
                                <li className="nav-item">
                                    <button className="nav-link pricing">Acerca de</button>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link pricing" href="https://www.umss.edu.bo/" target="_blank" rel="noreferrer">UMSS</a> 
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link pricing" href="http://www.fcyt.umss.edu.bo/" target="_blank" rel="noreferrer">FCYT</a> 
                                </li>
                            </ul>
                        </div>
                    </Collapse>
            </nav>
        </div>
        <h2 className="Titulo-inicio">Sistema de Reservacion de Ambientes FCyT</h2>
        <h4 className="Mensaje">Plataforma de gestión de reservas para ambientes de la FCYT, diseñada para docentes y autoridades de la Universidad Mayor de San Simón</h4>
        <div className="content">  
            <Row className="justify-content-center">
                <Col md={6} className="mb-3" > 
                    <Container>
                        <Row className="justify-content-center">
                            <Col xs={12} sm={10} md={8} lg={6}> {/* Define el ancho del formulario en diferentes tamaños de pantalla */}
                                <div className="login-box">
                                    <div className="section">
                                        <h6 className="mb-0 pb-3 text-center">Inicia sesión</h6>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <span className="input-icon"><FaAt /></span>
                                                <input 
                                                    type="email"
                                                    name="logemail"
                                                    className="form-control"
                                                    placeholder="Tu Correo"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                             <div className="form-group">
                                                <span className="input-icon"><FaLock /></span>
                                                <input
                                                    type="password"
                                                    name="logpass"
                                                    className="form-control"
                                                    placeholder="Tu Contraseña"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                
                                            </div>
                                            <div className="mb-0 pb-3 text-center">
                                            <button className="btn-block" onClick={handleSubmit}> Ingresar </button>
                                         
                                            </div>
                                            <p className="mt-3 text-center">
                                                    <Link to="/forgot-password" className="link">¿Olvidaste tu Contraseña?</Link>
                                                </p>
                                           
                                        </form>
                                        
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={6} className="mb-3">
                    <div className="d-flex justify-content-center align-items-center imagen" style={{ height: '100%' }}>
                        <img src={logop} alt="imagen comp" className="img-fluid" />
                        <img className="vector-icon" alt="" src="/vector.svg"></img>
                         
                    </div>
                </Col>
            </Row>
        </div>
        <footer className="mainfooter2"> 
                <div className="footer2"> 
                    <div className="description2"> 
                        <ul className="text">
                            <p>
                                "SIRA FCYT "<br></br>
                                "Diseño y Desarrollo de PurpleSoft -TIS "<br></br>
                                "TIS - Taller de Ingenieria de Software " <br></br>
                                "UMSS - Universidad Mayor de San Simón "<br></br>
                                "Copyright © 2024 PurpleSoft Todos los Derechos Reservados"
                            </p> 
                        </ul>
                        <div className="logos2">
                            <a href="http://www.fcyt.umss.edu.bo/" target="_blank" rel="noreferrer">
                                <img className="iconos2" src={Ico7} alt="logo" width="35px" height="35px" /> 

                            </a>
                            <a href="https://www.umss.edu.bo/" target="_blank" rel="noreferrer">
                                <img className="iconos2" src={Ico8} alt="logo" width="35px" height="35px" /> 
                            </a> 
                        </div>
                    </div>
                    <div className="iconosTec2"> 
                        <img className="iconos2" src={Ico1} alt="logo" width="40px" height="40px" /> 
                        <img className="iconos2" src={Ico2} alt="logo" width="40px" height="40px" /> 
                        <img className="iconos2" src={Ico3} alt="logo" width="40px" height="40px" /> 
                        <img className="iconos2" src={Ico4} alt="logo" width="40px" height="40px" /> 
                        <img className="iconos2" src={Ico5} alt="logo" width="40px" height="40px" /> 
                        <img className="iconos2" src={Ico6} alt="logo" width="40px" height="40px" /> 
                    </div>
                </div>
            </footer>

    </div>
  );
};

export default LoginForm;

