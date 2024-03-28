<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitud', function (Blueprint $table) {
            $table->id("id_solicitud");
            $table->foreignId("id_docente")->constrained("docente", "id_docente");
            $table->foreignId("id_hora")->constrained("hora", "id_hora");
            $table->integer("numero_estudiantes");
            $table->date("fecha_solicitud");
            $table->text("motivo");
            $table->string("estado_solicitud",15);
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
        Schema::dropIfExists('solicitud');
    }
}
