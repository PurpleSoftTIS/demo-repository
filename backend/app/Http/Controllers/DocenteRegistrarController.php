<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Models\Docente;

class DocenteRegistrarController extends Controller
{
    public function registrar(Request $request)
    {
        try {
            // Crear un nuevo usuario
            $usuario = new Usuario();
            $usuario->nombre = $request->input('nombres');
            $usuario->apellido_paterno = $request->input('apellidoPaterno');
            $usuario->apellido_materno = $request->input('apellidoMaterno');
            $usuario->correo_electronico = $request->input('correo');
            // Generar contraseña
            $nombre = strtolower($request->input('nombres'));
            $apellido_paterno = strtolower($request->input('apellidoPaterno'));
            $contrasena = str_replace(' ', '', $nombre . '' . $apellido_paterno);
            // Convertir contraseña a código Morse
            $contrasena_morse = $this->encriptar($contrasena);
            $usuario->contraseña = $contrasena_morse;
            $usuario->save();

            // Crear un nuevo docente
            $docente = new Docente();
            $docente->id_usuario = $usuario->id_usuario; // Asignar el ID del usuario creado
            $docente->tipo_docente = $request->input('tipo');
            $docente->codigo_docente = $request->input('codigoDocente');
            $docente->estado_docente = 'activo'; // Puedes definir el estado aquí
            $docente->save();

            return response()->json(['message' => 'Docente registrado correctamente'], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar un docente: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar un docente'], 500);
        }
    }
     // Función para convertir texto a código Morse
     private function encriptar($texto) {
        // Definir tabla de conversión de caracteres a Morse
        $morse = [
            'a' => 'Acs',   'b' => 'Los', 'c' => '52A', 'd' => '568',
            'e' => '..Qa',    'f' => 'OiU', 'g' => '6x2',  'h' => '*89',
            'i' => '@2',   'j' => 'lOP', 'k' => '1Qz',  'l' => '23k',
            'm' => '↓*-',   'n' => '$%5',   'o' => '1·#',  'p' => '^?5',
            'q' => '56/-', 'r' => 'A;-',  's' => '/|=',  't' => 'E',
            'u' => 'iKo',  'v' => 'p-ws', 'w' => '7gH',  'x' => '2v#',
            'y' => '><1', 'z' => '*9s', '0' => '-9A-p','1'=>'.Xb2','ñ' => '/*-+',
            '2' => '9js','3' => 'uV1','4' => '%q.@-','5' => '569-',
            '6' => '5g^','7' => '-[]','8' => ']{L,','9' => 'Vha',
            ' ' => '/',   
        ];

        // Convertir cada carácter a Morse
        $morse_texto = '';
        foreach (str_split($texto) as $caracter) {
            if (isset($morse[$caracter])) {
                $morse_texto .= $morse[$caracter] . ' ';
            }
        }

        return $morse_texto;
    }
}