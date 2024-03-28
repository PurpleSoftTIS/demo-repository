import React from 'react';
import "./LoginForm.css"
import { FaAt, FaLock} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import logo from "../assets/logoSIS.png";

const LoginForm = () => {
    return (
        <div className="body-cont">
            <div>
                <Link to="/" className="logo"> 
                    <img src={logo} alt="" /> 
                </Link>
                <div style={{ height: '10vh' }}></div>
                <div className="section">
                    <div className="container-fluid d-flex justify-content-center align-items-center full-height">
                        <div className="row full-height justify-content-center">
                            <div className="col-12 text-center align-self-center py-5">
                                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                    <h6 className="mb-0 pb-3" style={{ paddingLeft: '85px' }}>
                                        <span className="option">Inicia sesión</span>
                                        <span> </span>
                                        <span className="option">Recuperar Contraseña</span>
                                    </h6>
                                    <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                    <label htmlFor="reg-log"></label>
                                    <div className="card-3d-wrap mx-auto">
                                        <div className="card-3d-wrapper">
                                            <div className="card-front">
                                                <div className="center-wrap">
                                                    <div className="section text-center">
                                                        <h4 className="mb-4 pb-3">Inicio sesión</h4>
                                                        <div className="form-group">
                                                            <input type="email" name="logemail" className="form-style" placeholder="Tu Correo" id="logemail" autoComplete="off" />
                                                            <FaAt className="input-icon" />
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="password" name="logpass" className="form-style" placeholder="Tu Contraseña" id="logpass" autoComplete="off" />
                                                            <FaLock className="input-icon" />
                                                        </div>
                                                        <Link to="/inicio/HomeUno">
                                                            <div className="botones mt-4" >Ingresar</div>
                                                        </Link>
                                                        <p className="mb-0 mt-4 text-center"><a href="#0" className="link">¿Olvidaste tu Contraseña?</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-back">
                                                <div className="center-wrap">
                                                    <div className="section text-center">
                                                        <h4 className="mb-4 pb-3">Recuperar Contraseña</h4>
                                                        <div className="form-group">
                                                            <input type="email" name="logemail" className="form-style" placeholder="Correo Institucional" id="logemail1" autoComplete="off" />
                                                            <FaAt className="input-icon" />
                                                        </div>
                                                        <button className="botones mt-4" >Enviar Codigo</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;