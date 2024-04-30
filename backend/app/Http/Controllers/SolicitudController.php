<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class SolicitudController extends Controller
{
    public function index()
    {
        $datosSolicitudes = DB::table('solicitudes')

        ->join('ambiente', 'solicitudes.id_ambiente', '=', 'ambiente.id_ambiente')
        ->join('solicitud', 'solicitudes.id_solicitud', '=', 'solicitud.id_solicitud')
        ->join('solicitudes_docentes','solicitud.id_solicitud','=','solicitudes_docentes.id_solicitud')
        ->join('hora', 'solicitud.id_hora', '=', 'hora.id_hora')
        ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ambiente.id_ubicacion')
        ->join('docente', 'solicitudes_docente.id_docente', '=', 'docente.id_docente')
        ->join('docente', 'usuario.id_usuario', '=', 'docente.id_usuario')
        ->join('materia_docente','docente.id_docente','=','materia_docente.id_docente')
        ->join('materia','materia_docente.id_materia','=','materia.id_materia')
        
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
    public function obtenerMateriass($correo)
    {
        // Buscar el usuario por correo electrónico
        $usuario = Usuario::where('correo_electronico', $correo)->first();
    
        // Verificar si se encontró un usuario
        if ($usuario) {
            // Obtener el ID del usuario
            $idUsuario = $usuario->id_usuario;
    
            // Buscar el docente asociado al usuario
            $docente = Docente::where('id_usuario', $idUsuario)->first();
    
            // Verificar si se encontró un docente
            if ($docente) {
                // Obtener el ID del docente
                $idDocente = $docente->id_docente;
    
                // Obtener las materias asociadas al docente
                $materiasDelDocente = DB::table('materia')
                    ->select('materia.id_materia', 'materia.nombre_materia')
                    ->join('materia_docente', 'materia.id_materia', '=', 'materia_docente.id_materia')
                    ->where('materia_docente.id_docente', $idDocente)
                    ->get();
    
                // Devolver las materias encontradas en formato JSON
                return response()->json($materiasDelDocente, 200);
            }
        }
    
        // Devolver un mensaje de error si no se encontró el usuario o el docente
        return response()->json(["error" => "No se encontró el usuario con el correo electrónico proporcionado o no se encontró el docente asociado."], 404);
    }
    
}
