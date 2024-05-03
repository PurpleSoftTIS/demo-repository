<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitudes extends Model
{   
    use HasFactory;
    protected $table = 'solicitudes';
    public $incrementing = false;

    protected $fillable = [
        "id_solicitud",
        "id_ambiente"       
    ];
}