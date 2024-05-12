<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodigoUser extends Model
{
    use HasFactory;

    protected $table = 'codigouser';
    protected $primaryKey = 'codigo'; 

    protected $fillable = [
        'id_usuario',
        'codigo',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}