<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocenteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docente', function (Blueprint $table) {
            $table->id("id_docente");
            $table->foreignId("id_usuario")->constrained("usuario", "id_usuario");
            $table->string("codigo_docente",10);
            $table->string("estado_docente",10);
            $table->string("tipo_docente",10);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
   
}
