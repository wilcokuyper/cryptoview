<?php

namespace wilcokuyper\CurrencyReader;

use wilcokuyper\CurrencyReader\Contracts\CurrencyReaderContract;

class CurrencyReader implements CurrencyReaderContract
{
  protected $currencyList;

  public function __construct()
  {
    $json = file_get_contents('https://www.cryptocompare.com/api/data/coinlist/');
    $this->currencyList = json_decode($json);
  }

  public function DefaultSymbols()
  {
    $defaultList = explode( ',', $this->currencyList->DefaultWatchlist->CoinIs);

    $currencies = [];
    foreach($this->currencyList->Data as $currency)
    {
      if (in_array($currency->Id, $defaultList))
        $currencies[] = $currency->Symbol;
    }
    return $currencies;
  }

  public function AllSymbols()
  {
    return array_map(function($i) {
      return $i->Symbol;
    }, $currencyList->Data);
  }

  public function CoinList($default = true)
  {
    $currency_list = [];
    foreach( $this->currencyList->Data as $currency ) {

      if( $default && !in_array( $currency->Symbol, $this->DefaultSymbols() ) ) continue;

      $currency_list[] = array (
        'id' => $currency->Id,
        'name' => $currency->FullName,
        'symbol' => $currency->Symbol,
      );
    }

    return $currency_list;
  }

  public function PriceList($default = true)
  {
    $convertTo = 'EUR';
    $currencies = $default ? $this->DefaultSymbols() : $this->AllSymbols();

    $prices = file_get_contents('https://min-api.cryptocompare.com/data/pricemulti?fsyms='. implode(',', $currencies) . '&tsyms='. $convertTo);
    return json_decode($prices);
  }
}
