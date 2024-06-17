<?php
use App\Http\Controllers\CargaDocente;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\DocenteRegistrarController;
use App\Http\Controllers\MateriaRegistrarController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\RegistrarSolicitud;
use App\Http\Controllers\SolicitudUrgencia;
use App\Http\Controllers\RerservasUsuario;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\DeleteAmbienteController;
use App\Http\Controllers\CorreoController;
use App\Http\Controllers\Configuraciones;
use App\Http\Controllers\AmbienteObtenerController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;   

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Consultar Datos
Route::post('/verificarCre', [DocenteController::class, 'verificarCredenciales']);
Route::post('/nombre', [UsuarioController::class, 'obtenerNombreUsuario']);

//Obtener Datos
Route::get('/docentes', [DocenteController::class, 'index']);
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::get('/materias', [MateriaController::class, 'index']);
Route::get('/listaAmbiente', [AmbienteController::class, 'index']);
Route::get('/ambientesDispo/{capacidad}/{dia}/{hora_inicio}/{hora_fin}', [AmbienteController::class, 'ambientesDis']);
Route::get('/ambientesDispoDos/{capacidad}', [AmbienteController::class, 'ambientesDi']);
Route::get('/ambientesTodos', [AmbienteController::class, 'ambientesAll']);
Route::get('/docentespormateria/{nombre_materia}/{correo_usuario}', [MateriaController::class,'docentesPorMateria']);
Route::get('/carreras', [CarreraController::class, 'index']);
Route::get('/materias/{id}', [MateriaController::class, 'show']);
Route::get('/obtenerHoras', [SolicitudController::class, 'obtenerHora']);
Route::get('/obtenerSol', [SolicitudController::class, 'obtenerSolicitud']);
Route::get('/obtenerSolUrg', [SolicitudController::class, 'obtenerSolicitudUrgentes']);
Route::get('/obtenerSolicitudSugeridas', [SolicitudController::class, 'obtenerSolicitudSugeridas']);

Route::get('/ReservasDocentes/{setEmailC}', [RerservasUsuario::class, 'reservasDocentes']);
Route::get('/obtenerMara/{Correo}', [AmbienteController::class, 'MateriasObtener']);
Route::get('/obtenerGrupos/{Materia}', [MateriaController::class, 'GruposObtener']);
Route::get('/configuraciones', [Configuraciones::class, 'obtenerconf']);
Route::get('/configuracionesFecha', [Configuraciones::class, 'obtenerconFecha']);
Route::get('/configuracionesFeriados', [Configuraciones::class, 'obtenerconfFeriados']);
Route::get('/docentesPorMateria/{Materia}',[SolicitudController::class,'docentesPorMateria']);
Route::get('/docentes', [DocenteController::class, 'index']);
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::get('/materias', [MateriaController::class, 'index']);
Route::get('/listaAmbiente', [AmbienteController::class, 'index']);
Route::get('/ambientesDispo/{capacidad}/{dia}/{hora_inicio}/{hora_fin}', [AmbienteController::class, 'ambientesDis']);
Route::get('/ambientesDisponibles/{capacidad}/{dia}/{horarios}', [AmbienteObtenerController::class, 'ambientesDisponibles']);
Route::get('/obtenerTodasSolicitudes', [SolicitudController::class, 'obtenerTodasSolicitudes']);
Route::get('/ambientesContiguos/{dia}/{horas}/{fecha}', [SolicitudController::class, 'ambientesContiguos']);
Route::get('/notifications', [NotificationController::class, 'index']);
Route::get('/notifications/count/{userMail}', [NotificationController::class, 'getNotificationCount']);
Route::get('/ambientesDisponibless/{capacidad}/{dia}/{horarios}/{fecha}', [Configuraciones::class, 'ambientesfechas']);

//Registrar Datos
Route::post('/docentesRegistrar', [DocenteRegistrarController::class, 'registrar']);
Route::post('/materiaRegistrar', [MateriaRegistrarController::class, 'registrarMateria']);
Route::post('/registrarambiente', [AmbienteController::class, 'guardarAmbiente']);
Route::post('/carreraRegistrar', [CarreraController::class, 'registrarCarrera']);
Route::post('/CargaAmbientes', [AmbienteController::class, 'CargaMasiva']);
Route::post('/CargaDiasHoras', [AmbienteController::class, 'CargaMasivaDias']);
Route::post('/RegistrarSol', [RegistrarSolicitud::class, 'registrar']);
Route::post('/masivoDocentes', [CargaDocente::class, 'cargaDocentes']);
Route::post('/importMaterias', [MateriaController::class, 'import']);
Route::post('/registrarSolicitud',[SolicitudController::class,'registrarSolicitud']);
Route::post('/enviarcorreo' , [CorreoController::class, 'enviarCorreo']);
Route::post('/verificarCodigo', [CorreoController::class, 'verificarCodigo']);
Route::post('/restablecercontrasena', [DocenteController::class, 'restablecerPasswd']);
Route::post('/subirConfiguraciones', [Configuraciones::class, 'registrar']);
Route::post('/notifications', [NotificationController::class, 'store']);
Route::post('/notificationsMail', [NotificationController::class, 'storeMail']);
Route::post('/notifications/mark-as-read/{userMail}', [NotificationController::class, 'markAsRead']);
Route::post('/asignarAula', [SolicitudController::class, 'asignarAula']);
Route::post('/registrarSolicitudConjunta',[SolicitudController::class,'registrarSolicitudConjunta']);
Route::post('/asignarSugerencia', [SolicitudController::class, 'asignarSugerencia']);
Route::post('/asignarAmbientes', [SolicitudController::class, 'asignarAmbientes']);

//Elimnar datos
Route::delete('/docentes/{id_docente}', [DocenteController::class, 'eliminar']);
Route::delete('/borrar/{id_ambiente}', [DeleteAmbienteController::class, 'borrarAmbiente']);
Route::delete('/materias/{id}', [MateriaController::class, 'destroy']);
Route::delete('/materias', [MateriaController::class, 'eliminarTodo']);
Route::delete('/borrarTodo',  [DeleteAmbienteController::class,'Borrartodo']);
Route::delete('/borrarTodoDocente',  [DocenteController::class,'eliminarAll']);
Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);

//Actualizar datos
Route::put('/ambiente/{id_ambiente}', [AmbienteController::class, 'actualizarAmbiente']);
Route::put ('/actualizar/{id_ambiente}',[AmbienteController::class,'actualizarAmb']);
Route::put('/materias/{id}', [MateriaRegistrarController::class, 'update']);
Route::put('/actualizarDocente/{id_docente}', [DocenteController::class, 'editarDocentes']);
Route::put('/aceptarsolicitud/{id}', [SolicitudController::class, 'aceptarSolicitud']);
Route::put('/rechazarsolicitud/{id}', [SolicitudController::class, 'rechazarsolicitud']);
Route::put('/notifications/{id}', [NotificationController::class, 'update']);