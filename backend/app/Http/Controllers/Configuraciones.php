<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Configuracion;
use App\Models\Feriado;
use DB;

class Configuraciones extends Controller
{
    public function registrar(Request $request)
    {
        $request->validate([
            'periodosAulaComun' => 'required|string',
            'periodosLaboratorio' => 'required|string',
            'periodosAuditorio' => 'required|string',
            'periodosUsuario' => 'required|string', // Corrige aquí
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date',
            'mensajesMasivos' => 'required|string'
        ]);

        try {
            $this->updateOrCreateConfiguracion("Aula Comun", $request->input('periodosAulaComun'));
            $this->updateOrCreateConfiguracion("Laboratorios", $request->input('periodosLaboratorio'));
            $this->updateOrCreateConfiguracion("Auditorio", $request->input('periodosAuditorio'));
            $this->updateOrCreateConfiguracion("Tiempo de respuesta Usuario", $request->input('periodosUsuario')); // Corrige aquí
            $this->updateOrCreateConfiguracion("Mensajes masivo", $request->input('mensajesMasivos'));
            $this->updateOrCreateConfiguracion("Fecha Inicio", $request->input('fechaInicio'));
            $this->updateOrCreateConfiguracion("Fecha Fin", $request->input('fechaFin'));

            return response()->json(['message' => 'Configuración registrada correctamente'], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar la configuración: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar la configuración'], 500);
        }
    }

    private function updateOrCreateConfiguracion($key, $value)
    {
        Configuracion::updateOrCreate(
            ['configuracion' => $key],
            ['valor' => $value]
        );
    }

    public function obtenerConfiguraciones()
    {
        try {
            $configuraciones = Configuracion::all();
            return response()->json($configuraciones, 200);
        } catch (\Exception $e) {
            \Log::error('Error al obtener la configuración: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener la configuración'], 500);
        }
    }

    public function obtenerFeriados()
    {
        try {
            $feriados = Feriado::all();
            return response()->json($feriados, 200);
        } catch (\Exception $e) {
            \Log::error('Error al obtener los feriados: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener los feriados'], 500);
        }
    }

    public function registrarFeriado(Request $request)
    {
        $request->validate([
            'fecha' => 'required|date'
        ]);

        try {
            Feriado::create(['fecha' => $request->input('fecha')]);
            return response()->json(['message' => 'Feriado registrado correctamente'], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar el feriado: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar el feriado'], 500);
        }
    }

    public function eliminarFeriado($fecha)
    {
        try {
            Feriado::where('fecha', $fecha)->delete();
            return response()->json(['message' => 'Feriado eliminado correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al intentar eliminar el feriado: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar el feriado'], 500);
        }
    }

    public function eliminarTodosFeriados()
    {
        try {
            Feriado::truncate();
            return response()->json(['message' => 'Todos los feriados eliminados correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al intentar eliminar todos los feriados: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar todos los feriados'], 500);
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
