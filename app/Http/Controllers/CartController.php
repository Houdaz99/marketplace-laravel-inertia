<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Item;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /* ===== AJOUTER AU PANIER ===== */
    public function add($id)
    {
        $user = Auth::user();

        $cartItem = Cart::where('user_id', $user->id)
                        ->where('item_id', $id)
                        ->first();

        if ($cartItem) {
            $cartItem->increment('quantity');
        } else {
            Cart::create([
                'user_id'  => $user->id,
                'item_id'  => $id,
                'quantity' => 1,
            ]);
        }

        return back()->with('success', 'Produit ajouté au panier.');
    }

    /* ===== RETIRER ===== */
    public function remove($id)
    {
        Cart::where('user_id', Auth::id())
            ->where('item_id', $id)
            ->delete();

        return back()->with('success', 'Produit retiré du panier.');
    }

    /* ===== AFFICHER PANIER / PRODUITS VENDEUR ===== */
    public function index()
    {
        $user = Auth::user();

        /* -------- Vendeur -------- */
        if ($user->role === 'vendeur') {

            // On ne sélectionne que les colonnes qui existent dans Item
            $sellerProducts = Item::where('user_id', $user->id)
                ->select('id', 'title', 'price', 'description')
                ->get();

            return Inertia::render('Cart', [
                'auth'           => ['user' => $user],
                'sellerProducts' => $sellerProducts,
                'cartItems'      => [],
            ]);
        }

        /* -------- Client -------- */
        $cartLines = Cart::with('item')
            ->where('user_id', $user->id)
            ->get();

        $cartItems = $cartLines->map(function ($line) {
            return [
                'id'         => $line->item->id,
                'title'      => $line->item->title,
                'price'      => $line->item->price,
                'quantity'   => $line->quantity,
                'description'=> $line->item->description,
            ];
        });

        return Inertia::render('Cart', [
            'auth'           => ['user' => $user],
            'cartItems'      => $cartItems,
            'sellerProducts' => [],
        ]);
    }
}
