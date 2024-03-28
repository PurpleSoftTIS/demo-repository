<?php

namespace Database\Seeders;

use App\Models\Docente;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $usuario =[
            [
                "nombre" => 'Gabriel',
                "apellido_paterno" => 'Cabero',
                "apellido_materno"  => 'Torrico',
                "correo_electronico" => 'gabo2cabero@gmail.com'
            ],
            [
                "nombre" => 'Claysi',
                "apellido_paterno" => 'Mana',
                "apellido_materno"  => 'Olivar',
                "correo_electronico" => 'cleysi45@gmail.com'
            ],
            [
                "nombre" => 'Daniela',
                "apellido_paterno" => 'Poma',
                "apellido_materno"  => 'Limache',
                "correo_electronico" => 'dani235@gmail.com'
            ],
            [
                "nombre" => 'Luis',
                "apellido_paterno" => 'Fernando',
                "apellido_materno"  => 'Cardenas',
                "correo_electronico" => 'luis568@gmail.com'
            ],
            
        ];    

        $docente = [
            [
                'id_usuario' => 1,
                "codigo_docente" => '1254',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ],
            [
                'id_usuario' => 2,
                "codigo_docente" => '1236',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ],
            [
                'id_usuario' => 3,
                "codigo_docente" => '7896',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ],
            [
                'id_usuario' => 4,
                "codigo_docente" => '4685',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ]
        ];
        
        Usuario::insert($usuario);
        Docente::insert($docente);    
    }    
}
