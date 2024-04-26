<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Docente;
use App\Models\Usuario;
use Illuminate\Http\Request;

class CargaDocente extends Controller
{
    public function CargaMasiva(Request $request){
        // Verifica si se ha enviado un archivo CSV
    if ($request->hasFile('archivo_csv')) {
        // Obtiene el archivo CSV
        $archivo = $request->file('archivo_csv');

        // Lee el contenido del archivo CSV
        $datos_csv = file_get_contents($archivo->getRealPath());

        // Parsea los datos CSV
        $filas = explode("\n", $datos_csv);
        // Itera sobre cada fila del archivo CSV
        foreach ($filas as $fila) {
            // Divide la fila en columnas
            $columnas = explode(',', $fila);
            // Crea un nuevo usuario con los datos de la fila
            $usuario = new Usuario();
            $usuario->nombre = $columnas[0];
            $usuario->apellido_paterno = $columnas[1];
            $usuario->apellido_materno = $columnas[2];
            $usuario->correo_electronico = $columnas[3];

            $apellido_materno = strtolower($request->input('apellidoMaterno'));
            $apellido_paterno = strtolower($request->input('apellidoPaterno'));
            $contrasena = str_replace(' ', '', $apellido_paterno . '' . $apellido_materno);
            $contrasena_morse = $this->encriptar(trim($contrasena));
            $usuario->contraseña = $contrasena_morse;
            $usuario->save();

            // Crea un nuevo docente con los datos de la fila
            $docente = new Docente();
            $docente->codigo_docente = $columnas[4];
            $docente->estado_docente = $columnas[5];
            $docente->tipo_docente = $columnas[6];
            $docente->id_usuario = $usuario->id; // Asigna el ID del usuario recién creado

            // Guarda el docente en la base de datos
            $docente->save();
        }

        // Devuelve una respuesta exitosa
        return response()->json(['message' => 'Carga masiva de docentes exitosa'], 200);
    } else {
        // Devuelve un mensaje de error si no se ha enviado un archivo CSV
        return response()->json(['error' => 'No se ha proporcionado un archivo CSV'], 400);
    }
        
    }
    private function encriptar($texto) {
        $morse = [
            'a'=>'Acs','b'=>'Los','c'=>'52A','d'=>'568',
            'e'=>'..Qa','f'=>'OiU','g'=>'6x2','h'=>'*89',
            'i'=>'@2','j'=>'lOP','k'=>'1Qz','l'=>'23k',
            'm'=>'↓*-','n'=>'$%5','o'=>'1·#','p'=>'^?5',
            'q'=>'56/-','r'=>'A;-','s'=>'/|=','t'=>'E',
            'u'=>'iKo','v'=>'p-ws','w'=>'7gH','x'=>'2v#',
            'y'=>'><1','z'=>'*9s','0'=>'-9A-p','1'=>'.Xb2','ñ'=>'/*-+',
            '2'=>'9js','3'=>'uV1','4'=>'%q.@-','5'=>'569-',
            '6'=>'5g^','7'=>'-[]','8'=>']{L,','9'=>'Vha',  
        ];    
        $morse_texto = '';     
        for ($i = 0; $i < strlen($texto); $i++) {
            $caracter = $texto[$i];
            if (isset($morse[$caracter])) {
                $morse_texto .= $morse[$caracter] . ' ';
            }
        }        
        return trim($morse_texto);
    }
}
