<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    use HasFactory;
    protected $table = 'materia';
    protected $fillable = [
        "id_docente",
        "nombre_materia",
        "grupo",
        "codigo_materia",
        "estado_materia"
    ];
}
