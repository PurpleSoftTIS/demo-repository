<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Configuracion;
use App\Models\Configuracion_Fecha;
use App\Models\Feriado;
use DB;
class Configuraciones extends Controller
{
    public function registrar(Request $request)
    {
        Configuracion::truncate();
        Configuracion_Fecha::truncate();
        Feriado::truncate();
        $request->validate([
            'periodosAulaComun' => 'required|string',
            'periodosLaboratorio' => 'required|string',
            'periodosAuditorio' => 'required|string',
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date',
            'feriados' => 'required|array',
            'mensajesMasivos' => 'required|string'
        ]);
        try {
            $configuracion1 = new Configuracion();
            $configuracion1->valor = $request->input('periodosAulaComun');
            $configuracion1->configuracion = "Aula Comun";            
            $configuracion1->save();

            $configuracion2 = new Configuracion();
            $configuracion2->valor = $request->input('periodosLaboratorio');
            $configuracion2->configuracion = "Laboratorios";            
            $configuracion2->save();

            $configuracion3 = new Configuracion();
            $configuracion3->valor = $request->input('periodosAuditorio');
            $configuracion3->configuracion = "Auditorio";            
            $configuracion3->save();

            $configuracion4 = new Configuracion();
            $configuracion4->valor = $request->input('periodosUsuaro');
            $configuracion4->configuracion = "Tiempo de respuesta Usuario";            
            $configuracion4->save();

            $configuracion5 = new Configuracion();
            $configuracion5->valor = $request->input('mensajesMasivos');
            $configuracion5->configuracion = "Mensajes masivo";            
            $configuracion5->save();

            $configuracion_fecha = new Configuracion_Fecha();           
            $configuracion_fecha->inicio = $request->input('fechaInicio');
            $configuracion_fecha->fin = $request->input('fechaFin');
            $configuracion_fecha->save();

            // Guardar los feriados
            foreach ($request->input('feriados') as $fechaFeriado) {
                $feriado = new Feriado();
                $feriado->fecha = $fechaFeriado;
                $feriado->save();
            }

            return response()->json(['message' => 'Configuración registrada correctamente'], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar la configuración: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar la configuración'], 500);
        }
    }
    public function obtenerconf(){
        try{
            $configuraciones = Configuracion::all();
             return response()->json($configuraciones, 200);

        }catch (\Exception $e) {
            \Log::error('Error al obtener la configuración: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la configuración'], 500);
        }        
    }
    public function obtenerconFecha(){
       
         try{
            $configuraciones = Configuracion_Fecha::all();
            return response()->json($configuraciones, 200);
        }catch (\Exception $e) {
            \Log::error('Error al obtener la configuración: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la configuración'], 500);
        }
    }
    public function obtenerconfFeriados(){
       
         try{
            $configuraciones = Feriado::all();
            return response()->json($configuraciones, 200);
        }catch (\Exception $e) {
            \Log::error('Error al obtener la configuración: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la configuración'], 500);
        }
    }
    
    public function ambientesfechas($capacidad, $dia, $horarios , $fecha)
       {
           $horarios = json_decode($horarios, true);
       
           $query = DB::table('ambiente')
               ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
               ->where('ambiente.capacidad', '>=', $capacidad);
       
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
}
