<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /** Affiche le formulaire de checkout */
    public function create()
    {
        $total = Cart::join('items', 'carts.item_id', '=', 'items.id')
                     ->where('carts.user_id', Auth::id())           // correction
                     ->sum(DB::raw('items.price * carts.quantity'));

        return Inertia::render('Checkout', [
            'total' => $total,
        ]);
    }

    /** Enregistre la commande après soumission du formulaire */
    public function store(Request $request)
    {
        $request->validate([
            'first_name'  => 'required|string|max:255',
            'last_name'   => 'required|string|max:255',
            'card_number' => 'required|string|min:8',
        ]);

        $cartLines = Cart::with('item')
                         ->where('carts.user_id', Auth::id())        // même précision par sécurité
                         ->get();

        if ($cartLines->isEmpty()) {
            return back()->with('error', 'Votre panier est vide.');
        }

        $items = $cartLines->map(fn ($l) => [
            'id'    => $l->item->id,
            'title' => $l->item->title,
            'price' => $l->item->price,
            'qty'   => $l->quantity,
        ]);

        $total = $cartLines->sum(fn ($l) => $l->item->price * $l->quantity);

        Order::create([
            'user_id'        => Auth::id(),
            'items'          => $items,
            'total'          => $total,
            'payment_status' => 'fictif',
        ]);

        Cart::where('user_id', Auth::id())->delete();

        return redirect()->route('cart.show')
                         ->with('success', 'Commande enregistrée (paiement fictif).');
    }
}
