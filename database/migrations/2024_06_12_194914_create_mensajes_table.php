<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMensajesTable extends Migration
{
    public function up()
    {
        Schema::create('mensajes', function (Blueprint $table) {
            $table->id();
            $table->morphs('sender'); // Polymorphic relation for sender
            $table->morphs('receiver'); // Polymorphic relation for receiver
            $table->text('contenido');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('mensajes');
    }
}
