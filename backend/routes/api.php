<?php

use App\Models\usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AmbienteController;
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
Route::get('/usuarios', function () {
    $usuarios = usuario::all();
    return view('usuarios.index', ['usuarios' => $usuarios]);
});
Route::post('/registrarambiente', [AmbienteController::class, 'guardarAmbiente']);
Route::get ('/obtenetambiente', [AmbienteController::class, 'obtenerambientes']);