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
use App\Models\UsoAmbiente;
use App\Models\Ambiente;
use App\Models\Ubicacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use DB;

class SolicitudController extends Controller
{
    public function obtenerSolicitud() {
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
                'solicitud.fecha_solicitud', 'solicitud.estado_solicitud', 'solicitud.motivo','solicitud.tipo_solicitud',
                
                DB::raw("GROUP_CONCAT(CONCAT(hora.hora_inicio, ' - ', hora.hora_fin) SEPARATOR ', ') as horas"),
                DB::raw("GROUP_CONCAT(DISTINCT CONCAT(materia.grupo) SEPARATOR ', ') as grupos"),
                DB::raw("GROUP_CONCAT(DISTINCT CONCAT(usuario.nombre, ' ', usuario.apellido_paterno, ' ', usuario.apellido_materno)) as nombres_docentes"),
        
                'materia.nombre_materia', 'solicitud.created_at', 'solicitud.id_solicitud', 'solicitud.numero_estudiantes'
               , DB::raw("MIN(usuario.nombre) as nombre"), 
                DB::raw("MIN(usuario.apellido_paterno) as apellido_paterno"), 
                DB::raw("MIN(usuario.apellido_materno) as apellido_materno"),
                DB::raw("MIN(usuario.correo_electronico) as correo_electronico") 
                )
            ->where('solicitud.estado_solicitud', 'pendi') 
            ->groupBy(
                'solicitud.fecha_solicitud', 'solicitud.estado_solicitud', 'solicitud.motivo','solicitud.tipo_solicitud',
                'materia.nombre_materia', 'solicitud.created_at', 'solicitud.id_solicitud', 'solicitud.numero_estudiantes'
            )
            ->get();
        
