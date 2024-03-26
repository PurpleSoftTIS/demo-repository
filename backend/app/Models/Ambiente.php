<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ambiente extends Model
{
    use HasFactory;
    protected $table = 'ambiente';
    protected $fillable = [
        "id_ubicacion",
        "id_dia",
        "nombre_ambiente",
        "estado_ambiente",
        "capacidad"
    ];
}
