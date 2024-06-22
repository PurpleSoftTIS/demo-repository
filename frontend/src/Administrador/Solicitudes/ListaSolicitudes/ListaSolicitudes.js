import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ListaSolicitudes.css';



const ListaSolicitudes = () => {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
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




  const [showD, setShowD] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState('');

  const handleCloseDelete = () => setShowD(false);
  const handleShowDelete = () => setShowD(true);

  const handleMotivoChangeDelete = (event) => {
    setMotivoRechazo(event.target.value);
  };

  const handleEnviarClick = () => {
    console.log('Motivo de rechazo:', motivoRechazo);
    handleCloseDelete();
  };

  const handleMotivoChange = (event) => {
    setMotivoRechazo(event.target.value);
  };
  const [docente, setDocente] = useState("");
  const [aulas, setAulas] = useState(""); 
  const [formularioData, setFormData] = useState({
    Docente: "",
    Materia: "",
    Grupos: "",
    Aula: "",
    Capacidad: "",
    Fecha: "",
    Hora: "",
    Motivo: "",
    Tipo_de_solicitud: ""
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const aceptarsolicitud = (solicitud) => {
    navigate("/Admin/Ambientes/AmbientesSol", { state: solicitud });
   
      console.log(solicitud);
  };

  const aceptarSugerencias = (solicitud) => {
    fetch('http://127.0.0.1:8000/api/asignarSugerencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(solicitud), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al asignar sugerencia');
        }
        console.log('Solicitud actualizada:', response);
        
        return response.json();
   
      })
      .then((data) => {
        console.log('Datos de la solicitud actualizada:', data);
      })
      .catch((error) => {
        console.error('Error al enviar solicitud:', error);
      });
  };
  


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



  const [mostrarOpciones, setMostrarOpciones] = useState(false); 

    const mostrarFormularioParaSolicitud = (solicitud) => {

        if(solicitud.tipo_solicitud ==="individua"){
          setFormData({
            docente: solicitud.nombreCompleto,
            materia: solicitud.nombre_materia,
            grupos: solicitud.grupos,
            capacidad: solicitud.numero_estudiantes,
            tipo_de_solicitud:solicitud.estado_solicitud,
            fecha: solicitud.fecha_solicitud,
            hora: solicitud.hora_inicio,
            motivo: solicitud.motivo
          });
          setMostrarFormulario(true);
          setMostrarFormularioCon(false);

        }else{
          setFormData({
            docente: solicitud.nombres_docentes
            ,
            materia: solicitud.nombre_materia,
            grupos: solicitud.grupos,
            capacidad: solicitud.numero_estudiantes,
            tipo_de_solicitud: solicitud.tipo_solicitud,
            fecha: solicitud.fecha_solicitud,
            hora: solicitud.horas, 
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
  const mostrarSolicitudesTodas = async () => {
    try {
      const eliminarResponse = await fetch('http://127.0.0.1:8000/api/eliminarSolicitudesAntiguas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!eliminarResponse.ok) {
        throw new Error('Error al eliminar las solicitudes antiguas');
      }
  
      const eliminarData = await eliminarResponse.json();
      console.log('Respuesta de eliminación:', eliminarData);
  
      const obtenerResponse = await fetch('http://127.0.0.1:8000/api/obtenerSolicitudSugeridas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!obtenerResponse.ok) {
        throw new Error('Error al obtener los datos');
      }
  
      const data = await obtenerResponse.json();
      setSolicitudes(data);
      setMostrarSolicitudesTodas(true);
      console.log('Datos:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
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
    <div className="containerDoss" style={{ minHeight: '78.7vh' }}>
      <div className='encabezados'>
      <div  className='contenidoss'>
          <h2 className='titulolistas'>Solicitudes:</h2>
          <div className='buscadoxe'>
            <input value={buscar} onChange={buscardor} type="text" placeholder="Buscar" className='buscador'/>
            <button 
              className="butn butn-filtro" 
              onClick={() => setMostrarOpciones(!mostrarOpciones)}>Solicitudes</button>
            <button className="butn butn-filtro" onClick={handleShow}>Filtros</button>
          </div>
          {mostrarOpciones && (
              <div className="buttonses">
                <button 
                  className="butn butn-filtro" 
                  onClick={() => {
                    setMostrarOpciones(false);
                    mostrarSolicitudesTodas();
                  }}>Sugerencias
                </button>
                <button 
                  className="butn butn-filtro" 
                  onClick={() => {
                  setMostrarOpciones(false);
                  mostrarSolicitudesPendientes();
                }}>Pendientes</button>

              </div>
              )}
        </div>
      </div>
       
      <div className='tabla-contenedor'>
      <table className="table table-hover">
        <thead className="thead">
          <tr>
            <th>Nro.</th>
            <th>Docente</th>
            
            <th>Materia</th>
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Hora</th>
           <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
        {resultado.map((solicitud) => (
            <tr key={solicitud.id_solicitud}
              className="fila-lista"
              onClick={() => mostrarFormularioParaSolicitud(solicitud)}>
              <td>{solicitud.id_solicitud}</td>
              <td>{`${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}`}</td>
              <td>{solicitud.nombre_materia}</td>
              <td>{solicitud.motivo}</td>
              <td>{solicitud.fecha_solicitud}</td>
              <td>{`${solicitud.horas.split(',')[0].split(' - ')[0]} - ${solicitud.horas.split(',')[solicitud.horas.split(',').length - 1].split(' - ')[1]}`}</td>
              {!mostrarSolicitudesTodass && (
                <td>
                  <button className="btn btn-editar mr-2" onClick={() => aceptarsolicitud(solicitud)}>Asignar</button>
                </td>
              )}
              {mostrarSolicitudesTodass && (
                <td>
                  <button className="btn btn-editar mr-2" onClick={() => aceptarSugerencias(solicitud)}>Asignar</button>

                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showD} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Rechazar Solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="motivoRechazo">
            <Form.Label>Motivo de rechazo:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escribe aquí el motivo"
              value={motivoRechazo}
              onChange={handleMotivoChangeDelete}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEnviarClick}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
      
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
         <div className="contedorForm">
           <section className="contenedor">
             <b className="tituloForm">Detalles de Solicitud</b>
             {Object.entries(formularioData).map(([key, value]) => (
               <div key={key} className="dimensionForm">
                 <div className="contenido">{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}</div>
                 <input
                   className="textoForm"
                   disabled
                   type="text"
                   name={key}
                   value={value}
                   onChange={handleChange}
                 />
               </div>
             ))}
           </section>
         </div>
       </div>
     </div>
      )}
      {mostrarFormularioCon && (
        <div className="overlay" onClick={cerrarFormulario}>
        <div className="formulario-emergentes" onClick={(e) => e.stopPropagation()}>
          <div className="contact-form-container">
            <section className="contenedor">
              <div className="contact-form-sub-heading-cta">
                <b className="contact-form-enter-details">Detalles de Solicitud</b>
                <div className="contact-form-phone-parent">
                  <div className="contact-form-phone">Docentes que reservaron:</div>
                  <select id="concat-form-rectangle" value={selectedOption} onChange={handleSelectChange} className="select">
                    {docente.map((docente, index) => (
                      <option key={index} value={docente.id}>
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
                  <div className="label-here">Grupo</div>
                    <label className="contact-form-rectangle" type="text"/>
                  </div>
                  <div className="input2">
                    <div className="label-here">Capacidad</div>
                    <label className="contact-form-rectangle" type="text"/>
                  </div>
                </div>
                <div className="contact-form-phone-parent">
                  <div className="contact-form-phone">Tipo de Solicitud</div>
                  <label className="contact-form-rectangle" type="text"/>
                </div>
                <div className="input-group">
                  <div className="input2">
                    <div className="label-here">Fecha</div>
                    <label className="contact-form-rectangle" type="text"/>
                  </div>
                  <div className="input2">
                    <div className="labell-here">Hora</div>
                    <label className="contact-form-rectangle" type="text"/>
                  </div>
                </div>
                <div className="contact-form-phone-parent">
                  <div className="contact-form-phone">Motivo</div>
                  <label className="contact-form-rectangle" type="text"/>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      )}
      </div>
      
    </div>
);
};

export default ListaSolicitudes;