        return response()->json($datosSolicitudes, 200);
        
    
        } catch (\Exception $e) {
            \Log::error('Error al intentar obtener una solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la solicitud'], 500);
        }
    }
    public function obtenerSolicitudUrgentes() {
        try {
            $fechaActual = \Carbon\Carbon::now();
            $fechaLimite = $fechaActual->copy()->addDays(2)->toDateString(); // Fecha límite es hoy + 2 días
    
            $datosSolicitudes = DB::table('solicitud')
                ->join('solicitudes_horario', 'solicitudes_horario.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('hora', 'hora.id_hora', '=', 'solicitudes_horario.id_hora')
                ->join('solicitudes_docentes', 'solicitudes_docentes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('docente', 'docente.id_docente', '=', 'solicitudes_docentes.id_docente')
                ->join('usuario', 'usuario.id_usuario', '=', 'docente.id_usuario')
                ->join('solicitudes_materias', 'solicitudes_materias.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('materia', 'materia.id_materia', '=', 'solicitudes_materias.id_materia')
                ->select(
                    'solicitud.fecha_solicitud', 'solicitud.estado_solicitud', 'solicitud.motivo',
                    DB::raw("GROUP_CONCAT(CONCAT(hora.hora_inicio, ' - ', hora.hora_fin) SEPARATOR ', ') as horas"),
                    DB::raw("GROUP_CONCAT(DISTINCT CONCAT(usuario.nombre, ' ', usuario.apellido_paterno, ' ', usuario.apellido_materno)) as nombres_docentes"),
                    'materia.nombre_materia', 'solicitud.created_at', 'solicitud.id_solicitud', 'solicitud.numero_estudiantes',
                    DB::raw("MIN(usuario.nombre) as nombre"),
                    DB::raw("MIN(usuario.apellido_paterno) as apellido_paterno"),
                    DB::raw("MIN(usuario.apellido_materno) as apellido_materno")
                )
                ->where('solicitud.estado_solicitud', 'pendi')
                ->where(function($query) use ($fechaActual, $fechaLimite) {
                    $query->where('solicitud.fecha_solicitud', '>=', $fechaActual->toDateString())
                          ->where('solicitud.fecha_solicitud', '<=', $fechaLimite)
                          ->whereIn('solicitud.motivo', ['Examen de mesa','Examen Segunda instancia', 'Examen final','Examen Segundo Parcial','Examen Primer Parcial']);
                })
                ->groupBy(
                    'solicitud.fecha_solicitud', 'solicitud.estado_solicitud', 'solicitud.motivo',
                    'materia.nombre_materia', 'solicitud.created_at', 'solicitud.id_solicitud', 'solicitud.numero_estudiantes'
                )
                ->get();
    
            return response()->json($datosSolicitudes, 200);
    
        } catch (\Exception $e) {
            \Log::error('Error al intentar obtener una solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la solicitud'], 500);
        }
    }
    /***/
    public function obtenerTodasSolicitudes() {
        try {
            $datosSolicitudes = DB::table('solicitud')
                ->join('solicitudes_horario', 'solicitudes_horario.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('hora', 'hora.id_hora', '=', 'solicitudes_horario.id_hora')
                ->join('solicitudes_docentes', 'solicitudes_docentes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('docente', 'docente.id_docente', '=', 'solicitudes_docentes.id_docente')
                ->join('usuario', 'usuario.id_usuario', '=', 'docente.id_usuario')
                ->join('solicitudes_materias', 'solicitudes_materias.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('materia', 'materia.id_materia', '=', 'solicitudes_materias.id_materia')
                ->join('solicitudes', 'solicitudes.id_solicitud', '=', 'solicitud.id_solicitud')
                ->join('ambiente', 'ambiente.id_ambiente', '=', 'solicitudes.id_ambiente')
                ->join('ubicacion', 'ubicacion.id_ubicacion', '=', 'ambiente.id_ubicacion')
                ->join('carrera', 'carrera.id_carrera', '=', 'materia.id_carrera')
                ->select(
                    'solicitud.fecha_solicitud', 'solicitud.estado_solicitud', 'solicitud.motivo', 'solicitud.tipo_solicitud',
                    DB::raw("GROUP_CONCAT(CONCAT(hora.hora_inicio, ' - ', hora.hora_fin) SEPARATOR ', ') as horas"),
                    'usuario.nombre', 'usuario.apellido_paterno', 'usuario.apellido_materno',
                    'materia.nombre_materia', 'materia.grupo', 'carrera.nombre_carrera', 
                    'solicitud.numero_estudiantes', 'ambiente.nombre_ambiente as aula', 'ubicacion.edificio', 
                    'ambiente.tipo_ambiente', 'ambiente.numero_piso as piso'
                )
                ->where('solicitud.estado_solicitud', 'aceptado') 
                ->groupBy(
                    'usuario.nombre', 'usuario.apellido_paterno', 'usuario.apellido_materno',
                    'materia.nombre_materia', 'materia.grupo', 'carrera.nombre_carrera',
                    'solicitud.fecha_solicitud', 'solicitud.estado_solicitud', 'solicitud.motivo', 
                    'solicitud.tipo_solicitud', 'solicitud.id_solicitud', 'solicitud.numero_estudiantes', 
                    'ambiente.nombre_ambiente', 'ubicacion.edificio', 'ambiente.tipo_ambiente', 'ambiente.numero_piso'
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
    public function rechazarsolicitud(Request $request)
    {
        $id = $request->input('id_solicitud');

        try {
            $solicitud = Solicitud::where('id_solicitud', $id)->first();

            if ($solicitud) {
                $estado = "rechaza";
                $solicitud->estado_solicitud = $estado;
                $solicitud->save();

                return response()->json(['message' => 'Solicitud rechazada exitosamente'], 200);
            } else {
                return response()->json(['error' => 'No se encontró la solicitud'], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error al rechazar la solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al rechazar la solicitud'], 500);
        }
    }
    public function rechazarsolicitudMail(Request $request)
    {
        $id = $request->input('id_solicitud');
        $correoElectronico = $request->input('correo_electronico');

        try {
            $solicitud = Solicitud::where('id_solicitud', $id)->first();

            if ($solicitud) {
                $estado = "rechaza";
                $solicitud->estado_solicitud = $estado;
                $solicitud->save();

                if ($correoElectronico) {
                    $this->enviarCorreoRechazo($correoElectronico, $solicitud);
                }

                return response()->json(['message' => 'Solicitud rechazada y correo enviado exitosamente'], 200);
            } else {
                return response()->json(['error' => 'No se encontró la solicitud'], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error al rechazar la solicitud: ' . $e->getMessage());
            return response()->json(['error' => 'Error al rechazar la solicitud'], 500);
        }
    }

    public function enviarCorreoRechazo($correoElectronico, $solicitud)
    {
        // Preparar el mensaje del correo
        $subject = 'Rechazo de Solicitud de Aula';
        $message = "Su solicitud para la fecha {$solicitud->fecha_solicitud}, con motivo {$solicitud->motivo}, no puede ser atendida y fue rechazada. Por favor, vuelva a realizar una nueva reserva en un periodo o fecha diferente.";

        // Enviar el correo
        Mail::raw($message, function ($mail) use ($correoElectronico, $subject) {
            $mail->to($correoElectronico)
                ->subject($subject);
        });
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
    public function ambientesContiguos($dia, $horarios , $fecha)
    {
        $horarios = json_decode($horarios, true);
    
        $query = DB::table('ambiente')
            ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
            ;
    
        foreach ($horarios as $horario) {
            $query->whereExists(function ($query) use ($dia, $horario) {
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
    
        $ambientes = $query->get();
    
        $ambientesDisponibles = [];
        foreach ($ambientes as $ambiente) {
         $solicitudes = DB::table('solicitudes')
             ->join('solicitud', 'solicitudes.id_solicitud', '=', 'solicitud.id_solicitud')
             ->where('solicitud.fecha_solicitud', $fecha)
             ->where('solicitudes.id_ambiente', $ambiente->id_ambiente)
             ->pluck('solicitud.id_solicitud')
             ->toArray();
     
         $ambienteDisponible = true;
         foreach ($solicitudes as $solicitudId) {
             $horariosSolicitud = DB::table('solicitudes_horario')
                 ->join('hora', 'solicitudes_horario.id_hora', '=', 'hora.id_hora')
                 ->where('solicitudes_horario.id_solicitud', $solicitudId)
                 ->get(['hora.hora_inicio', 'hora.hora_fin'])
                 ->toArray();
     
              foreach ($horariosSolicitud as $horarioSolicitud) {
                 foreach ($horarios as $horario) {
                     if ($horarioSolicitud->hora_inicio == $horario['hora_inicio'] && $horarioSolicitud->hora_fin == $horario['hora_fin']) {
                         $ambienteDisponible = false;
                         break 3; 
                     }
                 }
             }
         }
     
         if ($ambienteDisponible) {
             $ambientesDisponibles[] = $ambiente;
         }
     }
     
     return response()->json($ambientesDisponibles, 200);
     
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
        $usoAmbiente = new UsoAmbiente();
        $usoAmbiente->id_ambiente = $id_ambiente;
        $usoAmbiente->save();    
        return response()->json(['message' => 'El aula se asignó correctamente'], 200);
    }

    public function enviarCorreoAsignacion($correoElectronico, $idSolicitud, $idAmbiente)
    {
        // Obtener la solicitud por ID
        $solicitud = Solicitud::where('id_solicitud', $idSolicitud)->first();
        if (!$solicitud) {
            throw new \Exception("Solicitud con ID {$idSolicitud} no encontrada.");
        }

        // Obtener el ambiente relacionado con la solicitud
        $ambiente = Ambiente::where('id_ambiente', $idAmbiente)->first();
        if (!$ambiente) {
            throw new \Exception("Ambiente con ID {$solicitud->id_ambiente} no encontrado.");
        }

        // Obtener la ubicación relacionada con el ambiente
        $ubicacion = Ubicacion::where('id_ubicacion', $ambiente->id_ubicacion)->first();
        if (!$ubicacion) {
            throw new \Exception("Ubicación con ID {$ambiente->id_ubicacion} no encontrada.");
        }

        // Preparar el mensaje del correo
        $subject = 'Confirmación de Asignación de Aula';
        $message = "Su solicitud de reserva para la fecha: {$solicitud->fecha_solicitud}, con motivo: {$solicitud->motivo}, reserva tipo: {$solicitud->tipo_solicitud} fue aceptada y asignada al aula \"{$ambiente->nombre_ambiente}\", en el edificio \"{$ubicacion->edificio}\". Por favor, verifique el estado de su reserva en la lista de reservas y en el calendario.";

        // Enviar el correo
        Mail::raw($message, function ($mail) use ($correoElectronico, $subject) {
            $mail->to($correoElectronico)
                ->subject($subject);
        });
    }

    public function asignarAulaMail(Request $request)
    {
        $id_ambiente = $request->input('id_ambiente');
        $id_solicitud = $request->input('id_solicitud');
        $correo_electronico = $request->input('correo_electronico');

        $solicitud = Solicitud::where('id_solicitud', $id_solicitud)->first();
        $estado = "aceptado";
        $solicitud->estado_solicitud = $estado;
        $solicitud->save();

        $solicitudes = new Solicitudes();
        $solicitudes->id_ambiente = $id_ambiente;
        $solicitudes->id_solicitud = $id_solicitud;  
        $solicitudes->save();

        $usoAmbiente = new UsoAmbiente();
        $usoAmbiente->id_ambiente = $id_ambiente;
        $usoAmbiente->save();    

        $this->enviarCorreoAsignacion($correo_electronico, $id_solicitud, $id_ambiente);

        return response()->json(['message' => 'El aula se asignó correctamente y se envió un correo de confirmación'], 200);
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
    public function asignarAmbientes(Request $datos)
    {
        
        \Log::info('Datos recibidos del frontend: ' . json_encode($datos->all()));
        $ambientes=$datos->all();
        
        foreach($ambientes as $ambiente){
            $id_ambiente= $ambiente['id_ambiente'];
            $id_solicitud= $ambiente['id_solicitud'];
            $solicitud= Solicitud::where('id_solicitud',$id_solicitud)->first();
            $estado="sugerencias";
            $solicitud->estado_solicitud = $estado;
            $solicitud->save();
            $solicitudes=new Solicitudes();
            $solicitudes->id_ambiente = $id_ambiente;
            $solicitudes->id_solicitud = $id_solicitud;  
            $solicitudes->save();
            $usoAmbiente = new UsoAmbiente();
            $usoAmbiente->id_ambiente = $id_ambiente;
            $usoAmbiente->save(); 
          
     }
     return response()->json(['message' => 'Los Aulas Se Asignaron corectamente'], 200);  
    }

    public function asignarAmbientesMail(Request $datos)
    {
        \Log::info('Datos recibidos del frontend: ' . json_encode($datos->all()));
        $ambientes = $datos->all();
        
        // Extraer el correo electrónico del primer elemento (suponiendo que es el mismo para todos los ambientes)
        $correo_electronico = $ambientes[0]['correo_electronico'] ?? null;
    
        if (is_null($correo_electronico) || !filter_var($correo_electronico, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['message' => 'Correo electrónico inválido'], 400);
        }
    
        foreach ($ambientes as $ambiente) {
            $id_ambiente = $ambiente['id_ambiente'];
            $id_solicitud = $ambiente['id_solicitud'];
            $solicitud = Solicitud::where('id_solicitud', $id_solicitud)->first();
            $estado = "sugerencias";
            $solicitud->estado_solicitud = $estado;
            $solicitud->save();
            
            $solicitudes = new Solicitudes();
            $solicitudes->id_ambiente = $id_ambiente;
            $solicitudes->id_solicitud = $id_solicitud;  
            $solicitudes->save();
            
            $usoAmbiente = new UsoAmbiente();
            $usoAmbiente->id_ambiente = $id_ambiente;
            $usoAmbiente->save(); 
        }
        
        // Llamar al método para enviar el correo de sugerencias
        $this->enviarCorreoSugerencias($correo_electronico, $id_solicitud, $ambientes);
    
        return response()->json(['message' => 'Los Aulas se asignaron correctamente y se envió un correo de sugerencias'], 200);
    }

    public function enviarCorreoSugerencias($correoElectronico, $idSolicitud, $ambientes)
    {
        // Obtener la solicitud por ID
        $solicitud = Solicitud::where('id_solicitud', $idSolicitud)->first();
        if (!$solicitud) {
            throw new \Exception("Solicitud con ID {$idSolicitud} no encontrada.");
        }

        // Preparar el contenido de la lista de ambientes sugeridos
        $listaAmbientes = '';
        foreach ($ambientes as $ambiente) {
            $ambienteDetalle = Ambiente::where('id_ambiente', $ambiente['id_ambiente'])->first();
            if ($ambienteDetalle) {
                $ubicacion = Ubicacion::where('id_ubicacion', $ambienteDetalle->id_ubicacion)->first();
                if ($ubicacion) {
                    $listaAmbientes .= "Aula: {$ambienteDetalle->nombre_ambiente}, Edificio: {$ubicacion->edificio}\n";
                }
            }
        }

        // Preparar el mensaje del correo
        $subject = 'Sugerencias de Aulas para su Solicitud';
        $message = "Sugerencias de la Solicitud: ID {$solicitud->id_solicitud}\n\n";
        $message .= "Su solicitud para la fecha {$solicitud->fecha_solicitud}, no puede ser atendida pero se le envían aulas que pueden cumplir con su requerimiento en la fecha solicitada:\n\n";
        $message .= $listaAmbientes;
        $message .= "\n\nSi desea confirmar su reserva, comuníquese con el administrador mediante mensajes de la plataforma.";

        // Enviar el correo
        Mail::raw($message, function ($mail) use ($correoElectronico, $subject) {
            $mail->to($correoElectronico)
                ->subject($subject);
        });
    }

public function obtenerSolicitudSugeridas() {
    try {
        $datosSolicitudes = DB::table('solicitud')
        ->join('solicitudes_horario', 'solicitudes_horario.id_solicitud', '=', 'solicitud.id_solicitud')
        ->join('hora', 'hora.id_hora', '=', 'solicitudes_horario.id_hora')
        ->join('solicitudes_docentes', 'solicitudes_docentes.id_solicitud', '=', 'solicitud.id_solicitud')
        ->join('docente', 'docente.id_docente', '=', 'solicitudes_docentes.id_docente')
        ->join('usuario', 'usuario.id_usuario', '=', 'docente.id_usuario')
        ->join('solicitudes_materias', 'solicitudes_materias.id_solicitud', '=', 'solicitud.id_solicitud')
        ->join('solicitudes', 'solicitudes.id_solicitud', '=', 'solicitud.id_solicitud')

        ->join('materia', 'materia.id_materia', '=', 'solicitudes_materias.id_materia') 
       
        ->select(
            'solicitud.fecha_solicitud', 'solicitud.estado_solicitud', 'solicitud.motivo',
            
            DB::raw("GROUP_CONCAT(CONCAT(hora.hora_inicio, ' - ', hora.hora_fin) SEPARATOR ', ') as horas"),
            DB::raw("GROUP_CONCAT(DISTINCT CONCAT(usuario.nombre, ' ', usuario.apellido_paterno, ' ', usuario.apellido_materno)) as nombres_docentes"),
            DB::raw("GROUP_CONCAT(DISTINCT solicitudes.id_ambiente SEPARATOR ', ') as id_ambientes")
,
            'materia.nombre_materia', 'solicitud.created_at', 'solicitud.id_solicitud', 'solicitud.numero_estudiantes'
           , DB::raw("MIN(usuario.nombre) as nombre"), 
            DB::raw("MIN(usuario.apellido_paterno) as apellido_paterno"), 
            DB::raw("MIN(usuario.apellido_materno) as apellido_materno") 
            )
        ->where('solicitud.estado_solicitud', 'sugerencias') 
        ->groupBy(
            'solicitud.fecha_solicitud', 'solicitud.estado_solicitud', 'solicitud.motivo',
            'materia.nombre_materia', 'solicitud.created_at', 'solicitud.id_solicitud', 'solicitud.numero_estudiantes'
        )
        ->get();
    
    return response()->json($datosSolicitudes, 200);
    

    } catch (\Exception $e) {
        \Log::error('Error al intentar obtener una solicitud: ' . $e->getMessage());
        return response()->json(['error' => 'Error al obtener la solicitud'], 500);
    }
}
public function asignarSugerencia(Request $request)
{
    $solicitud=$request->all();
    $id_solicitud= $solicitud['id_solicitud'];

    $solicitud= Solicitud::where('id_solicitud',$id_solicitud)->first();
    $estado="aceptado";
    $solicitud->estado_solicitud = $estado;
    $solicitud->save();




}   
public function rechazarSolicitudesAntiguas() {
    try {
        $fechaActual = \Carbon\Carbon::now();
        $fechaLimite = $fechaActual->subDays(2)->toDateTimeString();

        DB::beginTransaction();

        $solicitudesAntiguas = DB::table('solicitud')
            ->where('estado_solicitud', 'sugerencias')
            ->where('created_at', '<', $fechaLimite) // Usar created_at en lugar de updated_at
            ->get();

        foreach ($solicitudesAntiguas as $solicitud) {
            DB::table('solicitud')
                ->where('id_solicitud', $solicitud->id_solicitud)
                ->update(['estado_solicitud' => 'rechazado']);
            
            $solicitudRelacionada = Solicitudes::where('id_solicitud', $solicitud->id_solicitud)->first();
            if ($solicitudRelacionada) {
                $solicitudRelacionada->delete();
            }
        }

        DB::commit();

        return response()->json(['message' => 'Solicitudes antiguas actualizadas y eliminadas correctamente.'], 200);
    } catch (\Exception $e) {
        DB::rollBack();
        \Log::error('Error al intentar actualizar y eliminar solicitudes antiguas: ' . $e->getMessage());
        return response()->json(['error' => 'Error al actualizar y eliminar las solicitudes'], 500);
    }
}

}