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
                "correo_electronico" => 'gabo2cabero@gmail.com',
                "contraseña" => 'gabrielcabero'
            ],
            [
                "nombre" => 'Cleysi',
                "apellido_paterno" => 'Chamaca',
                "apellido_materno"  => 'Olivar',
                "correo_electronico" => 'cleysi45@gmail.com',
                "contraseña" => 'cleysichamaca'
            ],
            [
                "nombre" => 'Daniela',
                "apellido_paterno" => 'Poma',
                "apellido_materno"  => 'Limache',
                "correo_electronico" => 'dani235@gmail.com',
                "contraseña" => 'danielapoma'
            ],
            [
                "nombre" => 'Luis',
                "apellido_paterno" => 'Fernando',
                "apellido_materno"  => 'Cardenas',
                "correo_electronico" => 'luis568@gmail.com',
                "contraseña" => 'luisfernando'
            ],
            [
                "nombre" => 'Joaquin',
                "apellido_paterno" => 'Flores',
                "apellido_materno"  => 'Burgoa',
                "correo_electronico" => 'joaquin15@gmail.com',
                "contraseña" => 'joaquinflores'
            ],
            [
                "nombre" => 'Cristian',
                "apellido_paterno" => 'Flores',
                "apellido_materno"  => 'Lucero',
                "correo_electronico" => 'cristian356@gmail.com',
                "contraseña" => 'cristianflores'
            ],
            [
                "nombre" => 'Rosimary',
                "apellido_paterno" => 'Quinteros',
                "apellido_materno"  => 'Villarroel',
                "correo_electronico" => 'rosimary589@gmail.com',
                "contraseña" => 'rosimaryquinteros'
            ],
            
        ];    

        $docente = [
            [
                'id_usuario' => 1,
                "codigo_docente" => '69852',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ],
            [
                'id_usuario' => 2,
                "codigo_docente" => '12548',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ],
            [
                'id_usuario' => 3,
                "codigo_docente" => '45698',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ],
            [
                'id_usuario' => 4,
                "codigo_docente" => '36524',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ],
            [
                'id_usuario' => 5,
                "codigo_docente" => '58962',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ],
            [
                'id_usuario' => 6,
                "codigo_docente" => '89654',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ],
            [
                'id_usuario' => 7,
                "codigo_docente" => '12548',
                "estado_docente" => 'activo',
                "tipo_docente" => 'regular'
            ]
        ];
        
        Usuario::insert($usuario);
        Docente::insert($docente);    
    }    
}
