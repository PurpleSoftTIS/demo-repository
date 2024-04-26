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
  const [contraseñaValido, setContraseñaValido] = useState(false);

  const correoElectronico = email;
  const [login0, setIsVisible] = useState(false);
  const [logRecuperacion, setInvisible] = useState(true);
  const [mostrarIniciar , setIniciar] = useState(true);
  const [mostrarRestablecer, setMostrarRestablecer] = useState(false);

  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const [errorEmailValido, setErrorEmailValido] = useState("");
  const [errorContraseñaValido, setErrorContraseñaValido] = useState("");

  const toggleVisibility = () => {

    setIsVisible(!login0); 
    setInvisible(!logRecuperacion);
    setIniciar(!mostrarIniciar);
    setMostrarRestablecer(!mostrarRestablecer);
  };
  const toggleVisibility2 = () =>{
    setIsVisible(!login0); 
    setInvisible(!logRecuperacion);
    setIniciar(!mostrarIniciar);
    setMostrarRestablecer(!mostrarRestablecer);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password ) {
        setErrorIncompleto("Por favor, complete todos los campos");
        return;
      }else{
        setErrorCorreo("");
        setErrorPassword(""); 
        setErrorIncompleto("");
        setContraseñaValido("");
        setErrorEmailValido("");
        setErrorContraseñaValido("");
      } 
      const caracteresEspeciales = /[!#$%^&*()_+\-{};':"|,<>?]+/;

    if (email.length > 30) {
        setErrorCorreo("Su correo no debe exceder los 30 caracteres");
        return;
    }else{
        setErrorCorreo("");
    }    
    if (caracteresEspeciales.test(email)) {
        setErrorCorreo("Su correo debe contener caracteres especiales, excepto @");
        return;
    }else{
        setErrorCorreo("");
    }    
    if (!email.includes('@')) {
        setErrorCorreo("Su correo debe contener @");
        return;
    }else{
        setErrorCorreo("");
    }
    if(caracteresEspeciales.test(password)){
        setErrorPassword("Su contraseña no debe contener caracteres especiales");
      return;
    }else{
        setErrorPassword("");
    }
    if(password.length > 20){
        setErrorPassword("Su contraseña no debe eccerder los 20 caracteres ");
      return;
    }else{
        setErrorPassword("");
    }


    if (email === "purpleSoft@gmail.com" && password === "purplesoft2024") {
        navigate("/Admin/Inicio/HomeUno");
    }else{
        if(email === "purpleSoft@gmail.com" && password !== "purplesoft2024"){
            setErrorContraseñaValido("Contraseña incorrecta")
        }else{
            fetch("http://127.0.0.1:8000/api/verificarCre", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo_electronico: email, contraseña: password }),
            })       
            .then((response) => {
                
                if (!response.ok) {
                    setErrorEmailValido("Ingrese una cuenta valida");

                    throw new Error("La solicitud al servidor falló");
                }

                return response.json(); // Convertir la respuesta a JSON
            })
            .then((data) => {
                if (data && typeof data === 'object') {
                    if (!data.exists) {
                        console.log("El correo electrónico no existe");
                        setEmailValido(false);
                    } else if (!data.correcta) {
                        setErrorEmailValido("");
                        setEmailValido(true);
                        setErrorContraseñaValido("Contraseña incorrecta");
                        setContraseñaValido(false);
                    } else {
                        setEmailValido(true);
                        setContraseñaValido(true);
                        setErrorEmailValido("");
                        setErrorContraseñaValido("");
                        const credencialesValidas = emailValido && contraseñaValido;
                        const rutaRedireccion = credencialesValidas ? "/Usuario/Inicio/HomeDos" : "/";
                        const estadoRedireccion = { state: correoElectronico };
                        navigate(rutaRedireccion, estadoRedireccion);
                    }
                } else {
                    console.error("La respuesta del servidor es inválida");
                }
            })
            .catch((error) => {
                console.error("Error en la solicitud:", error);
            });
                    
                    }                
                }  
                
                
    
};
const handleSubmitRestablecer = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/enviar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    })
    .then(response => {
        if (response.ok) {
            console.log('Correo electrónico enviado correctamente');
        } else {
            console.error('Error al enviar correo electrónico');
        }
    })
    .catch(error => {
        console.error('Error de red:', error);
    });
};

  return (
    <div className="hero-6" style={{ height: '100vh' }}>
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
        <h2 className="Titulo-inicio">Sistema de Reservación de Ambientes FCyT</h2>
        <h4 className="Mensaje">Plataforma de gestión de reservas para ambientes de la FCYT, diseñada para docentes y autoridades de la Universidad Mayor de San Simón</h4>
        <div className="content">  
            <Row className="justify-content-center">
                <Col md={6} className="mb-3" > 
                    <Container>
                        <Row className="justify-content-center">
                            <Col xs={12} sm={10} md={8} lg={6}> {/* Define el ancho del formulario en diferentes tamaños de pantalla */}
                                <div className="login-box">
                                    <div className="section">
                                    {mostrarIniciar && (
                                            <h6 className="mb-0 pb-3 text-center" id="Iniciar">Iniciar sesión</h6>)}
                                        <form className="login0"onSubmit={handleSubmit} style={{ display: logRecuperacion ? 'block' : 'none' }}>
                                            <div className="form-group">
                                                <span className="input-icon"><FaAt /></span>
                                                <input 
                                                    type="email"
                                                    name="logemail"
                                                    className="form-control"
                                                    placeholder="Ingrese su correo"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {errorCorreo && <p className="error2">{errorCorreo}</p>}
                                                {errorEmailValido && <p className="error2">{errorEmailValido}</p>}


                                            </div>
                                             <div className="form-group">
                                                <span className="input-icon"><FaLock /></span>
                                                <input
                                                    type="password"
                                                    name="logpass"
                                                    className="form-control"
                                                    placeholder="Ingrese su contaraseña"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                {errorPassword && <p className="error2">{errorPassword}</p>}
                                                {errorContraseñaValido && <p className="error2">{errorContraseñaValido}</p>}

                                                {errorInconpleto && <p className="error2">{errorInconpleto}</p>}                                                
                                            </div>
                                            <div className="mb-0 pb-3 text-center">
                                            <button className="btn-block" onClick={handleSubmit}> Ingresar </button>                                         
                                            </div>
                                                <p className="mt-3 text-center">
                                                    <button  onClick={toggleVisibility} className="olvidar">¿Olvidaste tu Contraseña?</button>
                                                </p>                                           
                                        </form>
                                        {mostrarRestablecer && (
                                            <h6 className="mb-0 pb-3 text-center" id="Reestablecer">Restablecer Contraseña</h6>)}
                                              <form className="logRecuperacion"onSubmit={handleSubmit} style={{ display: login0 ? 'block' : 'none' }} >
                                                        <div className="form-group">
                                                            <span className="input-icon"><FaAt /></span>
                                                            <input 
                                                                type="email"
                                                                name="logemail"
                                                                className="form-control"
                                                                placeholder="Correo Institucional"
                                                                id="logemail1" 
                                                                autoComplete="off"
                                                                value={email}

                                                            />
                                            </div>
                                            <div className="mb-0 pb-3 text-center">
                                                <button className="btn-block"  onClick={handleSubmitRestablecer}>Enviar Codigo</button>
                                         
                                            </div>
                                            <p className="mt-3 text-center">
                                                    <button  onClick={toggleVisibility2} className="olvidar">Iniciar sesión</button>
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
                    </div>
                </Col>
            </Row>
        </div>
        <footer className="mainfooter2"> 
                <div className="footer2"> 
                    <div className="description2"> 
                            <p className="textoDos">
                                "SIRA FCYT "<br></br>
                                "Diseño y Desarrollo de PurpleSoft -TIS "<br></br>
                                "TIS - Taller de Ingenieria de Software " <br></br>
                                "UMSS - Universidad Mayor de San Simón "<br></br>
                                "Copyright © 2024 PurpleSoft Todos los Derechos Reservados"
                            </p> 
                       
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
                                
