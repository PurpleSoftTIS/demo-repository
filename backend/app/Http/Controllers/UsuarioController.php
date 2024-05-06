<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Mail\Restablecer;
class UsuarioController extends Controller
{
    public function index()
{
    try {
        $usuariosConDocentes = Usuario::with('docente')->get(); 
        return response()->json($usuariosConDocentes, 200);
    } catch (\Exception $e) {
        \Log::error('Error al intentar obtener usuarios con sus docentes: ' . $e->getMessage());
        return response()->json(['error' => 'Error al obtener usuarios con sus docentes'], 500);
    }
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
    public function restablecerContrasenia()
    {
        $detalis = [
            'title' => 'Correo para restablecer su contraseña en el sistema SIRA-FCYT',
            'body' => 'Ingrese su nueva contrasenia'
        ];        
        try {
            Mail::to("gabo2cabero@gmail.com")->send(new Restablecer($detalis));
        return "Correo electronico enviado";
        } catch (\Exception $e) {
            \Log::error('Error al enviar el correo electrónico de restablecimiento: ' . $e->getMessage());
            return "Error al enviar el correo electrónico de restablecimiento";
        }
    }    
}
