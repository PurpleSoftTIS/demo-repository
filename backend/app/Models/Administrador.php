<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Mensaje;

class Administrador extends Model
{
    use HasFactory;

    protected $table = 'administradores';

    protected $primaryKey = 'id_administrador';

    protected $fillable = [
        'correo_electronico',
        'contraseña',
    ];
    public function mensajesEnviados()
    {
        return $this->morphMany(Mensaje::class, 'sender');
    }

    public function mensajesRecibidos()
    {
        return $this->morphMany(Mensaje::class, 'receiver');
    }
}