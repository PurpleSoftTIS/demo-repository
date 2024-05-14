import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Docentes = () => {
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [codigoDocente, setCodigoDocente] = useState("");
  const [tipo, setTipo] = useState("De Base"); 
  const [codigoDocenteDisabled, setCodigoDocenteDisabled] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [docentes, setDocentes] = useState([]);

  const [errorNombres, setErrorNombres] = useState("");
  const [errorApellidoPaterno, setErrorApellidoPaterno] = useState("");
  const [errorApellidoMaterno, setErrorApellidoMaterno] = useState("");
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/obtenerDocentes")
      .then((response) => response.json())
      .then((data) => setDocentes(data))
      .catch((error) => console.error(error));
  }, []);

  const docentesFiltrados = docentes.filter(
    (docente) =>
      docente.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
      docente.apellidoPaterno.toLowerCase().includes(busqueda.toLowerCase()) ||
      docente.apellidoMaterno.toLowerCase().includes(busqueda.toLowerCase()) ||
      docente.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
      docente.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      docente.codigoDocente.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleRegistroDocente = (e) => {
    
    e.preventDefault();
    const nombres = document.querySelector(".input11").value.trim();
    const apellidoPaterno = document.querySelector(".input12").value.trim();
    const apellidoMaterno = document.querySelector(".input13").value.trim();
    const correo = document.querySelector(".input14").value.trim();
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
  
    if (nombres.length > 30) {
      setErrorNombres("❌ Su nombre no debe exceder los 30 caracteres");
      return;
    } else {
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
    } else {
      setErrorCorreo("");
    }    
  
    if (caracteresEspeciales.test(correo)) {
      setErrorCorreo("Su correo debe contener caracteres especiales, excepto @");
      return;
    } else {
      setErrorCorreo("");
    }    
  
    if (!correo.includes('@')) {
      setErrorCorreo("Su correo debe contener @");
      return;
    } else {
      setErrorCorreo("");
    }
  
    const datosDocente = {
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      tipo,
      codigoDocente,
    };
  
    console.log("Datos a enviar:", datosDocente);
  
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

          navigate("/Admin/Mensaje/RegistroExitoso");
        // Aquí puedes mostrar un mensaje de éxito o redirigir a otra página
      })
      .catch(error => {
        console.error("Error al registrar el ambiente:", error);
        navigate("/Admin/Mensaje/RegistroError")
      });
  };

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll("[data-animate-on-scroll]");
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
          <div className="checkout">Registro de Docentes</div>
        </div>
        <div className="input-parent">
          {/* Los campos existentes del formulario... */}
        </div>
        <div className="input-container">
          {/* Más campos del formulario... */}
        </div>
        <div className="busqueda-container">
          <input
            type="text"
            placeholder="Buscar docente"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        {docentesFiltrados.map((docente) => (
          <div key={docente.id}>
            <p>Nombre: {docente.nombres}</p>
            <p>Apellido Paterno: {docente.apellidoPaterno}</p>
            <p>Apellido Materno: {docente.apellidoMaterno}</p>
            <p>Correo: {docente.correo}</p>
            <p>Tipo: {docente.tipo}</p>
            <p>Código Docente: {docente.codigoDocente}</p>
          </div>
        ))}
        <div className="checkout1" data-animate-on-scroll>
          <button className="button" onClick={handleRegistroDocente}>
            <div className="button-cta">Registrar Docente</div>
          </button>
        </div>
      </form>
      <div className="checkout1" data-animate-on-scroll>
        <button className="button22" onClick={handleRegistroDocente}>
        <div className="button-cta">Registrar Docente</div>
        </button>
      </div>
    </div>
  );
};

export default Docentes;
