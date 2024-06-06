<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hora extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'id_hora';
    protected $table = 'hora';
    protected $fillable = [
        "hora_inicio",
        "hora_fin"       
      ];
}