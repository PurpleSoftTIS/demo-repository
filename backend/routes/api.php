<?php

use App\Http\Controllers\DocenteController;
use App\Http\Controllers\DocenteRegistrarController;

use App\Http\Controllers\AmbienteController;
use App\Http\Controllers\UsuarioController;
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


//Obtener Datos

Route::get('/docentes', [DocenteController::class, 'index']);
Route::get('/usuarios', [UsuarioController::class, 'index']);
//Registrar Datos

Route::post('/docentesRegistrar', [DocenteRegistrarController::class, 'registrar']);
Route::post('/registrarambiente', [AmbienteController::class, 'guardarAmbiente']);

