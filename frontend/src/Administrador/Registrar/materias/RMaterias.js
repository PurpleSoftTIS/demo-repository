import React, { useEffect, useState  } from 'react'
import "./RMaterias.css";
import { useParams, useNavigate } from 'react-router-dom';

const RegistrarMateria = () => {
  const [docentes, setDocentes] = useState([]);
  const [showAddCarreraModal, setShowAddCarreraModal] = useState(false);
  const [nuevaCarreraNombre, setNuevaCarreraNombre] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carreras, setCarreras] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_materia: '',
    codigo_materia: '',
    id_docente: '',
    grupo: '',
    id_carrera: '',
  });
  
  useEffect(() => {
    // Si hay un ID en la URL, es una solicitud de edición, por lo que cargamos los datos de la materia
    if (id) {
      fetch(`http://127.0.0.1:8000/api/materias/${id}`)
        .then(response => response.json())
        .then(data => {
          setFormData(data); // Actualizando el estado con los datos de la materia
        })
        .catch(error => console.error('Error fetching materia:', error));
    } else {
      // Si no hay ID en la URL, es una solicitud de registro, así que inicializamos los campos del formulario
      setFormData({
        nombre_materia: '',
        codigo_materia: '',
        id_docente: '',
        grupo: '',
        id_carrera: '',
      });
    }
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      // Mostrar errores
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const url = id ? `http://127.0.0.1:8000/api/materias/${id}` : 'http://127.0.0.1:8000/api/materiaRegistrar';
      const method = id ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log(`Materia ${id ? 'actualizada' : 'registrada'} correctamente`);
        // Aquí podrías agregar lógica adicional después de registrar o actualizar la materia
        setErrors({});
        setFormData({
          nombre_materia: '',
          codigo_materia: '',
          id_docente: '',
          grupo: '',
          id_carrera: '',
        });
        navigate("/Admin/Mensaje/RegistroExitoso");
      } else {
        console.error(`Error al ${id ? 'actualizar' : 'registrar'} materia`);
        navigate("/Admin/Mensaje/RegistroError");
      }
    } catch (error) {
      console.error(`Error al ${id ? 'actualizar' : 'registrar'} materia:`, error);
      navigate("/Admin/Mensaje/RegistroError");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAddCarrera = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/carreraRegistrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_carrera: nuevaCarreraNombre }),
      });
      if (response.ok) {
        console.log('Carrera registrada correctamente');
        setShowAddCarreraModal(false);
        setNuevaCarreraNombre('');
        setFormData({id_carrera: '',});
        cargarCarreras();
      } else {
        console.error('Error al registrar carrera');
      }
    } catch (error) {
      console.error('Error al registrar carrera:', error);
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    // Validar campos vacíos
    for (const key in formData) {
      if (!formData[key]) {
        errors.general = 'Por favor llene todos los campos';
        break;
      }
    }

    // Validar nombre de la materia
    if (formData.nombre_materia && !/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/.test(formData.nombre_materia)) {
      errors.nombre_materia = 'Solo se aceptan caracteres alfanuméricos';
    } else if (formData.nombre_materia.length > 50) {
      errors.nombre_materia = 'Máximo 50 caracteres para el nombre';
    }

    // Validar código de la materia
    if (formData.codigo_materia && !/^\d+$/.test(formData.codigo_materia)) {
      errors.codigo_materia = 'Solo se permiten valores numéricos';
    } else if (formData.codigo_materia.length > 15) {
      errors.codigo_materia = 'Máximo 15 caracteres para el código';
    }

    // Validar grupo
    if (formData.grupo && !/^[a-zA-Z0-9\s]+$/.test(formData.grupo)) {
      errors.grupo = 'Solo se aceptan caracteres alfanuméricos';
    } else if (formData.grupo.length > 10) {
      errors.grupo = 'Máximo 10 caracteres para el grupo';
    }

    // Validar carrera
    if (formData.id_carrera === 'añadir' || formData.id_carrera === '' ) {
      errors.id_carrera = 'Por favor seleccione una carrera';
    }

    return errors;
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/docentes')
      .then(response => response.json())
      .then(data => {
        setDocentes(data);
      })
      .catch(error => console.error('Error fetching docentes:', error));
  }, []);

  const cargarCarreras = () => {
    fetch('http://127.0.0.1:8000/api/carreras')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCarreras(data);
      })
      .catch(error => console.error('Error fetching carreras:', error));
  };
  
  useEffect(() => {
    cargarCarreras();
  }, []);

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
      <form onSubmit={handleSubmit}>
      <div className="billing-info2" data-animate-on-scroll>
        <button className="backon-button" type="button" onClick={() => navigate(-1)}></button>
        <div className="checkout-frame">
          <div className="checkout4">{id ? 'Editar Materia' : 'Registrar Materia'}</div>
        </div>
        <div className="input-parent2">
          <div className="input19">
            <div className="label-here11">{`Nombre de la Materia: `}</div>
            <input
                className={`input20 ${errors.nombre_materia ? 'error-border' : ''}`}
                placeholder="Nombre Materia"
                type="text"
                name="nombre_materia"
                value={formData.nombre_materia}
                onChange={handleInputChange}
              />
              {errors.nombre_materia && <span className="error-message">{errors.nombre_materia}</span>}
          </div>
          <div className="input19">
            <div className="label-here11">Codigo:</div>
            <input
                className={`input20 ${errors.codigo_materia ? 'error-border' : ''}`}
                placeholder="1803001"
                type="text"
                name="codigo_materia"
                value={formData.codigo_materia}
                onChange={handleInputChange}
              />
              {errors.codigo_materia && <span className="error-message">{errors.codigo_materia}</span>}
          </div>
          <div className="input19">
            <div className="label-here11">Docente designado:</div>
            <select
              className="input24"
              name="id_docente"
              value={formData.id_docente}
              onChange={handleInputChange}
            >
              <option value="">Sin Designar</option>
              {docentes.map((docente, index) => (
                <option key={index} value={docente.id_docente}>{docente.nombre_completo}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="input19">
          <div className="label-here11">{`Grupo: `}</div>
          <input
            className={`input20 ${errors.grupo ? 'error-border' : ''}`}
            placeholder="1"
            type="text"
            name="grupo"
            value={formData.grupo}
            onChange={handleInputChange}
          />
          {errors.grupo && <span className="error-message">{errors.grupo}</span>}
        </div>
        <div className="input19">
          <div className="label-here11">Carrera:</div>
          <select
            className={`input24 ${errors.carrera ? 'error-border' : ''}`}
            name="id_carrera"
            value={formData.id_carrera}
            onChange={(e) => {
              if (e.target.value === 'añadir') {
                setShowAddCarreraModal(true);
              } else {
                setShowAddCarreraModal(false); // Cerrar el modal si se selecciona una carrera existente
                setFormData({
                  ...formData,
                  id_carrera: e.target.value // Actualizar el estado con la carrera seleccionada
                });
              }
              handleInputChange(e); // Llamar a la función handleInputChange para manejar los cambios en el formulario
            }}
          >
            <option value="">Seleccione una Carrera</option>
            {carreras.map((carrera, index) => (
              <option key={index} value={carrera.id_carrera}>{carrera.nombre_carrera}</option>
            ))}
            <option value="añadir">Añadir carrera...</option>
          </select>
          {errors.id_carrera && <span className="error-message">{errors.id_carrera}</span>}
        </div>
        {errors.general && <div className="error-message">{errors.general}</div>}
      </div>
      <div className="checkout5" data-animate-on-scroll>
        <button className="button22" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="button-cta22">
              {id ? 'Editando...' : 'Registrando...'}
              </div>
          ) : (
            <div className="button-cta22">
              {id ? 'Editar Materia' : 'Registrar Materia'}
            </div>
          )}
        </button>
      </div>
      </form>
      {showAddCarreraModal && (
        <div className="modal add-carrera-modal">
          <div className="modal-content">
            <span className="close" onClick={() => {
              setShowAddCarreraModal(false);
              setFormData(prevState => ({ ...prevState, id_carrera: '' }));
            }}>&times;</span>
            <h2>Agregar carrera</h2>
            <input type="text" value={nuevaCarreraNombre} onChange={(e) => setNuevaCarreraNombre(e.target.value)} />
            <button onClick={handleAddCarrera}>Agregar</button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarMateria;