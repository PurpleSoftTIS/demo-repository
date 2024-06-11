<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CodigoUser extends Migration
{
    public function up()
    {
        Schema::create('codigouser', function (Blueprint $table) {
            $table->string('codigo', 5)->primary();
            $table->unsignedBigInteger('id_usuario');
            $table->timestamps();
            
            $table->foreign('id_usuario')->references('id_usuario')->on('usuario')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('codigosuser');
    }
}