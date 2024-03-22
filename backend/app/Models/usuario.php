<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    // Nombre de la tabla en la base de datos (opcional)
    protected $table = 'usuario';

    // Nombre de la clave primaria en la tabla (opcional)
    protected $primaryKey = 'id_usuario';

    // Lista de atributos que se pueden asignar masivamente (opcional)
    protected $fillable = ['nombre', 'apellido_paterno','apellido_materno', 'correo_electronico'];

}
