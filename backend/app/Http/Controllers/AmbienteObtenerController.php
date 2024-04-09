<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class AmbienteObtenerController extends Controller
{
    public function index()
    {
        $docenteConHorario = DB::table('ambiente')
        ->join('ambiente', 'horario.id_usuario', '=', 'ambiente.id_usuario')
        ->select('docente.*', DB::raw("CONCAT(usuario.nombre, '  ', usuario.apellido_paterno, '  ',
         usuario.apellido_materno) AS nombre_completo"))
        ->get();

return response()->json($docenteConHorario, 200);
        
    }
}
