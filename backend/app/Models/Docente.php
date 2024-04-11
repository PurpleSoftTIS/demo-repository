<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_docente';

    protected $table = 'docente';
    protected $fillable = [
        "id_usuario",
        "codigo_docente",
        "estado_docente",
        "tipo_docente"
    ];
    
    public function materias()
    {
        return $this->belongsToMany(Materia::class, 'materia_docente', 'id_docente', 'id_materia');
    }
}
