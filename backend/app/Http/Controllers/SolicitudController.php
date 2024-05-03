<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Solicitud;
use App\Models\Hora;


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
    public function registrarSolicitud(Request $datos){
   

        $datosReserva=$datos->all();
        info('Datos recibidos:', $datosReserva);
         $correo = $datosReserva['correo'];
         $usuario=Usuario::where('correo_electronico',$correo)->first();
         $id_usuario=$usuario->id_usuario;
         $docente=Docente::where('id_usuario',$id_usuario)->first();
         $id_docente=$docente->id_docente;  
         $id_ambiente=$datosReserva['aula'];
         $solicitud = new Solicitud(); 
         $solicitud->id_docente=$id_docente;
         $horaInicio = $datosReserva['horaInicio'];
         $horaFin = $datosReserva['horaFin'];
         $horaCoincidente = Hora::where('hora_inicio', $horaInicio)
                                  ->where('hora_fin', $horaFin)
                                  ->first();
          $id_hora=$horaCoincidente->id_hora;
          $solicitud->id_hora=$id_hora;
          $numero_estudiantes=$datosReserva['numeroEstudiantes'];
          $solicitud->numero_estudiantes=$numero_estudiantes;
          $fecha='2024-05-02';
          $solicitud->fecha_solicitud=$fecha;
          $motivo=$datosReserva['motivo'];
          $solicitud->motivo=$motivo;
          $estado_solicitud='espera';
          $solicitud->estado_solicitud=$estado_solicitud;
          $solicitud->tipo_solicitud = 'individual'; 

          $solicitud->save();
          
   }
       

}