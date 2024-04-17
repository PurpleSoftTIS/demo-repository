<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dia extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'id_dia';
    protected $table = 'dia';
    public $timestamps = false;
    protected $fillable = [
        "nombre"       
      ];
 
}