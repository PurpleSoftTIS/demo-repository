<?php

use App\Http\Controllers\DocenteController;
use App\Http\Controllers\DocenteRegistrarController;
use App\Http\Controllers\MateriaRegistrarController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\RestablecerContrasenia;
use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\RegistrarSolicitud;
use App\Http\Controllers\SolicitudController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

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
//Elimnar datos
Route::delete('/docentes/{id_docente}', [DocenteController::class, 'eliminar']);
Route::delete('/borrar/{ID_AMBIENTE}', [AmbienteController::class, 'borrarAmbiente']);
Route::delete('/materias/{id}', [MateriaController::class, 'destroy']);
Route::delete('/materias', [MateriaController::class, 'eliminarTodo']);
//Actualizar datos
Route::put('/ambiente/{ID_AMBIENTE}', [AmbienteController::class, 'actualizarAmbiente']);
Route::put ('/actualizar/{ID_AMBIENTE}',[AmbienteController::class,'actualizarAmb']);
Route::put ('/restablecer',[RestablecerContrasenia::class,'enviarCorreo']);
Route::put('/materias/{id}', [MateriaRegistrarController::class, 'update']);

