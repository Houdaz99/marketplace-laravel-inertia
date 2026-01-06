<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   // database/migrations/xxxx_xx_xx_create_carts_table.php
public function up()
{
    Schema::create('carts', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->foreignId('item_id')->constrained()->cascadeOnDelete();
        $table->unsignedInteger('quantity')->default(1);
        $table->timestamps();

        $table->unique(['user_id', 'item_id']);   // un même produit, une seule ligne
    });
}
public function down()
{
    Schema::dropIfExists('carts');
}

};
