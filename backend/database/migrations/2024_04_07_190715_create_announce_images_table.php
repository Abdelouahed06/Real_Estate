<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('announce_images', function (Blueprint $table) {
            $table->increments('image_id');
            $table->integer('announce_id')->unsigned();
            $table->foreign('announce_id')->references('announce_id')->on('announces')->onDelete('cascade');
            $table->string('image', 100)->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announce_images');
    }
};
