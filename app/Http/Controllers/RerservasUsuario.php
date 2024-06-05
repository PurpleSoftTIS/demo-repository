<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class RerservasUsuario extends Controller
{
    public function reservasDocentes($correo){
        try{
            $datosSolicitudes = DB::table('solicitud')
                ->join('solicitudes','solicitudes.id_solicitud','=', 'solicitud.id_solicitud')
                ->join('ambiente', 'ambiente.id_ambiente', '=', 'solicitudes.id_ambiente')
                ->join('ubicacion', 'ubicacion.id_ubicacion', '=', 'ambiente.id_ubicacion')
                ->join('solicitudes_horario', 'solicitudes_horario.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('hora', 'hora.id_hora', '=', 'solicitudes_horario.id_hora')
                ->join('solicitudes_docentes', 'solicitudes_docentes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('docente', 'docente.id_docente', '=', 'solicitudes_docentes.id_docente')
                ->join('usuario', 'usuario.id_usuario', '=', 'docente.id_usuario')
                ->join('solicitudes_materias', 'solicitudes_materias.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('materia', 'materia.id_materia', '=', 'solicitudes_materias.id_materia')
                ->select(
                    'hora.*',
                    'ambiente.*',
                    'ubicacion.*',
                    'solicitud.*', 
                    'materia.*'
                )
                ->where('usuario.correo_electronico', $correo)
                ->get();
            return response()->json($datosSolicitudes, 200);    
        }catch (\Exception $e) {
            \Log::error('Error al intentar obtener una solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la solicitud'], 500);
        }
    }
}
