<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitudes_horario extends Model
{
    use HasFactory;
    protected $table = 'solicitudes_horario';
    public $incrementing = false;
}
