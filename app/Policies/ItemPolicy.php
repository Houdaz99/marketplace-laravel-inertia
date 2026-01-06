<?php

namespace App\Policies;

use App\Models\Item;
use App\Models\User;

class ItemPolicy
{
    public function delete(User $user, Item $item)
    {
        // Autorise seulement le vendeur propriétaire
        return $user->id === $item->user_id;
    }

    public function update(User $user, Item $item)
    {
        return $user->id === $item->user_id;
    }
}
