<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertUbicacionData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $ubicaciones = [
            ['edificio' => 'Departamento de Biologia'],
            ['edificio' => 'Departamento de Quimica'],
            ['edificio' => 'Departamento de Fisica'],
            ['edificio' => 'Biblioteca FCYT'],
            ['edificio' => 'Departamento de Industrial'],
            ['edificio' => 'Planta de procesos indrustriales'],
            ['edificio' => 'Sector Laboratorios Mecanica'],
            ['edificio' => 'Edificio CAD - CAM'],
            ['edificio' => 'Edificio Decanatura'],
            ['edificio' => 'Bloque Trencito'],
            ['edificio' => 'Edificio Elektro'],
            ['edificio' => 'Edificio Laboratorios Basicos'],
            ['edificio' => 'Edificio Academico 2'],
            ['edificio' => 'Edficio MEMI'],
            ['edificio' => 'Aulas INFLAB']           
            
        ];

        foreach ($ubicaciones as $ubicacion) {
            DB::table('ubicacion')->insert($ubicacion);
        }
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
