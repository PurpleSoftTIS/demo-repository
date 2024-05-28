<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    use HasFactory;
    
    protected $table = 'configuracion';
    protected $fillable = ['Tipo Ambiente', 'fecha', 'catidad_periodos', 'created_at', 'updated_at'];
}
