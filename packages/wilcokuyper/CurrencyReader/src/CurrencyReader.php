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

  public function GetSymbols($default = true)
  {
    $currencies = [];

    $defaultList = explode( ',', $this->currencyList->DefaultWatchlist->CoinIs);
    foreach($this->currencyList->Data as $currency)
    {
      if ($default && !in_array($currency->Id, $defaultList)) continue;
        $currencies[] = $currency->Symbol;
    }

    return $currencies;
  }

  public function CoinList($default = true)
  {
    $currency_list = [];
    foreach( $this->currencyList->Data as $currency ) {

      if( $default && !in_array( $currency->Symbol, $this->GetSymbols($default) ) ) continue;

      $currency_list[] = array (
        'id' => $currency->Id,
        'name' => $currency->FullName,
        'symbol' => $currency->Symbol,
      );
    }

    return $currency_list;
  }

  public function PriceList($requestedCurrencies = null, $default = true)
  {
    $convertTo = 'EUR';
    $currencies = null !== $requestedCurrencies ? $requestedCurrencies : $this->GetSymbols($default);

    $prices = file_get_contents('https://min-api.cryptocompare.com/data/pricemulti?fsyms='. htmlspecialchars( implode(',', $currencies) ) . '&tsyms='. $convertTo);
    return json_decode($prices);
  }
}
