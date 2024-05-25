import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ListaSolicitudes.css';

const ListaSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudesTodas, setSolicitudesTodas] = useState([]);
  const [solicitudesPendientes, setSolicitudesPendientes] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [mostrarFormularioCon, setMostrarFormularioCon] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarSolicitudesTodass, setMostrarSolicitudesTodas] = useState(false);
  const [show, setShow] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [selectedOption, setSelectedOption] = useState(""); 
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const [docente, setDocente] = useState("");
  const [aulas, setAulas] = useState(""); 
  const [formularioData, setFormData] = useState({
    Docente: "",
    Materia: "",
    Grupo: "",
    Aula: "",
    Capacidad: "",
    Fecha: "",
    Hora: "",
    Motivo: "",
    Tipo_de_solicitud: ""
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const aceptarsolicitud = (id_solicitud) => {
      fetch(`http://127.0.0.1:8000/api/aceptarsolicitud/${id_solicitud}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Error al cambiar el estado de la solicitud');
              }
              console.log('Solicitud actualizada:', response);
              return response.json();
          })
          .then((data) => {
              console.log('Datos de la solicitud actualizada:', data);
          })
          .catch((error) => {
              console.error(error);
          });
  };

  const rechazarsolicitud= (id_solicitud) => {
    fetch(`http://127.0.0.1:8000/api/rechazarsolicitud/${id_solicitud}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al cambiar el estado de la solicitud');
            }
            console.log('Solicitud actualizada:', response);
            return response.json();
        })
        .then((data) => {
            console.log('Datos de la solicitud actualizada:', data);
        })
        .catch((error) => {
            console.error(error);
        });
  };
  useEffect(() => {
    const capacidad = 200;
    const dia = 'Lunes'; 
    const horarios = [
        { hora_inicio: '8:15', hora_fin: '9:45' },
       
    ];
    const horariosJSON = JSON.stringify(horarios);

    
    fetch(`http://127.0.0.1:8000/api/ambientesDisponibles/${capacidad}/${dia}/${horariosJSON}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al obtener los ambientes disponibles');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Ambientes disponibles:', data);
    })
    .catch((error) => {
        console.error('Error al obtener los ambientes disponibles:', error);
    });
    
  
  
  
  }, []);

  useEffect(() => {
      fetch('http://127.0.0.1:8000/api/obtenerSol', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          setSolicitudes(data);
          setSolicitudesPendientes(data);
          
          console.log("datos",data);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  


  const [mostrarOpciones, setMostrarOpciones] = useState(false); // Estado para controlar la aparición de los botones "Todas" y "Pendientes"

  const mostrarFormularioParaSolicitud = (solicitud) => {
      if(solicitud.tipo_solicitud ==="individual"){
        setFormData({
          docente: solicitud.nombre,
          materia: solicitud.nombre_materia,
          grupo: solicitud.grupo,
          aula: solicitud.nombre_ambiente,
          capacidad: solicitud.numero_estudiantes,
          tipo_de_solicitud: solicitud.tipo_solicitud,
          fecha: solicitud.fecha_solicitud,
          hora: solicitud.hora_inicio,
          motivo: solicitud.motivo
        });
        setMostrarFormulario(true);
        setMostrarFormularioCon(false);

      }else{
        setFormData({
          docente: solicitud.nombre,
          materia: solicitud.nombre_materia,
          grupo: solicitud.grupo,
          aula: solicitud.nombre_ambiente,
          capacidad: solicitud.numero_estudiantes,
          tipo_de_solicitud: solicitud.tipo_solicitud,
          fecha: solicitud.fecha_solicitud,
          hora: solicitud.hora_inicio,
          motivo: solicitud.motivo
        });
        setMostrarFormulario(true);
        setMostrarFormularioCon(false);

        setDocente(solicitud.nombre); 
        setAulas(solicitud.nombre_ambiente); 
      
      }
      
  };

  const cerrarFormulario = () => {
      setMostrarFormulario(false);
  };
  const filtrarSolicitudes = () => {
    let solicitudesFiltradas = solicitudesPendientes; // Filtrar las solicitudes pendientes
    if (motivo !== '') {
      solicitudesFiltradas = solicitudesPendientes.filter(solicitud => {
        return solicitud.motivo.toLowerCase().includes(motivo.toLowerCase());
      });
    }
  
    solicitudesFiltradas.sort((a, b) => {
      const fechaA = new Date(a.fecha_solicitud);
      const fechaB = new Date(b.fecha_solicitud);
      return fechaA - fechaB;
    });
  
    return solicitudesFiltradas; // Devolver las solicitudes filtradas
  };
  const aplicarFiltros = () => {
    const solicitudesFiltradas = filtrarSolicitudes(); // Filtrar las solicitudes
    setSolicitudes(solicitudesFiltradas); // Actualizar el estado de solicitudes
    handleClose();
  };
  const mostrarSolicitudesPendientes = () => {
      setMostrarSolicitudesTodas(false);
    
  
    setSolicitudes(solicitudesPendientes);
  };  
  const mostrarSolicitudesTodas = () => {
    setMostrarSolicitudesTodas(true); 

    const solicitudesMostrables = solicitudesTodas.map(solicitud => {
        const { id_solicitud, nombre, apellido_paterno, apellido_materno, nombre_materia, motivo, fecha_solicitud, hora_inicio, hora_fin } = solicitud;
        return { id_solicitud, nombre, apellido_paterno, apellido_materno, nombre_materia, motivo, fecha_solicitud, hora_inicio, hora_fin };
    });

    setSolicitudes(solicitudesMostrables);
  };
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
  };
  const buscardor = (e) => {
    setBuscar(e.target.value);
    console.log(e.target.value);
  }
  let resultado = [];
  if(!buscar){
    resultado = solicitudes;
  }else{
      resultado = solicitudes.filter((solicitud) =>
        solicitud.nombre.toString().toLowerCase().includes(buscar.toLowerCase())||
        solicitud.nombre_materia.toString().toLowerCase().includes(buscar.toLowerCase())||
        solicitud.motivo.toString().toLowerCase().includes(buscar.toLowerCase())||
        solicitud.fecha_solicitud.toString().toLowerCase().includes(buscar.toLowerCase())||
        solicitud.hora_inicio.toString().toLowerCase().includes(buscar.toLowerCase())||
        solicitud.hora_fin.toString().toLowerCase().includes(buscar.toLowerCase())    
    );
    
  }
 

return (
    <div className="container" style={{ minHeight: '78.7vh' }}>
      <div style={{ height: '4vh' }}></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>Solicitudes:</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>

        <input value={buscar} onChange={buscardor} type="text" placeholder="Buscar" className='buscador'/>

          <button className="butn butn-filtro" onClick={() => setMostrarOpciones(!mostrarOpciones)}>Solicitudes</button>
            {mostrarOpciones && (
            <div className="opciones-solicitudes">
              <button className="butn butn-filtro" onClick={() => { setMostrarOpciones(false);
                mostrarSolicitudesTodas();
                }}>Todas
              </button>
            <button className="butn butn-filtro" onClick={() => {
              setMostrarOpciones(false);
              mostrarSolicitudesPendientes();
              }}>Pendientes</button>

            </div>
          )}
    <button className="butn butn-filtro" onClick={handleShow}>Filtros</button>
                </div>
              </div>

      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro.</th>
            <th>Docente</th>
            <th>Materia</th>
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Hora</th>
            {!mostrarSolicitudesTodass && <th>Acciones</th>}

          </tr>
        </thead>
        <tbody>
        {resultado.map((solicitud) => (
            <tr key={solicitud.id_solicitud}
              className="fila-lista"
              onClick={() => mostrarFormularioParaSolicitud(solicitud)}
            >
              <td>{solicitud.id_solicitud}</td>
              <td>{solicitud.nombre}</td>
              <td>{solicitud.nombre_materia}</td>
              <td>{solicitud.motivo}</td>
              <td>{solicitud.fecha_solicitud}</td>
              <td>{solicitud.hora_inicio+" "+solicitud.hora_fin}</td>
              {!mostrarSolicitudesTodass && (
                <td>
                  <button className="btn btn-editar mr-2" onClick={() => aceptarsolicitud(solicitud.id_solicitud)}>Aceptar</button>
                  <button className="btn btn-eliminar" onClick={() => rechazarsolicitud(solicitud.id_solicitud)}>Rechazar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control 
        as="select" 
        value={motivo} 
        onChange={(e) => setMotivo(e.target.value)}
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        <option value="">Selecciona un motivo</option>
        <option value="Examen de Mesa">Examen de Mesa</option>
        <option value="Examen Primer Parcial">Examen Primer Parcial</option>
        <option value="Examen Segundo Parcial">Examen Segundo Parcial</option>
        <option value="Examen Final">Examen Final</option>
        <option value="Examen Segunda Instancia">Examen Segunda Instancia</option>
        <option value="Elecciones">Elecciones</option>
        <option value="Congreso">Congreso</option>

      </Form.Control>
      
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={aplicarFiltros}>
            Aplicar Filtros
          </Button>
        </Modal.Footer>
      </Modal>
      {mostrarFormulario && (
        <div className="overlay" onClick={cerrarFormulario}>
          <div className="formulario-emergente" onClick={(e) => e.stopPropagation()}>
            <div className="contact-form-container">
              <section className="contenedor">
                <div className="contact-form-sub-heading-cta">
                  <b className="contact-form-enter-details">Detalles de Solicitud</b>
                  {Object.entries(formularioData).map(([key, value]) => (
                    <div key={key} className="contact-form-phone-parent">
                      <div className="contact-form-phone">{key.replace(/_/g, ' ')}</div>
                      <input
                        className="contact-form-rectangle"
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
        
      {mostrarFormularioCon && (
         <div className="overlay" onClick={cerrarFormulario}>
         <div className="formulario-emergente" onClick={(e) => e.stopPropagation()}>
           <div className="contact-form-container">
             <section className="contenedor">
               <div className="contact-form-sub-heading-cta">
                 <b className="contact-form-enter-details">Detalles de Solicitud</b>
                 <div className="contact-form-phone-parent">
                   <div className="contact-form-phone">Docentes que reservaron:</div>
                      <select id="concat-form-rectangle" value={selectedOption} onChange={handleSelectChange} className="select" >
                        {docente.map((docente, index) => (
                          <option key={index} value={docente.id} >
                          {docente.nombre}
                          </option>
                        ))}
                    </select>
                 </div>
                 <div className="contact-form-phone-parent">
                   <div className="contact-form-phone">Materia</div>
                   <label className="contact-form-rectangle" type="text"/>
                 </div>
                 
                 <div className="input-group">
                   <div className="input2">
                     <div className="label-here">Aula</div>
                     <select id="menu" value={selectedOption} onChange={handleSelectChange} className="select" >
                        {aulas.map((aula, index) => (
                          <option key={index} value={aula.id} >
                            {aula.nombre}
                          </option>
                        ))}
                      </select>
                   </div>
                   <div className="input2">
                     <div className="label-here">Grupo</div>
                     <label className="contact-form-rectangle" type="text"  />
                   
                   </div>
                   <div className="input2">
                     <div className="label-here">Capacidad</div>
                       <label className="contact-form-rectangle" type="text" />
                   </div>  
                 </div>
                 <div className="contact-form-phone-parent">
                   <div className="contact-form-phone">Tipo de Solicitud</div>
                   <label className="contact-form-rectangle" type="text"/>
                 </div>
                 <div className="input-group">
                   <div className="input2">
                     <div className="label-here">Fecha</div>
                     <label className="contact-form-rectangle"  type="text"/>
         
                   </div>
                   <div className="input2">
                     <div className="label-here">Hora</div>
                     <label className="contact-form-rectangle"  type="text"  />
                   
                   </div>
                 </div>
                 <div className="contact-form-phone-parent">
                   <div className="contact-form-phone">Motivo</div>
                   <label className="contact-form-rectangle" type="text"  />
                 </div>
                 
               </div>
             </section>
           </div>
         </div>
       </div>
      )}
    </div>
);
};

export default ListaSolicitudes;