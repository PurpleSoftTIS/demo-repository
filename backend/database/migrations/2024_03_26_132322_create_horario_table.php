<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('horario', function (Blueprint $table) {
            $table->unsignedInteger('ID_DIA');
            $table->unsignedInteger('ID_HORA');
            
            $table->foreign('ID_DIA')->references('ID_DIA')->on('dia')->onDelete('cascade');
            $table->foreign('ID_HORA')->references('ID_HORA')->on('hora')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('horario');
    }
}
