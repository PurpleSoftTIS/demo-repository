<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;
    protected $table = 'solicitud';
    protected $primaryKey = 'id_solicitud';
    protected $fillable = [
        "id_hora",
        "numero_estudiantes",
        "fecha_solicitud",
        "motivo",
        "tipo_solicitud",
        "estado_solicitud"
       
    ];
}