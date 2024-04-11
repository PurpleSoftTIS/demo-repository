<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Materia;
use App\Models\MateriaDocente;
use App\Models\Docente;
use App\Models\Usuario;
use DB;

class MateriaController extends Controller
{
    public function index()
    {
        $materiasConDocentes = DB::table('materia')
            ->join('materia_docente', 'materia.id_materia', '=', 'materia_docente.id_materia')
            ->join('docente', 'materia_docente.id_docente', '=', 'docente.id_docente')
            ->join('usuario', 'docente.id_usuario', '=', 'usuario.id_usuario')
            ->select(
                'materia.id_materia',
                'materia.codigo_materia',
                'materia.nombre_materia',
                'materia.grupo',
                'materia.carrera',
                'materia.estado_materia',

                DB::raw("CONCAT(usuario.nombre, ' ', usuario.apellido_paterno) AS nombre_completo_docente")
            )
            ->get();

        return response()->json($materiasConDocentes, 200);
    }
}