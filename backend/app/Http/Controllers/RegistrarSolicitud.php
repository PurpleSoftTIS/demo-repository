<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Solicitud;
use App\Models\Solicitudes;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\BitwiseNot;
use App\Http\Controllers\DocenteController;
class RegistrarSolicitud extends Controller
{
    public function registrar(Request $request)
    {
        try {
            //Solicitar id docente 
            $ambiente = $request->input("id_docente");

            //Crear un nuevo solucitud
            $solicitud = new Solicitud();
            $solicitud->nombre_estudiante = $request->input('numero_estudiantes');
            $solicitud->fecha_solicitud = $request->input('fecha_solicitud');
            $solicitud->motivo = $request->input('motivo');
            $solicitud->estado_solicitud = $request->input('estado_solicitud');           
            $solicitud->save();

            //Crear un nuevo solicitudes
            $solicitudes = new Solicitudes();
            $solicitudes->id_solicitudes = $solicitud->id_solicitudes; 
            $solicitudes->id_ambiente = $ambiente->id_ambiente;             
            $solicitudes->save();

            return response()->json(['message' => 'Solicitud registrado correctamente'], 201);
            } catch (\Exception $e) {
            \Log::error('Error al intentar registrar un docente: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar un docente'], 500);
        }
    }
}
