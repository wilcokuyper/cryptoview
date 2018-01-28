<?php

namespace wilcokuyper\CurrencyReader\Contracts;

interface CurrencyReaderContract
{
  public function CoinList($default);
  public function PriceList($requestedCurrency, $default);
}
