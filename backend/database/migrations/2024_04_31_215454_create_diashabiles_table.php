<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiashabilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       
        Schema::create('diashabiles', function (Blueprint $table) {
            $table->foreignId("id_dia")->constrained("dia", "id_dia");
            $table->foreignId("ID_AMBIENTE")->constrained("ambiente", "ID_AMBIENTE");


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
        Schema::dropIfExists('diashabiles');
    }
}
