<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;



class RestablecerContrasenia extends Controller
{
    public function enviarCorreo(Request $request)
    {
        // Validar el correo electrónico
        $request->validate([
            'correo_electronico' => 'required|email',
        ]);

        $token = str_random(60);        
        $usuario = Usuario::where('correo_electronico', $request->correo_electronico)->first();

        if ($usuario) {
            // Actualizar el token de restablecimiento en la base de datos
            $usuario->reset_token = $token;
            $usuario->save();

            // Enviar el correo electrónico con el enlace de restablecimiento
            Mail::send('emails.restablecer_contrasenia', ['token' => $token], function ($message) use ($usuario) {
                $message->to($usuario->correo_electronico);
                $message->subject('Restablecer Contraseña');
            });

            return response()->json(['message' => 'Correo electrónico enviado correctamente'], 200);
        } else {
            // Si el correo electrónico no está registrado, retornar un error
            return response()->json(['error' => 'Correo electrónico no registrado'], 404);
        }
    }
}
