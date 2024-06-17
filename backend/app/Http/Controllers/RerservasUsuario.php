<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class RerservasUsuario extends Controller
{
    public function reservasDocentes($correo){
        
    try {
        $datosSolicitudes = DB::table('solicitud')
            ->join('solicitudes_horario', 'solicitudes_horario.id_solicitud', '=', 'solicitud.id_solicitud')
            ->join('hora', 'hora.id_hora', '=', 'solicitudes_horario.id_hora')
            ->join('solicitudes_docentes', 'solicitudes_docentes.id_solicitud', '=', 'solicitud.id_solicitud')
            ->join('docente', 'docente.id_docente', '=', 'solicitudes_docentes.id_docente')
            ->join('usuario', 'usuario.id_usuario', '=', 'docente.id_usuario')
            ->join('solicitudes_materias', 'solicitudes_materias.id_solicitud', '=', 'solicitud.id_solicitud')
            ->join('materia', 'materia.id_materia', '=', 'solicitudes_materias.id_materia')
            ->select(
                'solicitud.fecha_solicitud', 'solicitud.estado_solicitud', 'solicitud.fecha_solicitud', 'solicitud.motivo',
                DB::raw("GROUP_CONCAT(CONCAT(hora.hora_inicio, ' - ', hora.hora_fin) SEPARATOR ', ') as horas"),
                'usuario.nombre', 'usuario.apellido_paterno', 'usuario.apellido_materno',
                'materia.nombre_materia', 'solicitud.id_solicitud', 'solicitud.numero_estudiantes'
            )
            ->where('usuario.correo_electronico', $correo)
            ->groupBy(
                'usuario.nombre', 'usuario.apellido_paterno', 'usuario.apellido_materno',
                'materia.nombre_materia', 'solicitud.fecha_solicitud', 'solicitud.estado_solicitud',
                'solicitud.fecha_solicitud', 'solicitud.motivo', 'solicitud.id_solicitud', 'solicitud.numero_estudiantes'
            )
            ->get();

        return response()->json($datosSolicitudes, 200);

    } catch (\Exception $e) {
        \Log::error('Error al intentar obtener una solicitud: ' . $e->getMessage());
        return response()->json(['error' => 'Error al obtener la solicitud'], 500);
    }
    }
}
