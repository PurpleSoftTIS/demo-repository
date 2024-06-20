<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsoAmbiente extends Model
{
    use HasFactory;

    protected $table = 'uso_ambientes';

    protected $fillable = [
        'id_ambiente',
    ];
}