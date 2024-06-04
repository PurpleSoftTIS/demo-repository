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
use App\Models\Solicitudes_horario;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class SolicitudController extends Controller
{public function obtenerSolicitud() {
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
            ->where('solicitud.estado_solicitud', 'pendi') 
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
   
            $solicitud = new Solicitud();           
            
            $numero_estudiantes=$datosReserva['cantidadEstudiantes'];
            $solicitud->numero_estudiantes=$numero_estudiantes;
            $fecha = Carbon::createFromFormat('d/m/Y', $datosReserva['fechaSeleccionada'])->format('Y-m-d');
            $solicitud->fecha_solicitud = $fecha;
            $motivo=$datosReserva['motivo'];
            $solicitud->motivo=$motivo;
            $estado_solicitud='pendi';
            $solicitud->estado_solicitud=$estado_solicitud;
            $solicitud->tipo_solicitud = 'individual'; 
            $solicitud->save();
            $id_solicitud= $solicitud->id_solicitud;
            $periodos= $datosReserva['periodos'];
            foreach($periodos as $periodo){
                $horaInicio = $periodo['horaInicio'];
                $horaFin = $periodo['horaFin'];
                $horaCoincidente = Hora::where('hora_inicio', $horaInicio)
                ->where('hora_fin', $horaFin)
                ->first();
                $id_hora = $horaCoincidente->id_hora;

                $solicitudHora=new Solicitudes_horario ();
                $solicitudHora->id_solicitud = $id_solicitud;
                $solicitudHora->id_hora = $id_hora;
                $solicitudHora->save();




        }
            
            $solicitudesDo=new Solicitudes_docentes ();
            $solicitudesDo->id_docente = $idDocente;
            $solicitudesDo->id_solicitud = $id_solicitud;
            $solicitudesDo->save ();
            $grupos = $datosReserva['grupos'];
            foreach($grupos as $grupo) {
            $solicitudMateria=new Solicitudes_materia();
            $materianombre=$datosReserva['materiaSeleccionada'];
            $materia = Materia::where('nombre_materia', $materianombre)
            ->where('grupo', $grupo)
            ->first();
            $idmateria=$materia->id_materia;
            $solicitudMateria->id_materia=$idmateria;
            $solicitudMateria->id_solicitud=$id_solicitud;
            $solicitudMateria->save(); 
            }
            
            
            
           
                
        } catch (\Exception $e) {
            \Log::error('Error al registrar la solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar la solicitud'], 500);
        }
    }
    public function registrarSolicitudConjunta(Request $datos){
        try {
            \Log::info('Datos recibidos del frontend: ' . json_encode($datos->all()));
            $datosReserva=$datos->all();
            $correo = $datosReserva['correo'];
            $usuario=Usuario::where('correo_electronico',$correo)->first();
            $id_usuario=$usuario->id_usuario;
            $docente=Docente::where('id_usuario',$id_usuario)->first();
            $idDocente=$docente->id_docente;  
   
            $solicitud = new Solicitud();           
            
            $numero_estudiantes=$datosReserva['cantidadEstudiantes'];
            $solicitud->numero_estudiantes=$numero_estudiantes;
            $fecha = Carbon::createFromFormat('d/m/Y', $datosReserva['fechaSeleccionada'])->format('Y-m-d');
            $solicitud->fecha_solicitud = $fecha;
            $motivo=$datosReserva['motivo'];
            $solicitud->motivo=$motivo;
            $estado_solicitud='pendi';
            $solicitud->estado_solicitud=$estado_solicitud;
            $solicitud->tipo_solicitud = 'Cojunta'; 
            $solicitud->save();
            $id_solicitud= $solicitud->id_solicitud;
            $periodos= $datosReserva['periodos'];
            foreach($periodos as $periodo){
                $horaInicio = $periodo['horaInicio'];
                $horaFin = $periodo['horaFin'];
                $horaCoincidente = Hora::where('hora_inicio', $horaInicio)
                ->where('hora_fin', $horaFin)
                ->first();
                $id_hora = $horaCoincidente->id_hora;

                $solicitudHora=new Solicitudes_horario ();
                $solicitudHora->id_solicitud = $id_solicitud;
                $solicitudHora->id_hora = $id_hora;
                $solicitudHora->save();




        }
            
         $docentesSeleccionados = $datosReserva['docentesSeleccionados'];
            foreach ($docentesSeleccionados as $docenteSeleccionado) {
                $nombreCompleto = explode(' ', $docenteSeleccionado['nombre']);
                $nombre = $nombreCompleto[0];
                $apellido_paterno = $nombreCompleto[count($nombreCompleto) - 2];
                $apellido_materno = $nombreCompleto[count($nombreCompleto) - 1];
                $nombre = implode(' ', array_slice($nombreCompleto, 0, count($nombreCompleto) - 2));
    
                $usuario = Usuario::where('nombre', $nombre)
                    ->where('apellido_paterno', $apellido_paterno)
                    ->where('apellido_materno', $apellido_materno)
                    ->first();
    
                if ($usuario) {
                    $id_usuario = $usuario->id_usuario;
                    $docente = Docente::where('id_usuario', $id_usuario)->first();
                    
                    if ($docente) {
                        $idDocente = $docente->id_docente;
                        $solicitudesDo = new Solicitudes_docentes();
                        $solicitudesDo->id_docente = $idDocente;
                        $solicitudesDo->id_solicitud = $id_solicitud;
                        $solicitudesDo->save();
    
                        $gruposDocente = $docenteSeleccionado['grupos'];
                        foreach ($gruposDocente as $grupo) {
                            $solicitudMateria = new Solicitudes_materia();
                            $materianombre = $datosReserva['materiaSeleccionada'];
                            $materia = Materia::where('nombre_materia', $materianombre)
                                ->where('grupo', $grupo)
                                ->first();
    
                            if ($materia) {
                                $solicitudMateria->id_materia = $materia->id_materia;
                                $solicitudMateria->id_solicitud = $id_solicitud;
                                $solicitudMateria->save();
                            }
                        }
                    }
                }
            }
                
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
    public function ambientesContiguos($capacidad, $dia, $horarios)
    {
        \Illuminate\Support\Facades\Log::info('Capacidad: ' . $capacidad);
        \Illuminate\Support\Facades\Log::info('Día: ' . $dia);
        \Illuminate\Support\Facades\Log::info('Horarios: ' . print_r($horarios, true));
    
        $horarios = json_decode($horarios, true);
    
        $aulasDisponibles = DB::table('ambiente')
            ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
            ->select('ambiente.*', 'ubicacion.edificio as nombre_edificio', 'ambiente.numero_piso')
            ->where('ambiente.capacidad', '>=', $capacidad);
    
        foreach ($horarios as $horario) {
            $aulasDisponibles->whereExists(function ($query) use ($dia, $horario) {
                $query->select(DB::raw(1))
                    ->from('diashabiles')
                    ->join('dia', 'diashabiles.id_dia', '=', 'dia.id_dia')
                    ->join('horario', 'diashabiles.id_dia', '=', 'horario.id_dia')
                    ->join('hora', 'horario.id_hora', '=', 'hora.id_hora')
                    ->whereColumn('ambiente.id_ambiente', 'diashabiles.id_ambiente')
                    ->where('dia.nombre', $dia)
                    ->where('hora.hora_inicio', $horario['hora_inicio'])
                    ->where('hora.hora_fin', $horario['hora_fin']);
            });
        }
    
        $aulasDisponibles = $aulasDisponibles->get();
    
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
    public function asignarAula(Request $request)
    {
        $id_ambiente = $request->input('id_ambiente');
        $id_solicitud = $request->input('id_solicitud');
        $solicitud = Solicitud::where('id_solicitud', $id_solicitud)->first();
        $estado = "aceptado";
        $solicitud->estado_solicitud = $estado;
        $solicitud->save();
        $solicitudes = new Solicitudes();
        $solicitudes->id_ambiente = $id_ambiente;
        $solicitudes->id_solicitud = $id_solicitud;  
        $solicitudes->save();
    
        return response()->json(['message' => 'El aula se asignó correctamente'], 200);
    }
    public function docentesPorMateria($materia)
    {
        try {
            $materias = DB::table('materia')->where('nombre_materia', $materia)->get();
    
            $resultados = [];
    
            foreach ($materias as $materia) {
                $docentesMateria = DB::table('materia_docente')
                    ->where('id_materia', $materia->id_materia)
                    ->join('docente', 'materia_docente.id_docente', '=', 'docente.id_docente')
                    ->join('usuario', 'docente.id_usuario', '=', 'usuario.id_usuario')
                    ->select('docente.*', 'usuario.*')
                    ->get();
    
                    foreach ($docentesMateria as $docente) {
                        $resultados[] = [
                            'materia' => $materia,
                            'docente' => $docente,
                        ];
                    }
            }
    
            return response()->json($resultados, 200);
        } catch (\Exception $e) {
            \Log::error('Error al intentar obtener los docentes por materia: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener los docentes por materia'], 500);
        }
    }


}
