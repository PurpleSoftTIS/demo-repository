<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Materia;
use App\Models\MateriaDocente;
use App\Models\Docente;
use App\Models\Usuario;
use App\Models\Carrera;
use DB;

class MateriaController extends Controller
{
    public function index()
    {
        $materiasConDocentes = Materia::select(
                'materia.id_materia',
                'materia.codigo_materia',
                'materia.nombre_materia',
                'materia.grupo',
                'materia.estado_materia',
                'carrera.nombre_carrera', 
                DB::raw("CONCAT(usuario.nombre, ' ', usuario.apellido_paterno) AS nombre_completo_docente")
            )
            ->join('materia_docente', 'materia.id_materia', '=', 'materia_docente.id_materia')
            ->join('docente', 'materia_docente.id_docente', '=', 'docente.id_docente')
            ->join('usuario', 'docente.id_usuario', '=', 'usuario.id_usuario')
            ->join('carrera', 'materia.id_carrera', '=', 'carrera.id_carrera') // Unir con la tabla carrera
            ->get();

        return response()->json($materiasConDocentes, 200);
    }
    
    public function show($id)
    {
        try {
            $materia = Materia::select(
                    'materia.codigo_materia',
                    'materia.nombre_materia',
                    'materia.grupo',
                    'materia.estado_materia',
                    'carrera.id_carrera', 
                    'materia_docente.id_docente'
                )
                ->join('materia_docente', 'materia.id_materia', '=', 'materia_docente.id_materia')
                ->join('docente', 'materia_docente.id_docente', '=', 'docente.id_docente')
                ->join('usuario', 'docente.id_usuario', '=', 'usuario.id_usuario')
                ->join('carrera', 'materia.id_carrera', '=', 'carrera.id_carrera')
                ->findOrFail($id);

            return response()->json($materia, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener la materia'], 500);
        }
    }
    
    public function destroy($id)
    {
        try {
            // Obtener la materia
            $materia = Materia::findOrFail($id);

            // Eliminar las relaciones con docentes en la tabla intermedia
            $materia->materiaDocentes()->delete();

            // Eliminar la materia
            $materia->delete();

            return response()->json(['message' => 'Materia eliminada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la materia'], 500);
        }
    }

    public function eliminarTodo()
    {
        try {
            // Eliminar todas las filas de la tabla materias
            Materia::truncate();

            // Reiniciar el valor del ID autoincremental a 1
            DB::statement('ALTER SEQUENCE materia_id_materia_seq RESTART WITH 1');

            return response()->json(['message' => 'Todas las materias eliminadas correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al eliminar todas las materias: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar todas las materias'], 500);
        }
    }
}