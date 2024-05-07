<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diashabiles extends Model
{
    use HasFactory;
    
    public $incrementing = false;

    protected $table = 'diashabiles';
    protected $fillable = [
        "id_ambiente",
        "id_dia"       
       
      ];
 
}