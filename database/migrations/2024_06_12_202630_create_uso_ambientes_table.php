<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsoAmbientesTable extends Migration
{
    public function up()
    {
        Schema::create('uso_ambientes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_ambiente');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('uso_ambientes');
    }
}