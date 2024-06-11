import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars,FaAt, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa"; 
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
import { UserContext } from "../Context/UserContext";
import { NavLink } from 'react-router-dom';


const LoginForm = () => {
const navigate = useNavigate();   
const { setEmailC, setUserC, setUrole} = useContext(UserContext);
const [showPassword, setShowPassword] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const correoElectronico = email;
  const [codigov, setCodigov ] = useState("");
  const [mostrarIniciar , setIniciar] = useState(true);
  const [mostrarRestablecer, setMostrarRestablecer] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const [errorEmailValido, setErrorEmailValido] = useState("");
  const [errorContraseñaValido, setErrorContraseñaValido] = useState("");
  const [errorCorreoVacio, setErrorCorreoVacio] = useState("");
  const [errorCorreoNoExiste, setErrorCorreoNoExiste] = useState("");
  const [errorCodigoVacio, setErrorCodigoVacio] = useState("");
  const [errorCodigoNoExiste, setErrorCodigoNoExiste] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => {
    setIniciar(!mostrarIniciar);
    setMostrarRestablecer(!mostrarRestablecer);
  };
  const toggleVisibility2 = () =>{
    setIniciar(!mostrarIniciar);
    setMostrarRestablecer(!mostrarRestablecer);
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleVisibility3 = () =>{
    setCorreoEnviado(false);
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
        sessionStorage.setItem('role', 'admin');
        setUrole('admin');
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
                    } else if (!data.correcta) {
                        setErrorEmailValido("");
                        setErrorContraseñaValido("Contraseña incorrecta");
                    } else {
                        sessionStorage.setItem('user', data.nombre);
                        sessionStorage.setItem('email', correoElectronico);
                        sessionStorage.setItem('role', 'user');
                        setEmailC(correoElectronico);
                        setUserC(data.nombre);
                        setUrole('user');
                        setErrorEmailValido("");
                        setErrorContraseñaValido("");
                        console.log("Nombre de usuario:", data.nombre);
                        console.log("Correo electrónico:", correoElectronico);
                        const rutaRedireccion = "/Usuario/Inicio/HomeDos" ;
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
    const handleSubmitRestablecer = async (e) => {
        e.preventDefault();
        setErrorCorreoVacio("");
        setErrorCorreoNoExiste("");

        if (!email) {
            setErrorCorreoVacio("Por favor, ingrese su correo electrónico");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/enviarcorreo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo: email }), 
            });
            if (response.ok) {
                console.log("Correo electrónico enviado correctamente", email);
                setCorreoEnviado(true);
                setLoading(false);
            } else {
                const responseData = await response.json();
                if (responseData && responseData.message === "Usuario no encontrado") {
                    setErrorCorreoNoExiste("Correo electrónico no Registrado ");
                } else {
                    throw new Error("Error al enviar el correo");
                }
            }
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            setLoading(false);
            alert('No se pudo establecer conexión SMTP. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleSubmitCodigo = async (e) => {
        e.preventDefault();
        setErrorCodigoVacio("");
        setErrorCodigoNoExiste("");
        if (!codigov) {
            setErrorCodigoVacio("Por favor, ingrese el código");
            return;
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/api/verificarCodigo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ codigo: codigov }), 
            });
    
            if (!response.ok) {
                throw new Error("La solicitud al servidor falló");
            }
    
            const data = await response.json();
    
            if (data && data.id_usuario) {
                // Actualizar el contexto con el id_usuario y el role
                setUrole('rest');
                setEmailC(data.id_usuario);
                console.log("Id_usuario:", data.id_usuario);
                navigate("/Rest/password");
            } else {
                setErrorCodigoNoExiste("Código inválido");
            }
        } catch (error) {
            setErrorCodigoNoExiste("Código inválido");
        }
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
                                    <NavLink className="nav-link pricing" to='/Calendario' activeclassname="active">Calendario</NavLink>        
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
                <div className="contenido" > 
                    <div className="DatosLogin">
                        <Row className="justify-content-center">
                            <Col xs={12} sm={10} md={8} lg={6}> {/* Define el ancho del formulario en diferentes tamaños de pantalla */}
                                <div className="login-box">
                                    <div className="section">
                                    {mostrarIniciar && !correoEnviado && (
                                    <div className="contenidoo">
                                        <h6 className="mb-0 pb-3 text-center" id="Iniciar">Iniciar sesión</h6>
                                        <form className="login0" onSubmit={handleSubmit}>
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
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="logpass"
                                                    className="form-control"
                                                    placeholder="Ingrese su contraseña"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    style={{ paddingRight: '40px' }}
                                                    autoComplete="new-password"
                                                />
                                                {/* Botón para alternar la visibilidad de la contraseña */}
                                                <button className="toggle-password" type="button" onClick={togglePasswordVisibility}>
                                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                </button>
                                                {errorPassword && <p className="error2">{errorPassword}</p>}
                                                {errorContraseñaValido && <p className="error2">{errorContraseñaValido}</p>}
                                                {errorInconpleto && <p className="error2">{errorInconpleto}</p>}                                                
                                            </div>
                                            <div className="mb-0 pb-3 text-center">
                                                <button className="btn-block" onClick={handleSubmit}> Ingresar </button>                                         
                                            </div>                                        
                                        </form>
                                        <p className="mt-3 text-center">
                                            <button  onClick={toggleVisibility} className="olvidar">¿Olvidaste tu Contraseña?</button>
                                        </p>   
                                    </div>)}
                                    {mostrarRestablecer && !correoEnviado && (
                                        <div className="contenidoo">
                                            <h6 className="mb-0 pb-3 text-center" id="Reestablecer">Reestablecer Contraseña</h6>
                                            <form className="logRecuperacion">
                                                        <div className="form-group">
                                                            <span className="input-icon"><FaAt /></span>
                                                            <input 
                                                                type="email"
                                                                name="logemail"
                                                                className="form-control"
                                                                placeholder="Correo electronico"
                                                                id="logemail1" 
                                                                autoComplete="off"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                            {errorCorreoVacio && <p className="error2">{errorCorreoVacio}</p>}
                                                            {errorCorreoNoExiste && <p className="error2">{errorCorreoNoExiste}</p>}
                                                        </div>
                                                        <div className="mb-0 pb-3 text-center">
                                                        <button className="btn-block" onClick={handleSubmitRestablecer} disabled={loading}>
                                                            {loading ? <FaSpinner className="spinner-icon" /> : 'Enviar Código'}
                                                        </button>
                                                        </div>                                    
                                            </form>   
                                            <p className="mt-3 text-center">
                                                <button  onClick={toggleVisibility2} className="olvidar">Iniciar sesión</button>
                                            </p>
                                        </div>)}
                                        {correoEnviado && (
                                        <div className="contenidoo">
                                            <h6 className="mb-0 pb-3 text-center" id="Codigo">Codigo enviado</h6>
                                            <form className="logRecuperacion">
                                                    <div className="form-group">
                                                        <span className="input-icon"><FaLock /></span>
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="logpass"
                                                            className="form-control"
                                                            placeholder="Ingrese el codigo"
                                                            value={codigov}
                                                            onChange={(e) => setCodigov(e.target.value)}
                                                            style={{ paddingRight: '40px' }}
                                                            autoComplete="new-password"
                                                        />
                                                        {errorCodigoVacio && <p className="error2">{errorCodigoVacio}</p>}
                                                        {errorCodigoNoExiste && <p className="error2">{errorCodigoNoExiste}</p>}
                                                        {/* Botón para alternar la visibilidad de la contraseña */}
                                                        <button className="toggle-password" type="button" onClick={togglePasswordVisibility}>
                                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                        </button>
                                                    </div>
                                                    <div className="mb-0 pb-3 text-center">
                                                        <button className="btn-block"  onClick={handleSubmitCodigo}>Reestablecer</button>
                                                    </div>                                    
                                            </form>   
                                            <p className="mt-3 text-center">
                                                <button  onClick={toggleVisibility3} className="olvidar">Volver Atrás</button>
                                            </p>
                                        </div>)}                                             
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Col md={6} className="mb-3">
                    <div className="d-flex justify-content-center align-items-center imagen" style={{ height: '100%' }}>
                        <img src={logop} alt="imagen comp" className="imagen" width={"550px"} height={"550px"} />                         
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