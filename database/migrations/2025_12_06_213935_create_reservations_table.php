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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('fullname');
            $table->integer('nbrPersonne');
            $table->date('dateStart');
            $table->date('dateEnd');
            $table->string('contact');
            $table->string('email');
            $table->foreignId('excursion_id')->constrained('excursions')->onDelete('cascade');
            $table->foreignId('type_voyage_id')->nullable()->constrained('type_voyages')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
