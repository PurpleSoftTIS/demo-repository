<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    use HasFactory;
    
  protected $table = 'horario';
 
  public $timestamps = false;
  public $incrementing = false;
  protected $fillable = [
    "id_dia",
    "id_hora"       
  ];

}