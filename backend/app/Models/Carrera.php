<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    use HasFactory;

    protected $table = 'carrera';
    protected $primaryKey = 'id_carrera';
    protected $fillable = [
        'nombre_carrera'
    ];

    public function materias()
    {
        return $this->hasMany(Materia::class, 'id_carrera');
    }
}