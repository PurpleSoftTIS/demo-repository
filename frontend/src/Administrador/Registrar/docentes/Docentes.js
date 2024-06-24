import React, { useEffect, useState } from "react";
import "./Docentes.css";
import { useNavigate } from "react-router-dom";

const Docentes = () => {
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [codigoDocente, setCodigoDocente] = useState("");
  const [tipo, setTipo] = useState("De Base");
  const [codigoDocenteDisabled, setCodigoDocenteDisabled] = useState(false);

  const [errorNombres, setErrorNombres] = useState("");
  const [errorApellidoPaterno, setErrorApellidoPaterno] = useState("");
  const [errorApellidoMaterno, setErrorApellidoMaterno] = useState("");
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
  const navigate = useNavigate();

  const handleRegistroDocente = (e) => {
    e.preventDefault();
    
    const nombres = document.querySelector(".input11").value.trim();
    const apellidoPaterno = document.querySelector(".input122").value.trim();
    const apellidoMaterno = document.querySelector(".input133").value.trim();
    const correo = document.querySelector(".input-ta").value.trim();
    const codigoDocente = document.querySelector(".input16").value.trim();

    if (!nombres || !apellidoPaterno || !apellidoMaterno || !correo || !tipo || !codigoDocente) {
      setErrorIncompleto("❌ Por favor, completa todos los campos del formulario");
      return;
    } else {
      setErrorIncompleto("");
      setErrorNombres("");
      setErrorCodigo("");
      setErrorCorreo("");
    }

    const tipoNumero = /^\d+$/;
    const caracteresEspeciales = /[!#$%^&*()_+\-{};':"|,<>?]+/;

    if (tipoNumero.test(nombres) && (caracteresEspeciales.test(nombres))) {
      setErrorNombres("Por favor, ingresa solo caracteres alfabéticos y espacios en el nombre");
      return;
    } 
    
    if (nombres.length < 3) {
      setErrorNombres("❌ Su nombre debe tener al menos 3 caracteres");
      return;
    } else if (nombres.length > 30) {
      setErrorNombres("❌ Su nombre no debe exceder los 30 caracteres");
      return;
    } else {
        setErrorNombres("");
      }
      setErrorNombres("");
    
    if (tipoNumero.test(apellidoPaterno)) {
      setErrorApellidoPaterno("❌Por favor, ingresa solo caracteres alfabéticos y espacios en el apellido paterno");
      return;
    } else {
      if (nombres.length > 30) {
        setErrorNombres("❌ Su apellido apterno no debe exceder los 30 caracteres");
        return;
      } else {
        setErrorNombres("");
      }
      setErrorNombres("");
    }
    if (tipoNumero.test(apellidoMaterno)) {
      setErrorApellidoMaterno("❌ Por favor, ingresa solo caracteres alfabéticos y espacios en el apellido materno");
      return;
    } else {
      if (nombres.length > 30) {
        setErrorNombres("❌ Su apellido materno no debe exceder los 30 caracteres");
        return;
      } else {
        setErrorNombres("");
      }
      setErrorNombres("");
    }

    if ((tipo === "De Base" && !tipoNumero.test(codigoDocente))) {
      setErrorCodigo("❌ El código docente solo puede contener números.");
      return;
    } else {
      setErrorCodigo("");
    }

    const correoPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/;
    if (correo.length > 50) {
        setErrorCorreo("Su correo no debe exceder los 30 caracteres");
        return;
    }else{
        setErrorCorreo("");
    }    
    if (caracteresEspeciales.test(correo)) {
        setErrorCorreo("Su correo debe contener caracteres especiales, excepto @");
        return;
    }else{
        setErrorCorreo("");
    }    
    if (!correo.includes('@')) {
        setErrorCorreo("Su correo debe contener @");
        return;
    } else if (!correoPattern.test(correo)) {
      setErrorCorreo("Su correo debe terminar con un punto seguido de letras (por ejemplo, .com, .net, .edu)");
      return;
    }else{
        setErrorCorreo("");
    }

    const datosDocente = {
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      tipo,
      codigoDocente, // Enviar el código encriptado
    };

    console.log("Datos a enviar:", datosDocente);

    setLoading(true); // Iniciar la carga

    fetch("http://127.0.0.1:8000/api/docentesRegistrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosDocente)
    })
      .then(response => {
        console.log("Respuesta del servidor:", response);
        return response.json();
      })
      .then(data => {
        console.log("Registro exitoso:", data);
        setNombres("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setCorreo("");
        setCodigoDocente("");
        setLoading(false); // Detener la carga
        navigate("/Admin/Mensaje/RegistroExitoso");
      })
      .catch(error => {
        console.error("Error al registrar el ambiente:", error);
        setLoading(false); // Detener la carga en caso de error
        navigate("/Admin/Mensaje/RegistroError");
      });
  };

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
    if (e.target.value === "Invitado") {
      setCodigoDocente("");
      setCodigoDocenteDisabled(true);
    } else {
      setCodigoDocenteDisabled(false);
    }
  };

  return (
    <div className="contact-6" style={{ height: '810px' }}>
      <div className="line" />
      <form className="billing-info" data-animate-on-scroll>
        <button className="backon-button" type="button" onClick={() => navigate(-1)}></button>
        <div className="checkout-wrapper">
          <div className="checkout">Registro de Docentes</div>
        </div>
        <div className="input-parent">
          <div className="inputi">
            <div className="label-here">Nombres</div>
            <input className="input11" placeholder="Nombres" type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} />
            {errorNombres && <p className="error">{errorNombres}</p>}
          </div>
          <div className="input-group">
            <div className="input2">
              <div className="label-here">Apellido Paterno</div>
              <input className="input122" placeholder="ApPaterno" type="text" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
              {errorApellidoPaterno && <p className="error">{errorApellidoPaterno}</p>}
            </div>
            <div className="input2">
              <div className="label-here">Apellido Materno</div>
              <input className="input133" placeholder="ApMaterno" type="text" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
              {errorApellidoMaterno && <p className="error">{errorApellidoMaterno}</p>}
            </div>
          </div>
          <div className="inputi">
            <div className="label-here">Correo</div>
            <input
              className="input-ta"
              placeholder="docente@docente.com"
              type="text"
              value={correo} onChange={(e) => setCorreo(e.target.value)}
            />
            {errorCorreo && <p className="error">{errorCorreo}</p>}
          </div>
        </div>
        <div className="input-container">
          <div className="input8">
            <div className="label-here">Tipo</div>
          </div>
          <div className="filter-02">
            <div className="frame-parent">
              <div className="frame-container">
                <div className="frame-group">
                  <input type="radio" id="deBase" name="tipo" value="De Base" className="input15 radio-personalizado" checked={tipo === "De Base"} onChange={handleTipoChange} />
                  <label htmlFor="deBase" className="cotton-blend"><i className="fas fa-check"></i> De Base</label>
                </div>
              </div>
              <div className="frame-container">
                <div className="frame-group">
                  <input type="radio" id="invitado" name="tipo" value="Invitado" className="input15 radio-personalizado" checked={tipo === "Invitado"} onChange={handleTipoChange} />
                  <label htmlFor="invitado" className="cotton-blend"><i className="fas fa-check"></i> Invitado</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`inputi ${codigoDocenteDisabled ? "disabled-input" : ""}`}>
          <div className="label-here">Codigo Docente</div>
          <input className="input16" placeholder="19849465" type="text" value={codigoDocente} disabled={tipo === "Invitado"} onChange={(e) => setCodigoDocente(e.target.value)} />
          {errorCodigo && <p className="error">{errorCodigo}</p>}
        </div>
        {errorInconpleto && <p className="error">{errorInconpleto}</p>}
      </form>
      <div className="checkout1" data-animate-on-scroll>
        <button
          className="button22"
          onClick={handleRegistroDocente}
          disabled={loading} // Deshabilitar botón durante la carga
          style={{ cursor: loading ? 'default' : 'pointer' }} // Cambiar el cursor según el estado de carga
        >
          <div className="button-cta">
            {loading ? "Registrando..." : "Registrar Docente"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Docentes;
