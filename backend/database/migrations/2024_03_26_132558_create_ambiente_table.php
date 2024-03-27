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
            $table->string("nombre_ambiente",20);
            $table->integer("capacidad");
            $table->string("estado_ambiente",10);
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
