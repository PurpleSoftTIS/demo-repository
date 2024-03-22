<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ambiente;
use App\Models\Ubicacion;
class AmbienteController extends Controller
{
    public function guardarAmbiente(Request $request)
{
    info('Datos recibidos:', $request->all());
 
    try {
        info('Se está intentando guardar la ubicación.');
       
        $ubicacion = new Ubicacion();
        $ubicacion->numero_piso = $request->input('piso');
        $ubicacion->nombre_bloque = $request->input('edificio');
        $ubicacion->save();

        info('Se ha guardado correctamente el ambiente.');

        return response()->json(['message' => 'Ubicación guardada correctamente']);
    } catch (\Exception $e) {
        // Loguear el error
        \Log::error('Error al intentar guardar la ubicación: ' . $e->getMessage());
        
        // Devolver una respuesta de error al cliente
        return response()->json(['error' => 'Error al guardar la ubicación'], 500);
    }
}

    
}