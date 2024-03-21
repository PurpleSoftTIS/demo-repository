import { useEffect } from "react";
import "./Docentes.css";

const Docentes = () => {
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
          <div className="input">
            <div className="label-here">Nombres</div>
            <input className="input1" placeholder="Nombres" type="text" />
          </div>
          <div className="input-group">
            <div className="input2">
              <div className="label-here1">Apellido Paterno</div>
              <input className="input3" placeholder="ApPaterno" type="text" />
            </div>
            <div className="input2">
              <div className="label-here1">Apellido Materno</div>
              <input className="input3" placeholder="ApMaterno" type="text" />
            </div>
          </div>
          <div className="input">
            <div className="label-here">Correo</div>
            <input
              className="input3"
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
                  <input className="frame-input" type="checkbox" />
                  <div className="cotton-blend">De Base</div>
                </div>
              </div>
              <div className="frame-container">
                <div className="frame-group">
                  <input className="rectangle-input" type="checkbox" />
                  <div className="cotton-blend">Invitado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="input">
          <div className="label-here">Codigo Docente</div>
          <input className="input3" placeholder="19849465" type="text" />
        </div>
      </div>
      <div className="checkout1" data-animate-on-scroll>
        <button className="button">
          <div className="button-cta">Registrar Docente</div>
        </button>
      </div>
    </div>
  );
};

export default Docentes;
