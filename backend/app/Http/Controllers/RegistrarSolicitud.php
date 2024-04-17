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
            //Solicitar id solicitud 
            $ambiente = $request->input("id_docente");
            //Crear un nuevo solucitud                     
           
            $solicitud = new Solicitud();
            $solicitud->id_hora = $request->input('hora');
            $solicitud->numero_estudiantes = $request->input('capacidad');
            $solicitud->motivo = $request->input('razon');
            $estado_solitud = "activo";
            $solicitud->estado_solicitud =  $estado_solitud;          
           
            $solicitud->save();
            $solicitud = new Solicitud();
            $solicitud->id_hora = $request->input('id_hora');
            $solicitud->numero_estudiantes = $request->input('motivo');
            $solicitud->motivo = $request->input('estado_solicitud');
            $solicitud->estado_solicitud = $request->input('estado_solicitud');          
           
            $solicitud->save();
            /*
            $table->id("id_solicitud");
            $table->foreignId("id_docente")->constrained("docente", "id_docente");
            $table->foreignId("id_hora")->constrained("hora", "id_hora");
            $table->integer("numero_estudiantes");
            $table->dateTime("fecha_solicitud");
            $table->string("motivo");
            $table->string("estado_solicitud", 8);
            $table->timestamps();*/

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
