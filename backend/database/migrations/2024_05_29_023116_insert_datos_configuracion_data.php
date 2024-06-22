<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Configuracion;
use Carbon\Carbon;

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
            'configuracion' => 'Auditorio',
            'valor' => '4'
        ]);
        Configuracion::create([
            'configuracion' => 'Tiempo de respuesta Usuario',
            'valor' => '24'
        ]);
        Configuracion::create([
            'configuracion' => 'Mensajes masivo',
            'valor' => '0'
        ]);

        // Fecha Inicio (Hoy)
        $fechaInicio = Carbon::now();
        Configuracion::create([
            'configuracion' => 'Fecha Inicio',
            'valor' => $fechaInicio->toDateString()
        ]);

        // Fecha Fin (Dentro de 2 años)
        $fechaFin = $fechaInicio->addYears(2);
        Configuracion::create([
            'configuracion' => 'Fecha Fin',
            'valor' => $fechaFin->toDateString()
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // No es necesario definir la reversión en este caso
    }
}