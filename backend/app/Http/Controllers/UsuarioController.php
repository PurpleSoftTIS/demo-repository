<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; // Asegúrate de importar Controller aquí

class UsuarioController extends Controller
{
    public function index()
    {

        $usuariosConDocentes = Usuario::get();        
            return response()->json($usuariosConDocentes, 200);      
        
    }
    public function obtenerNombreUsuario(Request $request)
    {
        $correo = $request->input('correo_electronico');

        try {
            $usuario = Usuario::where('correo_electronico', $correo)->first();
            if ($usuario) {
                return response()->json(['nombre' => $usuario->nombre], 200);
            } else {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Error al intentar obtener el nombre del usuario: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener el nombre del usuario'], 500);
        }
    }

    
}
