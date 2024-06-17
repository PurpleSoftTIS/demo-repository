<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Administrador;

class CreateAdministradoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('administradores', function (Blueprint $table) {
            $table->id('id_administrador');
            $table->string('correo_electronico', 30)->unique();
            $table->string('contraseña', 100);
            $table->timestamps();
        });

        // Insertar el administrador por defecto
        Administrador::create([
            'correo_electronico' => 'purpleSoft@gmail.com',
            'contraseña' => $this->encriptar('purplesoft2024'),
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('administradores');
    }

    private function encriptar($texto)
    {
        $morse = [
            'a'=>'Acs','b'=>'Los','c'=>'52A','d'=>'568',
            'e'=>'..Qa','f'=>'OiU','g'=>'6x2','h'=>'*89',
            'i'=>'@2','j'=>'lOP','k'=>'1Qz','l'=>'23k',
            'm'=>'↓*-','n'=>'$%5','o'=>'1·#','p'=>'^?5',
            'q'=>'56/-','r'=>'A;-','s'=>'/|=','t'=>'E',
            'u'=>'iKo','v'=>'p-ws','w'=>'7gH','x'=>'2v#',
            'y'=>'><1','z'=>'*9s','0'=>'-9A-p','1'=>'.Xb2','ñ'=>'/*-+',
            '2'=>'9js','3'=>'uV1','4'=>'%q.@-','5'=>'569-',
            '6'=>'5g^','7'=>'-[]','8'=>']{L,','9'=>'Vha',  
        ];    
        $morse_texto = '';     
        for ($i = 0; $i < strlen($texto); $i++) {
            $caracter = $texto[$i];
            if (isset($morse[$caracter])) {
                $morse_texto .= $morse[$caracter] . ' ';
            }
        }
        
        return trim($morse_texto);
    }
}