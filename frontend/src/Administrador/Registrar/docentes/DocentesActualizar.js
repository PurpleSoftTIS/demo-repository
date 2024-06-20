import React, { useEffect, useState } from "react";
import "./Docentes.css"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const DocentesActualizar = () => {

  const { state: datos } = useLocation();
  const id_docente = datos ? datos.id_docente:null;
  const [nombres, setNombres] = useState(datos ? datos.nombre : null);
  const [apellidoPaterno, setApellidoPaterno] = useState(datos ? datos.apellido_paterno : null);
  const [apellidoMaterno, setApellidoMaterno] = useState(datos ? datos.apellido_materno : null);
  const [correo, setCorreo] = useState(datos ? datos.correo_electronico : null);
  const [codigoDocente, setCodigoDocente] = useState(datos ? datos.codigo_docente : null);
  const [tipo, setTipo] = useState(datos ? datos.tipo_docente : null);
    
  const [codigoDocenteDisabled, setCodigoDocenteDisabled] = useState(false);
  const [errorNombres, setErrorNombres] = useState("");
  const [errorApellidoPaterno, setErrorApellidoPaterno] = useState("");
  const [errorApellidoMaterno, setErrorApellidoMaterno] = useState("");
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const navigate = useNavigate();

  const handleActualizacionDocente = (e) => {
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
    }

    const tipoNumero = /^\d+$/;
    const caracteresEspeciales = /[!#$%^&*()_+\-{};':"|,<>?]+/;

    if (tipoNumero.test(nombres)) {
      setErrorNombres("❌ Por favor, ingresa solo caracteres alfabéticos y espacios en el nombre");
      return;
    } else {
      if (nombres.length > 30) {
        setErrorNombres("❌ Su nombre no debe exceder los 30 caracteres");
        return;
      } else {
        setErrorNombres("");
      }
      setErrorNombres("");
    }
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

    if (correo.length > 30) {
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
    }else{
        setErrorCorreo("");
    }

    const datosDocente = {
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      tipo,
      codigoDocente
    };

    console.log("Datos a enviar:", datosDocente);

    fetch(`http://127.0.0.1:8000/api/docentes/${id_docente}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosDocente)
        })
        .then(response => {
          if (response.ok) {
            console.log('Datos actualizados correctamente');
            navigate("/Admin/Mensaje/ActualizacionExitosa");
          } else {
            console.error('Error al actualizar los datos del docente');
            navigate("/Admin/Mensaje/ErrorActualizacion")
          }
        })
        .catch(error => {
          console.error('Error al enviar la solicitud PUT:', error);
          navigate("/Admin/Mensaje/ErrorActualizacion")
          // Aquí puedes manejar cualquier error que ocurra al enviar la solicitud
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
    <div className="contact-6" style={{ height: '94.4vh' }}>
      <div className="line" />
        <form className="billing-info" data-animate-on-scroll>
        <button className="backon-button" type="button" onClick={() => navigate(-1)}></button>
          <div className="checkout-wrapper">
            <div className="checkout">Actualizar de Docentes</div>
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
          <button className="button" onClick={handleActualizacionDocente}>
          <div className="button-cta">Actualizar Docente</div>
          </button>
        </div>
      </div>
   );
};
export default DocentesActualizar;
