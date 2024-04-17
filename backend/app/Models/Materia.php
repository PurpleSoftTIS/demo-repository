<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_materia';
    
    protected $table = 'materia';
    protected $fillable = [
        "nombre_materia",
        "codigo_materia",
        "estado_materia",
        "grupo",
        "id_carrera"
    ];

    public function docentes()
    {
        return $this->belongsToMany(Docente::class, 'materia_docente', 'id_materia', 'id_docente');
    }
    
    public function materiaDocentes()
    {
        return $this->hasMany(MateriaDocente::class, 'id_materia');
    }

    public function carrera()
    {
        return $this->belongsTo(Carrera::class, 'id_carrera');
    }
}
