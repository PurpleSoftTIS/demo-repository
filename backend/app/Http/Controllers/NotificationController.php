<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notifications;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notifications::orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

    public function store(Request $request)
    {
        Usuario::query()->increment('notification_count');
        $notification = Notifications::create([
            'content' => $request->input('content')
        ]);

        return response()->json($notification, 201);
    }

    public function storeMail(Request $request)
    {
        Usuario::query()->increment('notification_count');
        $notification = Notifications::create([
            'content' => $request->input('content')
        ]);
        
        $usuarios = Usuario::all();

        if ($usuarios->count() > 0) {
            // Enviar correo a todos los usuarios
            foreach ($usuarios as $usuario) {
                $this->enviarCorreoNotificacion($usuario->correo_electronico, $notification);
            }
        }

        return response()->json($notification, 201);
    }
    
    public function update(Request $request, $id)
    {
        $notification = Notifications::findOrFail($id);
        $notification->content = $request->input('content');
        $notification->save();

        return response()->json($notification);
    }

    public function destroy($id)
    {
        Usuario::query()->where('notification_count', '>', 0)->decrement('notification_count');
        $notification = Notifications::findOrFail($id);
        $notification->delete();

        return response()->json(null, 204);
    }

    public function getNotificationCount($userMail)
    {
        $usuario = Usuario::where('correo_electronico', $userMail)->first();
        return response()->json(['notification_count' => $usuario->notification_count]);
    }

    public function markAsRead($userMail)
    {
        $user = Usuario::where('correo_electronico', $userMail)->first();
        $user->notification_count = 0;
        $user->save();

        return response()->json(['message' => 'Notificaciones marcadas como leídas']);
    }

    private function enviarCorreoNotificacion($correoElectronico, $notification)
    {
        $subject = 'Nueva notificación del administrador';
        $message = "Fecha: " . now()->toDateTimeString() . "\n\nContenido: " . $notification->content;

        // Envía el correo electrónico
        Mail::raw($message, function ($mail) use ($correoElectronico, $subject) {
            $mail->to($correoElectronico)
                 ->subject($subject);
        });
    }

}