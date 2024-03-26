<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ambiente extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'ambiente';
    protected $fillable =[
        "id_ubicacion",
        "nombre_ambiente",
        "capacidad",
        "estado_ambiente"
    ];
}
