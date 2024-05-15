<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitudes_docentes extends Model
{
    protected $table = 'solicitudes_docentes';
    public $incrementing = false;

    protected $fillable = [
        'id_docente',
        'id_solicitud',
    ];
}
