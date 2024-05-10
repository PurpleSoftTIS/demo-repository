<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitudes_materia extends Model
{
    protected $table = 'solicitudes_materia';

    protected $fillable = [
        'id_materia',
        'id_solicitud',
    ];}
