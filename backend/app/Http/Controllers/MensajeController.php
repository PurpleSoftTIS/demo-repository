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
                'nombre' => 'Admin' . ' '. $admin->nombre,
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
            ->orderBy('created_at', 'desc') // Ordenar por el mensaje más reciente
            ->get(['receiver_id', 'receiver_type', 'created_at']);

        // Mensajes recibidos por el usuario
        $messagesReceived = Mensaje::where('receiver_id', $user_id)
            ->where('receiver_type', $user_type)
            ->orderBy('created_at', 'desc') // Ordenar por el mensaje más reciente
            ->get(['sender_id', 'sender_type', 'created_at']);

        // Utilizamos un array asociativo para almacenar contactos únicos por nombre
        $contactsData = [];

        // Función para obtener datos completos de usuario o administrador
        $getUserOrAdminData = function ($id, $type) {
            if ($type === 'Usuario') {
                $user = Usuario::find($id);
                if ($user) {
                    return [
                        'id' => $user->id_usuario,
                        'nombre' => $user->nombre . ' ' . $user->apellido_paterno,
                        'tipo' => 'Usuario'
                    ];
                }
            } elseif ($type === 'Administrador') {
                $admin = Administrador::find($id);
                if ($admin) {
                    return [
                        'id' => $admin->id_administrador,
                        'nombre' => 'Admin' . ' '. $admin->nombre,
                        'tipo' => 'Administrador'
                    ];
                }
            }
            return null;
        };

        // Función para obtener el último mensaje entre el usuario y un contacto específico
        $getLastMessage = function ($user_id, $user_type, $contact_id, $contact_type) {
            return Mensaje::where(function ($query) use ($user_id, $user_type, $contact_id, $contact_type) {
                $query->where('sender_id', $user_id)
                    ->where('sender_type', $user_type)
                    ->where('receiver_id', $contact_id)
                    ->where('receiver_type', $contact_type);
            })->orWhere(function ($query) use ($user_id, $user_type, $contact_id, $contact_type) {
                $query->where('sender_id', $contact_id)
                    ->where('sender_type', $contact_type)
                    ->where('receiver_id', $user_id)
                    ->where('receiver_type', $user_type);
            })->orderBy('created_at', 'desc')->first();
        };

        // Agregar contactos con datos completos y último mensaje
        foreach ($messagesSent as $message) {
            $contactData = $getUserOrAdminData($message->receiver_id, $message->receiver_type);
            if ($contactData && !isset($contactsData[$contactData['nombre']])) {
                $lastMessage = $getLastMessage($user_id, $user_type, $contactData['id'], $contactData['tipo']);
                $lastMessageDate = $lastMessage ? $lastMessage->created_at : null;

                $contactsData[$contactData['nombre']] = array_merge($contactData, [
                    'ultimo_mensaje_fecha' => $lastMessageDate,
                ]);
            } elseif ($contactData) {
                $lastMessage = $getLastMessage($user_id, $user_type, $contactData['id'], $contactData['tipo']);
                $lastMessageDate = $lastMessage ? $lastMessage->created_at : null;

                if ($lastMessageDate > $contactsData[$contactData['nombre']]['ultimo_mensaje_fecha']) {
                    $contactsData[$contactData['nombre']]['ultimo_mensaje_fecha'] = $lastMessageDate;
                }
            }
        }

        foreach ($messagesReceived as $message) {
            $contactData = $getUserOrAdminData($message->sender_id, $message->sender_type);
            if ($contactData && !isset($contactsData[$contactData['nombre']])) {
                $lastMessage = $getLastMessage($user_id, $user_type, $contactData['id'], $contactData['tipo']);
                $lastMessageDate = $lastMessage ? $lastMessage->created_at : null;

                $contactsData[$contactData['nombre']] = array_merge($contactData, [
                    'ultimo_mensaje_fecha' => $lastMessageDate,
                ]);
            } elseif ($contactData) {
                $lastMessage = $getLastMessage($user_id, $user_type, $contactData['id'], $contactData['tipo']);
                $lastMessageDate = $lastMessage ? $lastMessage->created_at : null;

                if ($lastMessageDate > $contactsData[$contactData['nombre']]['ultimo_mensaje_fecha']) {
                    $contactsData[$contactData['nombre']]['ultimo_mensaje_fecha'] = $lastMessageDate;
                }
            }
        }

        // Ordenar contactos por el último mensaje enviado
        $contactsData = collect($contactsData)
            ->sortByDesc('ultimo_mensaje_fecha')
            ->values()
            ->all();

        return response()->json($contactsData);
    }

}