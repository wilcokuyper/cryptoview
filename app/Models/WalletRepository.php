<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

class WalletRepository
{
    /**
     * @param User $user
     * @return Collection<WalletItem>
     */
    public function getWallet(User $user): Collection
    {
        return WalletItem::query()->where('userid', $user->id)->get();
    }

    /**
     * @param User $user
     * @return Collection<string>
     */
    public function getCurrenciesInWallet(User $user): Collection
    {
        return WalletItem::query()->select('currency')->where([
            ['userid', $user->id],
        ])->distinct()->get();
    }

    /**
     * @param User $user
     * @param $currency
     * @return WalletItem|null
     */
    public function getItemByCurrency(User $user, $currency): ?WalletItem
    {
        return WalletItem::query()->where([
            ['userid', $user->id],
            ['currency', $currency],
        ])->first();
    }

    /**
     * @param User $user
     * @param $currency
     * @param $amount
     * @param $update
     * @return WalletItem
     */
    public function updateOrCreateItem(User $user, $currency, $amount, $update = false): WalletItem
    {
        $item = $this->getItemByCurrency($user, $currency);
        if (null === $item) {
            $item = new WalletItem([
                'userid' => $user->id,
                'currency' => $currency,
                'amount' => (float)$amount,
            ]);
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
