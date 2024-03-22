<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ubicacion;
class UbicacionController extends Controller

{
   
        public function index()
        {
            return Ubicacion::all();
        }
    
        public function show($id)
        {
            return Ubicacion::findOrFail($id);
        }
}
