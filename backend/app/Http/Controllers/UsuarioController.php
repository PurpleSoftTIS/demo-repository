<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; // Asegúrate de importar Controller aquí

class UsuarioController extends Controller
{
    public function index()
    {
        $consultarUsuarios = Usuario::with('docentes')->get();
        return[
            "consulta"=>$consultarUsuarios
        ];
    }

    
}
