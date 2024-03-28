<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ambiente;
use App\Models\Ubicacion;
use App\Models\Dia;
use App\Models\Hora;
use  App\Models\Horario;

class AmbienteController extends Controller
{
    public function guardarAmbiente(Request $request)
{
    info('Datos recibidos:', $request->all());

    try {
        info('Se está intentando guardar la ubicación.');
        
    
        $datosAmbiente = $request->input('datosAmbiente');
        $nombreAula = $datosAmbiente['nombreAula'];
        $capacidadEstudiantes = $datosAmbiente['capacidadEstudiantes'];
        $edificio = $datosAmbiente['edificio'];
        $piso = $datosAmbiente['piso'];
        $tipo = $datosAmbiente['Tipo'];

        
        // Guardar ubicación
        $ubicacion = new Ubicacion();
        
        $ubicacion->EDIFICIO = $edificio;
        $ubicacion->save();
        
        $idUbicacion = $ubicacion->ID_UBICACION;
        
        
        $ambiente = new Ambiente();
        $ambiente->ID_UBICACION = $idUbicacion;
        $ambiente->NUMERO_PISO = $piso;
        $ambiente->NOMBRE_AMBIENTE = $nombreAula;
        $ambiente->CAPACIDAD = $capacidadEstudiantes;
        $ambiente->ESTADO_AMBIENTE = "activo";
        $ambiente->TIPO_AMBIENTE =$tipo;
        $ambiente->save();
        
        info('Se ha guardado correctamente el ambiente.');
        $diasHoras =$request -> input ('diasHoras');
        info('Horarios seleccionados:', $diasHoras);
       
       

     return response()->json(['message' => 'Ubicación y ambiente guardados correctamente']);
    } catch (\Exception $e) {
        // Loguear el error
        \Log::error('Error al intentar guardar la ubicación y el ambiente: ' . $e->getMessage());
        
        // Devolver una respuesta de error al cliente
        return response()->json(['error' => 'Error al guardar la ubicación y el ambiente'], 500);
    }
}
public function obtenerambientes (){



    
}

}
