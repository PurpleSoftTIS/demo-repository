<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class SolicitudUrgencia extends Controller{
    public function urgencias()

    {
        $datosSolicitudes = DB::table('solicitud')
        ->join('solicitudes','solicitudes.id_solicitud','=', 'solicitud.id_solicitud')
         ->join('hora', 'hora.id_hora', '=', 'solicitud.id_hora')
         ->join('ambiente', 'ambiente.id_ambiente', '=', 'solicitudes.id_ambiente')
         ->join('ubicacion', 'ubicacion.id_ubicacion', '=', 'ambiente.id_ubicacion')
         ->join('docente', 'docente.id_docente', '=', 'solicitud.id_docente')
         ->join('materia_docente', 'materia_docente.id_docente', '=', 'materia_docente.id_docente')
         ->join('materia', 'materia.id_materia', '=', 'materia_docente.id_materia')
         ->join('usuario', 'usuario.id_usuario', '=', 'docente.id_usuario')
         ->select(
             'hora.*',
             'ambiente.*',
             'ubicacion.*',
             'solicitud.*', 
             'materia.*'
         )


        
        ->get();
    
    return response()->json($datosSolicitudes, 200);
    }

}