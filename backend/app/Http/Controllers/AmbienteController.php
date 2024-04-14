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
        
        $ubicacion->EDIFICIO = $edificio;
        $ubicacion->save();
        
        $idUbicacion = $ubicacion->ID_UBICACION;
        
        
        $ambiente = new Ambiente();
        $ambiente->ID_UBICACION = $idUbicacion;
        $ambiente->NUMERO_PISO = $piso;
        $ambiente->NOMBRE_AMBIENTE = $nombreAula;
        $ambiente->CAPACIDAD = $capacidadEstudiantes;
        $ambiente->ESTADO_AMBIENTE = "activo";
        $ambiente->TIPO_AMBIENTE =$tipo;
        $ambiente->save();
        $idambiente=$ambiente->ID_AMBIENTE;
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
            $diashabiles ->ID_AMBIENTE =$idambiente ;
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
    ->join('ubicacion', 'ambiente.ID_UBICACION', '=', 'ubicacion.ID_UBICACION')
    ->get();
    return response()->json($ambientes, 200);
}

public function actualizarAmbiente(Request $request, $ID_AMBIENTE)
    {   
        $ambiente = Ambiente::where('ID_AMBIENTE', $ID_AMBIENTE)->first();

    if ($ambiente) {
        $diasHoras = [];
        $edificio = Ubicacion::where('ID_UBICACION', $ambiente->ID_UBICACION)->value('EDIFICIO');


        $diasHabiles = Diashabiles::where('ID_AMBIENTE', $ambiente->ID_AMBIENTE)->get();
        info('Días hábiles obtenidos para el ambiente ' . $ambiente->ID_AMBIENTE . ':');

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
            "id_ambiente"=> $ambiente->ID_AMBIENTE,
            "nombreAula" => $ambiente->NOMBRE_AMBIENTE, 
            "capacidadEstudiantes" => $ambiente->CAPACIDAD,
            "edificio" =>$edificio,
            "piso" => $ambiente->NUMERO_PISO,
            "Tipo" => $ambiente->TIPO_AMBIENTE
        ];

        
        return response()->json([
            "datosAmbiente" => $datosAmbiente,
            "diasHoras" => $diasHoras
        ]);
    } else {
        
        return response()->json(["error" => "Ambiente no encontrado"], 404);
    }
}


public function actualizarAmb (Request $request, $ID_AMBIENTE){
    info('Datos recibidos:', $request->all());
   $ambiente =Ambiente::find($ID_AMBIENTE); 
   $ambiente ->CAPACIDAD= $request ->input ('capacidadEstudiantes');
   $ambiente ->TIPO_AMBIENTE= $request -> input ('Tipo');
   $ambiente ->NUMERO_PISO= $request ->input ('piso') ;
   $idambiente=$ambiente->ID_AMBIENTE;
   $ambiente -> save();
   $edificio = Ubicacion::where('ID_UBICACION', $ambiente->ID_UBICACION)->value('EDIFICIO');
   $diasHabiles = Diashabiles::where('ID_AMBIENTE', $ambiente->ID_AMBIENTE)->get();
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
    $diashabiles ->ID_AMBIENTE=$idambiente ;
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
public function borrarAmbiente ($ID_AMBIENTE){


    $ambiente =Ambiente::find($ID_AMBIENTE); 
    $diasHabiles = Diashabiles::where('ID_AMBIENTE', $ID_AMBIENTE)->get();
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

    Ambiente::where('ID_AMBIENTE',$ID_AMBIENTE)->delete();


}
}