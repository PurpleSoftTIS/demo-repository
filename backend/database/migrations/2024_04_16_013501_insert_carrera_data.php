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
