<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MateriaDocente extends Model
{
    use HasFactory;

    protected $table = 'materia_docente';

    protected $fillable = [
        'id_materia',
        'id_docente',
    ];
    
    public function materia()
    {
        return $this->belongsTo(Materia::class, 'id_materia');
    }
}