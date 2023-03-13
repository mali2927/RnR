<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unit_informations', function (Blueprint $table) {
            $table->bigIncrements('unit_info_id');
            $table->string('unit_number');
            $table->date('receive_date');
            $table->string('initial_faults');
            $table->date('deliver_date');
            $table->string('more_faults');
            $table->timestamps();
        });
        DB::statement("ALTER TABLE unit_informations ADD unit_image MEDIUMBLOB");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unit_informations');
    }
}