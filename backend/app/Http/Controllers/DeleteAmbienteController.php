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
    public function Borrartodo(){

        try {
            DB::statement('SET FOREIGN_KEY_CHECKS=0');

            Diashabiles::truncate();
            Ambiente::truncate();
            Ubicacion::truncate();
            DB::statement('ALTER TABLE hora AUTO_INCREMENT = 1');
            DB::statement('ALTER TABLE dia AUTO_INCREMENT = 1');
            DB::statement('ALTER TABLE ambiente AUTO_INCREMENT = 1');
            DB::statement('ALTER TABLE ubicacion AUTO_INCREMENT = 1');           
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
