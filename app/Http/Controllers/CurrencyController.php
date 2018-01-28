<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use wilcokuyper\CurrencyReader\CurrencyReader;
use App\Models\WalletRepository;

class CurrencyController extends Controller
{
    protected $walletRepository;

    public function __construct(WalletRepository $walletRepository)
    {
      $this->walletRepository = $walletRepository;
    }

    public function CurrencyList(CurrencyReader $reader, $default = false)
    {
      return response()->json($reader->CoinList($default));
    }

    public function PriceList(Request $request, CurrencyReader $reader, $default = true)
    {
      $userCurrencies = array_map(function($i) {
        return $i['currency'];
      }, $this->walletRepository->getCurrenciesInWallet($request->user())->toArray());

      return response()->json($reader->PriceList($userCurrencies));
    }
}
