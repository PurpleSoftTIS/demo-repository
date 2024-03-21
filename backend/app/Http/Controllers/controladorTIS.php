<?php

namespace App\Http\Controllers;

use App\Models\usuario;
use Illuminate\Http\Request;

class controladorTIS extends Controller
{
    public function index()
    {
        $usuarios = usuario::all();
        return view('usuarios.index', ['usuarios' => $usuarios]);
    }

    public function store(Request $request)
    {
        $nuevoUsuario = new usuario;
        $nuevoUsuario->nombre = $request->input('nombre');
        $nuevoUsuario->save();
        return redirect()->route('usuarios.index');
    }
}
