<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carrera;
use DB;

class CarreraController extends Controller
{
    public function index()
    {
        $carreras = Carrera::select(
                'carrera.*',
            )
            ->get();

        return response()->json($carreras, 200);
    }
    
    public function registrarCarrera(Request $request)
    {
        try {
            // Validar datos de entrada...
            $request->validate([
                'nombre_carrera' => 'required|string|max:255',
            ]);

            // Crear la carrera
            $carrera = Carrera::create([
                'nombre_carrera' => $request->input('nombre_carrera'),
            ]);

            return response()->json(['message' => 'Carrera registrada correctamente', 'carrera' => $carrera], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar una carrera: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar una carrera'], 500);
        }
    }
}