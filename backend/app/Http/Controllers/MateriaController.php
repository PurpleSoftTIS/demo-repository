<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Materia;
use App\Imports\MateriaImport;
use Maatwebsite\Excel\Facades\Excel;
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
            
            DB::statement('SET FOREIGN_KEY_CHECKS=0');

            // Eliminar todas las filas de la tabla materia_docente
            DB::table('materia_docente')->delete();

            // Eliminar todas las filas de la tabla materias
            Materia::truncate();
            DB::statement('ALTER TABLE materia AUTO_INCREMENT = 1');

            // Volver a activar restricciones de clave externa
            DB::statement('SET FOREIGN_KEY_CHECKS=1');

            return response()->json(['message' => 'Todas las materias eliminadas correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al eliminar todas las materias: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar todas las materias'], 500);
        }
    }
    
    public function import(Request $request)
    {
        try {
            Excel::import(new MateriaImport, $request->file('csv_file'));
            \Log::info('Importación exitosa');
            return response()->json(['message' => 'Importación exitosa'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al importar: ' . $e->getMessage());
            return response()->json(['error' => 'Error al importar'], 500);
        }
    }

    public function docentesPorMateria($nombre_materia, $correo_usuario)
    {
        $docentesPorMateria = Materia::select(
                'usuario.id_usuario',
                DB::raw("CONCAT(usuario.nombre, '  ', usuario.apellido_paterno, '  ', usuario.apellido_materno) AS nombre_completo_docente")
            )
            ->join('materia_docente', 'materia.id_materia', '=', 'materia_docente.id_materia')
            ->join('docente', 'materia_docente.id_docente', '=', 'docente.id_docente')
            ->join('usuario', 'docente.id_usuario', '=', 'usuario.id_usuario')
            ->where('materia.nombre_materia', $nombre_materia)
            ->where('usuario.correo_electronico', '!=', $correo_usuario) 
            ->get();

        return response()->json($docentesPorMateria, 200);
    }
    public function GruposObtener($materia)
    {
        $gruposDeLaMateria = DB::table('materia')
            ->select('materia.*')
            ->where('nombre_materia', $materia)
            ->get();
    
        if ($gruposDeLaMateria->isEmpty()) {
            return response()->json(['error' => 'Materia no encontrada o sin grupos asignados'], 404);
        }    
        return response()->json($gruposDeLaMateria, 200);
    }
    
}