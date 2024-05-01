<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class SolicitudController extends Controller
{
    public function obtenerSolicitud()
    {
        $datosSolicitudes = DB::table('solicitudes')
            ->join('ambiente', 'solicitudes.id_ambiente', '=', 'ambiente.id_ambiente')
            ->join('solicitud', 'solicitudes.id_solicitud', '=', 'solicitud.id_solicitud')
            ->join('solicitudes_docentes', 'solicitud.id_solicitud', '=', 'solicitudes_docentes.id_solicitud')
            ->join('hora', 'solicitud.id_hora', '=', 'hora.id_hora')
            ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
            ->join('docente', 'solicitudes_docentes.id_docente', '=', 'docente.id_docente')
            ->join('usuario', 'docente.id_usuario', '=', 'usuario.id_usuario')
            ->join('materia_docente', 'docente.id_docente', '=', 'materia_docente.id_docente')
            ->join('materia', 'materia_docente.id_materia', '=', 'materia.id_materia')
            ->select(
                'usuario.*',
                'docente.*',
                'materia.*',
                'hora.*',
                'ambiente.*',
                'ubicacion.*',
                'solicitud.*'
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
