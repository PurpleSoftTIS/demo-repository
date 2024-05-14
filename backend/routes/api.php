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
Route::get('/docentespormateria/{nombre_materia}/{correo_usuario}', [MateriaController::class,'docentesPorMateria']);
Route::get('/carreras', [CarreraController::class, 'index']);
Route::get('/materias/{id}', [MateriaController::class, 'show']);
Route::get('/obtenerHoras', [SolicitudController::class, 'obtenerHora']);
Route::get('/obtenerSol', [SolicitudController::class, 'obtenerSolicitud']);
Route::get('/SolicitudUrgencias', [SolicitudUrgencia::class, 'urgencias']);
Route::get('/ReservasDocentes/{setEmailC}', [RerservasUsuario::class, 'reservasDocentes']);
Route::get('/obtenerMara/{Correo}', [AmbienteController::class, 'MateriasObtener']);

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
Route::post('/registrarSolicitudCon',[SolicitudController::class,'registrarSolicitudesConjuntas']);
Route::post('/enviarcorreo', [CorreoController::class, 'enviarCorreo']);
Route::post('/verificarCodigo', [CorreoController::class, 'verificarCodigo']);
Route::post('/restablecercontrasena', [DocenteController::class, 'restablecerPasswd']);
//Elimnar datos
Route::delete('/docentes/{id_docente}', [DocenteController::class, 'eliminar']);
Route::delete('/borrar/{id_ambiente}', [DeleteAmbienteController::class, 'borrarAmbiente']);
Route::delete('/materias/{id}', [MateriaController::class, 'destroy']);
Route::delete('/materias', [MateriaController::class, 'eliminarTodo']);
Route::delete('/borrarTodo',  [DeleteAmbienteController::class,'Borrartodo']);
Route::delete('/borrarTodoDocente',  [DocenteController::class,'eliminarAll']);

//Actualizar datos
Route::put('/ambiente/{id_ambiente}', [AmbienteController::class, 'actualizarAmbiente']);
Route::put ('/actualizar/{id_ambiente}',[AmbienteController::class,'actualizarAmb']);
Route::put('/materias/{id}', [MateriaRegistrarController::class, 'update']);
Route::put('/actualizarDocente/{id_docente}', [DocenteController::class, 'editarDocentes']);
Route::put('/aceptarsolicitud/{id}', [SolicitudController::class, 'aceptarSolicitud']);
Route::put('/rechazarsolicitud/{id}', [SolicitudController::class, 'rechazarsolicitud']);