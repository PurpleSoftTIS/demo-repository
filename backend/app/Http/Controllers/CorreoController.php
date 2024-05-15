<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CodigoUser;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class CorreoController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        $correoElectronico = $request->input('correo');

        // Buscar el usuario por su correo electrónico
        $usuario = Usuario::where('correo_electronico', $correoElectronico)->first();

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Verificar si ya existe un código para este usuario
        $codigoExistente = CodigoUser::where('id_usuario', $usuario->id_usuario)->first();

        // Si existe, eliminarlo
        if ($codigoExistente) {
            $codigoExistente->delete();
        }

        // Generar un nuevo código de verificación
        $codigo = $this->generarCodigoUnico();

        // Guardar el nuevo código en la base de datos
        $nuevoCodigo = new CodigoUser();
        $nuevoCodigo->id_usuario = $usuario->id_usuario;
        $nuevoCodigo->codigo = $codigo;
        $nuevoCodigo->save();

        // Enviar el código de verificación por correo electrónico
        $this->enviarCorreoVerificacion($usuario->correo_electronico, $codigo);

        return response()->json(['message' => 'Código generado y enviado exitosamente'], 200);
    }

    // Método para generar un código único de 5 dígitos
    private function generarCodigoUnico()
    {
        $codigo = str_pad(mt_rand(0, 99999), 5, '0', STR_PAD_LEFT);

        // Verificar si el código ya existe en la base de datos
        $codigoExistente = CodigoUser::where('codigo', $codigo)->first();

        // Si el código ya existe, generar uno nuevo
        if ($codigoExistente) {
            return $this->generarCodigoUnico();
        }

        return $codigo;
    }

    // Método para enviar el código de verificación por correo electrónico
    private function enviarCorreoVerificacion($correoElectronico, $codigo)
    {
        $subject = 'Código de Restauración';
        $message = "Su código de restauración es: $codigo";

        // Envía el correo electrónico
        Mail::raw($message, function ($mail) use ($correoElectronico, $subject) {
            $mail->to($correoElectronico)
                 ->subject($subject);
        });
    }

    public function verificarCodigo(Request $request)
    {
        $codigo = $request->input('codigo');
        $codigoUsuario = CodigoUser::where('codigo', $codigo)->first();

        if ($codigoUsuario) {
            $id_usuario = $codigoUsuario->id_usuario;
            $codigoUsuario->delete();
            return response()->json(['id_usuario' => $id_usuario], 200);
        } else {
            return response()->json(['error' => 'Código inválido'], 400);
        }
    }
}