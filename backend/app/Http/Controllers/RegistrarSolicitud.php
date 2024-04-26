<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Solicitud;
use App\Models\Solicitudes;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\UbicacionController;
use App\Http\Controllers\MateriaController;

use Illuminate\Http\Request;
use PhpParser\Node\Expr\BitwiseNot;
class RegistrarSolicitud extends Controller
{
    public function registrar(Request $request)
    {
        try {
            // Crear una nueva instancia de Solicitud y asignar los valores
            $solicitud = new Solicitud();
            $solicitud->id_docente = $request->input('id_docente');
            $solicitud->id_hora = $request->input('id_hora');
            $solicitud->numero_estudiantes = $request->input('capacidad');
            $solicitud->motivo = $request->input('motivo');
            $solicitud->estado_solicitud = "activo"; // Se establece el estado predeterminado

            // Guardar la solicitud en la base de datos
            $solicitud->save();

            // Crear una nueva instancia de Solicitudes y asignar los valores
            $solicitudes = new Solicitudes();
            $solicitudes->id_solicitud = $solicitud->id; // Se obtiene el ID de la solicitud recién creada
            $solicitudes->id_ambiente = $request->input('id_ambiente'); // Se asume que se pasa el ID del ambiente desde la solicitud

            // Guardar la relación entre la solicitud y el ambiente en la tabla de Solicitudes
            $solicitudes->save();

            // Retornar una respuesta JSON con un mensaje de éxito y el código de estado 201 (creado)
            return response()->json(['message' => 'Solicitud registrada correctamente'], 201);
        } catch (\Exception $e) {
            // Manejar cualquier excepción que ocurra durante el proceso
            \Log::error('Error al intentar registrar una solicitud: ' . $e->getMessage());
            // Retornar una respuesta JSON con un mensaje de error y el código de estado 500 (error interno del servidor)
            return response()->json(['error' => 'Error al registrar la solicitud'], 500);
        }
    }
}
