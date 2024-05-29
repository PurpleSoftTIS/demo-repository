<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Configuracion;
use App\Models\Configuracion_Fecha;
use App\Models\Feriado;

class Configuraciones extends Controller
{
    public function registrar(Request $request)
    {
        $request->validate([
            'periodosAulaComun' => 'required|string',
            'periodosLaboratorio' => 'required|string',
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date',
            'feriados' => 'required|array',
            'mensajesMasivos' => 'required|string'
        ]);

        try {
            // Guardar la configuración principal
            $configuracion = new Configuracion();
            $configuracion->valor = $request->input('periodosAulaComun');
            $configuracion->configuracion = $request->input('periodosLaboratorio');            
            $configuracion->save();


            $configuracion_fecha = new Configuracion_Fecha();           
            $configuracion_fecha->inicio = $request->input('fechaInicio');
            $configuracion_fecha->fin = $request->input('fechaFin');
            $configuracion_fecha->save();

            // Guardar los feriados
            foreach ($request->input('feriados') as $fechaFeriado) {
                $feriado = new Feriado();
                $feriado->fecha = $fechaFeriado;
                $feriado->configuracion_id = $configuracion->id; // Establecer la relación
                $feriado->save();
            }

            return response()->json(['message' => 'Configuración registrada correctamente'], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar la configuración: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar la configuración'], 500);
        }
    }
    public function obtenerconf(){
        $configuraciones = Configuracion::all();
         return response()->json($configuraciones, 200);
       }
}
