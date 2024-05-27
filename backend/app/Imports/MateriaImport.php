<?php

namespace App\Imports;

use App\Models\Materia;
use App\Models\Carrera;
use App\Models\Docente;
use App\Models\Usuario;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class MateriaImport implements ToModel, WithHeadingRow, WithBatchInserts, WithChunkReading
{   
    private $carreras;
    private $idMateria;

    public function __construct(){
        $this->carreras = Carrera::pluck('id_carrera', 'nombre_carrera');
    }
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    private function obtenerIdDocente($nombreCompletoDocente)
    {
        $docente = Docente::whereHas('usuario', function ($query) use ($nombreCompletoDocente) {
            $query->whereRaw("CONCAT(apellido_paterno, ' ', apellido_materno, ' ', nombre) = ?", [$nombreCompletoDocente]);
        })->first();

        return $docente ? $docente->id_docente : null;
    }

    public function model(array $row)
    {
        // Crear la nueva materia
        $materia = Materia::create([
            'nombre_materia' => $row['nombre_materia'],
            'codigo_materia' => $row['codigo_materia'],
            'estado_materia' => $row['estado_materia'], 
            'grupo' => $row['grupo'],
            'id_carrera' => $this->carreras[$row['carrera']],
        ]);
        $idMateria = $materia->id_materia;
        $materia->save();
        $idDocente = $this->obtenerIdDocente($row['docente']);
        $materia->docentes()->attach($idDocente, ['id_materia' => $idMateria]);

        return null;
    }

    public function batchSize(): int
    {
        return 1000;
    }
    
    public function chunkSize(): int
    {
        return 1000;
    }
}