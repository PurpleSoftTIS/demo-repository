<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Docente;
use App\Models\Usuario;
use Illuminate\Http\Request;

class CargaDocente extends Controller
{
    public function cargaDocentes(Request $request) {
        try {
            $datos = $request->all();
            array_shift($datos);    
            $indice = 0;
            foreach ($datos as $dato) {    
                $usuario = new Usuario();
                $usuario->id_usuario = $indice;
                $usuario->nombre = $dato[1];
                $usuario->apellido_paterno = $dato[2];
                $usuario->apellido_materno = $dato[3];
                $usuario->correo_electronico = $dato[4];    
                // Generar contraseña segura
                $apellido_materno = strtolower($dato[2]);
                $apellido_paterno = strtolower($dato[3]);
                $contrasena = str_replace(' ', '', $apellido_paterno . '' . $apellido_materno);
                $contrasena_morse = $this->encriptar(trim($contrasena));
                $usuario->contraseña = $contrasena_morse;
                $usuario->save();    
                // Crear un nuevo docente
                $docente = new Docente();
                $docente->id_docente = $indice;
                $docente->id_usuario = $indice;
                $docente->codigo_docente = $dato[5];
                $docente->estado_docente = $dato[6];
                $docente->tipo_docente = $dato[7];
                $docente->save();
                $indice= $indice+1;
            }            
            return response()->json(['message' => 'Carga masiva de docentes exitosa'], 200);
        } catch (\Exception $e) {
            // Manejar errores
            return response()->json(['error' => 'Error en la carga masiva de docentes: ' . $e->getMessage()], 500);
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
