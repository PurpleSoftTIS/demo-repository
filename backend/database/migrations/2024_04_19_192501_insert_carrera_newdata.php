<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertCarreraNewdata extends Migration
{
    public function up()
    {
        // Insertar datos en la tabla carrera
        $carreras = [
            ['nombre_carrera' => 'Lic. en biologia'],
            ['nombre_carrera' => 'Ingenieria en Energia'],
            ['nombre_carrera' => 'Lic. didactica de la fisica'],
            ['nombre_carrera' => 'Lic. en fisica'],
            ['nombre_carrera' => 'Lic. en  matematica'],
            ['nombre_carrera' => 'Ingenieria Quimica '],
            ['nombre_carrera' => 'Lic. en quimica'],
        ];

        foreach ($carreras as $carrera) {
            DB::table('carrera')->insert($carrera);
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
