<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Materia;
use App\Models\MateriaDocente;
use App\Models\Docente;

class MateriaRegistrarController extends Controller
{
    public function registrarMateria(Request $request)
    {
        try {
            // Validar datos de entrada...
            $request->validate([
                'nombre_materia' => 'required|string|max:255',
                'codigo_materia' => 'required|string|max:255',
                'grupo' => 'required|string|max:10',
            ]);

            // Crear la materia
            $materia = Materia::create([
                'nombre_materia' => $request->input('nombre_materia'),
                'codigo_materia' => $request->input('codigo_materia'),
                'estado_materia' => 'activo', 
                'grupo' => $request->input('grupo'),
                'id_carrera' => $request->input('id_carrera'),
            ]);

            // Asociar la materia con los docentes seleccionados
            $materia->docentes()->attach($request->input('id_docente'));

            return response()->json(['message' => 'Materia registrada correctamente'], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar una materia: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar una materia'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $materia = Materia::findOrFail($id);

            // Actualizar los datos de la materia
            $materia->update([
                'nombre_materia' => $request->input('nombre_materia'),
                'codigo_materia' => $request->input('codigo_materia'),
                'grupo' => $request->input('grupo'),
                'id_carrera' => $request->input('id_carrera'),
            ]);

            // Desvincular todos los docentes asociados con esta materia
            $materia->docentes()->detach();

            // Volver a asociar la materia con los docentes seleccionados
            $materia->docentes()->attach($request->input('id_docente'));

            return response()->json(['message' => 'Materia actualizada correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al intentar actualizar una materia: ' . $e->getMessage());
            return response()->json(['error' => 'Error al actualizar una materia'], 500);
        }
    }
    
}