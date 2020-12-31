<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

class WalletRepository
{
    public function getWallet(User $user): Collection
    {
        return WalletItem::query()->where('userid', $user->id)->get();
    }

    public function getCurrenciesInWallet(User $user)
    {
        return WalletItem::query()->select('currency')->where([
            ['userid', $user->id],
        ])->distinct()->get();
    }

    public function getItemByCurrency(User $user, $currency)
    {
        return WalletItem::query()->where([
            ['userid', $user->id],
            ['currency', $currency],
        ])->first();
    }

    public function updateOrCreateItem(User $user, $currency, $amount, $update = false): WalletItem
    {
        $item = $this->getItemByCurrency($user, $currency);
        if (null === $item) {
            $item = new WalletItem();
            $item->userid = $user->id;
            $item->currency = $currency;
            $item->amount = (float)$amount;
        } elseif ($update) {
            $item->amount = $amount;
        } else {
            $item->amount += $amount;
        }
        $item->save();

        return $item;
    }

    public function deleteItem(User $user, $id): void
    {
        WalletItem::query()->where([
            ['userid', $user->id],
            ['id', $id],
        ])->delete();
    }
}
