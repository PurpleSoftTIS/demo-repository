<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ambiente;
use App\Models\Ubicacion;
use App\Models\Dia;
use App\Models\Hora;
use  App\Models\Horario;
use App\Models\Diashabiles;
use DB;

class AmbienteController extends Controller
{
    public function guardarAmbiente(Request $request)
{
    info('Datos recibidos:', $request->all());
    try {
        info('Se está intentando guardar la ubicación.');    
        $datosAmbiente = $request->input('datosAmbiente');
        $nombreAula = $datosAmbiente['nombreAula'];
        $capacidadEstudiantes = $datosAmbiente['capacidadEstudiantes'];
        $edificio = $datosAmbiente['edificio'];
        $piso = $datosAmbiente['piso'];
        $tipo = $datosAmbiente['Tipo'];  
        $ubicacion = new Ubicacion();        
        $ubicacion->edificio = $edificio;
        $ubicacion->save();        
        $idUbicacion = $ubicacion->id_ubicacion;           
        $ambiente = new Ambiente();
        $ambiente->id_ubicacion = $idUbicacion;
        $ambiente->numero_piso = $piso;
        $ambiente->nombre_ambiente = $nombreAula;
        $ambiente->capacidad = $capacidadEstudiantes;
        $ambiente->estado_ambiente = "activo";
        $ambiente->tipo_ambiente =$tipo;
        $ambiente->save();
        $idambiente=$ambiente->id_ambiente;
        info('Se ha guardado correctamente el ambiente.');
        $diasHoras =$request -> input ('diasHoras');
        info('Horarios seleccionados:', $diasHoras);
        foreach ($diasHoras as $day=> $horas) {
            $dia= new Dia();
            $dia->nombre = $day ;
            $dia -> save();
            $iddia=$dia->id_dia;
            $diashabiles=new Diashabiles();
            $diashabiles ->id_dia=$iddia;
            $diashabiles ->id_ambiente =$idambiente ;
            $diashabiles -> save(); 
            foreach($horas as $horario) {
                $hora =new Hora();
                $hor = explode('-', $horario);
                $horaInicio = trim($hor[0]);
                $horaFin = trim($hor[1]);
                $hora ->hora_inicio=$horaInicio;
                $hora ->hora_fin =$horaFin;
                $hora-> save();
                $horarios=new Horario;
                $idhora = $hora->id_hora; 
                $horarios -> id_hora = $idhora;
                $horarios -> id_dia =  $iddia;
                $horarios -> save ();
            }
        }
    return response()->json(['message' => 'Ubicación y ambiente guardados correctamente']);
    } catch (\Exception $e) {
        // Loguear el error
        \Log::error('Error al intentar guardar la ubicación y el ambiente: ' . $e->getMessage());        
        // Devolver una respuesta de error al cliente
        return response()->json(['error' => 'Error al guardar la ubicación y el ambiente'], 500);
    }
}

public function index()
{   
    $ambientes = DB::table('ambiente')
    ->select('ambiente.*', 'ubicacion.*',)
    ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
    ->get();
    return response()->json($ambientes, 200);
}
public function ambientesDisponibles($capacidad, $nombreDia)
{
    if (!is_numeric($capacidad)) {
        return response()->json(['error' => 'La capacidad no es un número válido'], 400);
    }    
    
    $ambientes = DB::table('ambiente')
        ->select('ambiente.*', 'ubicacion.*')
        ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
        ->join('diashabiles', 'ambiente.id_ambiente', '=', 'diashabiles.id_ambiente')
        ->join('dia', 'diashabiles.id_dia', '=', 'dia.id_dia')
        ->where('ambiente.capacidad', '>=', $capacidad)
        ->where('dia.nombre','=', $nombreDia)
        ->get();

    // Devolver los ambientes encontrados como respuesta JSON
    return response()->json($ambientes, 200);
}


public function actualizarAmbiente(Request $request, $id_ambiente)
{   
        $ambiente = Ambiente::where('id_ubicacion', $id_ambiente)->first();

    if ($ambiente) {
        $diasHoras = [];
        $edificio = Ubicacion::where('id_ubicacion', $ambiente->id_ubicacion)->value('edificio');


        $diasHabiles = Diashabiles::where('id_ubicacion', $ambiente->id_ambiente)->get();
        info('Días hábiles obtenidos para el ambiente ' . $ambiente->id_ambiente . ':');

        foreach ($diasHabiles as $diaHabil) {
            $nombreDia = Dia::find($diaHabil->id_dia)->nombre;
            info('Días hábiles obtenidos para ' . $nombreDia. ':');

            $horas = [];

            $horarios = Horario::where('id_dia', $diaHabil->id_dia)->get();
            info('Días hábiles obtenidos para el ambiente ' .$horarios . ':');

            foreach ($horarios as $horario) {
                

                // Obtener las horas de inicio y fin para este horario
                $horaInicio = Hora::find($horario->id_hora)->hora_inicio;
                info('Días hábiles obtenidos para el ambiente ' .$horaInicio . ':');
                $horaInicioSinCeros = substr($horaInicio, 0, -3); // Obtiene los primeros cinco caracteres (HH:mm) de la cadena

                $horaFin = Hora::find($horario->id_hora)->hora_fin;
                info('Días hábiles obtenidos para el ambiente ' .$horaFin . ':');
                $horaFinSinCeros = substr($horaFin, 0, -3); // Obtiene los primeros cinco caracteres (HH:mm) de la cadena

                $horas[] = "$horaInicioSinCeros-$horaFinSinCeros";
            }

            $diasHoras[$nombreDia] = $horas;
        }

        $datosAmbiente = [
            "id_ambiente"=> $ambiente->id_ambiente,
            "nombreAula" => $ambiente->nombre_ambiente, 
            "capacidadEstudiantes" => $ambiente->capacidad,
            "edificio" =>$edificio,
            "piso" => $ambiente->numero_piso,
            "Tipo" => $ambiente->tipo_ambiente
        ];

        
        return response()->json([
            "datosAmbiente" => $datosAmbiente,
            "diasHoras" => $diasHoras
        ]);
    } else {
        
        return response()->json(["error" => "Ambiente no encontrado"], 404);
    }
}


public function actualizarAmb (Request $request, $id_ambiente){
    info('Datos recibidos:', $request->all());
   $ambiente =Ambiente::find($id_ambiente); 
   $ambiente ->capacidad= $request ->input ('capacidadEstudiantes');
   $ambiente ->tipo_ambiente= $request -> input ('Tipo');
   $ambiente ->numero_piso= $request ->input ('piso') ;
   $idambiente=$ambiente->id_ambiente;
   $ambiente -> save();
   $edificio = Ubicacion::where('id_ubicacion', $ambiente->id_ubicacion)->value('edificio');
   $diasHabiles = Diashabiles::where('id_ambiente', $ambiente->id_ambiente)->get();
   foreach ($diasHabiles as $diaHabil) {
       $nombreDia = Dia::find($diaHabil->id_dia)->nombre;
       $horarios = Horario::where('id_dia', $diaHabil->id_dia)->get();
   foreach ($horarios as $horario) {
        $id_hora = $horario->id_hora;
        $horario->where('id_hora', $id_hora)->delete();
        Hora::where('id_hora', $id_hora)->delete();
      }
      $id_dia=$diaHabil->id_dia;
      $diaHabil->where('id_dia',$id_dia)->delete();
      Dia::where('id_dia', $id_dia)->delete();
}

  $diasHoras =$request -> input ('diasHoras');
  $idambiente  =$request ->input ('id') ;

  foreach ($diasHoras as $day=> $horas) {
    $dia= new Dia();
    $dia->nombre = $day ;
    $dia -> save();
    $iddia=$dia->id_dia;
    $diashabiles=new Diashabiles();
    $diashabiles ->id_dia=$iddia;
    $diashabiles ->id_ambiente=$idambiente ;
    $diashabiles -> save(); 
    foreach($horas as $horario) {
        $hora =new Hora();
        $hor = explode('-', $horario);
        $horaInicio = trim($hor[0]);
        $horaFin = trim($hor[1]);
        $hora ->hora_inicio=$horaInicio;
        $hora ->hora_fin =$horaFin;
        $hora-> save();
        $horarios=new Horario;
        $idhora = $hora->id_hora; 
        $horarios -> id_hora = $idhora;
        $horarios -> id_dia =  $iddia;
        $horarios -> save ();


    }

   
}

}
public function borrarAmbiente ($id_ambiente){
    $ambiente =Ambiente::find($id_ambiente); 
    $diasHabiles = Diashabiles::where('id_ambiente', $id_ambiente)->get();
    foreach ($diasHabiles as $diaHabil) {
        $nombreDia = Dia::find($diaHabil->id_dia)->nombre;
        $horarios = Horario::where('id_dia', $diaHabil->id_dia)->get();
    foreach ($horarios as $horario) {
         $id_hora = $horario->id_hora;
         $horario->where('id_hora', $id_hora)->delete();
         Hora::where('id_hora', $id_hora)->delete();
       }
       $id_dia=$diaHabil->id_dia;
       $diaHabil->where('id_dia',$id_dia)->delete();
       Dia::where('id_dia', $id_dia)->delete();
    }
    Ambiente::where('id_ambiente',$id_ambiente)->delete();


}
}