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
            $table->id('id_diashabiles');
            $table->foreignId("id_dia")->constrained("dia", "id_dia");
            $table->foreignId("id_ambiente")->constrained("ambiente", "id_ambiente");


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
