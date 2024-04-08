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
        ->select('docente.*','usuario.correo_electronico', DB::raw("CONCAT(usuario.nombre, '  ', usuario.apellido_paterno, '  ',
         usuario.apellido_materno) AS nombre_completo"))
        ->get();

        return response()->json($usuariosConDocentes, 200);
        
    }
    public function eliminar($id_docente)
    {
        try {
            // Buscar al docente por su ID
            $docente = Docente::findOrFail($id_docente);

            // Obtener el ID del usuario asociado al docente
            $id_usuario = $docente->id_usuario;

            // Eliminar al docente
            $docente->delete();

            // Buscar al usuario correspondiente y eliminarlo
            $usuario = Usuario::findOrFail($id_usuario);
            $usuario->delete();

            return response()->json(['message' => 'Docente y usuario eliminados correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al intentar eliminar el docente y usuario: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar el docente y usuario'], 500);
        }
    }
}
