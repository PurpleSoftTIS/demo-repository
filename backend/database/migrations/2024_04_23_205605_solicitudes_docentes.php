<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SolicitudesDocentes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('solicitudesDocentes', function (Blueprint $table) {
            $table->foreignId("id_docente")->constrained("docente", "id_docente");
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
