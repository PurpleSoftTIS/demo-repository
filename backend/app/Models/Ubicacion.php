<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ubicacion extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_ubicacion';
    protected $table = 'ubicacion';
    public $timestamps = false;

    
}