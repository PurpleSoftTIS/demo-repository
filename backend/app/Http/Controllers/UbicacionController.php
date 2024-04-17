<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ubicacion;
class UbicacionController extends Controller
{   
        public function index()
        {
            return Ubicacion::all();
        }    
        public function show($id)
        {
            return Ubicacion::findOrFail($id);
        }
        public function forValue(Request $request){
            $request->validate([
                'hora_inicio' => 'required|horaIni',
                'hora_fin' => 'required|horaFin',
            ]);
            $hora_inicio = Ubicacion::where('hora_inicio', $request->horaIni)->first();
            if (!$hora_inicio) {
                return response()->json(['correcta' => false, 'mensaje' => 'Hora incorrecta'], 404);
            }
        }
    }
