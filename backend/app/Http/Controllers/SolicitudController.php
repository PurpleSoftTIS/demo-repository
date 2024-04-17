<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class SolicitudController extends Controller
{
    public function index()
    {
    $datosSolicitudes = DB::table('solitudes')
    ->join('usuario', 'usuario.id_usuario', '=', 'docente.id_usuario')
    ->join('docente', 'solicitud.id_docente', '=', 'docente.id_docente')
    ->join('materia', 'materia.id_materia', '=', 'docente.id_materia')
    ->join('hora', 'hora.id_hora', '=', 'solicitud.id_hora')
    ->join('ambiente', 'ambiente.id_ambiente', '=', 'solicitudes.id_ambiente')
    ->join('ubicacion', 'ubicacion.id_ubiacion', '=', 'ambiente.id_ubicacion')
    ->select(
        'usuario.*',
        'docente.*',
        'materia.*',
        'hora.*',
        'ambiente.*',
        'ubicacion.*'    

    )
    ->get();

    return response()->json($datosSolicitudes, 200);
    }
    public function obtenerHora(){
        $datosSolicitados = DB::table('hora')
        ->select(
            'hora.*'
        )
        ->get();
        return response()->json($datosSolicitados, 200);

    }
}
