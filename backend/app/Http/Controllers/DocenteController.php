<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\Administrador;
use App\Models\Mensaje;
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
            DB::raw("CONCAT(usuario.nombre, '  ', usuario.apellido_paterno, '  ',
            usuario.apellido_materno) AS nombre_completo")        
        )
        ->get();
    return response()->json($usuariosConDocentes, 200);
}
public function eliminarDocente($id_docente)
{
    try {
        // Encuentra el docente
        $docente = Docente::findOrFail($id_docente);
        $id_usuario = $docente->id_usuario;
        DB::table('materia_docente')->where('id_docente', $id_docente)->delete();
        $docente->delete();
        // Encuentra y elimina el usuario
        $usuario = Usuario::findOrFail($id_usuario);
        $usuario->delete();
        return response()->json(['message' => 'Docente y usuario eliminados correctamente'], 200);
    } catch (\Exception $e) {
        \Log::error('Error al intentar eliminar el docente y usuario: ' . $e->getMessage());
        return response()->json(['error' => 'Error al eliminar el docente y usuario'], 500);
    }
}

    public function editarDocentes(Request $request, $id_docente){
        $docente = Docente::find($id_docente);
        $id_usuario = $docente->id_usuario;
        $usuario = Usuario::find($id_usuario);
        $usuario->nombre = $request->input('nombres');
        $usuario->apellido_paterno = $request->input('apellidoPaterno');
        $usuario->apellido_materno = $request->input('apellidoMaterno');
        $usuario->correo_electronico = $request->input('correo');
        $usuario->save();
        $docente->tipo_docente = $request->input('tipo');
        $docente->codigo_docente = $request->input('codigoDocente');
        $docente->save();
        return response()->json(['message' => 'Usuario y docente actualizados correctamente'], 200);        
}
    public function eliminarAll()
    {
        try {
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
            Docente::truncate();
            Usuario::truncate();   
            Mensaje::truncate();

            DB::statement("ALTER TABLE usuario AUTO_INCREMENT = 1");
            DB::statement("ALTER TABLE docente AUTO_INCREMENT = 1");
            return response()->json(['message' => 'Todos los docentes y usuarios eliminados correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al intentar eliminar todos los docentes y usuarios: ' . $e->getMessage());
            return response()->json(['error' => 'Error al eliminar todos los docentes y usuarios'], 500);
        }
    }
    
    public function verificarCredenciales(Request $request)
    {
        $request->validate([
            'correo_electronico' => 'required|email',
            'contraseña' => 'nullable|string', 
        ]);

        $usuario = Usuario::where('correo_electronico', $request->correo_electronico)->first();
        $rol = 'user';
        if (!$usuario) {
            $usuario = Administrador::where('correo_electronico', $request->correo_electronico)->first();
            $rol = 'admin';
        }
        if (!$usuario) {
            return response()->json(['correcta' => false, 'mensaje' => 'Correo electrónico no registrado'], 404);
        }    
        if ($request->filled('contraseña')) {
            $contraseña_encriptada = $this->encriptar($request->contraseña); 
            if ($usuario->contraseña !== $contraseña_encriptada) {
                return response()->json(['correcta' => false, 'mensaje' => 'Contraseña incorrecta'], 401);
            }
        } else {
            return response()->json(['correcta' => false, 'mensaje' => 'Contraseña no proporcionada'], 400);
        }
        return response()->json(['exists' => true, 'correcta' => true, 'nombre' => $usuario->nombre, 'rol' => $rol, 'id' => $usuario->getKey() ]);
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
   
    public function restablecerPasswd(Request $request)
    {
        try {
            $usuario = Usuario::findOrFail($request->id);
            // Encriptar la nueva contraseña
            $nuevaPass = $this->encriptar($request->nuevopwd);
            $usuario->contraseña = $nuevaPass;
            $usuario->save();
            return response()->json(['message' => 'Contraseña restablecida correctamente'], 200);
        } catch (\Exception $e) {
            \Log::error('Error al intentar restablecer la contraseña: ' . $e->getMessage());
            return response()->json(['error' => 'Error al restablecer la contraseña'], 500);
        }
    } 
}