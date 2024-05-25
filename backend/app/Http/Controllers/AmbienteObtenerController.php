<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class AmbienteObtenerController extends Controller
{
    public function index()
    {
        $docenteConHorario = DB::table('ambiente')
            ->join('usuario', 'horario.id_usuario', '=', 'usuario.id_usuario')
            ->select('usuario.*', DB::raw("CONCAT(usuario.nombre, '  ', usuario.apellido_paterno, '  ',
             usuario.apellido_materno) AS nombre_completo"))
            ->get();

        return response()->json($docenteConHorario, 200);
    }

    public function ambientesDisponibles($capacidad, $dia, $horarios)
{
    \Illuminate\Support\Facades\Log::info('Capacidad: ' . $capacidad);
    \Illuminate\Support\Facades\Log::info('Día: ' . $dia);
    \Illuminate\Support\Facades\Log::info('Horarios: ' . print_r($horarios, true));

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

    return response()->json($ambientes, 200);
}

}    