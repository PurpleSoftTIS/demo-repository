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
        
        // Guardar ubicación
        $ubicacion = new Ubicacion();
        $ubicacion->NUMERO_PISO = $piso;
        $ubicacion->EDIFICIO = $edificio;
        $ubicacion->save();
        
        $idUbicacion = $ubicacion->ID_UBICACION;
        
        
        $ambiente = new Ambiente();
        $ambiente->ID_UBICACION = $idUbicacion;
        $ambiente->NOMBRE_AMBIENTE = $nombreAula;
        $ambiente->CAPACIDAD = $capacidadEstudiantes;
        $ambiente->ESTADO_AMBIENTE = "activo";
        $ambiente->save();
        
        info('Se ha guardado correctamente el ambiente.');
        $diasHoras =$request -> input ('diasHoras');
        info('Horarios seleccionados:', $diasHoras);
       
       
        foreach ($diasHoras as $day=> $horas) {
             $dia= new Dia();
             $dia->ID_AMBIENTE = $ambiente->ID_AMBIENTE; 
             $dia->NOMBRE = $day ;
             $dia -> save();
             $iddia=$dia->ID_DIA;
             foreach ($horas as $hor){
                $hora_split = explode('-', $hor);
                $hora_inicio = trim($hora_split[0]);
                $hora_fin = trim($hora_split[1]);
                $hora = new Hora();
                $hora->HORA_INICIO=$hora_inicio;
                $hora->HORA_FIN=$hora_fin;
                $hora ->save();
                $idhora=$hora->ID_HORA;

               $horario=new Horario();
               $horario->ID_DIA=$iddia;
               $horario->ID_HORA=$idhora;
               $horario->save();

             }
            }

     return response()->json(['message' => 'Ubicación y ambiente guardados correctamente']);
    } catch (\Exception $e) {
        // Loguear el error
        \Log::error('Error al intentar guardar la ubicación y el ambiente: ' . $e->getMessage());
        
        // Devolver una respuesta de error al cliente
        return response()->json(['error' => 'Error al guardar la ubicación y el ambiente'], 500);
    }
}
}
