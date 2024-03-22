<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; // Asegúrate de importar Controller aquí

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();
        return view('usuarios.index', ['usuarios' => $usuarios]);
    }

    public function mostrarUsuarios()
{
    $usuarios = Usuario::all();
    dd($usuarios); // Esto mostrará los datos en la consola
}
}
