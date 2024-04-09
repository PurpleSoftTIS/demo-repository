import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import "./Ambientes.css";

const Ambientes = () => {
  const navigate = useNavigate();
  const [nombreAula, setNombreAula] = useState("");
  const [capacidadEstudiantes, setCapacidadEstudiantes] = useState("");
  const [edificio, setEdificio] = useState("");
  const [piso, setPiso] = useState("");
  const [Tipo, setTiPo] = useState("");

  const [errorNombreAula, setErrorNombreAula] = useState("");
  const [errorCapacidadEst, setErrorCapacidadEst] = useState("");
  const [errorEdificio, setErrorEdificio] = useState("");
  const [errorPiso, setErrorPiso] = useState("");
  const [errorTipoAmbiente,setErrorTipoAmbiente] = useState("");
  const [errorInconpleto, setErrorIncompleto] = useState("");
  const handleRegistroAmbiente = () => {
    if (!nombreAula || !capacidadEstudiantes || !edificio || !piso || !Tipo) {
      setErrorIncompleto("❌ Por favor, complete todos los campos del formulario");
      return;
    }else{
      setErrorNombreAula("");
      setErrorCapacidadEst(""); 
      setErrorEdificio("");
      setErrorPiso("");
      setErrorTipoAmbiente("")
    } 
    const tipoCadena = /^[a-zA-Z\s]*$/;
    const tipoNumero = /^\d+$/;
    const tipoGlobal = /^[a-zA-Z0-9]*$/;


    if (!tipoGlobal.test(nombreAula)) {
      setErrorNombreAula("❌ Por favor, ingresa solo caracteres alfanumericos en el nombre de ambiente");
      return;
    } else {
      if(nombreAula.length > 10){
        setErrorNombreAula("❌ El nombre del ambiente no debe exceder los 10 caracteres");
        return;
      }else{
        setErrorNombreAula("");
      }
      setErrorNombreAula("");
    }
    if (!tipoNumero.test(capacidadEstudiantes)) {
      setErrorCapacidadEst("❌Por favor, ingresa solo caracteres numericos en la capacidad del ambiente");
      return;
    } else {
      if(capacidadEstudiantes > 300){
        setErrorCapacidadEst("❌ La capcidad del ambiente no debe exceder las 300 unidades");
        return;
      }else{
        setErrorCapacidadEst("");
      }
      setErrorCapacidadEst("");
    }

    if (!tipoCadena.test(edificio)) {
      setErrorEdificio("❌ Por favor, ingresa solo caracteres alfabéticos y espacios en el nombre del edificio");
      return;
    } else {
      if(edificio.length > 40){
        setErrorEdificio("❌ El nombre del edificio no debe exceder los 40 caracteres");
        return;
      }else{
        setErrorEdificio("");
      }    
      setErrorEdificio("");
    }

    if (!tipoGlobal.test(piso)) {
      setErrorPiso("❌ El piso no debe contener caracteres especiales");
      return;
    } else {
      if(piso.length > 2){
        setErrorPiso("❌ El piso no debe eexceder los 2 caracteres");
        return;
        }else{
          setErrorPiso("");
        }    
        setErrorPiso("");
    }

    if (!tipoCadena.test(Tipo)) {
      setErrorTipoAmbiente("❌ El tipo de ambiente no debe contener caracteres numeros");
      return;
    } else {
      if(Tipo.length > 70){
        setErrorTipoAmbiente("❌ El tipo de ambiente no debe excesder los 70 caracteres ");
        return;
        }else{
          setErrorTipoAmbiente("");
        }    
        setErrorTipoAmbiente("");
    }

    // Crear el objeto de datos a enviar al servidor
    const datosAmbiente = {
      nombreAula,
      capacidadEstudiantes,
      edificio,
      piso,
      Tipo
    };

    console.log("Datos a enviar:", datosAmbiente);

    setNombreAula("");
    setCapacidadEstudiantes("");
    setEdificio("");
    setPiso("");
    setTiPo("");
    navigate("/Admin/Registro/DiaHora", { state: datosAmbiente });
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
    <div className="contact-4" style={{ height: '76.1vh' }}>
      <from className="billing-info1" data-animate-on-scroll>
        <div className="checkout-container">
          <h3 className="checkout2">Registro de Ambientes</h3>
        </div>
        <div className="frame-div">
          <div className="input111">
            <div className="label-here6">Numero de Aula</div>
            <input className="input12" placeholder="690E" type="text" onChange={(e) => setNombreAula(e.target.value)}/>
            {errorNombreAula && <p className="error">{errorNombreAula}</p>}

          </div>
          <div className="input111">
            <div className="label-here6">Capacidad de Estudiantes</div>
            <input className="input13" placeholder="90" type="text" onChange={(e) => setCapacidadEstudiantes(e.target.value)}/>
            {errorCapacidadEst && <p className="error">{errorCapacidadEst}</p>}

          </div>
          <div className="label-here8">Ubicacion</div>
          <div className="input-parent1">
            <div className="input15">
              <div className="label-here8">Edificio</div>
              <input className="input16" placeholder="Nombre del edificio" type="text"  onChange={(e) => setEdificio(e.target.value)}/>
              {errorEdificio && <p className="error">{errorEdificio}</p>}

            </div>
            <div className="input17">
              <div className="label-here10">Piso</div>
                <input
                  className="input18"
                  placeholder="1"
                  type="text"
                  value={piso}
                  onChange={(e) => setPiso(e.target.value)}
                />
                {errorPiso && <p className="error">{errorPiso}</p>}
            
              </div>
          </div>
          <div className="input111">
            <div className="label-here6">Tipo de Aula</div>
            <input className="input-ta" placeholder="Aula comun, Laboratorio" type="text" value={Tipo}
                onChange={(e) => setTiPo(e.target.value)}/>
            {errorTipoAmbiente && <p className="error">{errorTipoAmbiente}</p>}

            {errorInconpleto && <p className="error">{errorInconpleto}</p>}

          </div>
        </div>
      </from>
      <div className="line1" />
      <div className="checkout3" data-animate-on-scroll>
      <button className='button2'>
          <NavLink className="button-cta1" to='/Admin/Listas/ListaAmbientes' activeclassname="active">Atras</NavLink>        
        </button>
        <button className="button1" onClick={handleRegistroAmbiente}>
          <div className="button-cta1">Siguiente Paso</div>
        </button>
        
      </div>
    </div>
  );
};

export default Ambientes;