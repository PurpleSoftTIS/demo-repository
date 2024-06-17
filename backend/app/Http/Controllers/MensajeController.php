<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use App\Models\Usuario;
use App\Models\Administrador;
use Illuminate\Http\Request;

class MensajeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'sender_id' => 'required',
            'sender_type' => 'required|in:Usuario,Administrador',
            'receiver_id' => 'required',
            'receiver_type' => 'required|in:Usuario,Administrador',
            'contenido' => 'required|string'
        ]);

        $mensaje = Mensaje::create($request->all());

        return response()->json($mensaje, 201);
    }

    public function getMessages($sender_id, $sender_type, $receiver_id, $receiver_type)
    {
        $mensajes = Mensaje::where(function($query) use ($sender_id, $sender_type, $receiver_id, $receiver_type) {
            $query->where('sender_id', $sender_id)
                  ->where('sender_type', $sender_type)
                  ->where('receiver_id', $receiver_id)
                  ->where('receiver_type', $receiver_type);
        })->orWhere(function($query) use ($sender_id, $sender_type, $receiver_id, $receiver_type) {
            $query->where('sender_id', $receiver_id)
                  ->where('sender_type', $receiver_type)
                  ->where('receiver_id', $sender_id)
                  ->where('receiver_type', $sender_type);
        })->orderBy('created_at', 'asc')->get();

        return response()->json($mensajes);
    }

    public function getContacts($user_id, $user_type)
    {
        $users = Usuario::all()->map(function($user) {
            return [
                'id' => $user->id_usuario,
                'nombre' => $user->nombre . ' ' . $user->apellido_paterno,
                'tipo' => 'Usuario'
            ];
        });

        $admins = Administrador::all()->map(function($admin, $index) {
            return [
                'id' => $admin->id_administrador,
                'nombre' => 'Admin' . ($index + 1),
                'tipo' => 'Administrador'
            ];
        });

        $contacts = $users->merge($admins);

        return response()->json($contacts);
    }

    public function getConversationContacts($user_id, $user_type)
    {
        // Mensajes enviados por el usuario
        $messagesSent = Mensaje::where('sender_id', $user_id)
            ->where('sender_type', $user_type)
            ->distinct()
            ->get(['receiver_id', 'receiver_type']);
        
        // Mensajes recibidos por el usuario
        $messagesReceived = Mensaje::where('receiver_id', $user_id)
            ->where('receiver_type', $user_type)
            ->distinct()
            ->get(['sender_id', 'sender_type']);
        
        // Unificar contactos
        $contacts = $messagesSent->map(function($message) {
            return [
                'id' => $message->receiver_id,
                'tipo' => $message->receiver_type
            ];
        })->merge($messagesReceived->map(function($message) {
            return [
                'id' => $message->sender_id,
                'tipo' => $message->sender_type
            ];
        }))->unique(function ($contact) {
            return $contact['id'] . $contact['tipo'];
        });

        // Obtener datos completos de los contactos
        $contactsData = $contacts->map(function($contact) {
            if ($contact['tipo'] === 'Usuario') {
                $user = Usuario::find($contact['id']);
                return [
                    'id' => $user->id_usuario,
                    'nombre' => $user->nombre . ' ' . $user->apellido_paterno,
                    'tipo' => 'Usuario'
                ];
            } else {
                $admin = Administrador::find($contact['id']);
                return [
                    'id' => $admin->id_administrador,
                    'nombre' => 'Admin' . $admin->id_administrador,
                    'tipo' => 'Administrador'
                ];
            }
        });

        return response()->json($contactsData);
    }

}