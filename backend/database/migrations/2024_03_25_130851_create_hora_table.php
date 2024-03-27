<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHoraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hora', function (Blueprint $table) {
            $table->bigIncrements('ID_HORA'); // Equivalente a SERIAL en PostgreSQL
            $table->time('HORA_INICIO');
            $table->time('HORA_FIN');
            $table->timestamps(); // Opcional, si deseas tener las columnas created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hora');
    }
}
