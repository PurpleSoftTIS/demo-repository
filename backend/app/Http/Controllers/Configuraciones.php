<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Configuracion;
use App\Models\Feriado;

class Configuraciones extends Controller
{
    public function registrar(Request $request)
    {
        try {
            $request->validate([
                'periodosAulaComun' => 'required|string',
                'periodosLaboratorio' => 'required|string',
                'fechaInicio' => 'required|date',
                'fechaFin' => 'required|date',
                'feriados' => 'required|array',
                'mensajesMasivos' => 'required|string'
            ]);

            //Guardar la configuración principal
            $configuracion = new Configuracion();
            $configuracion->aulas_Comunes = $request->input('periodosAulaComun');
            $configuracion->laboratorios = $request->input('periodosLaboratorio');
            $configuracion->mensajes_Masivos = $request->input('mensajesMasivos');     
            $configuracion->inicio = $request->input('fechaInicio');
            $configuracion->fin = $request->input('fechaFin');
            $configuracion->save();


            //Guardar los feriados
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
        $configuraciones = Configuracion::all();
         return response()->json($configuraciones, 200);
       }
}
