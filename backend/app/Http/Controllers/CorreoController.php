<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CorreoController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        $to = $request->input('correo');
        $subject = 'Prueba de Correo Electrónico';
        $message = 'Hola, este es un correo de prueba enviado desde Laravel.';

        Mail::raw($message, function ($mail) use ($to, $subject) {
            $mail->to($to)
                 ->subject($subject);
        });

        return 'Correo electrónico enviado correctamente';
    }
}
