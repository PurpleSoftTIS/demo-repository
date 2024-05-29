<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Configuracion;
use App\Models\Configuracion_Fecha;
use App\Models\Feriado;
use DB;
class Configuraciones extends Controller
{
    public function registrar(Request $request)
    {
        $request->validate([
            'periodosAulaComun' => 'required|string',
            'periodosLaboratorio' => 'required|string',
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date',
            'feriados' => 'required|array',
            'mensajesMasivos' => 'required|string'
        ]);

        try {
            // Guardar la configuración principal
            $configuracion = new Configuracion();
            $configuracion->valor = $request->input('periodosAulaComun');
            $configuracion->configuracion = $request->input('periodosLaboratorio');            
            $configuracion->save();


            $configuracion_fecha = new Configuracion_Fecha();           
            $configuracion_fecha->inicio = $request->input('fechaInicio');
            $configuracion_fecha->fin = $request->input('fechaFin');
            $configuracion_fecha->save();

            // Guardar los feriados
            foreach ($request->input('feriados') as $fechaFeriado) {
                $feriado = new Feriado();
                $feriado->fecha = $fechaFeriado;
                $feriado->configuracion_id = $configuracion->id; // Establecer la relación
                $feriado->save();
            }

            return response()->json(['message' => 'Configuración registrada correctamente'], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar la configuración: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar la configuración'], 500);
        }
    }
    public function obtenerconf(){
        $configuraciones = Configuracion::all();
         return response()->json($configuraciones, 200);
       }
       public function ambientesfechas($capacidad, $dia, $horarios , $fecha)
       {
           $horarios = json_decode($horarios, true);
       
           $query = DB::table('ambiente')
               ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
               ->where('ambiente.capacidad', '>=', $capacidad);
       
           foreach ($horarios as $horario) {
               $query->whereExists(function ($query) use ($dia, $horario) {
                   $query->select(DB::raw(1))
                       ->from('diashabiles')
                       ->join('dia', 'diashabiles.id_dia', '=', 'dia.id_dia')
                       ->join('horario', 'diashabiles.id_dia', '=', 'horario.id_dia')
                       ->join('hora', 'horario.id_hora', '=', 'hora.id_hora')
                       ->whereColumn('ambiente.id_ambiente', 'diashabiles.id_ambiente')
                       ->where('dia.nombre', $dia)
                       ->where('hora.hora_inicio', $horario['hora_inicio'])
                       ->where('hora.hora_fin', $horario['hora_fin']);
               });
           }
       
           $ambientes = $query->get();
       
           $ambientesDisponibles = [];
           foreach ($ambientes as $ambiente) {
               $solicitudes = DB::table('solicitudes')
                   ->join('solicitud', 'solicitudes.id_solicitud', '=', 'solicitud.id_solicitud')
                   ->where('solicitud.fecha_solicitud', $fecha)
                   ->where('solicitudes.id_ambiente', $ambiente->id_ambiente)
                   ->pluck('solicitud.id_solicitud')
                   ->toArray();
       
               if (empty($solicitudes)) {
                   $ambientesDisponibles[] = $ambiente;
               }
           }
       
           return response()->json($ambientesDisponibles, 200);
       }
}
