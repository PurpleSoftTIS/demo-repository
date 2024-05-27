<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ambiente;
use App\Models\Ubicacion;
use App\Models\Dia;
use App\Models\Hora;
use  App\Models\Horario;
use App\Models\Diashabiles;
use DB;

class DeleteAmbienteController extends Controller
{
    public function Borrartodo()
{
    try {
        DB::statement('TRUNCATE TABLE horario RESTART IDENTITY CASCADE');
        DB::statement('TRUNCATE TABLE diashabiles RESTART IDENTITY CASCADE');
        DB::statement('TRUNCATE TABLE dia RESTART IDENTITY CASCADE');
        DB::statement('TRUNCATE TABLE ambiente RESTART IDENTITY CASCADE');
        DB::statement('TRUNCATE TABLE ubicacion RESTART IDENTITY CASCADE');

        return response()->json(['message' => 'Todos los datos han sido eliminados correctamente'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Hubo un error al intentar borrar los datos'], 500);
    }
}

    public function borrarAmbiente ($id_ambiente){

        $ambiente =Ambiente::find($id_ambiente); 
        Diashabiles::where('id_ambiente', $ambiente)->delete();        
        Ambiente::where('id_ambiente',$id_ambiente)->delete();    
    }
}
