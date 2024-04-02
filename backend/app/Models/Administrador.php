<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
    use HasFactory;
    protected $table = 'administrador';
    protected $fillable = [
        "id_usuario",
        "codigo_administrador",
        "estado_administrador"
    ];
}