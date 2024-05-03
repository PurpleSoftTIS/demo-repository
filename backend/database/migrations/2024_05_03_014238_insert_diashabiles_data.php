<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertDiashabilesData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $diashabiles = [
            [
                "id_dia" => '1',
                "id_hora" => '1'
            ],
            [
                "id_dia" => '1',
                "id_hora" => '2'
            ],
            [
                "id_dia" => '1',
                "id_hora" => '3'
            ],
            [
                "id_dia" => '1',
                "id_hora" => '4'
            ],
            [
                "id_dia" => '1',
                "id_hora" => '5'
            ],
            [
                "id_dia" => '1',
                "id_hora" => '6'
            ],
            [
                "id_dia" => '1',
                "id_hora" => '7'
            ],
            [
                "id_dia" => '1',
                "id_hora" => '8'
            ],
            [
                "id_dia" => '1',
                "id_hora" => '9'
            ],
            [
                "id_dia" => '1',
                "id_hora" => '10'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '1'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '2'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '3'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '4'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '5'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '6'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '7'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '8'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '9'
            ],
            [
                "id_dia" => '2',
                "id_hora" => '10'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '1'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '2'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '3'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '4'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '5'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '6'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '7'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '8'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '9'
            ],
            [
                "id_dia" => '3',
                "id_hora" => '10'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '1'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '2'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '3'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '4'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '5'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '6'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '7'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '8'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '9'
            ],
            [
                "id_dia" => '4',
                "id_hora" => '10'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '1'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '2'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '3'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '4'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '5'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '6'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '7'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '8'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '9'
            ],
            [
                "id_dia" => '5',
                "id_hora" => '10'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '1'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '2'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '3'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '4'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '5'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '6'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '7'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '8'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '9'
            ],
            [
                "id_dia" => '6',
                "id_hora" => '10'
            ],            
        ];

        foreach ($diashabiles as $dia) {
            DB::table('hora')->insert($dia);
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
