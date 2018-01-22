<?php

namespace wilcokuyper\CurrencyReader\Contracts;

interface CurrencyReaderContract
{
  public function CoinList($default = true);
  public function PriceList($default = true);
}
