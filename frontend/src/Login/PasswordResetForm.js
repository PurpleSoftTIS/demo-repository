import React, { useState, useContext } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css";

const PasswordResetForm = () => {
  const { emailC, setUrole } = useContext(UserContext);
  const [nuevopd, setNuevopd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorPwdVacio, setErrorPwdVacio] = useState("");
  const [errorPwdMinLength, setErrorPwdMinLength] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePwdreset = async (e) => {
    e.preventDefault();
    setErrorPwdVacio("");
    setErrorPwdMinLength("");

    if (!nuevopd) {
      setErrorPwdVacio("Por favor, ingrese una contraseña");
      return;
    }

    if (nuevopd.length < 6) {
      setErrorPwdMinLength("Minimo 6 caracteres");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/restablecercontrasena", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: emailC, nuevopwd: nuevopd }),
      });

      if (!response.ok) {
        throw new Error("La solicitud al servidor falló");
      }

      const data = await response.json();
      console.log(data.message);

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUrole(null);
    navigate("/"); 
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-box">
        <h6 className="mb-0 pb-3 text-center">Introduce tu nueva contraseña</h6>
        <div className="form-group">
          <span className="input-icon"><FaLock /></span>
          <input
            type={showPassword ? 'text' : 'password'}
            name="logpass"
            className="form-control"
            placeholder="Nueva contraseña"
            value={nuevopd}
            onChange={(e) => setNuevopd(e.target.value)}
            style={{ paddingRight: '40px' }}
          />
          {errorPwdVacio && <p className="error2">{errorPwdVacio}</p>}
          {errorPwdMinLength && <p className="error2">{errorPwdMinLength}</p>}
          {/* Botón para alternar la visibilidad de la contraseña */}
          <button className="toggle-password" type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="mb-0 pb-3 text-center">
          <button className="btn-block" onClick={handlePwdreset}>Restablecer</button>
        </div>
      </div>
      {isModalOpen && (
        <div className="password-reset-modal-overlay">
          <div className="password-reset-modal-content">
            <h4>Registro Exitoso</h4>
            <p>¡Tu contraseña ha sido cambiada exitosamente!</p>
            <button className="password-reset-modal-btn" onClick={handleModalClose}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordResetForm;