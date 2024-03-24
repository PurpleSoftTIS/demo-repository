<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $table = 'usuario';
    protected $fillable =[
        "nombre",
        "apellido_paterno",
        "apellido_materno",
        "correo_electronico"
    ];
    function docentes() {
        return $this->hasMany(Docente::class);
    }
}
