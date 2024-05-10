<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateMateriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('materia', function (Blueprint $table) {
            // Agregar nueva columna id_carrera
            $table->unsignedBigInteger('id_carrera')->nullable();

            // Definir la relación con la tabla carrera
            $table->foreign('id_carrera')->references('id_carrera')->on('carrera');

            // Eliminar la columna carrera
            $table->dropColumn('carrera');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('materia', function (Blueprint $table) {
            // Revertir los cambios en orden inverso
            $table->string('carrera', 50);
            $table->dropForeign(['id_carrera']);
            $table->dropColumn('id_carrera');
        });
    }
}