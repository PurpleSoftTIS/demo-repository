import React, { useEffect } from 'react'
import "./RMaterias.css";

const RegistrarMateria = () => {
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
    <div className="contact-14">
      <div className="line2" />
      <div className="billing-info2" data-animate-on-scroll>
        <div className="checkout-frame">
          <div className="checkout4">Registro de Materia</div>
        </div>
        <div className="input-parent2">
          <div className="input19">
            <div className="label-here11">{`Nombre de la Materia: `}</div>
            <input className="input20" placeholder="Nombres" type="text" />
          </div>
          <div className="input19">
            <div className="label-here11">Codigo:</div>
            <input className="input20" placeholder="1803001" type="text" />
          </div>
          <div className="input19">
            <div className="label-here11">Docente designado:</div>
            <select className="input24" />
          </div>
        </div>
        <div className="input19">
          <div className="label-here11">{`Grupo: `}</div>
          <input className="input20" placeholder="1" type="text" />
        </div>
      </div>
      <div className="checkout5" data-animate-on-scroll>
        <button className="button2">
          <div className="button-cta2">Registrar Materia</div>
        </button>
      </div>
    </div>
  );
};

export default RegistrarMateria