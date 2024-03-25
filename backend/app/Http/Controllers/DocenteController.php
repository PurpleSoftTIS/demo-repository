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
        ->select('docente.*', DB::raw("CONCAT(usuario.nombre, '  ', usuario.apellido_paterno, '  ',
         usuario.apellido_materno) AS nombre_completo"))
        ->get();

return response()->json($usuariosConDocentes, 200);
        
    }
}
