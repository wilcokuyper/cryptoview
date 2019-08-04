<?php

namespace App\Models;

use App\Http\Resources\WalletResource;

class WalletRepository
{
    public function getWallet(User $user): WalletResource
    {
      return new WalletResource(WalletItem::where('userid', $user->id)->get());
    }

    public function getCurrenciesInWallet(User $user)
    {
      return WalletItem::select('currency')->where([
        ['userid', $user->id],
      ])->distinct()->get();
    }

    public function getItemByCurrency(User $user, $currency)
    {
      return WalletItem::where([
        ['userid', $user->id],
        ['currency', $currency],
      ])->first();
    }

    public function updateOrCreateItem(User $user, $currency, $amount): WalletItem
    {
      $item = $this->getItemByCurrency($user, $currency);
      if(null === $item) {
        $item = new WalletItem();
        $item->userid = $user->id;
        $item->currency = $currency;
        $item->amount = floatval($amount);
      }
      else
      {
        $item->amount += $amount;
      }
      $item->save();

      return $item;
    }

    public function deleteItem(User $user, $id)
    {
      WalletItem::where([
        ['userid', $user->id],
        ['id', $id],
      ])->delete();
    }

}
