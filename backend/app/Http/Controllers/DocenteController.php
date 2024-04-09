<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;
use App\Models\Usuario;
use DB;

class DocenteController extends Controller
{
    public function index()
    {
    $usuariosConDocentes = DB::table('usuario')
        ->join('docente', 'usuario.id_usuario', '=', 'docente.id_usuario')
        ->select(
            'docente.*',
            'usuario.*'
        )
        ->get();

    return response()->json($usuariosConDocentes, 200);
}

    public function eliminar($id_docente)
    {
        try {
            $docente = Docente::findOrFail($id_docente);
            $id_usuario = $docente->id_usuario;
            $docente->delete();
            $usuario = Usuario::findOrFail($id_usuario);
            $usuario->delete();

            return response()->json(['message' => 'Docente y usuario eliminados correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al intentar eliminar el docente y usuario: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar el docente y usuario'], 500);
        }
    }
    public function verificarCorreo(Request $request)
    {
        $request->validate([
            'correo_electronico' => 'required|email',
        ]);
        $usuario = Usuario::where('correo_electronico', 
        $request->correo_electronico)->first();
        if ($usuario) {
            return response()->json(['exists' => true]);
        } else {
            return response()->json(['exists' => false]);
        }
    }
}
