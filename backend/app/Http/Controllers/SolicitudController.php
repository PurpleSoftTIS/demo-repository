<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Materia;

use App\Models\Hora;
use App\Models\Solicitud;
use App\Models\Solicitudes;
use App\Models\solicitudes_docentes;
use App\Models\solicitudes_materia;
use Illuminate\Http\Request;
use DB;

class SolicitudController extends Controller
{
    public function obtenerSolicitud()
    {
        try {
            $datosSolicitudes = DB::table('solicitud')
                ->join('solicitudes', 'solicitudes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('hora', 'hora.id_hora', '=', 'solicitud.id_hora')
                ->join('ambiente', 'ambiente.id_ambiente', '=', 'solicitudes.id_ambiente')
                ->join('ubicacion', 'ubicacion.id_ubicacion', '=', 'ambiente.id_ubicacion')
                ->join('solicitudes_docentes', 'solicitudes_docentes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('docente', 'docente.id_docente', '=', 'solicitudes_docentes.id_docente')
                ->join('usuario as usuario_docente', 'usuario_docente.id_usuario', '=', 'docente.id_usuario')
                ->join('solicitudes_materia', 'solicitudes_materia.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('materia', 'materia.id_materia', '=', 'solicitudes_materia.id_materia')
                ->select(
                    'hora.*',
                    'ambiente.*',
                    'ubicacion.*',
                    'solicitud.*',
                    'materia.*',
                    'docente.*',
                    'usuario_docente.*'
                )
                ->where('solicitud.estado_solicitud', '=', 'pendiente') // Condición para el estado pendiente
                ->get();
                
            return response()->json($datosSolicitudes, 200);
    
        } catch (\Exception $e) {
            \Log::error('Error al intentar obtener una solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la solicitud'], 500);
        }
    }
    
    public function obtenerHora() {
        $datosSolicitados = DB::table('hora')
        ->select(
            'hora.*'
        )
        ->get();
        return response()->json($datosSolicitados, 200);

    }

    public function registrarSolicitud(Request $datos){
        try {
            \Log::info('Datos recibidos del frontend: ' . json_encode($datos->all()));
            $datosReserva=$datos->all();
            $correo = $datosReserva['correo'];
             $usuario=Usuario::where('correo_electronico',$correo)->first();
             $id_usuario=$usuario->id_usuario;
             $docente=Docente::where('id_usuario',$id_usuario)->first();
             $idDocente=$docente->id_docente;  
             $id_ambiente=$datosReserva['aula'];
   
             $solicitud = new Solicitud(); 
             $horaInicio = $datosReserva['horaInicio'];
             $horaFin = $datosReserva['horaFin'];
             $horaCoincidente = Hora::where('hora_inicio', $horaInicio)
                                      ->where('hora_fin', $horaFin)
                                      ->first();
              $id_hora=$horaCoincidente->id_hora;
              $solicitud->id_hora=$id_hora;
              $numero_estudiantes=$datosReserva['numeroEstudiantes'];
              $solicitud->numero_estudiantes=$numero_estudiantes;
              $fecha = $datosReserva['fecha'];
              $solicitud->fecha_solicitud = $fecha;
              $motivo=$datosReserva['motivo'];
              $solicitud->motivo=$motivo;
              $estado_solicitud='pendiente';
              $solicitud->estado_solicitud=$estado_solicitud;
              $solicitud->tipo_solicitud = 'individual'; 
              $solicitud->save();
   
              $solicitudes=new Solicitudes ();
              $id_ambiente=$datosReserva['aula'];
              $solicitudes->id_ambiente=$id_ambiente;
              $id_solicitud= $solicitud->id_solicitud;
              $solicitudes->id_solicitud=$id_solicitud;
              $solicitudes->save ();
             
             
              $solicitudesDo=new solicitudes_docentes ();
              $solicitudesDo->id_docente = $idDocente;
              $solicitudesDo->id_solicitud = $id_solicitud;
              $solicitudesDo->save ();
              $solicitudMateria=new solicitudes_materia();
              $nombremateria=$datosReserva['materia'];
              $materia=Materia::where('nombre_materia',$nombremateria)->first();
              $idmateria=$materia->id_materia;
              $solicitudMateria->id_materia=$idmateria;
              $solicitudMateria->id_solicitud=$id_solicitud;
              $solicitudMateria->save();
             
             
             
        } catch (\Exception $e) {
            \Log::error('Error al registrar la solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar la solicitud'], 500);
        }
    }
    public function aceptarSolicitud(Request $request, $id) {
        try {
            $solicitud = Solicitud::where('id_solicitud', $id)->first();
    
            if ($solicitud) {
                $estado = "aceptada";
                $solicitud->estado_solicitud = $estado;
                $solicitud->save();
    
                return response()->json(['message' => 'Solicitud aceptada exitosamente'], 200);
            } else {
                return response()->json(['error' => 'No se encontró la solicitud'], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error al aceptar la solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al aceptar la solicitud'], 500);
        }
    }
    public function rechazarsolicitud(Request $request, $id) {
        try {
            $solicitud = Solicitud::where('id_solicitud', $id)->first();
    
            if ($solicitud) {
                $estado = "rechaza";
               $solicitud->estado_solicitud = $estado;
                $solicitud->save();
    
                return response()->json(['message' => 'Solicitud aceptada exitosamente'], 200);
            } else {
                return response()->json(['error' => 'No se encontró la solicitud'], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error al aceptar la solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al aceptar la solicitud'], 500);
        }
    }

    public function ambientesContiguos($capacidad, $dia, $hora_inicio, $hora_fin)
{
    // Buscar todas las aulas disponibles en el día y hora especificados
    $aulasDisponibles = DB::table('ambiente')
        ->join('diashabiles', 'ambiente.id_ambiente', '=', 'diashabiles.id_ambiente')
        ->join('dia', 'diashabiles.id_dia', '=', 'dia.id_dia')
        ->join('horario', 'diashabiles.id_dia', '=', 'horario.id_dia')
        ->join('hora', 'horario.id_hora', '=', 'hora.id_hora')
        ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
        ->select('ambiente.*', 'ubicacion.edificio as nombre_edificio', 'ambiente.numero_piso') // Cambio aquí
        ->where('dia.nombre', $dia)
        ->where('hora.hora_inicio', '<=', $hora_inicio)
        ->where('hora.hora_fin', '>=', $hora_fin)
        ->get();

    $aulasPorEdificioYPiso = [];
    foreach ($aulasDisponibles as $aula) {
        $aulasPorEdificioYPiso[$aula->nombre_edificio][$aula->numero_piso][] = $aula;
    }

    $combinacionesValidas = [];
    foreach ($aulasPorEdificioYPiso as $edificio => $aulasEnEdificio) {
        foreach ($aulasEnEdificio as $numero_piso => $aulasEnPiso) {
            $totalAulas = count($aulasEnPiso);
            for ($i = 0; $i < $totalAulas - 1; $i++) {
                for ($j = $i + 1; $j < $totalAulas; $j++) {
                    $capacidadTotal = $aulasEnPiso[$i]->capacidad + $aulasEnPiso[$j]->capacidad;
                    if ($capacidadTotal >= $capacidad) {
                        $combinacionesValidas[] = [$aulasEnPiso[$i], $aulasEnPiso[$j]];
                    }
                }
            }
        }
    }

    return response()->json($combinacionesValidas, 200);
}
public function obtenerSolicitudTodas()
    {
        try {
            $datosSolicitudes = DB::table('solicitud')
                ->join('solicitudes', 'solicitudes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('hora', 'hora.id_hora', '=', 'solicitud.id_hora')
                ->join('ambiente', 'ambiente.id_ambiente', '=', 'solicitudes.id_ambiente')
                ->join('ubicacion', 'ubicacion.id_ubicacion', '=', 'ambiente.id_ubicacion')
                ->join('solicitudes_docentes', 'solicitudes_docentes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('docente', 'docente.id_docente', '=', 'solicitudes_docentes.id_docente')
                ->join('usuario as usuario_docente', 'usuario_docente.id_usuario', '=', 'docente.id_usuario')
                ->join('solicitudes_materia', 'solicitudes_materia.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('materia', 'materia.id_materia', '=', 'solicitudes_materia.id_materia')
                ->select(
                    'hora.*',
                    'ambiente.*',
                    'ubicacion.*',
                    'solicitud.*',
                    'materia.*',
                    'docente.*',
                    'usuario_docente.*'
                )
                ->get();
                
            return response()->json($datosSolicitudes, 200);
    
        } catch (\Exception $e) {
            \Log::error('Error al intentar obtener una solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la solicitud'], 500);
        }
    }


}
