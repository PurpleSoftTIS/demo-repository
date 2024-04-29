<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertHoraData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Insertar datos en la tabla carrera
        $horas = [
            [
            "hora_inicio" => '06:45',
            "hora_fin" => '08:15'
            ],

            [
            "hora_inicio" => '08:15',
            "hora_fin" => '09:45'
            ],

            [
            "hora_inicio" => '09:45',
            "hora_fin" => '11:15'
            ],
            
            [
            "hora_inicio" => '11:15',
            "hora_fin" => '12:45'
            ],

            [
            "hora_inicio" => '12:45',
            "hora_fin" => '14:15'
            ],

            [
            "hora_inicio" => '14:15',
            "hora_fin" => '15:45'
            ],

            [
            "hora_inicio" => '15:45',
            "hora_fin" => '17:15'
            ],

            [
            "hora_inicio" => '17:15',
            "hora_fin" => '18:45'
            ],

            [
            "hora_inicio" => '18:45',
            "hora_fin" => '20:15'
            ],

            [
            "hora_inicio" => '20:15',
            "hora_fin" => '21:45'
            ]
        ];
    
        foreach ($horas as $hora) {
            DB::table('hora')->insert($hora);
        }    
    
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
