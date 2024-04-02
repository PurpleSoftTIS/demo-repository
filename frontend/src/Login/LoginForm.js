import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars,FaAt, FaLock } from "react-icons/fa"; 
import { Collapse, Row,Col,Container } from "react-bootstrap";
import logo from "../assets/logoSIS.png";
import logop from "../assets/logosol-1@2x.png";
import "./LoginForm.css";

const LoginForm = () => {
  const [menuClicked, setMenuClicked] = useState(false);

  const onPricingClick = useCallback(() => {
    window.location.href = "https://www.umss.edu.bo/";
  }, []);

  const onSupportClick = useCallback(() => {
    window.location.href = "http://www.fcyt.umss.edu.bo/";
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
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
                                    <button className="nav-link about">Acerca de</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link pricing" onClick={onPricingClick}>UMSS</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link pricing" onClick={onSupportClick}>FCYT</button>
                                </li>
                            </ul>
                        </div>
                    </Collapse>
            </nav>
        </div>
        <div className="content">
            <Row className="justify-content-center">
                <Col md={6} > 
                    <Container>
                        <Row className="justify-content-center">
                            <Col xs={12} sm={10} md={8} lg={6}> {/* Define el ancho del formulario en diferentes tamaños de pantalla */}
                                <div className="login-box">
                                    <div className="section">
                                        <h6 className="mb-0 pb-3 text-center">Inicia sesión</h6>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name="logemail"
                                                    className="form-control"
                                                    placeholder="Tu Correo"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <FaAt className="input-icon" />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    name="logpass"
                                                    className="form-control"
                                                    placeholder="Tu Contraseña"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <FaLock className="input-icon" />
                                               
                                                
                                            </div>
                                            <button className="btn btn-primary btn-block">Ingresar</button>
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
                <Col md={6}> {/* La segunda columna ocupará la mitad del ancho en dispositivos medianos y superiores */}
                    <div>Contenido de la segunda columna</div>
                </Col>
            </Row>
        </div>
    </div>
  );
};

export default LoginForm;
