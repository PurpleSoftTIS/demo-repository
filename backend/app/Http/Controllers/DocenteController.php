<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;

class DocenteController extends Controller
{
    public function index()
    {
        $consultarDocentes = Docente::with('usuarios')->get();
        return[
            "consulta"=>$consultarDocentes
        ];
    }
}
