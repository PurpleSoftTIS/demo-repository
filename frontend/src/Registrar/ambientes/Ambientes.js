import React, { useEffect } from "react";
import "./Ambientes.css";

const Ambientes = () => {
  const handleRegistroAmbiente = () => {
    // Obtener los valores de los campos del formulario
    const numeroAula = document.querySelector(".input12").value;
    const capacidadEstudiantes = document.querySelector(".input12").value;
    const edificio = document.querySelector(".input16").value;
    const piso = document.querySelector(".input18").value;
  
    // Crear el objeto de datos a enviar al servidor
    const datosAmbiente = {
      numeroAula,
      capacidadEstudiantes,
      edificio,
      piso
    };
  
    console.log("Datos a enviar:", datosAmbiente); // Imprimir los datos a enviar
    
    // Enviar los datos al servidor utilizando fetch
    fetch("http://localhost:8000/api/registrarambiente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosAmbiente)
    })
      .then(response => {
        console.log("Respuesta del servidor:", response); // Imprimir la respuesta del servidor
        return response.json();
      })
      .then(data => {
        // Manejar la respuesta del servidor
        console.log("Registro exitoso:", data);
        // Aquí puedes mostrar un mensaje de éxito o redirigir a otra página
      })
      .catch(error => {
        console.error("Error al registrar el ambiente:", error);
        // Aquí puedes mostrar un mensaje de error al usuario
      });
 
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
          <div className="input11">
            <div className="label-here6">Numero de Aula</div>
            <input className="input12" placeholder="690E" type="text" />
          </div>
          <div className="input11">
            <div className="label-here6">Capacidad de Estudiantes</div>
            <input className="input12" placeholder="90" type="text" />
          </div>
          <div className="label-here8">Ubicacion</div>
          <div className="input-parent1">
            <div className="input15">
              <div className="label-here8">Edificio</div>
              <input className="input16" placeholder="Nombre del edificio" type="text" />
            </div>
            <div className="input17">
              <div className="label-here10">Piso</div>
              <input className="input18" placeholder="1" type="text" />
            </div>
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

