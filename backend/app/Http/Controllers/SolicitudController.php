<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\Docente;
use App\Models\Hora;
use App\Models\Solicitud;
use App\Models\Solicitudes;
use App\Models\Solicitudes_docentes;
use App\Models\Materia;
use App\Models\Solicitudes_materia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class SolicitudController extends Controller
{
    public function obtenerSolicitud() {
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
            $fecha = Carbon::createFromFormat('d/m/Y', $datosReserva['fecha'])->format('Y-m-d');
            $solicitud->fecha_solicitud = $fecha;
            $motivo=$datosReserva['motivo'];
            $solicitud->motivo=$motivo;
            $estado_solicitud='espera';
            $solicitud->estado_solicitud=$estado_solicitud;
            $solicitud->tipo_solicitud = 'individual'; 
            $solicitud->save();
            $id_solicitud= $solicitud->id_solicitud;

            $aulas = $datosReserva['aula'];
        foreach ($aulas as $aula) {
             $solicitudes = new Solicitudes();
            $solicitudes->id_ambiente = $aula['id_ambiente'];
            $solicitudes->id_solicitud = $id_solicitud;
            $solicitudes->save();
        }
            $solicitudesDo=new Solicitudes_docentes ();
            $solicitudesDo->id_docente = $idDocente;
            $solicitudesDo->id_solicitud = $id_solicitud;
            $solicitudesDo->save ();

            $solicitudMateria=new Solicitudes_materia();
            $idmateria=$datosReserva['materia'];
            $solicitudMateria->id_materia=$idmateria;
            $solicitudMateria->id_solicitud=$id_solicitud;
            $solicitudMateria->save(); 

            $aulas = $datosReserva['aula'];
            foreach ($aulas as $aula) {
             $solicitudes = new Solicitudes();
            $solicitudes->id_ambiente = $aula['id_ambiente'];
            $solicitudes->id_solicitud = $id_solicitud;
            $solicitudes->save();
             }
            
             $docentes = $datosReserva['nombre'];
            foreach ($docentes as $docente) {
             $solicitudesDo = new Solicitudes_docentes();
             $solicitudesDo->id_docente = $docente['id_docente'];
             $solicitudesDo->id_solicitud = $id_solicitud;
             $solicitudesDo->save();
            }
            
            $solicitudMateria=new Solicitudes_materia();
            $idmateria=$datosReserva['materia'];
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
    public function obtenerDocentesPorSolicitud($idSolicitud) {
        try {
            // Obtener los docentes asociados a la solicitud mediante su ID
            $docentes = DB::table('solicitud')
                ->join('solicitudes_docentes', 'solicitudes_docentes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('docente', 'solicitudes_docentes.id_docente', '=', 'docente.id_docente')
                ->select('docente.*')
                ->where('solicitud.id_solicitud', $idSolicitud)
                ->get();
            
            return response()->json($docentes, 200);
        } catch (\Exception $e) {
            \Log::error('Error al obtener los datos de los docentes por solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener los datos de los docentes por solicitud'], 500);
        }
    }    
    public function obtenerAmbientesPorSolicitud($idSolicitud) {
        try {
            // Obtener los ambientes asociados a la solicitud mediante su ID
            $ambientes = DB::table('solicitud')
                ->join('ambiente', 'ambiente.id_ambiente', '=', 'solicitud.id_ambiente')
                ->select('ambiente.*')
                ->where('solicitud.id_solicitud', $idSolicitud)
                ->get();
            
            return response()->json($ambientes, 200);
        } catch (\Exception $e) {
            \Log::error('Error al obtener los datos de los ambientes por solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener los datos de los ambientes por solicitud'], 500);
        }
    }
    public function ambientesContiguos($capacidad, $dia, $hora_inicio, $hora_fin)
    {
        $aulasDisponibles = DB::table('ambiente')
            ->join('diashabiles', 'ambiente.id_ambiente', '=', 'diashabiles.id_ambiente')
            ->join('dia', 'diashabiles.id_dia', '=', 'dia.id_dia')
            ->join('horario', 'diashabiles.id_dia', '=', 'horario.id_dia')
            ->join('hora', 'horario.id_hora', '=', 'hora.id_hora')
            ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
            ->select('ambiente.*', 'ubicacion.edificio as nombre_edificio', 'ambiente.numero_piso')
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
                $combinacionesValidas = array_merge($combinacionesValidas, $this->generarCombinaciones($aulasEnPiso, $capacidad));
            }
        }
    
        return response()->json($combinacionesValidas, 200);
    }
    
    private function generarCombinaciones($aulas, $capacidad) {
        $combinacionesValidas = [];
        $totalAulas = count($aulas);
        for ($i = 0; $i < $totalAulas - 1; $i++) {
            $capacidadTotal = $aulas[$i]->capacidad;
            $combinacion = [$aulas[$i]];
            for ($j = $i + 1; $j < $totalAulas; $j++) {
                $capacidadTotal += $aulas[$j]->capacidad;
                $combinacion[] = $aulas[$j];
                if ($capacidadTotal >= $capacidad) {
                    $combinacionesValidas[] = $combinacion;
                    break; 
                }
            }
        }
        return $combinacionesValidas;
    }
}
