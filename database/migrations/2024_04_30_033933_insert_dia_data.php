<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertDiaData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
          //// Insertar datos en la tabla dia
          $dias = [
            ['nombre' => 'Lunes'],
            ['nombre' => 'Martes'],
            ['nombre' => 'Miercoles'],
            ['nombre' => 'Jueves'],
            ['nombre' => 'Viernes'],
            ['nombre' => 'Sabado']
            
        ];

        foreach ($dias as $dia) {
            DB::table('dia')->insert($dia);
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
