<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Models\Docente;
use Psy\Readline\Hoa\Console;
use Illuminate\Support\Facades\Mail;

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
           $apellido_materno = strtolower($request->input('apellidoMaterno'));
           $apellido_paterno = strtolower($request->input('apellidoPaterno'));
           $contrasena = str_replace(' ', '', $apellido_paterno . '' . $apellido_materno);
           $contrasena_morse = $this->encriptar(trim($contrasena));
           $usuario->contraseña = $contrasena_morse;
           $usuario->save();

            // Crear un nuevo docente
            $docente = new Docente();
            $docente->id_usuario = $usuario->id_usuario; // Asignar el ID del usuario creado
            $docente->tipo_docente = $request->input('tipo');
            $docente->codigo_docente = $request->input('codigoDocente');
            $docente->estado_docente = 'activo'; // Puedes definir el estado aquí
            $docente->save();

            $nombreCompleto = "{$usuario->nombre} {$usuario->apellido_paterno} {$usuario->apellido_materno}";
            $this->enviarCorreoRegistro($usuario->correo_electronico, $nombreCompleto, $contrasena);
            return response()->json(['message' => 'Docente registrado correctamente'], 201);
        } catch (\Exception $e) {
            \Log::error('Error al intentar registrar un docente: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar un docente'], 500);
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
            // Verificar si el caracter existe en el arreglo $morse
            if (isset($morse[$caracter])) {
                // Concatenar la conversión de Morse
                $morse_texto .= $morse[$caracter] . ' ';
            }
        }
        
        return trim($morse_texto);
    }
    public function enviarCorreoRegistro($correoElectronico, $nombreCompleto, $contrasena)
    {
        // Preparar el mensaje del correo
        $subject = 'Registro en el Sistema SIRA';
        $message = "
            Estimado(a) {$nombreCompleto},

            El administrador de la plataforma SIRA le ha habilitado una cuenta con los siguientes datos:

            Correo electrónico: {$correoElectronico}
            Contraseña: {$contrasena}

            Para iniciar sesión, ingrese al siguiente enlace:
            https://purplesoft-production.up.railway.app/

            Atentamente,
            Administración SIRA
        ";

        // Enviar el correo
        Mail::raw($message, function ($mail) use ($correoElectronico, $subject) {
            $mail->to($correoElectronico)
                ->subject($subject);
        });
    }
}