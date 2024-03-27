<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAmbienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
      public function up()
    {
        Schema::create('ambiente', function (Blueprint $table) {
            $table->id('ID_AMBIENTE'); // Utilizamos bigIncrements para serial, equivalente a SERIAL en PostgreSQL
            $table->foreignId("ID_UBICACION")->constrained("ubicacion", "ID_UBICACION");
            $table->string('NOMBRE_AMBIENTE', 10);
            $table->integer('CAPACIDAD');
            $table->string('ESTADO_AMBIENTE', 15)->nullable();
            $table->timestamps(); // Añadimos created_at y updated_at

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ambiente');
    }
}
