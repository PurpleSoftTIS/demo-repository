<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diashabiles extends Model
{
    use HasFactory;
    
    public $incrementing = false;

    protected $table = 'diashabiles';
    protected $primaryKey = 'id_dia';
    protected $fillable = [
        "id_ambiente"       
      ];
 
}