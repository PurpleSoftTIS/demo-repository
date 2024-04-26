<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertCarreraData extends Migration
{
    public function up()
    {
        // Insertar datos en la tabla carrera
        $carreras = [
            ['nombre_carrera' => 'Ingeniería Civil'],
            ['nombre_carrera' => 'Ingeniería De Alimentos'],
            ['nombre_carrera' => 'Ingeniería De Sistemas'],
            ['nombre_carrera' => 'Ingeniería Eléctrica'],
            ['nombre_carrera' => 'Ingeniería Electrónica'],
            ['nombre_carrera' => 'Ingeniería Electromecánica'],
            ['nombre_carrera' => 'Ingeniería Industrial'],
            ['nombre_carrera' => 'Ingeniería en Informática'],
            ['nombre_carrera' => 'Ingeniería Matemática'],
            ['nombre_carrera' => 'Ingeniería Mecánica'],
            ['nombre_carrera' => 'Ingeniería en Biotecnología'],
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
