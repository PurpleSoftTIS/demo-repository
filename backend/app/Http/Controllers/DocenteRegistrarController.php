<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Models\Docente;

class DocenteRegistrarController extends Controller
{
    public function registrar(Request $request)
    {
        try {
            // Crear un nuevo usuario
            $usuario = new Usuario();
            $usuario->nombre = $request->input('nombres');
            $usuario->apellido_paterno = $request->input('apellidoPaterno');
            $usuario->apellido_materno = $request->input('apellidoMaterno');
            $usuario->correo_electronico = $request->input('correo');
            $usuario->save();

            // Crear un nuevo docente
            $docente = new Docente();
            $docente->id_usuario = $usuario->id_usuario; // Asignar el ID del usuario creado
            $docente->tipo_docente = $request->input('tipo');
            $docente->codigo_docente = $request->input('codigoDocente');
            $docente->estado_docente = 'activo'; // Puedes definir el estado aquí
            $docente->save();

            return response()->json(['message' => 'Docente registrado correctamente'], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar un docente: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar un docente'], 500);
        }
    }
}