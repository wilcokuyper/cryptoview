<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use wilcokuyper\CurrencyReader\CurrencyReader;

class CurrencyController extends Controller
{
    protected $defaultCurrencyList;

    public function CurrencyList(CurrencyReader $reader, $default = true)
    {
      return response()->json($reader->CoinList($default));
    }

    public function PriceList(CurrencyReader $reader, $default = true)
    {
      return response()->json($reader->PriceList($default));
    }
}
