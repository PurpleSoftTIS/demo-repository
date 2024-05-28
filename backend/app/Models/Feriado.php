<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feriado extends Model
{

    use HasFactory;
    protected $table = 'feriado';
    protected $fillable =[
        "fecha"        
    ];}
