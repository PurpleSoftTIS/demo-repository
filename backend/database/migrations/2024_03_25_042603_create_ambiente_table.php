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
            $table->id("id_ambiente");
            $table->foreignId("id_ubicacion")->constrained("ubicacion", "id_ubicacion");
            $table->foreignId("id_dia")->constrained("dia", "id_dia");
            $table->string("nombre_ambiente",10);
            $table->string("estado_ambiente",15);
            $table->integer("capacidad");
            $table->timestamps();
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
