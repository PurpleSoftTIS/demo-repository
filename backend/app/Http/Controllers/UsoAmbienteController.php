<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UsoAmbiente;
use App\Models\Ambiente;
use App\Models\Ubicacion;
use DB;

class UsoAmbienteController extends Controller
{
    public function obtenerInforme()
    {
        $usos = UsoAmbiente::select('id_ambiente', DB::raw('count(*) as usos'), DB::raw('max(created_at) as ultima_reserva'))
                            ->groupBy('id_ambiente')
                            ->get();

        $informe = $usos->map(function($uso) {
            $ambiente = Ambiente::find($uso->id_ambiente);
            $ubicacion = Ubicacion::find($ambiente->id_ubicacion);

            return [
                'id_ambiente' => $uso->id_ambiente,
                'nombre_ambiente' => $ambiente->nombre_ambiente,
                'capacidad' => $ambiente->capacidad,
                'edificio' => $ubicacion->edificio,
                'usos' => $uso->usos,
                'ultima_reserva' => $uso->ultima_reserva,
            ];
        });

        return response()->json($informe);
    }
}