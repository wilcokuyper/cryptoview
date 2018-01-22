<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWalletItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wallet_items', function (Blueprint $table) {
            // Set table settings
            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';

            // Define columns
            $table->increments('id');
            $table->string('currency')->nullable($value = false);
            $table->double('amount', 8, 5)->default(0);
            $table->unsignedInteger('userid');
            $table->timestamps();

            // Define indeces
            $table->foreign('userid')
                  ->references('id')->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wallet_items');
    }
}
