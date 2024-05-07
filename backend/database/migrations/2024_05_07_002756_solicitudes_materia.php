<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SolicitudesMateria extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('solicitudes_materia', function (Blueprint $table) {
            $table->foreignId("id_materia")->constrained("materia", "id_materia");
            $table->foreignId("id_solicitud")->constrained("solicitud", "id_solicitud");
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
        //
    }
}
