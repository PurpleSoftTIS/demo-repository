<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use DB;
class SolicitudUrgencia extends Controller{
    public function urgencias(){
        try{
            $datosSolicitudes = DB::table('solicitud')
                ->join('solicitudes','solicitudes.id_solicitud','=', 'solicitud.id_solicitud')
                ->join('hora', 'hora.id_hora', '=', 'solicitud.id_hora')
                ->join('ambiente', 'ambiente.id_ambiente', '=', 'solicitudes.id_ambiente')
                ->join('ubicacion', 'ubicacion.id_ubicacion', '=', 'ambiente.id_ubicacion')
                ->join('solicitudes_docentes', 'solicitudes_docentes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('docente', 'docente.id_docente', '=', 'solicitudes_docentes.id_docente')
                ->join('materia_docente', 'materia_docente.id_docente', '=', 'docente.id_docente')
                ->join('materia', 'materia.id_materia', '=', 'materia_docente.id_materia')
                ->join('usuario', 'usuario.id_usuario', '=', 'docente.id_usuario')
                ->select(
                    'hora.*',
                    'ambiente.*',
                    'ubicacion.*',
                    'solicitud.*', 
                    'materia.*'
                )
                ->selectRaw('CONCAT(usuario.nombre, " ", usuario.apellido_paterno, " ", usuario.apellido_materno) as nombre')
                ->get();
            return response()->json($datosSolicitudes, 200);
    
        }catch (\Exception $e) {
            \Log::error('Error al intentar obtener una solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la solicitud'], 500);
        }
}

}