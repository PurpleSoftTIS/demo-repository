<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuracion_fecha extends Model
{
    use HasFactory;
    protected $table = 'configuracion_fecha';

    protected $fillable =[        
        "inicio",
        "fin"       
    ];
}
