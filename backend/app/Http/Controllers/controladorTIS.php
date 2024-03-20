<?php

namespace App\Http\Controllers;

use App\Models\usuario;
use Illuminate\Http\Request;

class controladorTIS extends Controller
{
    public function obtenerUsuarios(){
        $usuarios = usuario::all(); 
        return response()->json($usuarios);    }
}
/**namespace App\Http\Controllers;

use App\Models\Usuario; // Asegúrate de importar el modelo de Usuario si estás utilizando Eloquent

class ControladorTIS extends Controller
{
    public function obtenerUsuarios()
    {
        $usuarios = Usuario::all(); // Esto supone que tienes un modelo Usuario con una tabla correspondiente en tu base de datos
        return response()->json($usuarios);
    }
}

 * 
 * 
 */