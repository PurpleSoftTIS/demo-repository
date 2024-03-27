<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dia', function (Blueprint $table) {
            $table->bigIncrements('ID_DIA');
            $table->unsignedBigInteger('ID_AMBIENTE')->nullable();
            $table->string('NOMBRE', 20);
            $table->timestamps();
            
        });

        Schema::table('dia', function (Blueprint $table) {
            $table->foreign('ID_AMBIENTE')->references('ID_AMBIENTE')->on('ambiente')->onDelete('set null');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dia');
    }
}
