<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Inertia\Inertia;

class VendorItemController extends Controller
{
    public function index() {
        $items = Item::where('user_id', auth()->id())->get();
        return Inertia::render('Vendor/Items', ['items' => $items]);
    }

    public function store(Request $request) {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        Item::create([
            'user_id' => auth()->id(),
            'category_id' => $request->category_id,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id) {
        $item = Item::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $item->update($request->all());
        return redirect()->back();
    }

    public function destroy($id) {
        Item::where('id', $id)->where('user_id', auth()->id())->delete();
        return redirect()->back();
    }
}
