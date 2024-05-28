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
            Horario::truncate();
            Diashabiles::truncate();
            Dia::truncate();
            Ambiente::truncate();
            Ubicacion::truncate();
            DB::statement('ALTER TABLE dia AUTO_INCREMENT = 1');
            DB::statement('ALTER TABLE ambiente AUTO_INCREMENT = 1');
            DB::statement('ALTER TABLE ubicacion AUTO_INCREMENT = 1');   
           
        
            return response()->json(['message' => 'Todos los datos han sido eliminados correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Hubo un error al intentar borrar los datos'], 500);
        }
    }
    public function borrarAmbiente ($id_ambiente){
        try {
            $ambiente = Ambiente::findOrFail($id_ambiente);
            $diasHabiles = Diashabiles::where('id_ambiente', $id_ambiente)->get();
            // Eliminar registros en el orden correcto
            foreach ($diasHabiles as $diaHabil) {
                Horario::where('id_dia', $diaHabil->id_dia)->delete();
                Diashabiles::where('id_dia', $diaHabil->id_dia)->where('id_ambiente', $id_ambiente)->delete();
                Dia::where('id_dia', $diaHabil->id_dia)->delete();
            }
            $ambiente->delete();
            // Eliminar la ubicación asociada al ambiente si no está siendo usada por otro ambiente
            $ubicacion = Ubicacion::find($ambiente->id_ubicacion);
            if ($ubicacion) {
                $countAmbientes = Ambiente::where('id_ubicacion', $ubicacion->id_ubicacion)->count();
                if ($countAmbientes === 0) {
                    $ubicacion->delete();
                }
            }
            return response()->json(['message' => 'Ambiente y todos sus registros asociados han sido eliminados correctamente']);
        } catch (\Exception $e) {
            \Log::error('Error al intentar eliminar el ambiente: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar el ambiente'], 500);
        }
    }
}
