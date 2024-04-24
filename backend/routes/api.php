<?php
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\DocenteRegistrarController;
use App\Http\Controllers\MateriaRegistrarController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\RegistrarSolicitud;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\DeleteAmbienteController;
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
Route::get('/ambienteDispo/{capacidad}', [AmbienteController::class, 'ambientesDisponibles']);
Route::get('/carreras', [CarreraController::class, 'index']);
Route::get('/materias/{id}', [MateriaController::class, 'show']);
Route::get('/obtenerHoras', [SolicitudController::class, 'obtenerHora']);

//Registrar Datos
Route::post('/docentesRegistrar', [DocenteRegistrarController::class, 'registrar']);
Route::post('/materiaRegistrar', [MateriaRegistrarController::class, 'registrarMateria']);
Route::post('/registrarambiente', [AmbienteController::class, 'guardarAmbiente']);
Route::post('/carreraRegistrar', [CarreraController::class, 'registrarCarrera']);
Route::post('/CargaAmbientes', [AmbienteController::class, 'CargaMasiva']);
Route::post('/CargaDiasHoras', [AmbienteController::class, 'CargaMasivaDias']);
Route::post('/RegistrarSol', [RegistrarSolicitud::class, 'registrar']);
Route::post('enviar',[UsuarioController::class, 'restablecerContrasenia']);

//Elimnar datos
Route::delete('/docentes/{id_docente}', [DocenteController::class, 'eliminar']);
Route::delete('/borrar/{id_ambiente}', [AmbienteController::class, 'borrarAmbiente']);
Route::delete('/materias/{id}', [MateriaController::class, 'destroy']);
Route::delete('/materias', [MateriaController::class, 'eliminarTodo']);
Route::delete('/borrarTodo',  [DeleteAmbienteController::class,'Borrartodo']);
Route::delete('/borrarTodoDocente',  [DocenteController::class,'eliminarAll']);

//Actualizar datos
Route::put('/ambiente/{id_ambiente}', [AmbienteController::class, 'actualizarAmbiente']);
Route::put ('/actualizar/{id_ambiente}',[AmbienteController::class,'actualizarAmb']);
Route::put('/materias/{id}', [MateriaRegistrarController::class, 'update']);
Route::put('/actualizarDocente/{id_docente}', [DocenteController::class, 'editarDocentes']);





