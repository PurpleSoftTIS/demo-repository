<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ambiente;
use App\Models\Ubicacion;
use App\Models\Dia;
use App\Models\Hora;
use App\Models\Usuario;
use App\Models\Docente;
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
        \Log::error('Error al intentar guardar la ubicación y el ambiente: ' . $e->getMessage());        
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
public function ambientesDis($capacidad, $dia, $hora_inicio, $hora_fin)
{
    
    $ambientes = DB::table('ambiente')
        ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
        ->where('ambiente.capacidad', '>=', $capacidad)
        ->whereExists(function ($query) use ($dia, $hora_inicio, $hora_fin) {
            $query->select(DB::raw(1))
                ->from('diashabiles')
                ->join('dia', 'diashabiles.id_dia', '=', 'dia.id_dia')
                ->join('horario', 'diashabiles.id_dia', '=', 'horario.id_dia')
                ->join('hora', 'horario.id_hora', '=', 'hora.id_hora')
                ->whereColumn('ambiente.id_ambiente', 'diashabiles.id_ambiente')
                ->where('dia.nombre', $dia)
                ->where(function ($query) use ($hora_inicio, $hora_fin) {
                    $query->where(function ($query) use ($hora_inicio, $hora_fin) {
                        $query->where('hora.hora_inicio', '=', $hora_inicio)
                            ->where('hora.hora_fin', '=', $hora_fin);
                    });
                });
        })
        ->get();

    return response()->json($ambientes, 200);
}


public function ambientesDi($capacidad)
{
    $ambientes = DB::table('ambiente')
        ->join('ubicacion', 'ambiente.id_ubicacion', '=', 'ubicacion.id_ubicacion')
        ->where('ambiente.capacidad', '>=', $capacidad)
        ->select('ambiente.*', 'ubicacion.*')

        ->get();
    return response()->json($ambientes, 200);
}

    public function actualizarAmbiente(Request $request, $id_ambiente)
{   
        $ambiente = Ambiente::where('id_ambiente', $id_ambiente)->first();

    if ($ambiente) {
        $diasHoras = [];
        $edificio = Ubicacion::where('id_ubicacion', $ambiente->id_ubicacion)->value('edificio');

        $diasHabiles = Diashabiles::where('id_ambiente', $ambiente->id_ambiente)->get();

        foreach ($diasHabiles as $diaHabil) {
            $nombreDia = Dia::find($diaHabil->id_dia)->nombre;

            $horas = [];

            $horarios = Horario::where('id_dia', $diaHabil->id_dia)->get();

            foreach ($horarios as $horario) {
                
                // Obtener las horas de inicio y fin para este horario
                $horaInicio = Hora::find($horario->id_hora)->hora_inicio;
                $horaInicioSinCeros = substr($horaInicio, 0, -3); // Obtiene los primeros cinco caracteres (HH:mm) de la cadena

                $horaFin = Hora::find($horario->id_hora)->hora_fin;
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
    $diasHabiles = Diashabiles::where('id:ambiente', $id_ambiente)->get();
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
public function CargaMasiva(Request $request){
 
    $datos = $request->all();
    
    array_shift($datos);

    foreach ($datos as $dato) {
        $ubicacion = new Ubicacion();
        $ubicacion -> edificio = $dato[6]; 
        $ubicacion -> save();
        $idubicacion = $ubicacion -> id_ubicacion;
        $ambiente = new Ambiente();         
        $ambiente -> id_ambiente =  $dato[0];      
        $ambiente -> id_ubicacion = $idubicacion;
        $ambiente -> tipo_ambiente = $dato[1];
        $ambiente -> nombre_ambiente = $dato[2];
        $ambiente -> capacidad = $dato[3];
        $ambiente -> estado_ambiente = $dato[4];
        $ambiente -> numero_piso = $dato[5];
        $ambiente -> save();
    }
}
public function CargaMasivaDias(Request $request)
{
    $datos = $request->all();
    array_shift($datos);

    foreach ($datos as $dato) {
        $nombreAmbiente = $dato[0];

        // Buscar el ambiente por su nombre
        $ambiente = Ambiente::where('nombre_ambiente', $nombreAmbiente)->first();

        // Verificar si el ambiente existe
        if ($ambiente) {
            // Obtener el ID del ambiente
            $idambiente = $ambiente->id_ambiente;

            // Crear un nuevo día
            $dia = new Dia();
            $dia->nombre = $dato[1];
            $dia->save();
            $iddia = $dia->id_dia;

            // Asociar el día al ambiente como día hábil
            $diashabiles = new Diashabiles();
            $diashabiles->id_dia = $iddia;
            $diashabiles->id_ambiente = $idambiente;
            $diashabiles->save();

            // Crear un nuevo horario
            $hora = new Hora();
            $hora->hora_inicio = $dato[2];
            $hora->hora_fin = $dato[3];
            $hora->save();
            $idhora = $hora->id_hora;

            // Asociar el horario al día
            $horarios = new Horario;
            $horarios->id_hora = $idhora;
            $horarios->id_dia = $iddia;
            $horarios->save();
        } else {
            // Ambiente no encontrado, registrar un error
            \Log::error('El ambiente con nombre ' . $nombreAmbiente . ' no fue encontrado.');
        }
    }
}
public function MateriasObtener($Correo)
{   
    $usuario = Usuario::where('correo_electronico', $Correo)->first();

    if ($usuario) {
        // Obtener el ID del usuario
        $idUsuario = $usuario->id_usuario;

        // Buscar el docente asociado al usuario
        $docente = Docente::where('id_usuario', $idUsuario)->first();

        // Verificar si se encontró un docente
        if ($docente) {
            // Obtener el ID del docente
            $idDocente = $docente->id_docente;

            // Obtener las materias asociadas al docente
            $materiasDelDocente = DB::table('materia')
                ->select('materia.*')
                ->join('materia_docente', 'materia.id_materia', '=', 'materia_docente.id_materia')
                ->where('materia_docente.id_docente', $idDocente)
                ->get();

            return response()->json($materiasDelDocente, 200);
        } else {
            // Si no se encontró el docente, retorna un error con un código de estado 404
            return response()->json(["error" => "No se encontró el docente asociado al usuario con el correo electrónico proporcionado."], 404);
        }
    } else {
        // Si no se encontró el usuario, retorna un error con un código de estado 404
        return response()->json(["error" => "No se encontró el usuario con el correo electrónico proporcionado."], 404);
    }
}

}