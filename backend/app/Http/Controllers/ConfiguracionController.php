<?php

namespace App\Http\Controllers;
use App\Models\Configuracion;
use App\Models\Ambiente;
use App\Models\Ubicacion;
use App\Models\Dia;
use App\Models\Hora;
use App\Models\Usuario;
use App\Models\Docente;
use  App\Models\Horario;
use App\Models\Diashabiles;
use DB;
use Illuminate\Http\Request;

class ConfiguracionController extends Controller
{
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
    $fecha = '2024-05-31';

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
