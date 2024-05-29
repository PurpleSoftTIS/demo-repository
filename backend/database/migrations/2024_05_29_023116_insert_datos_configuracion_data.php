<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Configuracion;
class InsertDatosConfiguracionData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Configuracion::create([
            'configuracion' => 'Aula Comun',
            'valor' => '2'
            ]);
            Configuracion::create([
                'configuracion' => 'Laboratorios',
                'valor' => '7'
            ]);
                Configuracion::create([
                    'configuracion' => 'Mensajes masivo',
                    'valor' => '0'
                ]);
        

        
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
