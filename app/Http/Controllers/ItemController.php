<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    private const ITEMS_PER_PAGE = 10;

    public function index(Request $request)
{
    $user = auth()->user();

    $query = Item::with('category');

    if ($user && $user->role === 'vendeur') {
        // Si le user est vendeur → afficher uniquement ses articles
        $query->where('user_id', $user->id);
    } else {
        // Client ou visiteur → appliquer les filtres
        $request->validate([
            'search' => 'nullable|string',
            'category_id' => 'nullable|integer',
            'price_min' => 'nullable|integer',
            'price_max' => 'nullable|integer',
        ]);

        $words = preg_split("/[\s,]+/", $request->search) ?? [];

        $query->when($words, fn($q) => $q->where(function ($q) use ($words) {
            foreach ($words as $word) {
                $q->orWhere('title', 'like', "%$word%")
                    ->orWhere('description', 'like', "%$word%");
            }
        }))
        ->when($request->category_id, fn($q, $id) => $q->where('category_id', $id))
        ->when($request->price_min, fn($q, $min) => $q->where('price', '>=', $min))
        ->when($request->price_max, fn($q, $max) => $q->where('price', '<=', $max));
    }

    $items = $query->orderBy('created_at', 'desc')->paginate(self::ITEMS_PER_PAGE);

    return Inertia::render('Home', [
        'items' => $items,
        'auth' => ['user' => $user],
    ]);
}

    public function myItems()
{
    $user = auth()->user();

    // Redirige si l'utilisateur n'est pas vendeur
    if ($user->role !== 'vendeur') {
        return redirect()->route('items.items');
    }

    $items = Item::with('category')
        ->where('user_id', $user->id)
        ->latest()
        ->get();

    return Inertia::render('Items/MyItems', [
        'auth' => ['user' => $user],
        'items' => $items,
    ]);
}
public function edit(Item $item)
{
    $this->authorize('update', $item); // Facultatif, pour sécurité
    return Inertia::render('Items/Edit', [
        'item' => $item,
    ]);
}

public function destroy(Item $item)
{
    $this->authorize('delete', $item); // Facultatif
    $item->delete();
    return redirect()->route('items.my')->with('success', 'Article supprimé.');
}


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:64',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'description', 'price', 'category_id']);
        $data['user_id'] = auth()->id();
        if (!$data['user_id']) {
    return redirect()->route('login')->withErrors(['auth' => 'Vous devez être connecté pour ajouter un article.']);
}


        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('items', 'public');
        }
        // dd(auth()->id(), $data);

        Item::create($data);

        return redirect()->route('items.items');
    }

    public function update(Request $request, Item $item)
    {
        $request->validate([
            'title' => 'required|string|max:64',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'description', 'price', 'category_id']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('items', 'public');
        }

        $item->update($data);

        return redirect()->route('items.show', $item);
    }
}
