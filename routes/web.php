<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\VendorItemController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Homepage
Route::get('/', [ItemController::class, 'index'])->name('home'); // On utilise ItemController pour la home page

// Items
Route::get('/items', [ItemController::class, 'index'])->name('items.items');

Route::middleware('auth')->group(function () {
    Route::get('/item/create', [ItemController::class, 'create'])->name('items.create');
    Route::post('/item/create', [ItemController::class, 'store'])->name('items.store');
    Route::get('/item/{id}/edit', [ItemController::class, 'edit'])->name('items.edit');
    Route::post('/item/{id}/edit', [ItemController::class, 'update'])->name('items.update');
    Route::post('/item/{id}/delete', [ItemController::class, 'destroy'])->name('items.destroy');
});

// Show single item
Route::get('/item/{id}', [ItemController::class, 'show'])->name('items.show');

// User Profiles
Route::get('/user/{id}', [ProfileController::class, 'show'])->name('profile.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Cart routes (avec auth)
Route::middleware('auth')->group(function () {
    Route::get('/panier', [CartController::class, 'index'])->name('cart.show');
    Route::post('/panier/{id}', [CartController::class, 'add'])->name('cart.add');
    Route::delete('/panier/{id}', [CartController::class, 'remove'])->name('cart.remove');
});

// Checkout routes (avec auth)
// … tes autres routes

Route::middleware('auth')->group(function () {
    // panier
    Route::get('/panier', [CartController::class, 'index'])->name('cart.show');
    Route::post('/panier/{id}', [CartController::class, 'add'])->name('cart.add');
    Route::delete('/panier/{id}', [CartController::class, 'remove'])->name('cart.remove');

    // checkout & commande
    Route::get('/checkout', [OrderController::class, 'create'])->name('checkout');
    Route::post('/orders',   [OrderController::class, 'store'])->name('orders.store');
});



// Vendor routes avec middleware personnalisé is.vendor
Route::middleware(['auth', 'is.vendor'])->group(function () {
    Route::get('/vendeur/items', [VendorItemController::class, 'index'])->name('vendeur.items.index');
    Route::post('/vendeur/items', [VendorItemController::class, 'store'])->name('vendeur.items.store');
    Route::put('/vendeur/items/{id}', [VendorItemController::class, 'update'])->name('vendeur.items.update');
    Route::delete('/vendeur/items/{id}', [VendorItemController::class, 'destroy'])->name('vendeur.items.destroy');
});

// Auth routes
require __DIR__.'/auth.php';

// Route fallback (page non trouvée)
Route::fallback(function () {
    return Inertia::render('NotFound');
});
Route::middleware('auth')->group(function () {
    Route::post('/item/create', [ItemController::class, 'store'])->name('items.store');
});
Route::get('/mes-articles', [ItemController::class, 'myItems'])->name('items.my');
Route::get('/items/{item}/edit', [ItemController::class, 'edit'])->name('items.edit');
Route::delete('/items/{item}', [ItemController::class, 'destroy'])->name('items.destroy');
