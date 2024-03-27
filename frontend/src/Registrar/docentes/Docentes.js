import { useEffect } from "react";
import "./Docentes.css";

const Docentes = () => {
 
  const handleRegistroDocente = () => {
    // Obtener los valores de los campos del formulario
    const nombres = document.querySelector(".input11").value;
    const apellidoPaterno = document.querySelector(".input12").value;
    const apellidoMaterno = document.querySelector(".input13").value;
    const correo = document.querySelector(".input14").value;
    let tipo = " ";
    if (document.querySelector(".input15").value === "") {
      tipo = document.querySelector(".input15_2").value;
    } else {
      tipo = document.querySelector(".input15").value;
    }

    const codigoDocente = document.querySelector(".input16").value;

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
  


  return (
    <div className="contact-6">
      <div className="line" />
      <div className="billing-info" data-animate-on-scroll>
        <div className="checkout-wrapper">
          <div className="checkout">Registro de Docentes</div>
        </div>
        <div className="input-parent">
          <div className="input1">
            <div className="label-here">Nombres</div>
            <input className="input11" placeholder="Nombres" type="text" />
          </div>
          <div className="input-group">
            <div className="input2">
              <div className="label-here1">Apellido Paterno</div>
              <input className="input12" placeholder="ApPaterno" type="text" />
            </div>
            <div className="input2">
              <div className="label-here1">Apellido Materno</div>
              <input className="input13" placeholder="ApMaterno" type="text" />
            </div>
          </div>
          <div className="input">
            <div className="label-here">Correo</div>
            <input
              className="input14"
              placeholder="docente@docente.com"
              type="text"
            />
          </div>
        </div>
        <div className="input-container">
          <div className="input8">
            <div className="label-here">Tipo</div>
          </div>
          <div className="filter-02">
            <div className="frame-parent">
              <div className="frame-wrapper">
                <div className="frame-group">
                  <input className="input15_2" type="checkbox" />
                  <div className="cotton-blend">De Base</div>
                </div>
              </div>
              <div className="frame-container">
                <div className="frame-group">
                  <input className="input15" type="checkbox" />
                  <div className="cotton-blend">Invitado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="input">
          <div className="label-here">Codigo Docente</div>
          <input className="input16" placeholder="19849465" type="text" />
        </div>
      </div>
      <div className="checkout1" data-animate-on-scroll>
        <button className="button" onClick={handleRegistroDocente}>
          <div className="button-cta">Registrar Docente</div>
        </button>
      </div>
    </div>
  );
};

export default Docentes;