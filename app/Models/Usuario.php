<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Mensaje;

class Usuario extends Model
{
    use HasFactory;
    protected $table = 'usuario';
    protected $primaryKey = 'id_usuario';

    protected $fillable =[
        "nombre",
        "apellido_paterno",
        "apellido_materno",
        "correo_electronico",
        "contraseña",
        "notification_count"
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
