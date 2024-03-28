import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./Ambientes.css";

const Ambientes = () => {
  const navigate = useNavigate();
  const [nombreAula, setNombreAula] = useState("");
  const [capacidadEstudiantes, setCapacidadEstudiantes] = useState("");
  const [edificio, setEdificio] = useState("");
  const [piso, setPiso] = useState("");
  const [Tipo, setTiPo] = useState("");

  const handleRegistroAmbiente = () => {
    // Crear el objeto de datos a enviar al servidor
    const datosAmbiente = {
      nombreAula,
      capacidadEstudiantes,
      edificio,
      piso,
      Tipo
    };

    console.log("Datos a enviar:", datosAmbiente);

    
    navigate("/Registro/DiaHora", { state: datosAmbiente });
  };


  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15
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

  return (
    <div className="contact-4">
      <div className="billing-info1" data-animate-on-scroll>
        <div className="checkout-container">
          <h3 className="checkout2">Registro de Ambientes</h3>
        </div>
        <div className="frame-div">
          <div className="input111">
          <div className="input111">
            <div className="label-here6">Numero de Aula</div>
            <input className="input12" placeholder="690E" type="text" onChange={(e) => setNombreAula(e.target.value)}/>
          </div>
          <div className="input111">
          <div className="input111">
            <div className="label-here6">Capacidad de Estudiantes</div>
            <input className="input13" placeholder="90" type="text" onChange={(e) => setCapacidadEstudiantes(e.target.value)}/>
          </div>
          <div className="label-here8">Ubicacion</div>
          <div className="input-parent1">
            <div className="input15">
              <div className="label-here8">Edificio</div>
              <input className="input16" placeholder="Nombre del edificio" type="text"  onChange={(e) => setEdificio(e.target.value)}/>
            </div>
            <div className="input17">
              <div className="label-here10">Piso</div>
              <input
                className="input18"
                placeholder="1"
                type="text"
                value={piso}
                onChange={(e) => setPiso(e.target.value)}
              />            </div>
          </div>
          <div className="input111">
            <div className="label-here6">Tipo de Aula</div>
            <input className="input-ta" placeholder="Aula comun, Laboratorio" type="text" value={Tipo}
                onChange={(e) => setTiPo(e.target.value)}/>
          </div>
        </div>
      </div>
      <div className="line1" />
      <div className="checkout3" data-animate-on-scroll>
        <button className="button1" onClick={handleRegistroAmbiente}>
          <div className="button-cta1">Siguiente Paso</div>
        </button>
      </div>
    </div>
  );
};

export default Ambientes;