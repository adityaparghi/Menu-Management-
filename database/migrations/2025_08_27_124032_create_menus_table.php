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
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url')->nullable();
            $table->string('icon')->nullable();

            // Parent (self-referencing)
            $table->foreignId('parent_id')
                  ->nullable()
                  ->constrained('menus')
                  ->cascadeOnDelete();

            // Status and sorting
            $table->string('status')->default('Active'); // Active | Inactive
            $table->unsignedInteger('sort_number')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
