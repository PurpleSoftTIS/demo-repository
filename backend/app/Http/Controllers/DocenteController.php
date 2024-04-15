<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;
use App\Models\Usuario;
use DB;


class DocenteController extends Controller
{
    public function index()
    {
    $usuariosConDocentes = DB::table('usuario')
        ->join('docente', 'usuario.id_usuario', '=', 'docente.id_usuario')
        ->select(
            'docente.*',
            'usuario.*',           
        )
        ->get();

    return response()->json($usuariosConDocentes, 200);
}
 // Método para descifrar la contraseña de Morse
 public function descifrarContraseña($morse_contraseña) {
    return $this->convertirDeMorse($morse_contraseña);
}

    public function eliminar($id_docente)
    {
        try {
            $docente = Docente::findOrFail($id_docente);
            $id_usuario = $docente->id_usuario;
            $docente->delete();
            $usuario = Usuario::findOrFail($id_usuario);
            $usuario->delete();

            return response()->json(['message' => 'Docente y usuario eliminados correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al intentar eliminar el docente y usuario: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar el docente y usuario'], 500);
        }
    }
    public function verificarCorreo(Request $request)
    {
        $request->validate([
            'correo_electronico' => 'required|email',
        ]);
        $usuario = Usuario::where('correo_electronico', 
        $request->correo_electronico)->first();
        if ($usuario) {
            return response()->json(['exists' => true]);
        } else {
            return response()->json(['exists' => false]);
        }
    }
    public function verificarContrasenia(Request $request)
    {
        $request->validate([
            'correo_electronico' => 'required|email',
            'contraseña' => 'required|string',
        ]);    
        $usuario = Usuario::where('correo_electronico', $request->correo_electronico)->first();    
        if ($usuario) {
            $contraseña_encriptada = $this->encriptar($request->contraseña); // Encriptar la contraseña proporcionada
            if ($usuario->contraseña === $contraseña_encriptada) {
                return response()->json(['correcta' => true]);
            } else {
                return response()->json(['correcta' => false, 'mensaje' => 'Contraseña incorrecta'], 401);
            }
        } else {
            return response()->json(['correcta' => false, 'mensaje' => 'Correo electrónico no registrado'], 404);
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
}
